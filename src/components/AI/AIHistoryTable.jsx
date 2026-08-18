import { Eye, Trash2 } from 'lucide-react';
import EmptyState from '../Common/EmptyState';
import Modal from '../Common/Modal';
import AIResponseView from './AIResponseView';
import { History } from 'lucide-react';
import { useState } from 'react';

// AI history table + modal to view the complete structured response.
export default function AIHistoryTable({ history, onDelete }) {
  const [viewing, setViewing] = useState(null);

  if (history.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No AI interactions yet"
        message="Ask the AI Mentor to break down a requirement and it will appear here."
      />
    );
  }

  return (
    <>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Prompt</th>
              <th>Response Preview</th>
              <th>Task Type</th>
              <th>Model</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.projectName}</td>
                <td style={{ maxWidth: 200 }}>
                  <div className="text-sm" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {entry.userPrompt}
                  </div>
                </td>
                <td style={{ maxWidth: 260 }}>
                  <div className="text-sm muted" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {entry.responsePreview}
                  </div>
                </td>
                <td><span className="badge badge-ai">{entry.taskType}</span></td>
                <td>{entry.modelName}</td>
                <td>{entry.createdAt}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn-icon" aria-label="View complete response" onClick={() => setViewing(entry)}>
                      <Eye size={16} />
                    </button>
                    <button className="btn-icon danger" aria-label="Delete history entry" onClick={() => onDelete(entry)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title={viewing ? `AI Response · ${viewing.projectName}` : ''}
        size="lg"
      >
        <div className="modal-body">
          {viewing ? (
            <>
              <p className="muted text-sm" style={{ marginBottom: 12 }}>
                <strong>Task type:</strong> {viewing.taskType} · <strong>Model:</strong> {viewing.modelName}
              </p>
              <p style={{ marginBottom: 16 }}><strong>Your prompt:</strong> {viewing.userPrompt}</p>
              <AIResponseView response={viewing.fullResponse} />
            </>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
