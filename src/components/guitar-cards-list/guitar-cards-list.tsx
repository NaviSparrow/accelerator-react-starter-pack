import {GuitarsList} from '../../types/guitar';
import GuitarCard from '../guitar-card/guitar-card';
import {useFetchGuitarsTotalCountQuery} from '../../service/api';
import {
  getInitialPageNumber,
  getNextPageNumber,
  getPaginationPages,
  getPrevPageNumber,
  INITIAL_GUITARS_COUNT
} from '../../const/const';
import {useState} from 'react';
import {ViewState} from '../catalog/catalog';

type GuitarCardsListProps = {
  guitarsList?: GuitarsList;
  viewState: ViewState;
  onChangeURL: (updatedViewState: ViewState) => void;
}

const DEFAULT_PAGES_LIMIT = 3;
const QUERY_LIMIT = 1;
const FIRST_PAGE = '1';
const ONE = 1;

function GuitarCardsList({guitarsList, viewState, onChangeURL}:GuitarCardsListProps):JSX.Element {
  const {data: guitarsCount} = useFetchGuitarsTotalCountQuery(QUERY_LIMIT);
  const [currentPage, setCurrentPage] = useState<string>(getInitialPageNumber(viewState));
  const [startPage, setStartPage] = useState<string>(FIRST_PAGE);

  const pagesTotalCount = guitarsCount && Math.ceil(guitarsCount && guitarsCount.totalCount / INITIAL_GUITARS_COUNT);

  const paginationPages = getPaginationPages(startPage, DEFAULT_PAGES_LIMIT);

  const changePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
    onChangeURL({...viewState, page: pageNumber.toString()});
  };

  const nextPageClickHandler = (nextPage: number) => {
    setCurrentPage(nextPage.toString());
    setStartPage(nextPage.toString());
    onChangeURL({...viewState, page: nextPage.toString()});
  };

  const prevPageClickHandler = (prevPage: number) => {
    setCurrentPage(prevPage.toString());
    setStartPage((prevPage - DEFAULT_PAGES_LIMIT + ONE).toString());
    onChangeURL({...viewState, page: prevPage.toString()});
  };

  return (
    <>
      <div className="cards catalog__cards">
        {guitarsList && guitarsList.map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} />))};
      </div>
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          <li className={`pagination__page pagination__page--prev ${Number(currentPage) <= DEFAULT_PAGES_LIMIT ? 'visually-hidden' : ''}`} id="prev">
            <a className="link pagination__page-link" onClick={() => prevPageClickHandler(getPrevPageNumber(paginationPages))}>Назад</a>
          </li>
          {paginationPages.map((pageNumber:number) =>  (
            <li key={pageNumber} className={`pagination__page ${pageNumber.toString() === currentPage ? 'pagination__page--active' : ''}`}>
              <a className="link pagination__page-link" onClick={() => changePageHandler(pageNumber)}>{pageNumber}</a>
            </li>
          ),
          )};
          <li className={`pagination__page pagination__page--next ${pagesTotalCount && pagesTotalCount <= DEFAULT_PAGES_LIMIT ? 'visually-hidden' : ''}`} id="next">
            <a className="link pagination__page-link" onClick={() => nextPageClickHandler(getNextPageNumber(paginationPages))}>Далее</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default GuitarCardsList;
