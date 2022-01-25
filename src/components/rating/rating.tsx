import React from 'react';
import {nanoid} from 'nanoid';

const STARS_COUNT = 5;

type RatingProps = {
  guitarRating: number;
}

function Rating({guitarRating}:RatingProps):JSX.Element {
  const starsArray = new Array(STARS_COUNT).fill(null);
  let count = 0;
  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {starsArray.map((star) => {
        count++;
        return (
          <svg width="12" height="11" aria-hidden="true" key={nanoid()}>
            <use xlinkHref={`#icon${count <= Math.floor(guitarRating) ? '-full-' : '-'}star`}>
            </use>
          </svg>
        );
      })}
    </div>
  );
}

export default Rating;
