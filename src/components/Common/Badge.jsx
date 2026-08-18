// Maps a status or priority value to a coloured badge.
const statusClass = {
  Pending: 'badge-pending',
  'In Progress': 'badge-in-progress',
  Completed: 'badge-completed',
};

const priorityClass = {
  Low: 'badge-low',
  Medium: 'badge-medium',
  High: 'badge-high',
};

export function StatusBadge({ status }) {
  return <span className={`badge ${statusClass[status] || 'badge-pending'}`}>{status}</span>;
}

export function PriorityBadge({ priority }) {
  return <span className={`badge ${priorityClass[priority] || 'badge-low'}`}>{priority}</span>;
}

export function AIBadge({ label = 'AI' }) {
  return <span className="badge badge-ai">{label}</span>;
}
