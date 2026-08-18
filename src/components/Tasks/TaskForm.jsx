import { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import FormField from '../Common/FormField';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Pending', 'In Progress', 'Completed'];

// Create / Edit task form, rendered inside a modal.
// `fixedProjectId` locks the project selector (used on the project details page).
export default function TaskForm({
  open,
  initialTask,
  projects,
  fixedProjectId,
  onSave,
  onCancel,
}) {
  const isEdit = Boolean(initialTask);

  const [projectId, setProjectId] = useState(
    initialTask?.projectId ?? fixedProjectId ?? projects?.[0]?.id ?? '',
  );
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [priority, setPriority] = useState(initialTask?.priority ?? 'Medium');
  const [status, setStatus] = useState(initialTask?.status ?? 'Pending');
  const [aiGenerated, setAiGenerated] = useState(initialTask?.aiGenerated ?? false);
  const [errors, setErrors] = useState({});

  // Reset fields whenever the form is opened for a different task.
  useEffect(() => {
    if (!open) return;
    setProjectId(initialTask?.projectId ?? fixedProjectId ?? projects?.[0]?.id ?? '');
    setTitle(initialTask?.title ?? '');
    setDescription(initialTask?.description ?? '');
    setPriority(initialTask?.priority ?? 'Medium');
    setStatus(initialTask?.status ?? 'Pending');
    setAiGenerated(initialTask?.aiGenerated ?? false);
    setErrors({});
  }, [open, initialTask, fixedProjectId, projects]);

  function validate() {
    const next = {};
    if (!projectId) next.projectId = 'Please select a project.';
    if (!title.trim()) next.title = 'Task title is required.';
    if (!description.trim()) next.description = 'Task description is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      projectId: Number(projectId),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      aiGenerated,
    });
  }

  return (
    <Modal open={open} onClose={onCancel} title={isEdit ? 'Edit Task' : 'Add Task'}>
      <form className="modal-body" onSubmit={handleSubmit} noValidate>
        <FormField label="Select Project" htmlFor="task-project" required error={errors.projectId}>
          <select
            id="task-project"
            className="form-select"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            disabled={Boolean(fixedProjectId)}
          >
            <option value="">— Select a project —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Task Title" htmlFor="task-title" required error={errors.title}>
          <input
            id="task-title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </FormField>

        <FormField label="Task Description" htmlFor="task-description" required error={errors.description}>
          <textarea
            id="task-description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Priority" htmlFor="task-priority">
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Status" htmlFor="task-status">
            <select
              id="task-status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="form-group">
          <label className="form-checkbox" htmlFor="task-ai">
            <input
              id="task-ai"
              type="checkbox"
              checked={aiGenerated}
              onChange={(e) => setAiGenerated(e.target.checked)}
            />
            AI Generated task
          </label>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
