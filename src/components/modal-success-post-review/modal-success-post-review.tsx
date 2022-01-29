import ReactFocusLock from 'react-focus-lock';
import useLockBodyScroll from '../../hooks/use-lock-body-scroll';
import useEscapeEventListener from '../../hooks/use-escape-event-listener';

type ModalSuccessPostReviewProps = {
  isVisible: boolean;
  onClose: () => void;
}

function ModalSuccessPostReview({isVisible, onClose}:ModalSuccessPostReviewProps):JSX.Element {
  useLockBodyScroll();
  useEscapeEventListener(onClose);
  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active' : ''} modal--success`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"/>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={onClose}>К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onClose}>
              <span className="button-cross__icon"/>
              <span className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessPostReview;
