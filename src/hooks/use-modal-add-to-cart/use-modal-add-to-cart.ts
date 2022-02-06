import {useState} from 'react';

export const useModalAddToCart = () => {
  const [isModalAddToCartVisible, setIsModalAddToCartVisible] = useState(false);

  const openModalAddToCart = () => {
    setIsModalAddToCartVisible(true);
  };

  const closeModalAddToCart = () => {
    setIsModalAddToCartVisible(false);
  };

  return {isModalAddToCartVisible, openModalAddToCart, closeModalAddToCart};
};
