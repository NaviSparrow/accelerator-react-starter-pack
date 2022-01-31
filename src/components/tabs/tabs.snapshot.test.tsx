import renderer from 'react-test-renderer';
import Tabs from './tabs';
import {fakeGuitar} from '../../mocks/mocks';

describe('Component: Tabs', () => {
  it('should render correctly',  () => {
    const component = renderer.create(<Tabs productInfo={fakeGuitar} /> );
    expect(component).toMatchSnapshot();
  });
});
