import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Sparkles,
  History,
  Bot,
} from 'lucide-react';

// Navigation items shared between desktop sidebar and mobile menu.
export const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/ai-mentor', label: 'AI Mentor', icon: Sparkles },
  { to: '/ai-history', label: 'AI History', icon: History },
];

// Sidebar shown on desktop and as a slide-in drawer on mobile.
// `open` and `onClose` control the mobile drawer state.
export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar${open ? ' open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <Bot size={24} className="brand-icon" aria-hidden="true" />
          <span>AI Project Mentor</span>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">Frontend demo · mock data</div>
      </aside>
      {open ? (
        <div
          className="sidebar-backdrop visible"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
