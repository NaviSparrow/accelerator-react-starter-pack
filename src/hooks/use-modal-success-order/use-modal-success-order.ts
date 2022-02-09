import {useState} from 'react';

export const useModalSuccessOrder = () => {
  const [isModalSuccessOrderVisible, setIsModalSuccessOrderVisible] = useState(false);

  const openModalSuccessOrder = () => {
    setIsModalSuccessOrderVisible(true);
  };

  const closeModalSuccessOrder = () => {
    setIsModalSuccessOrderVisible(false);
  };

  return {isModalSuccessOrderVisible, openModalSuccessOrder, closeModalSuccessOrder};
};
