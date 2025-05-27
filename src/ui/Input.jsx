function Input({
  name,
  type = "text",
  placeholder = "",
  value = null,
  onChange = null,
  defaultValue = "",
  disabled = false
}) {
  if (value && onChange) {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
        defaultValue={defaultValue}
        disabled={disabled}
        required
      />
    );
  }

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="input"
      defaultValue={defaultValue}
      disabled={disabled}
      required
    />
  );
}

export default Input;
