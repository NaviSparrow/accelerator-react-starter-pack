import React from 'react';
import useLockBodyScroll from '../../hooks/use-lock-body-scroll/use-lock-body-scroll';
import useEscapeEventListener from '../../hooks/use-escape-event-listener/use-escape-event-listener';
import ReactFocusLock from 'react-focus-lock';
import {useRedirectToCart} from '../../hooks/use-redirect-to-cart/use-redirect-to-cart';

type ModalSuccessAddToCartProps = {
  isVisible: boolean;
  onClose: () => void;
}

function ModalSuccessAddToCart({isVisible, onClose}:ModalSuccessAddToCartProps):JSX.Element {
  useLockBodyScroll();
  useEscapeEventListener(onClose);
  const {redirectToCart} = useRedirectToCart();

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active' : ''} modal--success`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"/>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button" onClick={redirectToCart}>Перейти в корзину</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={onClose}>
              Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onClose}>
              <span className="button-cross__icon"/>
              <span className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessAddToCart;
