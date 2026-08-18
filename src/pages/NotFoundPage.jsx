import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p className="muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">
        <Home size={16} /> Back to Dashboard
      </Link>
    </div>
  );
}
