import { Search } from 'lucide-react';

// Filters for the AI History page: project, task type and date.
export default function AIHistoryFilters({ projects, filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  const taskTypes = [
    'Generate Project Plan',
    'Break Requirement into Tasks',
    'Recommend Next Task',
    'Identify Project Blockers',
    'Explain Implementation',
    'Generate Testing Checklist',
  ];

  return (
    <div className="filters-bar">
      <div className="filter-search">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search prompts..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          aria-label="Search AI history prompts"
        />
      </div>

      <div className="form-group">
        <select
          className="form-select"
          value={filters.projectId}
          onChange={(e) => update('projectId', e.target.value)}
          aria-label="Filter by project"
        >
          <option value="">All projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select
          className="form-select"
          value={filters.taskType}
          onChange={(e) => update('taskType', e.target.value)}
          aria-label="Filter by AI task type"
        >
          <option value="">All task types</option>
          {taskTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <input
          type="date"
          className="form-input"
          value={filters.date}
          onChange={(e) => update('date', e.target.value)}
          aria-label="Filter by date"
        />
      </div>
    </div>
  );
}
