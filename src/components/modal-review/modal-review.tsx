import React, {ChangeEvent, useState} from 'react';
import {Guitar} from '../../types/guitar';
import {CommentPost} from '../../types/comment-post';
import {AsyncFunctionMutation} from '../../types/util-types';
import ReviewRatingStar from '../review-rating-star/review-rating-star';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import ReactFocusLock from 'react-focus-lock';
import useLockBodyScroll from '../../hooks/use-lock-body-scroll/use-lock-body-scroll';
import useEscapeEventListener from '../../hooks/use-escape-event-listener/use-escape-event-listener';
import {
  REVIEW_FIELDS_ERROR_TEXT,
  REVIEW_POST_ERROR_TEXT,
  REVIEW_POST_SUCCESS_TEXT,
  reviewRating
} from '../../const/const';

type ModalReviewProps = {
  productInfo: Guitar;
  isVisible: boolean;
  onClose: () => void;
  onSubmitNewReview: AsyncFunctionMutation;
  error:  FetchBaseQueryError | SerializedError | undefined;
}

function ModalReview({productInfo, isVisible, onClose, onSubmitNewReview, error}: ModalReviewProps):JSX.Element {
  useLockBodyScroll();
  useEscapeEventListener(onClose);

  const [userName, setUserName] = useState<string>('');
  const [advantages, setAdvantages] = useState<string>('');
  const [disadvantages, setDisadvantages] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [notValidFlag, setNotValidFlag] = useState(false);

  const newReview: CommentPost = {
    guitarId: productInfo.id,
    userName: userName,
    advantage: advantages,
    disadvantage: disadvantages,
    comment: comment,
    rating: rating,
  };

  const resetReviewForm = () => {
    setUserName('');
    setAdvantages('');
    setDisadvantages('');
    setComment('');
    setRating(0);
  };

  const submitButtonHandler = async () => {
    await onSubmitNewReview(newReview).unwrap();
    resetReviewForm();
  };

  const isReviewNotValid = ():boolean => userName.length === 0 || rating === 0 || advantages.length === 0 || disadvantages.length === 0 || comment.length === 0;

  const showNotValidFields = () => {
    setNotValidFlag(true);
  };

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active' : ''}  modal--review`}>
        {error ? <span>Заполните все поля</span> : ''}
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{productInfo.name}</h3>
            <form className="form-review">
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"
                    value={userName}
                    onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                      setUserName(target.value);
                    }}
                  />
                  {(userName.length === 0 && notValidFlag) && <span className={`${userName.length < 2 ? 'form-review__warning' : 'visually-hidden'}`}>Заполните поле</span>}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    {
                      Object.entries(reviewRating)
                        .reverse()
                        .map(([star, label]) => <ReviewRatingStar key={star} star={star} label={label} onChange={setRating} userRating={rating} />)
                    }
                    <span className="rate__count"/>
                    <span className={`${rating === 0 && notValidFlag ? 'rate__message' : 'visually-hidden'}`}>Поставьте оценку</span>
                  </div>
                </div>
              </div>
              <label className="form-review__label " htmlFor="user-name">Достоинства</label>
              <input className="form-review__input " id="pros" type="text" autoComplete="off"
                value={advantages}
                onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                  setAdvantages(target.value);
                }}
              />
              <span className={`${advantages.length === 0 && notValidFlag ? 'form-review__warning' : 'visually-hidden'}`}>Заполните поле</span>
              <label className="form-review__label " htmlFor="user-name">Недостатки</label>
              <input className="form-review__input" id="user-name" type="text" autoComplete="off"
                value={disadvantages}
                onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                  setDisadvantages(target.value);
                }}
              />
              <span className={`${disadvantages.length === 0 && notValidFlag ? 'form-review__warning' : 'visually-hidden'}`}>Заполните поле</span>
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"
                value={comment}
                onChange={({target}:ChangeEvent<HTMLTextAreaElement>) => {
                  setComment(target.value);
                }}
              >
              </textarea>
              <span className={`${comment.length === 0 && notValidFlag ? 'form-review__warning' : 'visually-hidden'}`}>Заполните поле</span>
              <button className="button button--medium-20 form-review__button" type="submit" data-testid='submit'
                onClick={(evt) => {
                  evt.preventDefault();
                  if(isReviewNotValid()) {
                    showNotValidFields();
                    return toast.error(REVIEW_FIELDS_ERROR_TEXT);
                  } else {
                    setNotValidFlag(false);
                    submitButtonHandler()
                      .then(() => toast.success(REVIEW_POST_SUCCESS_TEXT))
                      .catch(() => toast.error(REVIEW_POST_ERROR_TEXT));
                  }
                }}
              >Отправить отзыв
              </button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              onClick={onClose}
            >
              <span className="button-cross__icon"/>
              <span className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalReview;
