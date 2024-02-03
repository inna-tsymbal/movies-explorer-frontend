import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((values) => {
      return { ...values, [name]: value };
    });
    setErrors((errors) => {
      return { ...errors, [name]: validationMessage };
    });
    setIsInputValid((validate) => {
      return { ...validate, [name]: valid };
    });
    setIsValid(form.checkValidity());
  }

  const setValue = useCallback((name, value) => {
    setValues((values) => {
      return { ...values, [name]: value };
    });
  }, []);

  const reset = useCallback((data = {}) => {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    setValue,
    reset,
  };
}