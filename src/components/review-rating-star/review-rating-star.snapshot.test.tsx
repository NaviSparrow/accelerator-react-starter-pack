import renderer from 'react-test-renderer';
import ReviewRatingStar from './review-rating-star';

const fakeStar = '2';
const fakeLabel = 'test';
const fakeOnChange = jest.fn();
const fakeUserRating = 2;

describe('Component: ReviewRatingStar', () => {
  it('should render correctly', () => {
    const component = renderer.create(<ReviewRatingStar star={fakeStar} userRating={fakeUserRating} onChange={fakeOnChange} label={fakeLabel}/>);
    expect(component).toMatchSnapshot();
  });
});
