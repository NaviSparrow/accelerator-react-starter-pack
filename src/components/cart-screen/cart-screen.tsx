import React from 'react';
import Icons from '../../icons/icons';
import Header from '../header/header';
import {useSelector} from 'react-redux';
import {getCartItems} from '../../store/cart-reducer/cart-reducer';
import {Link} from 'react-router-dom';
import {AppRoute, NO_ITEMS_IN_CART} from '../../const/const';
import CartItem from '../cart-item/cart-item';
import CartCoupon from '../cart-coupon/cart-coupon';
import CartTotalInfo from '../cart-total-info/cart-total-info';
import {useAddCouponForDiscountMutation, usePostNewOrderMutation} from '../../service/api';


function CartScreen():JSX.Element {
  const cartItems = useSelector(getCartItems);
  const [applyCoupon, {data: couponResponse, isSuccess, isError}] = useAddCouponForDiscountMutation();
  const [postOrder] = usePostNewOrderMutation();

  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
              <li className="breadcrumbs__item"><a className="link" href="/#" onClick={(evt) => evt.preventDefault()}>Главная</a>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link" href={'/#'}>Корзина</a>
              </li>
            </ul>
            <div className="cart">
              {cartItems.length === 0
                ? <h2 className="title--bigger">{NO_ITEMS_IN_CART}</h2>
                : cartItems.map((item) => <CartItem key={item.guitar.id} cartItemInfo={item}/>)}
              <div className="cart__footer">
                {cartItems.length !== 0 && <CartCoupon onApplyCoupon={applyCoupon} isSuccess={isSuccess} isError={isError} />}
                {cartItems.length !== 0 && <CartTotalInfo discount={couponResponse} onOrderPost={postOrder}/>}
              </div>
            </div>
          </div>
        </main>
        <footer />
      </div>
    </>
  );
}

export default CartScreen;
