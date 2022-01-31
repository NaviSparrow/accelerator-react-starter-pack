import {useFetchProductCommentsQuery} from '../../service/api';

export const useProductComments = (id: string | undefined) => {
  const {
    data: productComments,
    isError: isCommentsError,
    error: commentsError,
  } = useFetchProductCommentsQuery(id);

  return { productComments, isCommentsError, commentsError};
};
