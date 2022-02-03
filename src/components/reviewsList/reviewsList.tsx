import React from 'react';
import {Comment, CommentList} from '../../types/comment';
import Review from '../review/review';
import {AppRoute, sortByDate} from '../../const/const';
import ModalReview from '../modal-review/modal-review';
import {Guitar} from '../../types/guitar';
import ModalSuccessPostReview from '../modal-success-post-review/modal-success-post-review';
import {useNewReview} from '../../hooks/use-new-review/useNewReview';
import {useShowReviews} from '../../hooks/use-show-reviews/use-show-reviews';
import {useModalReview} from '../../hooks/use-modal-review/use-modal-review';
import {useModalSuccess} from '../../hooks/use-modal-success/use-modal-success';

type ReviewsProps = {
  reviews: CommentList;
  productInfo?: Guitar;
}

function ReviewsList({reviews, productInfo}:ReviewsProps):JSX.Element {
  const {reviewsToShow, showMoreClickHandler, checkShowMoreButton} = useShowReviews(reviews);
  const {isModalReviewVisible, openModalReview, closeModalReview} = useModalReview();
  const {isModalSuccessVisible, openModalSuccess, closeModalSuccess} = useModalSuccess();
  const {addReview, isReviewPostSuccess, reset, error} = useNewReview();

  if(isReviewPostSuccess){
    reset();
    closeModalReview();
    openModalSuccess();
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={openModalReview}>
        Оставить отзыв
      </button>
      {(productInfo && isModalReviewVisible) && <ModalReview productInfo={productInfo} isVisible={isModalReviewVisible} onClose={closeModalReview} onSubmitNewReview={addReview} error={error}/>}
      {isModalSuccessVisible && <ModalSuccessPostReview isVisible={isModalSuccessVisible} onClose={closeModalSuccess}/>}
      {
        reviews.slice()
          .sort(sortByDate)
          .slice(0, reviewsToShow)
          .map((review:Comment) => (<Review key={review.id} review={review} />))
      }
      <button className={`${checkShowMoreButton() ? 'visually-hidden' : 'button button--medium reviews__more-button'}`} onClick={showMoreClickHandler} data-testid='show more'>
        Показать еще отзывы
      </button>
      {reviews.length > 0
        ? <a className="button button--up button--red-border button--big reviews__up-button" style={{zIndex: 1}} href={`${AppRoute.Guitars}/${reviews[0].guitarId}#header`}>Наверх</a>
        : <h3>Поделитесь отзывом о товаре!</h3>}
    </section>
  );
}

export default ReviewsList;
