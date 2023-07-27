import { render, fireEvent, screen } from '@testing-library/react'
import FavoriteForm from './FavoriteForm'
import { detailsPostResponse } from '../../mocks/handlers'
import { errorMessages } from '../hooks/useFavoriteForm'

// 06/06/23 NB: by not mocking the hook (instead using MSW), I'm treating this as
// an Integration test.

describe('FavoriteForm', () => {
  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<FavoriteForm />)

    expect(getByLabelText(/Name:/i)).toBeInTheDocument()
    expect(getByLabelText(/Email:/i)).toBeInTheDocument()
    expect(getByLabelText(/Favorite framework:/i)).toBeInTheDocument()
    expect(getByText(/Submit/i)).toBeInTheDocument()
  })

  // the test aims to completely test that our name field, its error, and validation work together.
  // could have separate tests for different ways validation could fail.
  it('should display an error under Name field if validation fails', () => {
    render(<FavoriteForm />)
    const nameField = screen.getByLabelText(/Name:/i)
    // check the nameField is not invalid by default
    expect(nameField).toHaveAttribute('aria-invalid', 'false')

    fireEvent.change(nameField, { target: { value: 'Tech9' } })
    // check the nameField is invalid after the change event
    expect(nameField).toHaveAttribute('aria-invalid', 'true')
    // check the error message is displayed
    const error = screen.getByRole('alert')
    expect(error).toBeInTheDocument()
    // check the error content
    expect(error).toHaveTextContent(errorMessages.name)
    // check the error and its field have appropriate aria attributes
    expect(error).toHaveAttribute('aria-live', 'assertive')
    const describedById = nameField.getAttribute('aria-describedby')
    expect(error).toHaveAttribute('id', describedById)
  })

  it('should display the response sentence when you click submit ', async () => {
    /*  NB: getByText Vs findByText
           - getByText is a synchronous function that immediately returns an element if it is found in the DOM
           - findByText is an asynchronous function that will return a promise that resolves when the element is found
    */
    const { getByText, findByText } = render(<FavoriteForm />)

    const submitButton = getByText(/Submit/i)

    fireEvent.click(submitButton)

    // using the response Body defined in the MSW `handlers.ts` file:
    const responseSentence = await findByText(detailsPostResponse.message)
    expect(responseSentence).toBeInTheDocument()
  })
})

// 09/06/23 This was the original hook mocking code, but I've replaced it with MSW

// const mockSubmit = vi.fn((event) => event.preventDefault())
// const mockInputChange = vi.fn(
//   (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
//     event.target.value
// )
// vi.mock('../hooks/useFavoriteForm', () => {
//   const mock = () => ({
//     formValues: { name: '', email: '', framework: '' },
//     handleSubmit: mockSubmit,
//     handleInputChange: mockInputChange,
//     responseSentence: 'Test me',
//   })
//   return { default: mock }
// })
