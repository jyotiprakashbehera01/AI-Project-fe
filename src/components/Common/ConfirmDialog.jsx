import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

// Confirmation dialog used before destructive actions like delete.
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <div className="modal-body">
        <div className="alert alert-error" style={{ marginBottom: 0 }}>
          <AlertTriangle size={20} className="alert-icon" aria-hidden="true" />
          <span>{message}</span>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={danger ? 'btn btn-danger' : 'btn btn-primary'}
          onClick={onConfirm}
          autoFocus
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
