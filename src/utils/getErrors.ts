export function getErrors<T>(
  valuesForm: T,
  setErrors: React.Dispatch<React.SetStateAction<T>>,
  errorsMessage: T
) {
  let thereIsError = false;

  const arrValuesForm = Object.keys(valuesForm as object) as [];

  for (const key of arrValuesForm) {
    if (!valuesForm[key]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: errorsMessage[key],
      }));

      thereIsError = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
    }
  }

  return thereIsError;
}
