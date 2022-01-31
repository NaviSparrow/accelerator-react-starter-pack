import fetchMock from 'jest-fetch-mock';
import {useFetchMaxPriceQuery, useFetchMinPriceQuery} from '../../service/api';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import Filter from './filter';
import userEvent from '@testing-library/user-event';
import {Guitar} from '../../types/guitar';
import {makeFakeGuitarsList} from '../../mocks/mocks';
import {renderHook} from '@testing-library/react-hooks';
import {ReactNode} from 'react';
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

const store = setUpStore();
const history = createMemoryHistory();
const viewState = {};
const changeURL = jest.fn();

describe('Component: Filter', () => {
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
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchMaxPriceQuery(args), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <Filter viewState={viewState} onChangeURL={changeURL}/>}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('priceMin'), '1700');
    userEvent.type(screen.getByTestId('priceMax'), '2000');
    expect(screen.getByDisplayValue(/1700/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2000/i)).toBeInTheDocument();
  });
});

