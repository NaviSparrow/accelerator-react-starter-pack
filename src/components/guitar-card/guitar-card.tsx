import {Guitar} from '../../types/guitar';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import Rating from '../rating/rating';

type GuitarCardProps = {
  guitar: Guitar;
};

function GuitarCard(props:GuitarCardProps): JSX.Element {
  const {guitar} = props;
  const {previewImg, name, price, rating, id} = guitar;

  return (
    <div className="product-card"><img src={`./${previewImg}`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <Rating guitarRating={rating}/>
          <span className="rate__count">{guitar.comments && guitar.comments.length}</span>
          <span className="rate__message">
          </span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price}`} ₽</p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.Guitars}/${id}`}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
