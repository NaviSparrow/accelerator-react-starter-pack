import {createMemoryHistory} from 'history';
import {useFetchAlikeGuitarsQuery} from '../../service/api';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import Header from './header';
import {Guitar} from '../../types/guitar';
import {makeFakeGuitarsList} from '../../mocks/mocks';
import fetchMock from 'jest-fetch-mock';
import {renderHook} from '@testing-library/react-hooks';
import {ReactNode} from 'react';
import {testStore} from '../../store/store';

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
const store = testStore;

describe('Component: Header', () => {
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

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <Header />}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Поиск/i).length).toBe(2);
  });
});
