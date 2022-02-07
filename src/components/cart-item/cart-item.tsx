import React, {useState} from 'react';
import {CartItemType} from '../../store/cart-reducer/cart-reducer';
import {useDispatch} from 'react-redux';
import {decrementQuantity, incrementQuantity, setQuantity} from '../../store/action';
import ModalDeleteFromCart from '../modal-delete-from-cart/modal-delete-from-cart';
import {useModalDeleteFromCart} from '../../hooks/use-modal-delete-from-cart/use-modal-delete-from-cart';
import {ONE_ITEM} from '../../const/const';

type CartItemProps = {
  cartItemInfo: CartItemType;
}

function CartItem({cartItemInfo}:CartItemProps):JSX.Element {
  const {name, price, vendorCode, previewImg, stringCount, type, id} = cartItemInfo.guitar;
  const count = cartItemInfo.count;

  const {isModalDeleteVisible, openModalDelete, closeModalDelete} = useModalDeleteFromCart(count);
  const [inputQuantity, setInputQuantity] = useState<string>('');
  const dispatch = useDispatch();

  const incrementClickHandler = () => {
    dispatch(incrementQuantity(id));
  };

  const decrementClickHandler = () => {
    count === ONE_ITEM ? openModalDelete() : dispatch(decrementQuantity(id));
  };

  const setQuantityHandler = () => {
    inputQuantity.length !== 0 && dispatch(setQuantity(id, Number(inputQuantity)));
  };

  const deleteClickHandler = () => {
    openModalDelete();
  };

  const changeQuantityHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '0') {
      openModalDelete();
    }
    setInputQuantity(evt.target.value);
  };

  const keyDownHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      setQuantityHandler();
      setInputQuantity('');
    }
  };

  const onFocusOutHandler = () => {
    setQuantityHandler();
    setInputQuantity('');
  };

  return (
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={deleteClickHandler}>
          <span className="button-cross__icon"/>
          <span className="cart-item__close-button-interactive-area"/>
        </button>
        <div className="cart-item__image">
          <img src={previewImg} width="55" height="130" alt={name}/>
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{name}</p>
          <p className="product-info__info">Артикул: {vendorCode}</p>
          <p className="product-info__info">{type}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{price} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" onClick={decrementClickHandler}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"/>
            </svg>
          </button>
          <input className="quantity__input" type="number" placeholder={count.toString()} id="2-count" name="2-count" max="99" value={inputQuantity}
            onChange={changeQuantityHandler}
            onKeyDown={keyDownHandler}
            onBlur={onFocusOutHandler}
          />
          <button className="quantity__button" aria-label="Увеличить количество" onClick={incrementClickHandler}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"/>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{price * count} ₽</div>
      </div>
      {isModalDeleteVisible && <ModalDeleteFromCart isVisible={isModalDeleteVisible} onClose={closeModalDelete} productInfo={cartItemInfo}/>}
    </>
  );
}

export default CartItem;
