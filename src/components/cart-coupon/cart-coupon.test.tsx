import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import CartCoupon from './cart-coupon';

const history = createMemoryHistory();
const store = testStore;
const fakeOnApplyCoupon = jest.fn();
const fakeIsSuccess = false;
const fakeIsError = false;

describe('Component: CartCoupon', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <CartCoupon onApplyCoupon={fakeOnApplyCoupon} isSuccess={fakeIsSuccess} isError={fakeIsError} />
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Неверный промокод/i)).not.toBeInTheDocument();
  });

  it('should call fakeOnApplyCoupon when button is clicked', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <CartCoupon onApplyCoupon={fakeOnApplyCoupon} isSuccess={fakeIsSuccess} isError={fakeIsError} />
          </Route>
        </Router>
      </Provider>);

    userEvent.type(screen.getByTestId(/couponInput/i), 'light-333');
    userEvent.click(screen.getByTestId(/couponButton/i));
    expect(fakeOnApplyCoupon).toBeCalled();
  });
});
