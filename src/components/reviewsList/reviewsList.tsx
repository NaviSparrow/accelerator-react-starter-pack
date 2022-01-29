import React, {useState} from 'react';
import {Comment, CommentList} from '../../types/comment';
import Review from '../review/review';
import {AppRoute} from '../../const/const';
import ModalReview from '../modal-review/modal-review';
import {Guitar} from '../../types/guitar';
import {useAddReviewMutation} from '../../service/api';
import dayjs from 'dayjs';
import ModalSuccessPostReview from '../modal-success-post-review/modal-success-post-review';

type ReviewsProps = {
  reviews: CommentList;
  productInfo?: Guitar;
}

const sortByDate = (reviewA:Comment, reviewB:Comment) => {
  const dateA = dayjs(reviewA.createAt);
  const dateB = dayjs(reviewB.createAt);

  return dateB.diff(dateA, 'minute');
};

const REVIEWS_PER_STEP = 3;

function ReviewsList({reviews, productInfo}:ReviewsProps):JSX.Element {
  const [reviewsToShow, setReviewsToShow] = useState(REVIEWS_PER_STEP);
  const [isModalReviewVisible, setIsModalReviewVisible] = useState<boolean>(false);
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState<boolean>(false);

  const openModalReviewHandler = () => {
    setIsModalReviewVisible(true);
  };

  const closeModalReviewHandler = () => {
    setIsModalReviewVisible(false);
  };

  const openModalSuccessHandler = () => {
    setIsModalSuccessVisible(true);
  };

  const closeModalSuccessHandler = () => {
    setIsModalSuccessVisible(false);
  };

  const showMoreClickHandler = () => {
    setReviewsToShow(reviewsToShow + REVIEWS_PER_STEP);
  };

  const [addReview, {isSuccess:isReviewPostSuccess, reset, error}] = useAddReviewMutation();

  if(isReviewPostSuccess){
    reset();
    closeModalReviewHandler();
    openModalSuccessHandler();
  }

  const checkShowMoreButton = () => reviews.length < REVIEWS_PER_STEP || reviewsToShow >= reviews.length;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={openModalReviewHandler}>
        Оставить отзыв
      </button>
      {(productInfo && isModalReviewVisible) && <ModalReview productInfo={productInfo} isVisible={isModalReviewVisible} onClose={closeModalReviewHandler} onSubmitNewReview={addReview} error={error}/>}
      {isModalSuccessVisible && <ModalSuccessPostReview isVisible={isModalSuccessVisible} onClose={closeModalSuccessHandler}/>}
      {
        reviews.slice()
          .sort(sortByDate)
          .slice(0, reviewsToShow)
          .map((review:Comment) => (<Review key={review.id} review={review} />))
      }
      <button className={`${checkShowMoreButton() ? 'visually-hidden' : 'button button--medium reviews__more-button'}`} onClick={showMoreClickHandler}>
        Показать еще отзывы
      </button>
      {reviews.length > 0
        ? <a className="button button--up button--red-border button--big reviews__up-button" href={`${AppRoute.Guitars}/${reviews[0].guitarId}#header`}>Наверх</a>
        : <h3>Поделитесь отзывом о товаре!</h3>}
    </section>
  );
}

export default ReviewsList;
