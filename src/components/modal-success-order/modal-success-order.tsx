import useLockBodyScroll from '../../hooks/use-lock-body-scroll/use-lock-body-scroll';
import useEscapeEventListener from '../../hooks/use-escape-event-listener/use-escape-event-listener';
import ReactFocusLock from 'react-focus-lock';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../store/action';

type ModalSuccessOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  totalPrice: number;
}

function ModalSuccessOrder({isVisible, onClose, totalPrice}:ModalSuccessOrderProps):JSX.Element {
  useLockBodyScroll();
  useEscapeEventListener(onClose);
  const history = useHistory();
  const dispatch = useDispatch();

  const returnClickHandler = () => {
    history.push(AppRoute.Root);
    closeClickHandler();
  };

  const closeClickHandler = () => {
    dispatch(clearCart({cartItems: [], coupon: null}));
    onClose();
  };

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active' : ''} modal--success`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={closeClickHandler}/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"/>
            </svg>
            <p className="modal__message">Заказ успешно оформлен на сумму {totalPrice} рублей!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={returnClickHandler}>Вернуться на главную</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={closeClickHandler}>
              <span className="button-cross__icon"/>
              <span className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessOrder;
