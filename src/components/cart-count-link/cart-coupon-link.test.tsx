import {createMemoryHistory} from 'history';
import {testStore} from '../../store/store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import CartCountLink from './cart-count-link';
import * as Redux from 'react-redux';
import {makeFakeCartItems} from '../../mocks/mocks';

const history = createMemoryHistory();
const store = testStore;

describe('Component: CartCountLink', () => {
  it('should render correctly', () => {
    const fakeCartItems = makeFakeCartItems(1);
    const useSelector = jest.spyOn(Redux, 'useSelector');
    useSelector.mockReturnValue(fakeCartItems);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <CartCountLink/>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(`${fakeCartItems[0].count}`)).toBeInTheDocument();
  });
});
