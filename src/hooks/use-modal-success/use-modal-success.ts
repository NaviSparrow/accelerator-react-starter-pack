import {useState} from 'react';

export const useModalSuccess = () => {
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState<boolean>(false);

  const openModalSuccess = () => {
    setIsModalSuccessVisible(true);
  };

  const closeModalSuccess = () => {
    setIsModalSuccessVisible(false);
  };
  return {isModalSuccessVisible, openModalSuccess, closeModalSuccess};
};
