# Todo APP

Similar to the previously developed TodoApp, this was created to enhance my programming skills by working with TypeScript and Tailwind CSS.

## Description

An application where users can track and manage their tasks, with the option of adding the category to each one, as well as filtering them by date, category, or status. It supports basic _CRUD_ operations.

## Used Technologies

- React
- React Hooks Form
- React Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- Zod

## Steps for initialization

1. Download/Clone the project
2. Run `npm install` to download all dependencies
3. Run `npm run dev` to open the project

## Project Folder Structure

```
todo-app
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ app.router.tsx
│  ├─ assets
│  ├─ components
│  │  └─ ui
│  │     ├─ badge.tsx
│  │     ├─ button-group.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ empty.tsx
│  │     ├─ input.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ tabs.tsx
│  │     └─ textarea.tsx
│  ├─ data
│  │  └─ mockupData.ts
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  └─ TodoPage.tsx
│  ├─ todo
│  │  ├─ components
│  │  │  ├─ Header.tsx
│  │  │  ├─ Layout.tsx
│  │  │  ├─ TodoForm.tsx
│  │  │  ├─ TodoItem.tsx
│  │  │  └─ TodoList.tsx
│  │  ├─ hooks
│  │  │  └─ useTodo.ts
│  │  └─ types
│  │     └─ todo-types.ts
│  ├─ TodoApp.tsx
│  └─ utils
│     └─ date-util.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
