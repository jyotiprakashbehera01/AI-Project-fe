import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import AIHistoryTable from '../components/AI/AIHistoryTable';
import AIHistoryFilters from '../components/AI/AIHistoryFilters';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import SuccessMessage from '../components/Common/SuccessMessage';

export default function AIHistoryPage() {
  const { projects, aiHistory, removeAIHistory } = useData();

  const [filters, setFilters] = useState({ search: '', projectId: '', taskType: '', date: '' });
  const [deleting, setDeleting] = useState(null);
  const [success, setSuccess] = useState('');

  const filteredHistory = useMemo(() => {
    return aiHistory.filter((entry) => {
      if (filters.projectId && entry.projectId !== Number(filters.projectId)) return false;
      if (filters.taskType && entry.taskType !== filters.taskType) return false;
      if (filters.date && entry.createdAt !== filters.date) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!entry.userPrompt.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [aiHistory, filters]);

  function handleDelete() {
    if (!deleting) return;
    removeAIHistory(deleting.id);
    setSuccess('History entry deleted successfully.');
    setDeleting(null);
  }

  return (
    <div>
      <div className="section-header">
        <h2>AI History</h2>
      </div>

      {success ? <SuccessMessage message={success} onDismiss={() => setSuccess('')} /> : null}

      <div className="card">
        <AIHistoryFilters projects={projects} filters={filters} onChange={setFilters} />
        <AIHistoryTable history={filteredHistory} onDelete={setDeleting} />
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete History Entry"
        message={`Delete AI interaction #${deleting?.id}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
