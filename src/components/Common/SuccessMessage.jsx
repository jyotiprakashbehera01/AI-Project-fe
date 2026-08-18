import { CheckCircle } from 'lucide-react';

// Reusable success banner for confirmations like "Project created successfully."
export default function SuccessMessage({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="alert alert-success" role="status">
      <CheckCircle size={18} className="alert-icon" aria-hidden="true" />
      <span style={{ flex: 1 }}>{message}</span>
      {onDismiss ? (
        <button
          type="button"
          className="btn-icon"
          aria-label="Dismiss message"
          onClick={onDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
