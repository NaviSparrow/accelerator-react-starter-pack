import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {makeFakeCartItem} from '../../mocks/mocks';
import ModalDeleteFromCart from './modal-delete-from-cart';
import * as Redux from 'react-redux';

const fakeVisible = true;
const fakeOnClose = jest.fn();
const fakeProduct = makeFakeCartItem();

const history = createMemoryHistory();
const store = testStore;

describe('Component: ModalDeleteFromCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalDeleteFromCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });

  it('should call fakeOnClose', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalDeleteFromCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} />
        </Router>
      </Provider>);

    const buttonClose = screen.getByLabelText('Закрыть');
    expect(buttonClose).toBeInTheDocument();
    userEvent.click(buttonClose);
    expect(fakeOnClose).toBeCalledTimes(1);

    const buttonReturnToShop = screen.getByText('Продолжить покупки');
    expect(buttonReturnToShop).toBeInTheDocument();
    userEvent.click(buttonReturnToShop);
    expect(fakeOnClose).toBeCalled();
  });

  it('should dispatch when delete button is clicked', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalDeleteFromCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} />
        </Router>
      </Provider>);

    userEvent.click(screen.getByText('Удалить товар'));
    expect(dispatch).toBeCalled();
  });
});
