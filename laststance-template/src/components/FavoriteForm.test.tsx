import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import FavoriteForm from './FavoriteForm'
import useFavoriteForm from '../hooks/useFavoriteForm'

// Mock the useFavoriteForm hook

// const mockSubmit: (event: React.FormEvent<HTMLFormElement>) => void = vi.fn()
const mockSubmit = vi.fn((event) => event.preventDefault())
const mockInputChange = vi.fn( //05/05/23  Not sure if this is the best way of doing it.
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    event.target.value 
)
// const mockInputChange = vi.spyOn(useFavoriteForm, {default})

vi.mock('../hooks/useFavoriteForm', () => {
  const mock = () => ({
    formValues: { name: '', email: '', framework: '' },
    handleSubmit: mockSubmit,
    handleInputChange: mockInputChange,
    responseSentence: 'Test me',
  })
  return { default: mock }
})

//   const mockHookImplementation = vi.fn(() => 'default').mockImplementation(() => ({
//     formValues: { name: '', email: '', framework: '' },
//     handleSubmit: mockSubmit,
//     handleInputChange: mockInputChange,
//     responseSentence: 'Test me',
//   }))

//   vi.spyOn(useFavoriteForm, 'default').mockImplementation(mockHookImplementation)

describe('FavoriteForm', () => {
  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<FavoriteForm />)

    expect(getByLabelText(/Name:/i)).toBeInTheDocument()
    expect(getByLabelText(/Email:/i)).toBeInTheDocument()
    expect(getByLabelText(/Favorite framework:/i)).toBeInTheDocument()
    expect(getByText(/Submit/i)).toBeInTheDocument()
  })

  it('calls handleInputChange when input values change', () => {
    const { getByLabelText } = render(<FavoriteForm />)
    const { handleInputChange } = useFavoriteForm()

    fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'John' } })
    expect(mockInputChange).toHaveBeenCalledTimes(1)
    expect(mockInputChange).toReturnWith('John')

    fireEvent.change(getByLabelText(/Email:/i), {
      target: { value: 'john@example.com' },
    })
    expect(mockInputChange).toHaveBeenCalledTimes(2)
    expect(mockInputChange).toHaveNthReturnedWith(2, 'john@example.com')

    fireEvent.change(getByLabelText(/Favorite framework:/i), {
      target: { value: 'React' },
    })
    expect(handleInputChange).toHaveBeenCalledTimes(3)
  })

  it('calls handleSubmit when the form is submitted', async () => {
    const { getByText } = render(<FavoriteForm />)
    const { handleSubmit } = useFavoriteForm()

    fireEvent.click(getByText(/Submit/i))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  //   it('displays the response sentence', () => {
  //     useFavoriteForm.mockImplementation(() => ({
  //       formValues: { name: '', email: '', framework: '' },
  //       handleSubmit: jest.fn(),
  //       handleInputChange: jest.fn(),
  //       responseSentence: 'Thank you for your submission!',
  //     }))
  //     const { getByText } = render(<FavoriteForm />)

  //     expect(getByText(/Thank you for your submission!/i)).toBeInTheDocument()
  //   })
})
