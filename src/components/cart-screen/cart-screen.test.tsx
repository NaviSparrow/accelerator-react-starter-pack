import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import CartScreen from './cart-screen';
import {makeFakeCartItems} from '../../mocks/mocks';
import * as Redux from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {useAddCouponForDiscountMutation, usePostNewOrderMutation} from '../../service/api';
import {act} from 'react-test-renderer';
import {Coupon} from '../../types/coupon';
import {OrderPost} from '../../types/orderPost';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

const history = createMemoryHistory();
const store = testStore;

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    const cartItems = makeFakeCartItems(1);
    const useSelector = jest.spyOn(Redux, 'useSelector');
    useSelector.mockReturnValue(cartItems);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <CartScreen />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Корзина/i).length).toBe(2);
    expect(screen.getByText(cartItems[0].guitar.name)).toBeInTheDocument();
    expect(screen.getByText(cartItems[0].count)).toBeInTheDocument();
  });

  it('should do useAddCouponForDiscountMutation correctly',  async () => {
    const fakeResponse = 15;
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const fakeCoupon:Coupon = {
      coupon: 'test',
    };

    const {result, waitForNextUpdate} = renderHook(() => useAddCouponForDiscountMutation(undefined), {wrapper});
    const [applyCoupon] = result.current;

    act(() => {
      void applyCoupon(fakeCoupon);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBe(undefined);
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.data).toBe(fakeResponse);
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });

  it('should do usePostNewOrderMutation correctly',  async () => {
    const fakeResponse = 200;
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const fakeOrder:OrderPost = {
      guitarsIds: [1, 2],
      coupon: 'test',
    };
    const {result, waitForNextUpdate} = renderHook(() => usePostNewOrderMutation(undefined), {wrapper});
    const [orderPost] = result.current;

    act(() => {
      void orderPost(fakeOrder);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBe(undefined);
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.data).toBe(fakeResponse);
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });
});
