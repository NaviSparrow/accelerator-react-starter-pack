import {Guitar} from '../../types/guitar';
import Rating from '../rating/rating';
import Tabs from '../tabs/tabs';
import React from 'react';

type ProductInfoProps = {
  productInfo: Guitar;
}

function ProductInfo({productInfo}:ProductInfoProps):JSX.Element {
  const {name, price, previewImg, rating} = productInfo;

  return (
    <div className="product-container">
      <img className="product-container__img" src={previewImg} width="90" height="235" alt={name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true">
          <Rating guitarRating={rating}/>
          <span className="rate__count"/>
          <span className="rate__message"/>
        </div>
        <Tabs productInfo={productInfo} />
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
        <a className="button button--red button--big product-container__button" href="/#" onClick={(evt) => evt.preventDefault()}>Добавить в корзину</a>
      </div>
    </div>
  );
}

export default React.memo(ProductInfo, (prevProps, nextProps) => prevProps.productInfo === nextProps.productInfo);
