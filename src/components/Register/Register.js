import Input from "../Input/Input";
import LoginRegister from "../LoginRegister/LoginRegister";
import useFormValidation from "../../hooks/useFormValidation";

export default function Register({ name, onRegister, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    onRegister(values.username, values.email, values.password)
  }

  return (
    <LoginRegister name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
      <Input
        name="username"
        type="text"
        title="Имя"
        minLength="2"
        value={values.username}
        isInputValid={isInputValid.username}
        error={errors.username}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder={'Введите ваше имя'}
      />
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
        pattern={"^\\S+@\\S+\\.\\S+$"}
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