import {act, renderHook} from '@testing-library/react-hooks';
import {useModalSuccessOrder} from './use-modal-success-order';

describe('Hook useModalSuccessOrder', () => {
  it('should set state to true on openModalSuccessOrder', () => {
    const {result} = renderHook(() => useModalSuccessOrder());
    expect(result.current.isModalSuccessOrderVisible).toBe(false);

    act(() => {
      result.current.openModalSuccessOrder();
    });

    expect(result.current.isModalSuccessOrderVisible).toBe(true);
  });

  it('should set state to false on closeModalSuccessOrder', () => {
    const {result} = renderHook(useModalSuccessOrder);
    expect(result.current.isModalSuccessOrderVisible).toBe(false);
    act(() => {
      result.current.openModalSuccessOrder();
    });

    expect(result.current.isModalSuccessOrderVisible).toBe(true);

    act(() => {
      result.current.closeModalSuccessOrder();
    });

    expect(result.current.isModalSuccessOrderVisible).toBe(false);
  });
});
