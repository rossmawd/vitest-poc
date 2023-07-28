import React from 'react'
import useFavoriteForm, { errorMessages } from '../hooks/useFavoriteForm'
import ErrorMessage from './ErrorMessage'

const frameworkOptions = [
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Vue.js', value: 'Vue.js' },
]// TODO: separate the hook from component. Move the FavoriteForm tests to App.test.tsx
const FavoriteForm: React.FC = () => {
  const {
    formValues,
    handleSubmit,
    handleInputChange,
    responseSentence,
    errors,
  } = useFavoriteForm()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <label className="flex justify-end">
            <span className="pr-2">Name: </span>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              aria-invalid={errors.nameError ? 'true' : 'false'}
              aria-describedby="nameError"
            />
          </label>
          {errors.nameError && <ErrorMessage message={errorMessages.name} />}

          <label className="flex justify-end">
            <span className="pr-2">Email: </span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </label>

          <label className=" flex justify-end">
            <span className="pr-2">Favorite Framework: </span>
            <select
              name="framework"
              value={formValues.framework}
              onChange={handleInputChange}
            >
              <option value="">Select framework</option>
              {frameworkOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button className="bg-slate-100 " type="submit">
            Submit
          </button>
        </div>
      </form>
      {responseSentence && (
        <div className="p-3 mt-6 bg-green-100 rounded">{responseSentence}</div>
      )}
    </>
  )
}

export default FavoriteForm
