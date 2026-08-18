// Inline status dropdown used in the tasks table to change status quickly.
export default function StatusDropdown({ value, onChange }) {
  const options = ['Pending', 'In Progress', 'Completed'];
  return (
    <select
      className="status-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Change task status"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
