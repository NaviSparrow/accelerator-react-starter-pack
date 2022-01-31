import {useState} from 'react';
import {REVIEWS_PER_STEP} from '../../const/const';
import {CommentList} from '../../types/comment';

export const useShowReviews = (reviews: CommentList) => {
  const [reviewsToShow, setReviewsToShow] = useState(REVIEWS_PER_STEP);

  const showMoreClickHandler = () => {
    setReviewsToShow(reviewsToShow + REVIEWS_PER_STEP);
  };

  const checkShowMoreButton = () => reviews.length < REVIEWS_PER_STEP || reviewsToShow >= reviews.length;

  return {reviewsToShow, showMoreClickHandler, checkShowMoreButton};
};
