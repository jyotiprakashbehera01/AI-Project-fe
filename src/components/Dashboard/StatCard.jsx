// A single summary stat card on the dashboard.
export default function StatCard({ label, value, icon: Icon, color = 'blue' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {Icon ? <Icon size={22} /> : null}
      </div>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}
