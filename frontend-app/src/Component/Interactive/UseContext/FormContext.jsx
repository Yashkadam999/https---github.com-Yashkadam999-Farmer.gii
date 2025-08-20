
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
