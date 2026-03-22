@AGENTS.md

## Important: Python Command
This project runs on Windows. Always use `python` instead of `python3` when executing skill scripts.

## Skills
Before starting any UI/UX or frontend work, read and follow:
.claude/skills/ui-ux-pro-max/SKILL.md


# 21st.dev Staging Folder
The folder at C:\Users\kraff\Desktop\21st Dev is a staging area for UI components from 21st.dev.
- Do NOT modify, delete, or write any files in this folder
- Read from it ONLY when explicitly asked
- Treat all contents as external reference material, not project source code

# UI Component Workflow
21st.dev components are sourced manually via VS Code extension.
Paste new components into `components/scratch.tsx` first — never directly into production files.
Claude integrates from scratch.tsx into the target file and aligns with the design system.