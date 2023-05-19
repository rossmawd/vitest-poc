import { useState } from "react";
interface FormValues {
    name: string;
    email: string;
    framework: string;
  }

const useFavoriteForm = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: "",
        email: "",
        framework: "",
      });
    const [responseSentence, setResponseSentence] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:4000/api/details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          });
          const data = await response.json();
            setResponseSentence(data.message)
        } catch (error) {
          console.error(error);
        }
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

      return {
        formValues,
        handleInputChange,
        handleSubmit,
        responseSentence,
      }

}
export default useFavoriteForm;