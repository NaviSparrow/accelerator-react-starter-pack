import {act, renderHook} from '@testing-library/react-hooks';
import {useModalReview} from './use-modal-review';

describe('Hook useModalReview', () => {
  it('should set state to true on openModalReview', () => {
    const {result} = renderHook(useModalReview);
    expect(result.current.isModalReviewVisible).toBe(false);

    act(() => {
      result.current.openModalReview();
    });

    expect(result.current.isModalReviewVisible).toBe(true);
  });

  it('should set state to false on closeModalReview', () => {
    const {result} = renderHook(useModalReview);
    expect(result.current.isModalReviewVisible).toBe(false);
    act(() => {
      result.current.openModalReview();
    });

    expect(result.current.isModalReviewVisible).toBe(true);

    act(() => {
      result.current.closeModalReview();
    });

    expect(result.current.isModalReviewVisible).toBe(false);
  });
});
