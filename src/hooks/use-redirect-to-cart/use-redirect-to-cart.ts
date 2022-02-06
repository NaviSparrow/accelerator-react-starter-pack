import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const/const';

export const useRedirectToCart = () => {
  const history = useHistory();

  const redirectToCart = () => {
    history.push(AppRoute.Cart);
  };

  return {redirectToCart};
};
