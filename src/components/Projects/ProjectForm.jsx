import { useState } from 'react';
import Modal from '../Common/Modal';
import FormField from '../Common/FormField';

// Convert a comma-separated string into a tech stack array and back.
function stackToArray(value) {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
function arrayToStack(arr) {
  return Array.isArray(arr) ? arr.join(', ') : '';
}

// Create / Edit project form, rendered inside a modal.
// `initialProject` is null when creating.
export default function ProjectForm({ open, initialProject, onSave, onCancel }) {
  const isEdit = Boolean(initialProject);
  const [name, setName] = useState(initialProject?.name ?? '');
  const [description, setDescription] = useState(initialProject?.description ?? '');
  const [techStack, setTechStack] = useState(arrayToStack(initialProject?.techStack));
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!name.trim()) next.name = 'Project name is required.';
    if (!description.trim()) next.description = 'Description is required.';
    if (!techStack.trim()) next.techStack = 'Technology stack is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      techStack: stackToArray(techStack),
    });
  }

  return (
    <Modal open={open} onClose={onCancel} title={isEdit ? 'Edit Project' : 'Create Project'}>
      <form className="modal-body" onSubmit={handleSubmit} noValidate>
        <FormField label="Project Name" htmlFor="project-name" required error={errors.name}>
          <input
            id="project-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </FormField>

        <FormField label="Project Description" htmlFor="project-description" required error={errors.description}>
          <textarea
            id="project-description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <FormField
          label="Technology Stack (comma separated)"
          htmlFor="project-stack"
          required
          error={errors.techStack}
        >
          <input
            id="project-stack"
            className="form-input"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, FastAPI, SQL Server"
          />
        </FormField>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Save Changes' : 'Save Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
