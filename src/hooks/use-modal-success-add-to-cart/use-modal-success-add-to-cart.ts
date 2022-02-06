import {useState} from 'react';

export const useModalSuccessAddToCart = () => {
  const [isModalSuccessAddVisible, setIsModalSuccessAddVisible] = useState(false);
  const openModalSuccessAdd = () => {
    setIsModalSuccessAddVisible(true);
  };

  const closeModalSuccessAdd = () => {
    setIsModalSuccessAddVisible(false);
  };

  return {isModalSuccessAddVisible, openModalSuccessAdd, closeModalSuccessAdd};
};
