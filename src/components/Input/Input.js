import "./Input.css";
import { useContext } from "react";
import SendContext from "../../contexts/SendContext";

export default function Input({
  selectname,
  name,
  type,
  title,
  minLength,
  value,
  isInputValid,
  error,
  onChange,
  isEdit,
  placeholder,
  pattern
}) {
  const isSend = useContext(SendContext);

  return (
    <>
      {selectname !== "profile" ? (
        <div className="login__container">
          <span className="login__subtitle">{title}</span>
          <input
            required
            type={type}
            name={name}
            minLength={minLength || ""}
            className={`login__input ${
              isInputValid === undefined || isInputValid
                ? ""
                : "login__input_invaid"
            }`}
            value={value || ""}
            onChange={onChange}
            autoComplete="on"
            disabled={isSend}
            placeholder={placeholder}
            pattern={pattern}
          />
          <span className="login__error">{error}</span>
        </div>
      ) : (
        <>
          <div className="profile__container">
            <span className="profile__subtitle">{title}</span>
            <input
              required
              placeholder="текст"
              type={type}
              name={name}
              minLength={minLength || ""}
              className={`profile__input ${
                isInputValid === undefined || isInputValid
                  ? ""
                  : "profile__input_invaid"
              }`}
              value={value || ""}
              onChange={onChange}
              disabled={isSend || !isEdit}
              pattern={pattern}
            />
          </div>
          <span
            className={`profile__error ${
              name === "username" ? "profile__error_type_name" : ""
            }`}
          >
            {error}
          </span>
        </>
      )}
    </>
  );
}