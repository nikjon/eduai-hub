---
name: eduai-frontend
description: 'Build and refine the EduAI Hub React frontend. Use for pages, components, responsive layouts, navigation, styling, accessibility, and visual polish in client/src.'
argument-hint: '[describe the frontend change]'
---

# EduAI Frontend

Use this checklist for focused frontend work in EduAI Hub.

## Workflow

1. Identify the owning page or component in `client/src/` and inspect its nearby styles, route, and shared components before editing.
2. Confirm the user flow: entry route, authentication requirement, data/API dependencies, loading state, empty state, error state, and success state.
3. Reuse the existing React Router structure, AuthContext, API helpers, Lucide icons, and Framer Motion patterns when they fit. Keep new abstractions small.
4. Implement the smallest complete change. Keep responsive behavior explicit for narrow and wide screens, preserve keyboard access, use semantic elements, and provide labels or tooltips for unfamiliar icon controls.
5. Keep visual decisions coherent with the surrounding product. Avoid unrelated redesigns, duplicated layout logic, and placeholder content that hides missing behavior.
6. Run a focused check first: `npm run lint --prefix client`, then `npm run build --prefix client` when the change affects compilation, routing, or shared styles.
7. Review the changed flow at its route and verify no unrelated files were modified. Report any unverified browser-only behavior or pre-existing failures.

## Completion Checks

- The requested route or interaction works for its expected auth state.
- Loading, empty, error, and success states are handled when applicable.
- Layout remains usable on mobile and desktop without overlap or clipped text.
- Interactive elements are keyboard reachable and have accessible names.
- Focused linting passes, and the client build passes when applicable.
- The final summary names changed files and validation performed.
