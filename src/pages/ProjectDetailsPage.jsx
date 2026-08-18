import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Pencil, Sparkles, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatusBadge, PriorityBadge, AIBadge } from '../components/Common/Badge';
import EmptyState from '../components/Common/EmptyState';
import ProjectForm from '../components/Projects/ProjectForm';
import TaskForm from '../components/Tasks/TaskForm';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import { ListTodo } from 'lucide-react';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const {
    getProjectById,
    tasksByProject,
    updateProject,
    addTask,
    updateTask,
    removeTask,
  } = useData();

  const project = getProjectById(id);
  const projectTasks = tasksByProject(id);

  const [editOpen, setEditOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!project) {
    return (
      <div className="card">
        <ErrorMessage message="Project could not be found." />
        <Link to="/projects" className="btn btn-secondary" style={{ marginTop: 12 }}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const total = projectTasks.length;
  const completed = projectTasks.filter((t) => t.status === 'Completed').length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  function handleSaveTask(data) {
    try {
      if (editingTask) {
        updateTask(editingTask.id, data);
        setSuccess('Task updated successfully.');
      } else {
        addTask({ ...data, projectId: Number(id) });
        setSuccess('Task added successfully.');
      }
      setTaskFormOpen(false);
      setEditingTask(null);
    } catch {
      setError('Task could not be saved. Please try again.');
    }
  }

  function handleDeleteTask() {
    if (!deletingTask) return;
    try {
      removeTask(deletingTask.id);
      setSuccess('Task deleted successfully.');
    } catch {
      setError('Task could not be deleted. Please try again.');
    } finally {
      setDeletingTask(null);
    }
  }

  return (
    <div>
      <div className="flex-between mb-2 flex-wrap">
        <Link to="/projects" className="btn btn-secondary btn-sm">
          <ArrowLeft size={15} /> Return to Projects
        </Link>
        <div className="page-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setEditOpen(true)}>
            <Pencil size={15} /> Edit Project
          </button>
          <Link to="/ai-mentor" className="btn btn-secondary">
            <Sparkles size={15} /> Ask AI Mentor
          </Link>
        </div>
      </div>

      {success ? <SuccessMessage message={success} onDismiss={() => setSuccess('')} /> : null}
      {error ? <ErrorMessage message={error} onDismiss={() => setError('')} /> : null}

      <div className="card mb-2">
        <h2>{project.name}</h2>
        <p className="muted" style={{ marginBottom: 12 }}>{project.description}</p>

        <div className="tech-stack" style={{ marginBottom: 12 }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>

        <div className="project-meta" style={{ marginBottom: 12 }}>
          <span>Created: {project.createdAt}</span>
          <span>{total} tasks · {completed} completed</span>
        </div>

        <div className="progress-row">
          <span className="muted">Overall progress</span>
          <span className="muted">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <h2>Tasks</h2>
          <button type="button" className="btn btn-primary" onClick={() => { setEditingTask(null); setTaskFormOpen(true); }}>
            <Plus size={15} /> Add Task
          </button>
        </div>

        {projectTasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            message="Add a task to start tracking this project's work."
            action={
              <button type="button" className="btn btn-primary" onClick={() => { setEditingTask(null); setTaskFormOpen(true); }}>
                <Plus size={16} /> Add Task
              </button>
            }
          />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <strong>{task.title}</strong>
                      <div className="muted text-sm">{task.description}</div>
                    </td>
                    <td><PriorityBadge priority={task.priority} /></td>
                    <td><StatusBadge status={task.status} /></td>
                    <td>{task.aiGenerated ? <AIBadge /> : '—'}</td>
                    <td>{task.updatedAt}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" aria-label="Edit task" onClick={() => { setEditingTask(task); setTaskFormOpen(true); }}>
                          <Pencil size={16} />
                        </button>
                        <button className="btn-icon danger" aria-label="Delete task" onClick={() => setDeletingTask(task)}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProjectForm
        open={editOpen}
        initialProject={project}
        onSave={(data) => {
          updateProject(project.id, data);
          setEditOpen(false);
          setSuccess('Project updated successfully.');
        }}
        onCancel={() => setEditOpen(false)}
      />

      <TaskForm
        open={taskFormOpen}
        initialTask={editingTask}
        fixedProjectId={Number(id)}
        onSave={handleSaveTask}
        onCancel={() => { setTaskFormOpen(false); setEditingTask(null); }}
      />

      <ConfirmDialog
        open={Boolean(deletingTask)}
        title="Delete Task"
        message={`Delete "${deletingTask?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Task"
        onConfirm={handleDeleteTask}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
