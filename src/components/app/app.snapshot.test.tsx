import * as ShallowRenderer from 'react-test-renderer/shallow';
import App from './app';

describe('Component: App', () => {
  it('should render correctly', () => {
    const view = ShallowRenderer.createRenderer();
    view.render(<App />);
    expect(view).toMatchSnapshot();
  });
});
