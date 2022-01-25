import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import MainScreen from '../main-screen/main-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import GuitarProductScreen from '../guitar-product-screen/guitar-product-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.Guitars}>
        <MainScreen />
      </Route>
      <Route exact path={`${AppRoute.Guitars}/:id`}>
        <GuitarProductScreen />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
