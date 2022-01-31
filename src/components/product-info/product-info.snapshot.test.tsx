import renderer from 'react-test-renderer';
import ProductInfo from './product-info';
import {fakeGuitar} from '../../mocks/mocks';

describe('Component: ProductInfo', () => {
  it('should render correctly', () => {
    const component = renderer.create(<ProductInfo productInfo={fakeGuitar}/>);
    expect(component).toMatchSnapshot();
  });
});
