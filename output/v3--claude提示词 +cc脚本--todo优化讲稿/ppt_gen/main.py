#!/usr/bin/env python3
"""生成 AI 协作编程实践 PPT - 主入口"""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

import utils

def main():
    prs = utils.init_presentation()

    from section1 import add_slides as s1
    from section2 import add_slides as s2
    from section3a import add_slides as s3a
    from section3b import add_slides as s3b
    from section4 import add_slides as s4

    s1(prs)
    s2(prs)
    s3a(prs)
    s3b(prs)
    s4(prs)

    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(output_dir, 'ai_coding_practice.pptx')
    prs.save(output_path)
    print(f"PPT saved to: {output_path}")
    print(f"Total slides: {len(prs.slides)}")

if __name__ == '__main__':
    main()
