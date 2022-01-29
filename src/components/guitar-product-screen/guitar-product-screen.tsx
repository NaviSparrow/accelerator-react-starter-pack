import Icons from '../../icons/icons';
import Header from '../header/header';
import ProductInfo from '../product-info/product-info';
import ReviewsList from '../reviewsList/reviewsList';
import Footer from '../footer/footer';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {
  useFetchProductCommentsQuery,
  useFetchProductInfoQuery
} from '../../service/api';
import {
  AppRoute,
  isCommentsFetchHasError,
  isProductFetchHasError
} from '../../const/const';
import Loader from '../loader/loader';

function GuitarProductScreen(): JSX.Element {
  const {id} = useParams<{ id?: string }>();

  const {
    data: productInfo,
    isLoading: isInfoLoading,
    isError: isProductInfoError,
    error: productInfoError,
  } = useFetchProductInfoQuery(id);
  const {
    data: productComments,
    isError: isCommentsError,
    error: commentsError,
  } = useFetchProductCommentsQuery(id);

  isProductFetchHasError(productInfoError, isProductInfoError);
  isCommentsFetchHasError(commentsError, isCommentsError);

  return (
    <>
      <Icons/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">{productInfo && productInfo.name}</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">{productInfo && productInfo.name}</a>
              </li>
            </ul>
            {isInfoLoading
              ? <Loader/>
              : productInfo && <ProductInfo productInfo={productInfo}/>}
            {productComments && <ReviewsList reviews={productComments} productInfo={productInfo}/>}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default GuitarProductScreen;
