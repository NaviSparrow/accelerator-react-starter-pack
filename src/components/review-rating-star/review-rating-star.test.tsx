import ReviewRatingStar from './review-rating-star';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fakeStar = '2';
const fakeLabel = 'test';
const fakeOnChange = jest.fn();
const fakeUserRating = 2;

describe('Component: ReviewRatingStar', () => {
  it('should call onChange when click on star', () =>  {
    render(<ReviewRatingStar star={fakeStar} userRating={fakeUserRating} onChange={fakeOnChange} label={fakeLabel}/>);
    userEvent.click(screen.getByDisplayValue('2'));
    expect(fakeOnChange).toBeCalled();
  });
});
