import { renderHook, act, waitFor } from '@testing-library/react';
import useFavoriteForm from './useFavoriteForm';


const createChangeEvent = (name: string, value: string) => ({
  target: {
    name,
    value,
  },
} as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);

const createSubmitEvent = () => ({
  preventDefault: () => {},
} as React.FormEvent<HTMLFormElement>);

describe('useFavoriteForm', () => {
  it('should handle input change', () => {
    const hook = renderHook(() => useFavoriteForm());
    const {result} = hook
    act(() => {
      result.current.handleInputChange(createChangeEvent('name', 'John Doe'));
    });
    
    expect(result.current.formValues.name).toBe('John Doe');
  });

  it('should handle form submit', async () => {
    const { result } = renderHook(() => useFavoriteForm());
    act(() => {
      result.current.handleInputChange(createChangeEvent('name', 'John Doe'));
    });
     act(() => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor(() => {
      expect(result.current.responseSentence).toBe('Success');
    })
  
  });

  // it('should handle API error', async () => {
  //   server.use(
  //     rest.post('http://localhost:4000/api/details', (req, res, ctx) => {
  //       return res(ctx.status(500))
  //     })
  //   );
  //   const { result, waitForNextUpdate } = renderHook(() => useFavoriteForm());
  //   act(() => {
  //     result.current.handleSubmit({
  //       preventDefault: () => {}
  //     });
  //   });
  //   expect(result.current.responseSentence).toBe('');
  //   await waitForNextUpdate();
  //   expect(console.error).toHaveBeenCalled();
  // });
});
