import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
} from '../data/mockData';

// DataContext is the central local-state store used while VITE_USE_MOCK_DATA=true.
// All CRUD operations update this in-memory state. When the FastAPI backend is
// connected, pages will switch to calling the functions in services/api.js and
// this context can be removed or repurposed as a cache.

const DataContext = createContext(null);

// Generate a simple incremental id for new records.
function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

// Today's date as YYYY-MM-DD for new records.
function today() {
  return new Date().toISOString().slice(0, 10);
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects);
  const [tasks, setTasks] = useState(mockTasks);
  const [aiHistory, setAiHistory] = useState(mockAIHistory);

  // ---- Project CRUD ----
  const addProject = useCallback((data) => {
    const newProject = {
      id: nextId(projects),
      ...data,
      createdAt: today(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, [projects]);

  const updateProject = useCallback((id, data) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
    );
  }, []);

  const removeProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // Also remove tasks that belonged to the deleted project.
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
  }, []);

  // ---- Task CRUD ----
  const addTask = useCallback((data) => {
    const newTask = {
      id: nextId(tasks),
      ...data,
      createdAt: today(),
      updatedAt: today(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, [tasks]);

  const updateTask = useCallback((id, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: today() } : t,
      ),
    );
  }, []);

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updatedAt: today() } : t,
      ),
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ---- AI history ----
  const addAIHistory = useCallback((entry) => {
    const newEntry = {
      id: nextId(aiHistory),
      createdAt: today(),
      ...entry,
    };
    setAiHistory((prev) => [newEntry, ...prev]);
    return newEntry;
  }, [aiHistory]);

  const removeAIHistory = useCallback((id) => {
    setAiHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  // Derived helpers
  const getProjectById = useCallback(
    (id) => projects.find((p) => p.id === Number(id)),
    [projects],
  );

  const tasksByProject = useCallback(
    (projectId) => tasks.filter((t) => t.projectId === Number(projectId)),
    [tasks],
  );

  const value = useMemo(
    () => ({
      projects,
      tasks,
      aiHistory,
      addProject,
      updateProject,
      removeProject,
      addTask,
      updateTask,
      updateTaskStatus,
      removeTask,
      addAIHistory,
      removeAIHistory,
      getProjectById,
      tasksByProject,
    }),
    [
      projects,
      tasks,
      aiHistory,
      addProject,
      updateProject,
      removeProject,
      addTask,
      updateTask,
      updateTaskStatus,
      removeTask,
      addAIHistory,
      removeAIHistory,
      getProjectById,
      tasksByProject,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Convenience hook so components don't import the context object directly.
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
}
