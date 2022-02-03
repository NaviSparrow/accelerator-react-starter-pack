import React from 'react';

type ReviewRatingStarProps = {
  star: string;
  label: string;
  onChange:  React.Dispatch<React.SetStateAction<number>>;
  userRating: number;
}

function ReviewRatingStar({star, label, onChange, userRating}:ReviewRatingStarProps):JSX.Element {
  const checkRating = () => {
    if (userRating === 0) {
      return false;
    }
  };

  return (
    <>
      <input className="visually-hidden" type="radio" id={`star-${star}`} name="rate" value={star} checked={checkRating()}
        onChange={() => onChange(Number(star))}
      />
      <label className="rate__label" tabIndex={0} htmlFor={`star-${star}`} title={label}/>
    </>
  );
}

export default ReviewRatingStar;
