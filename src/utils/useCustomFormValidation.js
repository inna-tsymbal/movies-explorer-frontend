import { useState, useCallback } from 'react';

const useCustomFormValidation = () => {
  const [formValues, setFormValues] = useState({name: '', email: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (event) => {
    const { name, value, validationMessage } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: validationMessage });
    setIsFormValid(event.target.closest('form').checkValidity());
  };

  const resetFormState = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setFormErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setFormValues, setFormErrors, setIsFormValid]
  );
  
  return { formValues, formErrors, isFormValid, handleFormChange, resetFormState, setFormValues, setIsFormValid };
};

export default useCustomFormValidation;
