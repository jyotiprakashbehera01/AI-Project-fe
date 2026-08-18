import { Link } from 'react-router-dom';
import { StatusBadge, PriorityBadge } from '../Common/Badge';
import EmptyState from '../Common/EmptyState';
import { ClipboardList } from 'lucide-react';

// Recent tasks table shown on the dashboard.
export default function RecentTasks({ tasks, projects }) {
  const projectName = (id) =>
    projects.find((p) => p.id === id)?.name ?? 'Unknown';

  // Show the 6 most recently updated tasks.
  const recent = [...tasks]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);

  if (recent.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No tasks yet"
        message="Tasks you create will appear here."
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Project</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((task) => (
            <tr key={task.id}>
              <td>
                <Link to={`/projects/${task.projectId}`}>{task.title}</Link>
              </td>
              <td>{projectName(task.projectId)}</td>
              <td><PriorityBadge priority={task.priority} /></td>
              <td><StatusBadge status={task.status} /></td>
              <td>{task.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
