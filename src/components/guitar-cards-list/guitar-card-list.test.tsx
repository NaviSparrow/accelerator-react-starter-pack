import {makeFakeGuitar, makeFakeGuitarsList} from '../../mocks/mocks';
import {setupApiStore} from '../../service/test-utils';
import {mainAPI, useFetchGuitarsTotalCountQuery} from '../../service/api';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import GuitarCardsList from './guitar-cards-list';
import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {renderHook} from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={storeRef.store}>{children}</Provider>
);

const fakeGuitarsList = makeFakeGuitarsList(5);
const fakeChangeURL = jest.fn();
const storeRef = setupApiStore(mainAPI);
const history = createMemoryHistory();
const fakeViewState = {};

describe('Component: GuitarCardList', () => {
  it('useFetchGuitarsTotalCountQuery should work correctly',async () => {
    const response = makeFakeGuitar();
    const totalCount = 0;
    const fakeResponse = {response, totalCount};

    const limit = 1;
    fetchMock.mockResponseOnce(JSON.stringify(response));
    const {result, waitForNextUpdate} = renderHook(() => useFetchGuitarsTotalCountQuery(limit), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });

  it('should render correctly', () => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <Route render={() => <GuitarCardsList guitarsList={fakeGuitarsList} onChangeURL={fakeChangeURL} viewState={fakeViewState}/>}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getAllByText(/Цена/i).length).toBe(fakeGuitarsList.length);
    expect(screen.getByText(`${fakeGuitarsList[fakeGuitarsList.length - 1].price} ₽`)).toBeInTheDocument();
    expect(screen.getAllByText(/Подробнее/i).length).toBe(fakeGuitarsList.length);
    expect(screen.getAllByText(/Купить/i).length).toBe(fakeGuitarsList.length);

    userEvent.click(screen.getByText(1));
    expect(fakeChangeURL).toBeCalled();
    userEvent.click(screen.getByText(2));
    expect(fakeChangeURL).toBeCalled();
    userEvent.click(screen.getByText(3));
    expect(fakeChangeURL).toBeCalled();
  });
});
