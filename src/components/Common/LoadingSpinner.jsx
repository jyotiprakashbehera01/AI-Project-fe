// Small reusable loading indicator.
export default function LoadingSpinner({ size = 'md', label }) {
  const sizeClass = size === 'lg' ? ' lg' : '';
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className={`spinner${sizeClass}`} aria-hidden="true" />
      {label ? <p>{label}</p> : null}
      <span className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
        Loading
      </span>
    </div>
  );
}
