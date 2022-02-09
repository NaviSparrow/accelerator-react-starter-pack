import {useState} from 'react';


export const useModalDeleteFromCart = () => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const openModalDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteVisible(false);
  };

  return {isModalDeleteVisible, openModalDelete, closeModalDelete};
};
