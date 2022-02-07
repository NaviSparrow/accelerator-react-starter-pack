import {useState} from 'react';

export const useModalDeleteFromCart = (count: number) => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const openModalDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteVisible(false);
  };

  return {isModalDeleteVisible, openModalDelete, closeModalDelete};
};
