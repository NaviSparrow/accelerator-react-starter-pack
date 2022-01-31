import renderer from 'react-test-renderer';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Loader />);
    expect(component).toMatchSnapshot();
  });
});
