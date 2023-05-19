import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import FavoriteForm from './FavoriteForm'
import useFavoriteForm from '../hooks/useFavoriteForm'

const mockSubmit = vi.fn((event) => event.preventDefault())

 //05/05/23  Not sure if this is the best way of doing it.
 // I want to just have expect(mockInputChange).toHaveBeenCalledWith('...') but I can't get it to work
const mockInputChange = vi.fn(
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    event.target.value 
)
vi.mock('../hooks/useFavoriteForm', () => {
  const mock = () => ({
    formValues: { name: '', email: '', framework: '' },
    handleSubmit: mockSubmit,
    handleInputChange: mockInputChange,
    responseSentence: 'Test me',
  })
  return { default: mock }
})

describe('FavoriteForm', () => {
  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<FavoriteForm />)
    const nameField = getByLabelText(/Name:/i)
    const emailField = getByLabelText(/Email:/i)
    const frameWorkField = getByLabelText(/Favorite framework:/i)
    const submitButton = getByText(/Submit/i)
    
    expect(submitButton).toBeInTheDocument()
    expect(frameWorkField).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
    expect(nameField).toBeInTheDocument()
    expect(getByText(/Test Me/i)).toBeInTheDocument()
  })

  it('calls handleInputChange when input values change', () => {
    // Don't know how I feel about this test
    // I'm testing that each field is correctly passing events to handleInputChange
    // but I'm not sure this follows the testing library philosophy
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
    expect(mockInputChange).toHaveNthReturnedWith(3, 'React')
  })

  it('calls handleSubmit when the form is submitted', async () => {
    const { getByText } = render(<FavoriteForm />)
    const { handleSubmit } = useFavoriteForm()

    fireEvent.click(getByText(/Submit/i))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

})
