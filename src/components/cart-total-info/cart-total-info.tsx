import React from 'react';
import {useSelector} from 'react-redux';
import {getCartItems, getCoupon} from '../../store/cart-reducer/cart-reducer';
import {getDiscountValue, getGuitarsIds, getTotalPrice, POST_ORDER_ERROR} from '../../const/const';
import {usePricesInCart} from '../../hooks/use-prices-in-cart/use-prices-in-cart';
import {useModalSuccessOrder} from '../../hooks/use-modal-success-order/use-modal-success-order';
import ModalSuccessOrder from '../modal-success-order/modal-success-order';
import {OrderPost} from '../../types/orderPost';
import {AsyncOrderMutation} from '../../types/util-types';
import {toast} from 'react-toastify';

type CartTotalInfoProps = {
  discount: number | undefined;
  onOrderPost: AsyncOrderMutation;
}

function CartTotalInfo({discount, onOrderPost}:CartTotalInfoProps) {
  const cartItems = useSelector(getCartItems);
  const coupon = useSelector(getCoupon);
  const {listOfPricesInCart} = usePricesInCart(cartItems);
  const {isModalSuccessOrderVisible, openModalSuccessOrder, closeModalSuccessOrder} = useModalSuccessOrder();

  const newOrder:OrderPost = {
    guitarsIds: getGuitarsIds(cartItems),
    coupon: coupon,
  };

  const totalPrice = getTotalPrice(listOfPricesInCart);
  const discountValue = getDiscountValue(discount as number, totalPrice);
  const priceToPay = discount ? totalPrice - discountValue : totalPrice;

  const clickHandler = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    try {
      await onOrderPost(newOrder).unwrap();
      openModalSuccessOrder();
    } catch (error) {
      toast.error(POST_ORDER_ERROR);
    }
  };

  return (
    <>
      <div className="cart__total-info">
        <p className="cart__total-item">
          <span className="cart__total-value-name">Всего:</span>
          <span className="cart__total-value">{totalPrice} ₽</span>
        </p>
        <p className={`cart__total-item ${!discount ? 'visually-hidden' : ''}`}>
          <span className="cart__total-value-name">Скидка:</span>
          <span className="cart__total-value cart__total-value--bonus">-{discountValue} ₽</span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">К оплате:</span>
          <span className="cart__total-value cart__total-value--payment">{priceToPay} ₽</span>
        </p>
        <button className="button button--red button--big cart__order-button" onClick={clickHandler}>Оформить заказ</button>
      </div>
      {isModalSuccessOrderVisible && <ModalSuccessOrder isVisible={isModalSuccessOrderVisible} onClose={closeModalSuccessOrder} totalPrice={priceToPay} />}
    </>
  );
}

export default CartTotalInfo;
