import fetchMock from 'jest-fetch-mock';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {setUpStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import GuitarProductScreen from './guitar-product-screen';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const history = createMemoryHistory();
const store = setUpStore();

describe('Component: GuitarProductScreen', () => {
  it('should render correctly', async () => {
    history.push(`${AppRoute.Guitars}/1`);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={`${AppRoute.Guitars}/:id`}>
            <GuitarProductScreen />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  });
});
