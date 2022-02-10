import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ModalSuccessAddToCart from './modal-success-add-to-cart';

const fakeVisible = true;
const fakeOnClose = jest.fn();

const history = createMemoryHistory();
const fakePush = jest.spyOn(history, 'push');
const store = testStore;

describe('Component: ModalSuccessAddToCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAddToCart isVisible={fakeVisible} onClose={fakeOnClose}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });

  it('should call fakeOnClose', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAddToCart isVisible={fakeVisible} onClose={fakeOnClose}/>
        </Router>
      </Provider>);

    const button = screen.getByLabelText('Закрыть');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakeOnClose).toBeCalledTimes(1);
  });

  it('should history.push when "go to cart" button is clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAddToCart isVisible={fakeVisible} onClose={fakeOnClose}/>
        </Router>
      </Provider>);

    const button = screen.getByText('Перейти в корзину');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakePush).toBeCalled();
  });
});
