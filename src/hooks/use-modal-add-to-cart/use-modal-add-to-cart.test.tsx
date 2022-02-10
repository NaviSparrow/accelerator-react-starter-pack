import {act, renderHook} from '@testing-library/react-hooks';
import {useModalAddToCart} from './use-modal-add-to-cart';

describe('Hook useModalAddToCart', () => {
  it('should set state to true on openModalAddToCart', () => {
    const {result} = renderHook(() => useModalAddToCart());
    expect(result.current.isModalAddToCartVisible).toBe(false);

    act(() => {
      result.current.openModalAddToCart();
    });

    expect(result.current.isModalAddToCartVisible).toBe(true);
  });

  it('should set state to false on closeModalSuccess', () => {
    const {result} = renderHook(useModalAddToCart);
    expect(result.current.isModalAddToCartVisible).toBe(false);
    act(() => {
      result.current.openModalAddToCart();
    });

    expect(result.current.isModalAddToCartVisible).toBe(true);

    act(() => {
      result.current.closeModalAddToCart();
    });

    expect(result.current.isModalAddToCartVisible).toBe(false);
  });
});
