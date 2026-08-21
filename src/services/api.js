// Axios-based API service for AI Project Mentor.
//
// The frontend currently runs on mock data (VITE_USE_MOCK_DATA=true).
// When the FastAPI backend is ready, set VITE_USE_MOCK_DATA=false and the
// page components will switch to calling these functions.
//
// IMPORTANT: No AI API keys or database credentials ever live in this file.
// The Ollama/GPT-OSS key stays in the Python backend, which exposes only
// REST endpoints to this frontend.

import axios from 'axios';

// Read backend URL from the Vite environment, default to the local dev server.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Single shared axios instance — reused by every function below.
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Central switch for mock vs real mode. Pages can also read this directly.
export const useMockData =
  String(import.meta.env.VITE_USE_MOCK_DATA ?? 'true').toLowerCase() !== 'false';

export function getApiErrorMessage(error, fallback) {
  if (!error?.response) {
    return `${fallback} Backend is not reachable. Start the FastAPI server and try again.`;
  }

  const detail = error.response.data?.detail;
  return detail ? `${fallback} ${detail}` : `${fallback} Request failed (${error.response.status}).`;
}

function toProjectRequest(projectData) {
  return {
    project_name: projectData.name,
    description: projectData.description,
    technology_stack: Array.isArray(projectData.techStack)
      ? projectData.techStack.join(', ')
      : projectData.techStack,
  };
}

function toProject(projectData) {
  return {
    id: projectData.project_id,
    name: projectData.project_name,
    description: projectData.description,
    techStack: typeof projectData.technology_stack === 'string'
      ? projectData.technology_stack.split(',').map((item) => item.trim()).filter(Boolean)
      : [],
    createdAt: projectData.created_at,
  };
}

function toTaskRequest(taskData) {
  return {
    project_id: taskData.projectId,
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    status: taskData.status,
    ai_generated: taskData.aiGenerated ?? false,
  };
}

function toTask(taskData) {
  return {
    id: taskData.task_id,
    projectId: taskData.project_id,
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    status: taskData.status,
    aiGenerated: taskData.ai_generated,
    createdAt: taskData.created_at,
    updatedAt: taskData.updated_at,
  };
}

// ---- Health ----
export async function checkBackendHealth() {
  const response = await apiClient.get('/api/health');
  return response.data;
}

// ---- Dashboard ----
export async function getDashboardStatistics() {
  const response = await apiClient.get('/api/dashboard');
  return response.data;
}

// ---- Projects ----
export async function getProjects() {
  const response = await apiClient.get('/api/projects');
  return response.data.map(toProject);
}

export async function getProjectById(projectId) {
  const response = await apiClient.get(`/api/projects/${projectId}`);
  return toProject(response.data);
}

export async function createProject(projectData) {
  const response = await apiClient.post('/api/projects', toProjectRequest(projectData));
  return toProject(response.data);
}

export async function updateProject(projectId, projectData) {
  const response = await apiClient.put(`/api/projects/${projectId}`, toProjectRequest(projectData));
  return toProject(response.data);
}

export async function deleteProject(projectId) {
  const response = await apiClient.delete(`/api/projects/${projectId}`);
  return response.data;
}

// ---- Tasks ----
export async function getTasks() {
  const response = await apiClient.get('/api/tasks');
  return response.data.map(toTask);
}

export async function createTask(taskData) {
  const response = await apiClient.post('/api/tasks', toTaskRequest(taskData));
  return toTask(response.data);
}

export async function updateTask(taskId, taskData) {
  const response = await apiClient.put(`/api/tasks/${taskId}`, toTaskRequest(taskData));
  return toTask(response.data);
}

export async function updateTaskStatus(taskId, status) {
  const response = await apiClient.patch(`/api/tasks/${taskId}/status`, { status });
  return toTask(response.data);
}

export async function deleteTask(taskId) {
  const response = await apiClient.delete(`/api/tasks/${taskId}`);
  return response.data;
}

// ---- AI Mentor ----
export async function generateAIPlan(requestData) {
  // requestData: { projectId, prompt, taskType }
  // In production this calls POST /api/ai/plan on the FastAPI backend,
  // which holds the Ollama/GPT-OSS API key and calls the model server-side.
  const response = await apiClient.post('/api/ai/plan', requestData);
  return response.data;
}

export async function recommendNextTask(requestData) {
  const response = await apiClient.post('/api/ai/next-task', requestData);
  return response.data;
}

export async function getAIHistory(projectId) {
  const response = await apiClient.get(`/api/ai/history/${projectId}`);
  return response.data;
}

export default apiClient;
