import * as ShallowRenderer from 'react-test-renderer/shallow';
import MainScreen from './main-screen';

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const view = ShallowRenderer.createRenderer();
    view.render(<MainScreen />);
    expect(view).toMatchSnapshot();
  });
});
