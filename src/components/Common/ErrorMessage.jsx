import { AlertCircle } from 'lucide-react';

// Reusable error banner. Shows a friendly message that can be understood
// by non-technical users when backend calls fail.
export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="alert alert-error" role="alert">
      <AlertCircle size={18} className="alert-icon" aria-hidden="true" />
      <span style={{ flex: 1 }}>{message}</span>
      {onDismiss ? (
        <button
          type="button"
          className="btn-icon"
          aria-label="Dismiss error"
          onClick={onDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
