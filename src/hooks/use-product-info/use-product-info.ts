import {useFetchProductInfoQuery} from '../../service/api';

export const useProductInfo = (id: string | undefined) => {
  const {
    data: productInfo,
    isLoading: isInfoLoading,
    isError: isProductInfoError,
    error: productInfoError,
  } = useFetchProductInfoQuery(id);

  return {productInfo, isInfoLoading, isProductInfoError, productInfoError};
};
