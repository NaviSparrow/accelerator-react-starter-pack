import React, {useState} from 'react';
import {CommentList} from '../../types/comment';
import Review from '../review/review';
import {AppRoute} from '../../const/const';

type ReviewsProps = {
  reviews: CommentList;
}

const REVIEWS_PER_STEP = 3;

function ReviewsList({reviews}:ReviewsProps):JSX.Element {
  const [reviewsToShow, setReviewsToShow] = useState(REVIEWS_PER_STEP);

  const showMoreClickHandler = () => {
    setReviewsToShow(reviewsToShow + REVIEWS_PER_STEP);
  };

  const checkShowMoreButton = () => reviews.length < REVIEWS_PER_STEP || reviewsToShow >= reviews.length;


  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
      {reviews && reviews.slice(0, reviewsToShow).map((review) => (<Review key={review.id} review={review} />))}
      <button className={`${checkShowMoreButton() ? 'visually-hidden' : 'button button--medium reviews__more-button'}`}
        onClick={showMoreClickHandler}
      >Показать еще отзывы
      </button>
      {reviews.length > 0
        ? <a className="button button--up button--red-border button--big reviews__up-button" href={ `${AppRoute.Guitars}/${reviews[0].guitarId}#header`}>Наверх</a>
        : <h3>Поделитесь отзывом о товаре!</h3>}
    </section>
  );
}

export default ReviewsList;
