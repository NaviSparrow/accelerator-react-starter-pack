import {act, renderHook} from '@testing-library/react-hooks';
import {useModalDeleteFromCart} from './use-modal-delete-from-cart';

describe('Hook useModalDeleteFromCart', () => {
  it('should set state to true on openModalDelete', () => {
    const {result} = renderHook(() => useModalDeleteFromCart());
    expect(result.current.isModalDeleteVisible).toBe(false);

    act(() => {
      result.current.openModalDelete();
    });

    expect(result.current.isModalDeleteVisible).toBe(true);
  });

  it('should set state to false on closeModalDelete', () => {
    const {result} = renderHook(useModalDeleteFromCart);
    expect(result.current.isModalDeleteVisible).toBe(false);
    act(() => {
      result.current.openModalDelete();
    });

    expect(result.current.isModalDeleteVisible).toBe(true);

    act(() => {
      result.current.closeModalDelete();
    });

    expect(result.current.isModalDeleteVisible).toBe(false);
  });
});
