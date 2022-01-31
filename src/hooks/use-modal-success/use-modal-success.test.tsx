import {act, renderHook} from '@testing-library/react-hooks';
import {useModalSuccess} from './use-modal-success';

describe('Hook useModalSuccess', () => {
  it('should set state to true on openModalSuccess', () => {
    const {result} = renderHook(() => useModalSuccess());
    expect(result.current.isModalSuccessVisible).toBe(false);

    act(() => {
      result.current.openModalSuccess();
    });

    expect(result.current.isModalSuccessVisible).toBe(true);
  });

  it('should set state to false on closeModalSuccess', () => {
    const {result} = renderHook(useModalSuccess);
    expect(result.current.isModalSuccessVisible).toBe(false);
    act(() => {
      result.current.openModalSuccess();
    });

    expect(result.current.isModalSuccessVisible).toBe(true);

    act(() => {
      result.current.closeModalSuccess();
    });

    expect(result.current.isModalSuccessVisible).toBe(false);
  });
});
