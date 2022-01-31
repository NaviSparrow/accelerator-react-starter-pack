import {useState} from 'react';

export const useModalReview = () => {
  const [isModalReviewVisible, setIsModalReviewVisible] = useState<boolean>(false);
  const openModalReview = () => {
    setIsModalReviewVisible(true);
  };

  const closeModalReview = () => {
    setIsModalReviewVisible(false);
  };

  return {isModalReviewVisible, openModalReview, closeModalReview};
};
