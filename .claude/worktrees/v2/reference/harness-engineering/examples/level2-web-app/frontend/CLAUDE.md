# 前端开发指南

## 技术栈
- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: React Query + Zustand
- **路由**: React Router v6

## 项目结构
```
frontend/src/
├── api/                    # API 调用封装
│   ├── client.ts          # axios 实例配置
│   ├── users.ts           # 用户相关 API
│   └── tasks.ts           # 任务相关 API
├── components/            # 组件
│   ├── common/           # 通用组件
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   └── domain/           # 业务组件
│       ├── TaskList.tsx
│       ├── TaskItem.tsx
│       └── UserProfile.tsx
├── hooks/                # 自定义 Hooks
│   ├── useAuth.ts
│   ├── useTasks.ts
│   └── useUser.ts
├── pages/                # 页面组件
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── TasksPage.tsx
├── stores/               # 状态管理
│   ├── authStore.ts
│   └── uiStore.ts
├── types/                # TypeScript 类型
│   ├── user.ts
│   └── task.ts
├── utils/                # 工具函数
│   ├── formatDate.ts
│   └── validators.ts
├── App.tsx
└── main.tsx
```

## 开发规则

### 1. 组件规范

**文件命名**:
- 组件文件：PascalCase（如 `UserCard.tsx`）
- 工具文件：camelCase（如 `formatDate.ts`）
- 类型文件：camelCase（如 `user.ts`）

**组件结构**:
```typescript
// 1. 导入
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

// 2. 类型定义
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

// 3. 组件定义
export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  // 3.1 Hooks
  const { isAuthenticated } = useAuth();
  
  // 3.2 状态
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3.3 副作用
  useEffect(() => {
    // ...
  }, []);
  
  // 3.4 事件处理
  const handleEdit = () => {
    onEdit?.(user);
  };
  
  // 3.5 渲染
  return (
    <div className="p-4 border rounded">
      {/* ... */}
    </div>
  );
};

// 4. 默认导出（可选）
export default UserCard;
```

### 2. API 调用规范

使用 React Query 处理数据获取：

```typescript
// api/tasks.ts
import { apiClient } from './client';
import { Task } from '@/types/task';

export const taskApi = {
  getAll: () => apiClient.get<Task[]>('/tasks'),
  getById: (id: number) => apiClient.get<Task>(`/tasks/${id}`),
  create: (data: CreateTaskInput) => apiClient.post<Task>('/tasks', data),
  update: (id: number, data: UpdateTaskInput) => 
    apiClient.patch<Task>(`/tasks/${id}`, data),
  delete: (id: number) => apiClient.delete(`/tasks/${id}`),
};

// hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getAll(),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      // 成功后刷新任务列表
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```

### 3. 状态管理

**全局状态**（Zustand）：
```typescript
// stores/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

**服务端状态**（React Query）：
- 使用 React Query 管理服务端数据
- 缓存、重试、乐观更新都交给 React Query 处理

### 4. 类型定义

```typescript
// types/task.ts
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: Task['status'];
}
```

### 5. 错误处理

```typescript
// 组件内错误处理
const TaskList: React.FC = () => {
  const { data: tasks, error, isLoading } = useTasks();
  
  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <ErrorMessage 
        title="加载失败"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }
  
  return <TaskListView tasks={tasks} />;
};

// API 错误拦截
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，跳转到登录页
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 样式规范

### Tailwind CSS 使用

```tsx
// ✅ 好的做法：使用语义化类名
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ❌ 不好的做法：硬编码样式值
<div style={{ padding: '16px', backgroundColor: '#fff' }}>
```

### 响应式设计

```tsx
// 移动端优先
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* 全宽 → 平板一半 → 桌面三分之一 */}
</div>
```

## 测试

```bash
# 运行测试
npm test

# 运行特定文件
npm test TaskList.test.tsx

# 带覆盖率
npm test -- --coverage
```

### 测试示例

```typescript
// components/__tests__/TaskList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from '../TaskList';

describe('TaskList', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', status: 'pending' },
    { id: 2, title: 'Task 2', status: 'completed' },
  ];
  
  it('renders task list', () => {
    render(<TaskList tasks={mockTasks} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
  
  it('calls onTaskClick when task is clicked', () => {
    const handleClick = jest.fn();
    render(<TaskList tasks={mockTasks} onTaskClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Task 1'));
    expect(handleClick).toHaveBeenCalledWith(mockTasks[0]);
  });
});
```

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npx tsc --noEmit

# 代码检查
npm run lint

# 代码格式化
npm run format
```
