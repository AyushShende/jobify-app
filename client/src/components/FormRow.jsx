const FormRow = ({ name, labelText, value, handleChange, type }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        onChange={handleChange}
        type={type}
        value={value}
        name={name}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
