import { useState } from 'react'
import { nameValidation } from '../validators/nameValidation'
import { DetailsPostResponse } from '../../mocks/handlers'
interface FormValues {
  name: string
  email: string
  framework: string
}
export const errorMessages = { name: 'a-z only please' }

const useFavoriteForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    framework: '',
  })
  const [responseSentence, setResponseSentence] = useState<string>('')
  const [nameError, setNameError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/api/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
      const data: DetailsPostResponse = await response.json()
      setResponseSentence(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    if (name === 'name' && value.length > 0) {
      if (nameValidation(value)) {
        setNameError(null)
      } else {
        setNameError(errorMessages.name)
      }
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return {
    formValues,
    handleInputChange,
    handleSubmit,
    responseSentence,
    errors: { nameError },
  }
}
export default useFavoriteForm
