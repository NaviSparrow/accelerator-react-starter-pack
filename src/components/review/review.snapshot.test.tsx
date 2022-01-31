import renderer from 'react-test-renderer';
import Review from './review';
import {fakeComment} from '../../mocks/mocks';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Review review={fakeComment}/>);
    expect(component).toMatchSnapshot();
  });
});
