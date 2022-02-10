import {act, renderHook} from '@testing-library/react-hooks';
import {useModalSuccessAddToCart} from './use-modal-success-add-to-cart';

describe('Hook useModalSuccessAddToCart', () => {
  it('should set state to true on openModalSuccessAdd', () => {
    const {result} = renderHook(() => useModalSuccessAddToCart());
    expect(result.current.isModalSuccessAddVisible).toBe(false);

    act(() => {
      result.current.openModalSuccessAdd();
    });

    expect(result.current.isModalSuccessAddVisible).toBe(true);
  });

  it('should set state to false on closeModalSuccessAdd', () => {
    const {result} = renderHook(useModalSuccessAddToCart);
    expect(result.current.isModalSuccessAddVisible).toBe(false);
    act(() => {
      result.current.openModalSuccessAdd();
    });

    expect(result.current.isModalSuccessAddVisible).toBe(true);

    act(() => {
      result.current.closeModalSuccessAdd();
    });

    expect(result.current.isModalSuccessAddVisible).toBe(false);
  });
});
