import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CartTotalInfo from './cart-total-info';

const fakeDiscount = 15;
const fakeOnOrderPost = jest.fn();

const history = createMemoryHistory();
const store = testStore;

describe('Component: CartTotalInfo', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartTotalInfo discount={fakeDiscount} onOrderPost={fakeOnOrderPost} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

  it('should call fakeOnOrderPost', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartTotalInfo discount={fakeDiscount} onOrderPost={fakeOnOrderPost} />
        </Router>
      </Provider>);

    const button = screen.getByText('Оформить заказ');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakeOnOrderPost).toBeCalled();
  });
});
