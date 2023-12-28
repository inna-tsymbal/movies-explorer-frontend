import './Register.css';
import logo from '../../images/logo.svg';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import FormInput from '../FormInput/FormInput';
import { registerInputs } from '../../utils/constants';

export default function Register ({registration, loggedIn}) {
  const [formError, setFormError] = React.useState('');
  const navigate = useNavigate();

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation();

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/movies', {replace: true});
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const { name, email, password } = values
    registration(name, email, password)
      .then(resetForm())
      .catch(err => setFormError(err));
  }



  return (
    <div className='container'>
      <form className='form' name='register' onSubmit={handleSubmit} noValidate>
        <Link to='/'>
          <img className='logo' src={logo} alt='Логотип'/>
        </Link>
        <h1 className='form__title'>Добро пожаловать!</h1>
        <div className='form__container'>
        {registerInputs.map((input) => (
            <FormInput key={input.id} {...input} values={values} errors={errors} handleChange={handleChange} />
          ))}
        </div>
        <span className='form__error'>{formError}</span>
        <button className='form__button' disabled={!isValid} type='submit'>Зарегистрироваться</button>
        <div className='form__link-container'>
          <p className='form__text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='form__link'>Войти</Link>
        </div>
      </form>
    </div>
  )
}
