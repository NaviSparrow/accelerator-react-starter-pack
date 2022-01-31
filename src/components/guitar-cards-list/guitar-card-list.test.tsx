import {makeFakeGuitarsList} from '../../mocks/mocks';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import GuitarCardsList from './guitar-cards-list';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';
import {datatype} from 'faker';
import {setUpStore} from '../../store/store';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const fakeGuitarsList = makeFakeGuitarsList(5);
const fakeChangeURL = jest.fn();
const store= setUpStore();
const history = createMemoryHistory();
const fakeViewState = {};

describe('Component: GuitarCardList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <GuitarCardsList guitarsList={{response:fakeGuitarsList, totalCount: datatype.number(12) }} onChangeURL={fakeChangeURL} viewState={fakeViewState}/>}>
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
