import { Menu, Search, Bell } from 'lucide-react';

// Top header with page title, search, notifications and profile placeholder.
export default function Header({ title, onMenuClick }) {
  return (
    <header className="header">
      <button
        type="button"
        className="menu-toggle"
        aria-label="Open navigation menu"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>
      <h1 className="header-title">{title}</h1>
      <div className="header-search">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <label htmlFor="global-search" className="sr-only" style={{ display: 'none' }}>
          Search
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search..."
          aria-label="Global search"
        />
      </div>
      <button type="button" className="header-icon-btn" aria-label="Notifications">
        <Bell size={20} />
        <span className="notification-dot" aria-hidden="true" />
      </button>
      <div className="header-profile" title="Demo user">
        <span className="avatar">AM</span>
        <span>Alex Mentor</span>
      </div>
    </header>
  );
}
