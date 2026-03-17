import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validity } = evt.target;

    let errorMessage = "";

    if (validity.valueMissing) {
      errorMessage = "(This field is required.)";
    } else if (validity.typeMismatch && name === "imageUrl") {
      errorMessage = "(Please enter a valid URL.)";
    } else if (validity.tooShort) {
      errorMessage = "(Must be at least 2 characters.)";
    }

    setValues({ ...values, [name]: value });

    //error messages for the form inputs
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    setIsValid(evt.target.closest("form").checkValidity());
  }

  return {
    values,
    setValues,
    handleChange,
    isValid,
    errors,
    setErrors,
    setIsValid,
  };
}
