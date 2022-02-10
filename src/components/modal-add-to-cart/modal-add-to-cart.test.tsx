import {makeFakeGuitar} from '../../mocks/mocks';
import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import ModalAddToCart from './modal-add-to-cart';

const fakeVisible = true;
const fakeOnClose = jest.fn();
const fakeProduct = makeFakeGuitar();
const fakeOnSuccess = jest.fn();

const history = createMemoryHistory();
const store = testStore;

describe('Component: ModalAddToCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalAddToCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} onSuccessAddToCart={fakeOnSuccess}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });

  it('should call fakeOnClose', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalAddToCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} onSuccessAddToCart={fakeOnSuccess}/>
        </Router>
      </Provider>);

    const buttonClose = screen.getByLabelText('Закрыть');
    expect(buttonClose).toBeInTheDocument();
    userEvent.click(buttonClose);
    expect(fakeOnClose).toBeCalledTimes(1);
  });

  it('should dispatch and fire "onSuccess" callback when "add to cart" button is clicked', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalAddToCart isVisible={fakeVisible} onClose={fakeOnClose} productInfo={fakeProduct} onSuccessAddToCart={fakeOnSuccess}/>
        </Router>
      </Provider>);

    userEvent.click(screen.getByText('Добавить в корзину'));
    expect(dispatch).toBeCalled();
    expect(fakeOnSuccess).toBeCalled();
  });
});
