# AI Project Mentor

AI Project Mentor is a beginner-friendly full-stack training application where users can manage software projects, track development tasks, view a dashboard of progress, and ask an AI mentor to break requirements into development tasks.

## Application objective

- Create and manage software projects.
- Add and update development tasks with priorities and statuses.
- View project progress through a dashboard.
- Ask an AI mentor to break requirements into tasks.
- View previous AI interactions.

This repository currently contains only the frontend. It runs entirely on local React state with realistic mock data and is prepared for a future Python backend.

## Technology stack (frontend)

- HTML5
- CSS3
- JavaScript ES6+
- React.js (functional components + hooks)
- React Router DOM
- Axios (prepared for future API calls)
- Vite (build tool)

No TypeScript. No Next.js. No Supabase.

## Current frontend features

- Responsive sidebar + collapsible mobile navigation.
- Dashboard with summary cards, project progress bars, recent tasks and AI recommendations.
- Projects page with create, edit, view and delete (with confirmation dialogs).
- Project details page with task list.
- Tasks page with filters, search, status/priority badges and full CRUD.
- AI Mentor page that generates a structured mock recommendation.
- AI History page with filters and view/delete actions.
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge.
- Form validation with inline error messages.
- Mock data isolated in `src/data/mockData.js`.

## Planned backend technologies

- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API using a GPT-OSS model

AI API keys and database credentials will live only in the Python backend — never in this frontend.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```

## Folder structure

```
src/
  components/
    Layout/        Sidebar, Header, AppLayout
    Dashboard/     StatCard, ProjectProgress, RecentTasks, AIRecommendation
    Projects/      ProjectCard, ProjectForm
    Tasks/         TaskTable, TaskForm, TaskFilters, StatusDropdown
    AI/            AIResponseView, AIHistoryTable, AIHistoryFilters
    Common/        LoadingSpinner, ErrorMessage, SuccessMessage,
                   EmptyState, ConfirmDialog, Modal, Badge, FormField
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  services/
    api.js         Axios instance + reusable API functions (mock-aware)
  data/
    mockData.js    Projects, tasks and AI interactions used by the UI
  context/
    DataContext.jsx  Central local-state store for mock CRUD operations
  styles/
    global.css     Theme, layout, components and responsive rules
  App.jsx          Router + routes
  main.jsx         React entry point
```

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_USE_MOCK_DATA=true
```

- `VITE_API_BASE_URL` — base URL of the future FastAPI backend.
- `VITE_USE_MOCK_DATA` — when `true`, the app uses local mock data. Set to `false` once the backend is connected.

This frontend intentionally never holds the Ollama API key, database username, database password or SQL Server connection string. Those belong only in the Python backend.

## Future FastAPI integration plan

The frontend is prepared to call these endpoints (not yet implemented):

```
GET    /api/health
GET    /api/dashboard
GET    /api/projects
POST   /api/projects
GET    /api/projects/{project_id}
PUT    /api/projects/{project_id}
DELETE /api/projects/{project_id}
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{task_id}
PUT    /api/tasks/{task_id}
PATCH  /api/tasks/{task_id}/status
DELETE /api/tasks/{task_id}
POST   /api/ai/plan
POST   /api/ai/next-task
GET    /api/ai/history/{project_id}
```

To switch from mock data to the real backend:

1. Start the FastAPI server at `VITE_API_BASE_URL`.
2. Set `VITE_USE_MOCK_DATA=false` in `.env`.
3. The reusable functions in `src/services/api.js` will be used by the pages instead of local mock state.

## Notes for students

- All data currently lives in React state initialized from `src/data/mockData.js`.
- CRUD operations (create/edit/delete) update local state only until the backend is connected.
- The AI Mentor page returns a structured mock response and never calls Ollama directly.
