import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import CartItem from './cart-item';
import {makeFakeCartItem} from '../../mocks/mocks';
import {AppRoute} from '../../const/const';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const store = testStore;
const fakeProductInfo = makeFakeCartItem();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <CartItem cartItemInfo={fakeProductInfo} />
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(fakeProductInfo.guitar.name)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeProductInfo.guitar.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProductInfo.guitar.type}, ${fakeProductInfo.guitar.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getAllByText(`${fakeProductInfo.guitar.price * fakeProductInfo.count} ₽`).length).toBe(1);
  });

  it('should call dispatch correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <CartItem cartItemInfo={fakeProductInfo} />
          </Route>
        </Router>
      </Provider>);

    userEvent.click(screen.getByLabelText(/Уменьшить количество/i));
    expect(dispatch).toBeCalled();

    userEvent.click(screen.getByLabelText(/Увеличить количество/i));
    expect(dispatch).toBeCalled();

    userEvent.type(screen.getByTestId(/quantityInput/i), '2');
    expect(dispatch).toBeCalled();
  });
});
