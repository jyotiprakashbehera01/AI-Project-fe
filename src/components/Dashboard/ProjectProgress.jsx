// List of projects with progress bars, tech stack and task counts.
export default function ProjectProgress({ projects, tasks }) {
  function statsFor(projectId) {
    const list = tasks.filter((t) => t.projectId === projectId);
    const total = list.length;
    const completed = list.filter((t) => t.status === 'Completed').length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pct };
  }

  if (projects.length === 0) {
    return <p className="muted">No projects to show progress for.</p>;
  }

  return (
    <div className="stack">
      {projects.map((project) => {
        const { total, completed, pct } = statsFor(project.id);
        return (
          <div key={project.id}>
            <div className="progress-row">
              <strong>{project.name}</strong>
              <span className="muted">
                {completed}/{total} tasks · {pct}%
              </span>
            </div>
            <div className="progress-track" aria-label={`Progress for ${project.name}`}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="tech-stack" style={{ marginTop: 6 }}>
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
