import {act, renderHook} from '@testing-library/react-hooks';
import {useShowReviews} from './use-show-reviews';
import {REVIEWS_PER_STEP} from '../../const/const';
import {makeFakeCommentsList} from '../../mocks/mocks';

describe('Hook useShowReviews', () => {
  it('should change amount of reviews to show on showMoreClickHandler', () => {
    const {result} = renderHook(() => useShowReviews(makeFakeCommentsList(2)));
    expect(result.current.reviewsToShow).toBe(REVIEWS_PER_STEP);

    act(() => {
      result.current.showMoreClickHandler();
    });

    expect(result.current.reviewsToShow).toBe(6);

    act(() => {
      result.current.showMoreClickHandler();
    });

    expect(result.current.reviewsToShow).toBe(9);
  });

  it('should return true if reviews < REVIEWS_PER_STEP',() => {
    const {result} = renderHook(() => useShowReviews(makeFakeCommentsList(2)));

    expect(result.current.checkShowMoreButton()).toBe(true);
  });
});
