import { Pencil, Trash2 } from 'lucide-react';
import { PriorityBadge, AIBadge } from '../Common/Badge';
import StatusDropdown from './StatusDropdown';
import EmptyState from '../Common/EmptyState';
import { ListTodo } from 'lucide-react';

// Tasks table with inline status change and edit/delete actions.
export default function TaskTable({
  tasks,
  projects,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const projectName = (id) => projects.find((p) => p.id === id)?.name ?? 'Unknown';

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks found"
        message="Try adjusting your filters or add a new task."
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Project</th>
            <th>Priority</th>
            <th>Status</th>
            <th>AI</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                <strong>{task.title}</strong>
                <div className="muted text-sm">{task.description}</div>
              </td>
              <td>{projectName(task.projectId)}</td>
              <td><PriorityBadge priority={task.priority} /></td>
              <td>
                <StatusDropdown
                  value={task.status}
                  onChange={(status) => onStatusChange(task.id, status)}
                />
              </td>
              <td>{task.aiGenerated ? <AIBadge /> : '—'}</td>
              <td>{task.createdAt}</td>
              <td>{task.updatedAt}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-icon" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
                    <Pencil size={16} />
                  </button>
                  <button className="btn-icon danger" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
