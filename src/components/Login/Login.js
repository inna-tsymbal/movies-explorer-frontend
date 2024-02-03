import Input from "../Input/Input";
import LoginRegister from "../LoginRegister/LoginRegister";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login({ name, onLogin, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange, } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <LoginRegister name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
      <Input
        name="email"
        type="email"
        title="E-mail"
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder={'Введите ваш E-mail'}
      />
      <Input
        name="password"
        type="password"
        title="Пароль"
        minLength="3"
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder={'Введите пароль'}
      />
    </LoginRegister>
  );
}