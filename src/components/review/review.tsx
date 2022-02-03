import React from 'react';
import {Comment} from '../../types/comment';
import Rating from '../rating/rating';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type ReviewProps = {
  review: Comment;
}

const formatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM').toString();

function Review({review}:ReviewProps):JSX.Element {
  const {userName, rating, disadvantage, advantage, comment, createAt} = review;
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{formatDate(createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <Rating guitarRating={rating} />
        <span className="rate__count"/>
        <span className="rate__message"/>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default Review;
