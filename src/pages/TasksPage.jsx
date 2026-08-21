import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import TaskTable from '../components/Tasks/TaskTable';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';

export default function TasksPage() {
  const { projects, tasks, addTask, updateTask, updateTaskStatus, removeTask } = useData();

  const [filters, setFilters] = useState({ search: '', projectId: '', priority: '', status: '' });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Apply the current filters + search to the task list.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.projectId && task.projectId !== Number(filters.projectId)) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!task.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [tasks, filters]);

  async function handleSaveTask(data) {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
        setSuccess('Task updated successfully.');
      } else {
        await addTask(data);
        setSuccess('Task created successfully.');
      }
      setFormOpen(false);
      setEditingTask(null);
    } catch {
      setError('Task could not be saved. Please try again.');
    }
  }

  async function handleStatusChange(taskId, status) {
    try {
      await updateTaskStatus(taskId, status);
      setSuccess('Task updated successfully.');
    } catch {
      setError('Task status could not be updated.');
    }
  }

  async function handleDeleteTask() {
    if (!deletingTask) return;
    try {
      await removeTask(deletingTask.id);
      setSuccess('Task deleted successfully.');
    } catch {
      setError('Task could not be deleted.');
    } finally {
      setDeletingTask(null);
    }
  }

  return (
    <div>
      <div className="section-header">
        <h2>Tasks</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { setEditingTask(null); setFormOpen(true); }}
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {success ? <SuccessMessage message={success} onDismiss={() => setSuccess('')} /> : null}
      {error ? <ErrorMessage message={error} onDismiss={() => setError('')} /> : null}

      <div className="card">
        <TaskFilters projects={projects} filters={filters} onChange={setFilters} />
        <TaskTable
          tasks={filteredTasks}
          projects={projects}
          onStatusChange={handleStatusChange}
          onEdit={(task) => { setEditingTask(task); setFormOpen(true); }}
          onDelete={setDeletingTask}
        />
      </div>

      <TaskForm
        open={formOpen}
        initialTask={editingTask}
        projects={projects}
        onSave={handleSaveTask}
        onCancel={() => { setFormOpen(false); setEditingTask(null); }}
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
