import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalSuccessOrder from './modal-success-order';
import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

const fakeVisible = true;
const fakeOnClose = jest.fn();
const fakeTotalPrice = 12345;

const history = createMemoryHistory();
const fakePush = jest.spyOn(history, 'push');
const store = testStore;

describe('Component: ModalSuccessOrder', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessOrder isVisible={fakeVisible} onClose={fakeOnClose} totalPrice={fakeTotalPrice}/>
        </Router>
      </Provider>);

    expect(screen.getByText(`Заказ успешно оформлен на сумму ${fakeTotalPrice} рублей!`)).toBeInTheDocument();
  });

  it('should call fakeOnClose', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessOrder isVisible={fakeVisible} onClose={fakeOnClose} totalPrice={fakeTotalPrice}/>
        </Router>
      </Provider>);

    const button = screen.getByLabelText('Закрыть');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakeOnClose).toBeCalledTimes(1);
  });

  it('should history.push when return button is clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessOrder isVisible={fakeVisible} onClose={fakeOnClose} totalPrice={fakeTotalPrice}/>
        </Router>
      </Provider>);

    const button = screen.getByText('Вернуться на главную');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakePush).toBeCalled();
  });
});
