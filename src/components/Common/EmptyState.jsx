import { Inbox } from 'lucide-react';

// Shown when a list has no items to display.
export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', message, action }) {
  return (
    <div className="empty-state">
      <Icon size={48} className="empty-icon" aria-hidden="true" />
      <h3>{title}</h3>
      {message ? <p className="muted">{message}</p> : null}
      {action ? <div style={{ marginTop: 8 }}>{action}</div> : null}
    </div>
  );
}
