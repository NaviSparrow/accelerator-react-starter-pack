import NotFoundPage from './not-found-page';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';

const history = createMemoryHistory();
const store = testStore;

describe('Component: NotFoundPage', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <NotFoundPage/>}>
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
