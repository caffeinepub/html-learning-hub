# HTML Learning Hub

## Current State
New project. Empty backend and frontend scaffolding only.

## Requested Changes (Diff)

### Add
- Full HTML learning platform with structured lessons from beginner to advanced
- Sidebar with lesson navigation grouped by difficulty (Beginner, Intermediate, Advanced)
- Lesson content area with text explanations and code examples
- Interactive code editor with live preview (HTML/CSS/JS)
- Progress tracking (localStorage-based, no auth needed)
- Search through lessons

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend
- Simple backend with lessons stored as stable data: title, slug, difficulty, content, code example
- Queries: getLessons, getLesson(slug), searchLessons
- No auth required; progress tracked client-side

### Frontend
- Header: brand logo, nav links (Dashboard, Lessons), search, progress ring, user initials
- Left sidebar: lesson list grouped by Beginner/Intermediate/Advanced with active state
- Main panel: lesson title, prev/next buttons, lesson content (markdown-style), code editor + live preview
- Code editor: textarea with syntax highlight feel, live preview iframe
- Progress stored in localStorage
- Teal accent color (#2FB5A8), dark navy code editor, clean card-based layout
