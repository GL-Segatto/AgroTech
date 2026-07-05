function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
