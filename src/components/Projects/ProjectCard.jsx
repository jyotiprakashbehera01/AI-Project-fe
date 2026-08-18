import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';

// A single project displayed as a card on the Projects page.
export default function ProjectCard({ project, taskCount, completedCount, onEdit, onDelete }) {
  const pct = taskCount === 0 ? 0 : Math.round((completedCount / taskCount) * 100);

  return (
    <article className="project-card">
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="tech-stack">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-chip">{tech}</span>
        ))}
      </div>

      <div className="progress-row">
        <span className="muted">Progress</span>
        <span className="muted">{completedCount}/{taskCount} tasks · {pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="project-meta">
        <span>ID: {project.id}</span>
        <span>Created: {project.createdAt}</span>
      </div>

      <div className="card-footer-actions">
        <Link to={`/projects/${project.id}`} className="btn btn-secondary btn-sm">
          <Eye size={15} /> View
        </Link>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onEdit(project)}>
          <Pencil size={15} /> Edit
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(project)}>
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </article>
  );
}
