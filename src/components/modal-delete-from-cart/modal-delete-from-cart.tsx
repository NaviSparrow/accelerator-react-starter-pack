import React from 'react';
import {Guitar} from '../../types/guitar';
import useLockBodyScroll from '../../hooks/use-lock-body-scroll/use-lock-body-scroll';
import useEscapeEventListener from '../../hooks/use-escape-event-listener/use-escape-event-listener';
import {GuitarType} from '../../const/const';
import ReactFocusLock from 'react-focus-lock';

type ModalDeleteFromCartProps = {
  isVisible: boolean;
  onClose: () => void;
  productInfo: Guitar;
}

function ModalDeleteFromCart({isVisible, onClose, productInfo}:ModalDeleteFromCartProps):JSX.Element {
  const {name, previewImg, vendorCode, price, stringCount, type} = productInfo;
  useLockBodyScroll();
  useEscapeEventListener(onClose);
  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={previewImg} width="67" height="137" alt={name}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{GuitarType.get(type)}, {stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button">Удалить товар</button>
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

export default ModalDeleteFromCart;
