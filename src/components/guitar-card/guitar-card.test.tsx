import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import GuitarCard from './guitar-card';
import {makeFakeGuitar} from '../../mocks/mocks';
import {createMemoryHistory} from 'history';
import {setUpStore} from '../../store/store';

const fakeGuitar = makeFakeGuitar();
const store = setUpStore();
const history = createMemoryHistory();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <GuitarCard guitar={fakeGuitar}/>}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
