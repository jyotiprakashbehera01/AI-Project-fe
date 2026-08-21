import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectForm from '../components/Projects/ProjectForm';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import EmptyState from '../components/Common/EmptyState';
import { FolderKanban } from 'lucide-react';
import { getApiErrorMessage } from '../services/api';

export default function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, removeProject } = useData();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(project) {
    setEditing(project);
    setFormOpen(true);
  }

  async function handleSave(data) {
    try {
      if (editing) {
        await updateProject(editing.id, data);
        setSuccess('Project updated successfully.');
      } else {
        await addProject(data);
        setSuccess('Project created successfully.');
      }
      setFormOpen(false);
      setEditing(null);
    } catch (saveError) {
      setError(getApiErrorMessage(saveError, 'Project could not be saved.'));
    }
  }

  function handleDelete() {
    if (!deleting) return;
    try {
      removeProject(deleting.id);
      setSuccess('Project deleted successfully.');
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError, 'Project could not be deleted.'));
    } finally {
      setDeleting(null);
    }
  }

  function taskStats(projectId) {
    const list = tasks.filter((t) => t.projectId === projectId);
    return {
      total: list.length,
      completed: list.filter((t) => t.status === 'Completed').length,
    };
  }

  return (
    <div>
      <div className="section-header">
        <h2>Projects</h2>
        <div className="page-actions">
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            <Plus size={16} /> Create Project
          </button>
        </div>
      </div>

      {success ? <SuccessMessage message={success} onDismiss={() => setSuccess('')} /> : null}
      {error ? <ErrorMessage message={error} onDismiss={() => setError('')} /> : null}

      {projects.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            message="Create your first project to start adding tasks."
            action={
              <button type="button" className="btn btn-primary" onClick={openCreate}>
                <Plus size={16} /> Create Project
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid-3">
          {projects.map((project) => {
            const stats = taskStats(project.id);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                taskCount={stats.total}
                completedCount={stats.completed}
                onEdit={openEdit}
                onDelete={setDeleting}
              />
            );
          })}
        </div>
      )}

      <ProjectForm
        open={formOpen}
        initialProject={editing}
        onSave={handleSave}
        onCancel={() => {
          setFormOpen(false);
          setEditing(null);
        }}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete Project"
        message={`Delete "${deleting?.name}"? This will also remove all tasks belonging to this project.`}
        confirmLabel="Delete Project"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
