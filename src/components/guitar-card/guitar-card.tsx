import {Guitar} from '../../types/guitar';
import {Link} from 'react-router-dom';
import {AppRoute, isGuitarInCart, NOT_FOUND} from '../../const/const';
import Rating from '../rating/rating';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';
import {useModalAddToCart} from '../../hooks/use-modal-add-to-cart/use-modal-add-to-cart';
import {useModalSuccessAddToCart} from '../../hooks/use-modal-success-add-to-cart/use-modal-success-add-to-cart';
import ModalSuccessAddToCart from '../modal-success-add-to-cart/modal-success-add-to-cart';
import {useSelector} from 'react-redux';
import {getCartItems} from '../../store/cart-reducer/cart-reducer';
import React from 'react';
import {useRedirectToCart} from '../../hooks/use-redirect-to-cart/use-redirect-to-cart';

type GuitarCardProps = {
  guitarInfo: Guitar;
};

function GuitarCard(props:GuitarCardProps): JSX.Element {
  const {guitarInfo} = props;
  const {previewImg, name, price, rating, id} = guitarInfo;
  const {isModalAddToCartVisible, openModalAddToCart, closeModalAddToCart} = useModalAddToCart();
  const {isModalSuccessAddVisible, openModalSuccessAdd, closeModalSuccessAdd} = useModalSuccessAddToCart();
  const cartItems = useSelector(getCartItems);
  const {redirectToCart} = useRedirectToCart();

  const changeModals = () => {
    closeModalAddToCart();
    openModalSuccessAdd();
  };

  const clickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    isGuitarInCart(cartItems, guitarInfo) === NOT_FOUND ? openModalAddToCart() : redirectToCart();
  };

  return (
    <>
      <div className="product-card">
        <img src={`./${previewImg}`} width="75" height="190" alt={name}/>
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
            <Rating guitarRating={rating}/>
            <span className="rate__count">{guitarInfo.comments && guitarInfo.comments.length}</span>
            <span className="rate__message">
            </span>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price}`} ₽</p>
        </div>
        <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.Guitars}/${id}`}>Подробнее</Link>
          <a
            className={`button button--mini ${isGuitarInCart(cartItems, guitarInfo) === NOT_FOUND ? 'button--red button--add-to-cart' : 'button--red-border button--in-cart'}`}
            href="/#"
            onClick={clickHandler}
          >{isGuitarInCart(cartItems, guitarInfo) === NOT_FOUND ? 'Купить' :  'В Корзине'}
          </a>
        </div>
      </div>
      {isModalAddToCartVisible && <ModalAddToCart isVisible={isModalAddToCartVisible} onClose={closeModalAddToCart} productInfo={guitarInfo} onSuccessAddToCart={changeModals} />}
      {isModalSuccessAddVisible && <ModalSuccessAddToCart isVisible={isModalSuccessAddVisible} onClose={closeModalSuccessAdd} />}
    </>
  );
}

export default GuitarCard;
