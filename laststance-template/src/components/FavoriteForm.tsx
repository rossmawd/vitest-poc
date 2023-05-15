import React, { useEffect, useState } from 'react'
import useFavoriteForm from '../hooks/useFavoriteForm'

const frameworkOptions = [
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Vue.js', value: 'Vue.js' },
]
const MyForm: React.FC = () => {
  const { formValues, handleSubmit, handleInputChange, responseSentence } =
    useFavoriteForm()

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-6 items-center">
        <label>
          Name:{' '}
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:{' '}
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </label>
        
        <label>
          Favorite framework:{' '}
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

        <button className="bg-slate-100 w-[100px]" type="submit">
          Submit
        </button>

        <div>{responseSentence}</div>
      </div>
    </form>
  )
}

export default MyForm
