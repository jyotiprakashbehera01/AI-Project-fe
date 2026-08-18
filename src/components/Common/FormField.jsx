// Reusable labelled form field wrapper.
// Renders a label, the field control (passed as children) and an optional
// validation error message below the field.
export default function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className = 'form-group',
}) {
  return (
    <div className={className}>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
        {required ? <span className="required" aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? <span className="form-error" role="alert">{error}</span> : null}
    </div>
  );
}
