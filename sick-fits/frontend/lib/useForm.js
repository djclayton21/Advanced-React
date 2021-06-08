import { useState } from 'react';

function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  function handleChange(e) {
    let { value, name, type, files } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initialState);
  }

  function clearForm() {
    const blankState = { ...inputs };
    Object.keys(blankState).forEach((key) => (blankState[key] = ''));
    setInputs(blankState);
  }
  return {
    inputs,
    setInputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

export default useForm;
