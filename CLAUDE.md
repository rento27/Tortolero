# CLAUDE.md - AI Assistant Guide for Tortolero

**Last Updated:** 2026-08-11
**Repository:** rento27/Tortolero
**Status:** 📚 Documentación RESCOLDO en `docs/`

---

## 📋 Table of Contents

1. [Repository Overview](#repository-overview)
2. [Current State](#current-state)
3. [Development Workflow](#development-workflow)
4. [Git Conventions](#git-conventions)
5. [Code Standards & Best Practices](#code-standards--best-practices)
6. [AI Assistant Guidelines](#ai-assistant-guidelines)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Repository Overview

### Project Name
**Tortolero**

### Current Status
This repository alberga la **consolidación documental de RESCOLDO** (proyecto de marca,
storytelling, web de reservas y experiencia espacial de RT STUDIO LAB). La documentación
vive en [`docs/`](./docs/README.md). Las piezas de producción (videos, audios, Keynote,
renders) y los archivos maestros crudos viven en el respaldo del SSD, fuera de este repo.

### Purpose
Servir como canon documental navegable de RESCOLDO: diagnóstico integral, bitácora de
decisiones y lista priorizada de pendientes. Ver `docs/README.md`.

### Technology Stack
_To be defined - will be updated when project structure is established_

---

## 📁 Current State

### Repository Structure
```
Tortolero/
├── .git/              # Git repository metadata
├── CLAUDE.md          # This file - AI assistant documentation
└── docs/              # Canon documental de RESCOLDO
    ├── README.md                                   # Índice + principio de gobernanza
    ├── RESCOLDO_diagnostico_integral_2026-08-11.md # Diagnóstico integral (A–J)
    ├── DECISIONES.md                               # Bitácora de decisiones
    └── PENDIENTES.md                               # Pendientes priorizados
```

### What's Missing (To Be Added)
- [ ] Project configuration files (package.json, requirements.txt, etc.)
- [ ] Source code directories
- [ ] README.md with user-facing documentation
- [ ] .gitignore file
- [ ] CI/CD configuration
- [ ] Testing framework setup
- [ ] Build/deployment scripts
- [ ] Contributing guidelines

---

## 🔄 Development Workflow

### Branch Strategy

**Main Development Branch:** `claude/add-claude-documentation-FGNOo`

#### Branch Naming Convention
- Feature branches: `claude/<feature-description>-<session-id>`
- All Claude AI work should be done on branches starting with `claude/`
- Branch names must end with the matching session ID for successful pushes

#### Git Operations Best Practices

**Pushing Changes:**
```bash
git push -u origin <branch-name>
```
- ⚠️ **CRITICAL:** Branch must start with 'claude/' and end with session ID
- If push fails due to network errors, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

**Fetching/Pulling:**
```bash
git fetch origin <branch-name>
git pull origin <branch-name>
```
- Prefer fetching specific branches
- Apply same retry logic for network failures

### Commit Message Guidelines

**Format:**
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `style`: Code style/formatting changes

**Example:**
```
feat: add user authentication module

Implement JWT-based authentication with refresh tokens.
Includes login, logout, and token validation endpoints.
```

---

## 🔧 Git Conventions

### Commit Safety Protocol

**NEVER:**
- Update git config without explicit user permission
- Run destructive/irreversible commands (force push, hard reset) without explicit request
- Skip hooks (--no-verify, --no-gpg-sign) unless explicitly requested
- Force push to main/master branches
- Commit files that likely contain secrets (.env, credentials.json, etc.)
- Use `git commit --amend` unless ALL conditions are met:
  1. User explicitly requested amend, OR commit succeeded but pre-commit hook auto-modified files
  2. HEAD commit was created by AI in this conversation
  3. Commit has NOT been pushed to remote

**ALWAYS:**
- Create new commits instead of amending when in doubt
- Verify git status before committing
- Review git diff to understand changes
- Check git log to follow repository's commit message style
- Add only relevant files to staging area

### Pull Request Process

**When Creating PRs:**
1. Review full commit history from branch divergence: `git diff [base-branch]...HEAD`
2. Check all commits (not just the latest!)
3. Ensure branch is up to date with remote
4. Create PR with this format:

```bash
gh pr create --title "Brief descriptive title" --body "$(cat <<'EOF'
## Summary
- Key change 1
- Key change 2
- Key change 3

## Test Plan
- [ ] Test case 1
- [ ] Test case 2
- [ ] Test case 3
EOF
)"
```

---

## 📐 Code Standards & Best Practices

### General Principles

1. **Avoid Over-Engineering**
   - Make only requested or clearly necessary changes
   - Keep solutions simple and focused
   - Don't add features beyond what was asked
   - Don't add comments/docstrings to unchanged code

2. **Minimize Abstractions**
   - Don't create helpers/utilities for one-time operations
   - Three similar lines > premature abstraction
   - Don't design for hypothetical future requirements

3. **Security First**
   - Watch for: Command injection, XSS, SQL injection, OWASP Top 10
   - Immediately fix any insecure code discovered
   - Validate only at system boundaries (user input, external APIs)
   - Trust internal code and framework guarantees

4. **No Backwards-Compatibility Hacks**
   - Don't rename unused vars to `_var`
   - Don't re-export removed types
   - Don't add `// removed` comments
   - If unused, delete completely

### File Operations

**Prefer Specialized Tools:**
- ✅ Use `Read` tool for reading files (not `cat/head/tail`)
- ✅ Use `Edit` tool for editing files (not `sed/awk`)
- ✅ Use `Write` tool for creating files (not `echo >/cat <<EOF`)
- ✅ Use `Glob` for finding files (not `find/ls`)
- ✅ Use `Grep` for searching content (not `grep/rg`)

**NEVER:**
- Create files unless absolutely necessary
- Use bash commands for file operations when specialized tools exist
- Make changes to code you haven't read first

---

## 🤖 AI Assistant Guidelines

### Required Actions

**Before Making Changes:**
1. **READ** the file first - NEVER propose changes to unread code
2. **UNDERSTAND** existing code before suggesting modifications
3. **USE** TodoWrite tool to plan multi-step tasks
4. **ASK** questions using AskUserQuestion when uncertain

**During Development:**
1. **TRACK** progress with TodoWrite tool
2. **MARK** todos as in_progress when starting
3. **COMPLETE** todos immediately after finishing (don't batch)
4. **UPDATE** todo list if new tasks are discovered

**When Committing:**
1. **RUN** git status to see untracked files
2. **RUN** git diff to see all changes
3. **REVIEW** git log for commit message style
4. **DRAFT** concise commit message focusing on "why" not "what"
5. **ADD** relevant files to staging area
6. **COMMIT** with proper message format
7. **VERIFY** with git status after commit

### Tool Usage Priority

**For Code Exploration:**
- Use `Task` tool with `subagent_type=Explore` for broad codebase questions
- Use `Glob` for specific file/class/function queries
- Use `Grep` for searching within specific files

**For Planning:**
- Use `Task` tool with `subagent_type=Plan` for complex implementations
- Use `TodoWrite` for tracking execution

**Parallel Execution:**
- Run independent tool calls in parallel when possible
- Never use placeholders or guess parameters
- Run dependent operations sequentially

### Communication Style

- ❌ No emojis unless explicitly requested
- ❌ No over-the-top validation ("You're absolutely right!")
- ❌ No time estimates or timelines
- ✅ Be concise and factual
- ✅ Prioritize technical accuracy over validation
- ✅ Focus on what needs to be done, not when
- ✅ Disagree respectfully when necessary

### Code References

When referencing code, use format: `file_path:line_number`

**Example:**
> "The authentication is handled in `src/auth/login.ts:45`"

---

## 📝 Common Tasks

### Initializing Project Structure

_To be added when project type is determined_

### Running Tests

_To be added when testing framework is set up_

### Building the Project

_To be added when build configuration is established_

### Deploying

_To be added when deployment process is defined_

---

## 🔍 Troubleshooting

### Git Push Fails with 403

**Cause:** Branch name doesn't start with 'claude/' or doesn't end with session ID

**Solution:**
```bash
# Check current branch name
git branch --show-current

# Rename branch if needed
git branch -m claude/<description>-<session-id>

# Push with correct branch name
git push -u origin claude/<description>-<session-id>
```

### Network Errors During Git Operations

**Solution:** Implement exponential backoff retry:
- Wait 2s, retry
- Wait 4s, retry
- Wait 8s, retry
- Wait 16s, retry
- Max 4 retries total

### Empty Repository

**Current Status:** This repository is intentionally empty and awaiting initial project setup.

**Next Steps:**
1. Determine project type and technology stack
2. Initialize project structure
3. Add configuration files
4. Create source code directories
5. Update this CLAUDE.md with specific project details

---

## 🔄 Updating This Document

This document should be updated whenever:
- Project structure changes significantly
- New development workflows are established
- New conventions are adopted
- New tools or frameworks are added
- Common issues and solutions are discovered

**Update Process:**
1. Read current CLAUDE.md
2. Make necessary edits preserving structure
3. Update "Last Updated" date at top
4. Commit with message: `docs: update CLAUDE.md - <brief description of changes>`

---

## 📚 Additional Resources

### External Documentation
_To be added as project develops_

### Related Repositories
_To be added if applicable_

### Contact Information
**Repository Owner:** rento27

---

**Note for AI Assistants:** This is a living document. When you work on this repository, update this file to reflect the current state and any new conventions you discover or establish. Your updates help future AI assistants (and human developers) work more effectively.
