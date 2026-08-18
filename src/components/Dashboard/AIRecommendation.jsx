import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock "AI recommended next task" panel shown on the dashboard.
export default function AIRecommendation({ project, recommendation }) {
  return (
    <div className="card">
      <div className="section-header">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} style={{ color: 'var(--cyan-600)' }} />
          AI Recommended Next Task
        </h2>
      </div>
      <div className="ai-recommendation-banner">
        <p className="text-sm muted" style={{ marginBottom: 4 }}>Project</p>
        <strong>{project}</strong>
        <p className="text-sm muted" style={{ marginTop: 8, marginBottom: 4 }}>Recommended task</p>
        <strong>{recommendation.task}</strong>
        <p className="text-sm" style={{ marginTop: 8 }}>{recommendation.reason}</p>
      </div>
      <Link to="/ai-mentor" className="btn btn-primary" style={{ marginTop: 12, width: '100%' }}>
        View Recommendation <ArrowRight size={16} />
      </Link>
    </div>
  );
}
