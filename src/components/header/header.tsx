import SearchBar from '../searchBar/searchBar';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const/const';
// import {useSelector} from 'react-redux';
// import {getCartItems} from '../../store/cart-reducer/cart-reducer';
import CartCountLink from '../cart-count-link/cart-count-link';

function Header(): JSX.Element {
  const location = useLocation();
  // const cartItems = useSelector(getCartItems);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="#">
          <img className="logo__img" width="70" height="70" src="img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className={`link main-nav__link ${location.pathname === AppRoute.Root ? 'link--current' : ''}`} to={AppRoute.Root}>Каталог</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchBar />
        <CartCountLink />
      </div>
    </header>
  );
}

export default Header;
