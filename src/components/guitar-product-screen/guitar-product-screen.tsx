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
  AppRoute, COMMENTS_ERROR_TEXT,
  PAGE_NOT_FOUND, PRODUCT_INFO_ERROR_TEXT
} from '../../const/const';
import Loader from '../loader/loader';
import NotFoundPage from '../not-found-page/not-found-page';

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

  if (isProductInfoError) {
    if (productInfoError && 'status' in productInfoError) {
      if (productInfoError.status === PAGE_NOT_FOUND) {
        return <NotFoundPage />;
      }
      return <h1>{`${PRODUCT_INFO_ERROR_TEXT} ${productInfoError.status}`}</h1>;
    }
  }

  if (isCommentsError) {
    if (commentsError && 'status' in commentsError) {
      if (commentsError.status === PAGE_NOT_FOUND) {
        return <NotFoundPage />;
      }
      return <h1>{`${COMMENTS_ERROR_TEXT} ${commentsError.status}`}</h1>;
    }
  }

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
