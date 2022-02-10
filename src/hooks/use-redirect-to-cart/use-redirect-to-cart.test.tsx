import {renderHook} from '@testing-library/react-hooks';
import {useRedirectToCart} from './use-redirect-to-cart';

describe('Hook redirectToCart', () => {
  it('should return function', () => {
    const {result} = renderHook(() => useRedirectToCart());

    expect(result.current.redirectToCart).toBeInstanceOf(Function);
  });
});
