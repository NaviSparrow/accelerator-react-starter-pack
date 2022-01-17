import {Guitar} from '../../types/guitar';
import {nanoid} from 'nanoid';

type GuitarCardProps = {
  guitar: Guitar;
};

const STARS_COUNT = 5;

function GuitarCard(props:GuitarCardProps): JSX.Element {
  const {guitar} = props;
  const {previewImg, name, price, rating} = guitar;
  const starsArray = new Array(STARS_COUNT).fill(null);
  let count = 0;
  return (
    <div className="product-card"><img src={`./${previewImg}`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {starsArray.map((star) => {
            count++;
            return (
              <svg width="12" height="11" aria-hidden="true" key={nanoid()}>
                <use xlinkHref={`#icon${count <= Math.floor(rating) ? '-full-' : '-'}star`}></use>
              </svg>
            );
          })}
          <span className="rate__count">9</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price}`} ₽</p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
