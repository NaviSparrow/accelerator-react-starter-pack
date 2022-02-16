import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {useSelector} from 'react-redux';
import {getCartItems} from '../../store/cart-reducer/cart-reducer';

function CartCountLink():JSX.Element {
  const cartItems = useSelector(getCartItems);

  const getCartItemsCount = () => {
    const totalCount:number[] = [];
    cartItems.map((item) => totalCount.push(item.count));
    return totalCount.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  };

  return (
    <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket">
        </use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">{getCartItemsCount()}</span>
    </Link>
  );
}

export default CartCountLink;
