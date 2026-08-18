import { Search } from 'lucide-react';

// Filter bar above the tasks table: project, priority, status and text search.
export default function TaskFilters({ projects, filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters-bar">
      <div className="filter-search">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <label htmlFor="task-search" className="sr-only" style={{ display: 'none' }}>
          Search tasks
        </label>
        <input
          id="task-search"
          type="search"
          placeholder="Search task titles..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
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
          value={filters.priority}
          onChange={(e) => update('priority', e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <select
          className="form-select"
          value={filters.status}
          onChange={(e) => update('status', e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
