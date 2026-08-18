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
  return response.data;
}

export async function getProjectById(projectId) {
  const response = await apiClient.get(`/api/projects/${projectId}`);
  return response.data;
}

export async function createProject(projectData) {
  const response = await apiClient.post('/api/projects', projectData);
  return response.data;
}

export async function updateProject(projectId, projectData) {
  const response = await apiClient.put(`/api/projects/${projectId}`, projectData);
  return response.data;
}

export async function deleteProject(projectId) {
  const response = await apiClient.delete(`/api/projects/${projectId}`);
  return response.data;
}

// ---- Tasks ----
export async function getTasks() {
  const response = await apiClient.get('/api/tasks');
  return response.data;
}

export async function createTask(taskData) {
  const response = await apiClient.post('/api/tasks', taskData);
  return response.data;
}

export async function updateTask(taskId, taskData) {
  const response = await apiClient.put(`/api/tasks/${taskId}`, taskData);
  return response.data;
}

export async function updateTaskStatus(taskId, status) {
  const response = await apiClient.patch(`/api/tasks/${taskId}/status`, { status });
  return response.data;
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
