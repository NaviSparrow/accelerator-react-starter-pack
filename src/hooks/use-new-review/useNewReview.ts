import {useAddReviewMutation} from '../../service/api';

export const useNewReview = () => {
  const [addReview, {isSuccess:isReviewPostSuccess, reset, error}] = useAddReviewMutation();

  return {addReview, isReviewPostSuccess, reset, error};
};
