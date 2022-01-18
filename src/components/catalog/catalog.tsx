import Filter from '../filter/filter';
import Sort from '../sort/sort';
import GuitarCardsList from '../guitar-cards-list/guitar-cards-list';
import {useFetchGuitarsListQuery} from '../../service/api';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRoute, INITIAL_GUITARS_COUNT, parseURLtoViewState, stringifyViewState} from '../../const/const';
import Loader from '../loader/loader';

export type Type = {
  acoustic?: string;
  electric?: string;
  ukulele?: string;
}
export type StringCount = {
  fourStrings?: string;
  sixStrings?: string;
  sevenStrings?: string;
  twelveStrings?: string;
}
export type ViewState = {
  sort?: string;
  order?: string;
  type?: string;
  stringCount?: string;
  price_gte?: string;
  price_lte?: string;
  page?: string;
}

function Catalog ():JSX.Element {
  const history = useHistory();
  const location = useLocation<string>();
  const urlQueryParams = location.search;
  const viewState:ViewState = parseURLtoViewState(urlQueryParams);

  const limit = INITIAL_GUITARS_COUNT;
  const ERROR_TEXT = 'Произошла ошибка';

  const changeURL = (updatedViewState: ViewState) => {
    const newLocation = {...location, pathname:AppRoute.Guitars, search: stringifyViewState(updatedViewState)};
    history.push(newLocation);
  };

  const {data: guitarsList, isLoading, isError, error} = useFetchGuitarsListQuery(
    {
      limit,
      sort: viewState.sort,
      order: viewState.order,
      type: viewState.type,
      stringCount: viewState.stringCount,
      minPrice: viewState.price_gte,
      maxPrice: viewState.price_lte,
      page: viewState.page,
    });

  if (isError) {
    if (error && 'status' in error){
      return <h1>{`${ERROR_TEXT} ${error.status}`}</h1>;
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="catalog">
      <Filter
        viewState={viewState}
        onChangeURL={changeURL}
      />
      <Sort
        viewState={viewState}
        onChangeURL={changeURL}
      />
      <GuitarCardsList
        guitarsList={guitarsList}
        viewState={viewState}
        onChangeURL={changeURL}
      />
    </div>
  );
}
export default Catalog;
