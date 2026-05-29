<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules

## File Creation Rules

### ❌ DO NOT create markdown (.md) files unless:
1. User explicitly requests it
2. You asked permission AND user gave approval

### ✅ Existing essential MD files (allowed):
- `README.md` - Main documentation
- `CONTRIBUTING.md` - Contribution guidelines  
- `CODE_OF_CONDUCT.md` - Community guidelines
- `SECURITY.md` - Security policies
- `LICENSE` - License file
- `SETUP_GUIDE.md` - Setup instructions
- `AGENTS.md` - This file
- `CLAUDE.md` - Claude-specific instructions

### 📋 If you need to share information:
- **Put it directly in the chat response**, not in a new MD file
- Use code blocks for code examples
- Use markdown formatting for clarity
- Only suggest creating a file if it's truly needed long-term

### 🚫 Never create these without permission:
- Summary files (FINAL_*, SUMMARY_*, COMPLETE_*)
- Analysis files (BUG_ANALYSIS_*, INVESTIGATION_*)
- Status files (STATUS_*, READY_*)
- Question files (QUESTIONS_*, NOTES_*)
- Implementation files (IMPLEMENTATION_*)
- Deployment files (DEPLOYMENT_*) unless user asks
- Any *.txt files unless user asks

### ✅ Always allowed (no permission needed):
- Source code files (.ts, .tsx, .js, .jsx, .css)
- Configuration files (.json, .yaml, .toml)
- Updates to existing essential MD files (with user awareness)

## Communication Rules

- Respond in chat, not in files
- Use chat formatting (headers, bullets, code blocks)
- Save files only for actual project deliverables
- Ask before creating any new documentation file
