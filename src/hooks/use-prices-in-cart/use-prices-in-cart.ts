import {useEffect, useState} from 'react';
import {getListOfPrices} from '../../const/const';
import {CartItemsType} from '../../store/cart-reducer/cart-reducer';

export const usePricesInCart = (cartItems: CartItemsType) => {
  const [listOfPricesInCart, setListOfPricesInCart] = useState(getListOfPrices(cartItems));

  useEffect(() => {
    if (cartItems.length === 0) {
      setListOfPricesInCart([]);
    }
    setListOfPricesInCart(getListOfPrices(cartItems));
  }, [cartItems]);

  return {listOfPricesInCart};
};
