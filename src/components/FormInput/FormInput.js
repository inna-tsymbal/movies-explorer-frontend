import './FormInput.css';

export default function FormInput ({ inputTitle, type, inputName, minLength, maxLength, placeholder, pattern, handleChange, values, errors }) {
  return (
    <label className='form-input'>
      <h4 className='form-input__title'>{inputTitle}</h4>
      <input
        className='form-input__input'
        type={type}
        name={inputName}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={values[inputName] || ''}
        pattern={pattern}
        onChange={handleChange}
        required
      />
      <span className='form-input__error'>{errors[inputName]}</span>
    </label>
  )
}
