import SearchBar from '../searchBar/searchBar';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const/const';

function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo" href="#logo">
          <img className="logo__img" width="70" height="70" src="img/svg/logo.svg" alt="Логотип"/>
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className={`link main-nav__link ${location.pathname === AppRoute.Root ? 'link--current' : ''}`} to={AppRoute.Root}>Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="#--where">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#--about">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchBar />
        <a className="header__cart-link" href="#--cart" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket">
            </use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
