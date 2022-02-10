import {renderHook} from '@testing-library/react-hooks';
import {usePricesInCart} from './use-prices-in-cart';
import {makeFakeCartItems} from '../../mocks/mocks';

const fakeCartItems = makeFakeCartItems(2);

describe('Hook usePricesInCart', () => {
  it('should set state to true on openModalSuccessAdd', () => {
    const {result} = renderHook(() => usePricesInCart(fakeCartItems));
    expect(result.current.listOfPricesInCart.length).toBe(2);

    expect(result.current.listOfPricesInCart).toBeInstanceOf(Array);
  });
});
