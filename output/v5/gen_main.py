"""
Main entry: combine all parts to generate the full 48-page PPT.
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from gen_helpers import create_prs, SLIDE_W, SLIDE_H
from gen_part0 import add_slides as add_part0
from gen_part1 import add_slides as add_part1
from gen_part2 import add_slides as add_part2
from gen_part3 import add_slides as add_part3
from gen_part4 import add_slides as add_part4

def main():
    prs = create_prs()
    print(f"Created presentation: {SLIDE_W} x {SLIDE_H}")

    # Part 0: Cover + Opening (P1-P2)
    print("Generating Part 0: Cover + Opening (P1-P2)...")
    add_part0(prs)

    # Part 1: Real Projects (P3-P14)
    print("Generating Part 1: Real Projects (P3-P14)...")
    add_part1(prs)

    # Part 2: Reflections (P15-P21)
    print("Generating Part 2: Reflections (P15-P21)...")
    add_part2(prs)

    # Part 3: SDD & Harness (P22-P37)
    print("Generating Part 3: SDD & Harness (P22-P37)...")
    add_part3(prs)

    # Part 4: Tools & Tips + Closing (P38-P48)
    print("Generating Part 4: Tools & Tips + Closing (P38-P48)...")
    add_part4(prs)

    total = len(prs.slides)
    print(f"\nTotal slides generated: {total}")
    assert total == 48, f"Expected 48 slides, got {total}"

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ai_coding_practice.pptx")
    prs.save(out_path)
    print(f"Saved to: {out_path}")
    print("Done!")

if __name__ == "__main__":
    main()
