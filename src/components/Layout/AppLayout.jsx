import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar, { navItems } from './Sidebar';
import Header from './Header';

// Shared application layout: sidebar + header + page content.
// The sidebar collapses into a drawer on mobile, toggled by the header button.
export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Derive the page title from the current route for the header.
  const activeItem = navItems.find((item) => {
    if (item.to === '/') return location.pathname === '/';
    return location.pathname.startsWith(item.to);
  });
  const title = activeItem ? activeItem.label : 'Page';

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
