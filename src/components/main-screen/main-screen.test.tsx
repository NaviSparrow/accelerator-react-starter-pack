import {createMemoryHistory} from 'history';
import {
  useFetchAlikeGuitarsQuery,
  useFetchGuitarsListQuery,
  useFetchMaxPriceQuery,
  useFetchMinPriceQuery
} from '../../service/api';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import MainScreen from './main-screen';
import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {Guitar} from '../../types/guitar';
import {makeFakeGuitarsList} from '../../mocks/mocks';
import {renderHook} from '@testing-library/react-hooks';
import {setUpStore} from '../../store/store';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

const history = createMemoryHistory();
const store = setUpStore();

describe('Component: MainScreen', () => {
  it('useFetchAlikeGuitarsQuery should work correctly',async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);

    const name = 'cur';
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchAlikeGuitarsQuery(name), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });

  it('useFetchMinPriceQuery should work correctly',async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);

    const args = {
      type: undefined,
      stringCount: undefined,
    };
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchMinPriceQuery(args), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });

  it('useFetchMaxPriceQuery should work correctly',async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);
    const args = {
      type: undefined,
      stringCount: undefined,
    };
    fetchMock.mockResponseOnce(JSON.stringify({response: fakeResponse}));
    const {result, waitForNextUpdate} = renderHook(() => useFetchMaxPriceQuery(args), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual({response:fakeResponse});
  });

  it('useFetchGuitarsListQuery should work correctly', async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);

    const args = {
      limit: 1,
      sort: undefined,
      order: undefined,
      type: undefined,
      stringCount: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      page: undefined,
    };

    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchGuitarsListQuery(args), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual({response:fakeResponse,totalCount: 0});
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <MainScreen/>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Где купить?/i).length).toBe(2);
    expect(screen.getByText(/О Компании?/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });
});
