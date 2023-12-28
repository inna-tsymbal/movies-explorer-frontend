import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { loginInputs } from '../../utils/constants';
import FormInput from '../FormInput/FormInput';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export default function Login ({authentication, loggedIn }) {

  const [formError, setFormError] = React.useState('');

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/movies', {replace: true});
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const { email, password } = values;
    authentication(email, password)
      .then(resetForm())
      .catch(err => setFormError(err));
  }

  return (
    <div className='container'>
      <form className='form' name='login' onSubmit={handleSubmit}>
        <Link to='/'>
          <img className='logo' src={logo} alt='Логотип'/>
        </Link>
        <h1 className='form__title'>Рады видеть!</h1>
        <div className='form__container'>
        {loginInputs.map((input) => (
            <FormInput key={input.id} {...input} values={values} errors={errors} handleChange={handleChange} />
          ))}
        </div>
            <span className='form__input-error'>{formError}</span>
        <button className='form__button' type='submit' disabled={!isValid}>Войти</button>
        <div className='form__link-container'>
          <p className='form__text'>Еще не зарегистрированы?</p>
          <Link to='/signup' className='form__link'>Регистрация</Link>
        </div>
      </form>
    </div>
  )
}
