import renderer from 'react-test-renderer';
import Rating from './rating';

const fakeRating = 2;

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Rating guitarRating={fakeRating} />);
    expect(component).toMatchSnapshot();
  });
});
