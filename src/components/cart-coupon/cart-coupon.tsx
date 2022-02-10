import React, {useState} from 'react';
import {AsyncCouponMutation} from '../../types/util-types';
import {Coupon} from '../../types/coupon';
import {toast} from 'react-toastify';
import {COUPON_ERROR_TEXT, COUPON_SUCCESS_TEXT} from '../../const/const';
import {useDispatch} from 'react-redux';
import {setCoupon} from '../../store/action';

type CartCouponProps = {
  onApplyCoupon: AsyncCouponMutation;
  isSuccess: boolean;
  isError: boolean;
}

function CartCoupon({onApplyCoupon, isSuccess, isError}:CartCouponProps) {
  const [currentCoupon, setCurrentCoupon] = useState('');
  const dispatch = useDispatch();

  const couponData:Coupon = {
    coupon: currentCoupon.toLowerCase(),
  };

  const clickHandler = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    try {
      await onApplyCoupon(couponData).unwrap();
      toast.success(COUPON_SUCCESS_TEXT);
      dispatch(setCoupon(currentCoupon));
      setCurrentCoupon('');
    } catch (error) {
      toast.error(COUPON_ERROR_TEXT);
    }
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCoupon(evt.target.value);
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" value={currentCoupon} onChange={changeHandler} data-testid="couponInput"/>
          {isSuccess && <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {isError && <p className="form-input__message form-input__message--error">Неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button" data-testid="couponButton" onClick={clickHandler}>Применить</button>
      </form>
    </div>
  );
}

export default CartCoupon;
