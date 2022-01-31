import {render, screen} from '@testing-library/react';
import Review from './review';
import {fakeComment} from '../../mocks/mocks';

describe('Component: Review', () => {
  it('should render correct data from props', () => {
    render(<Review review={fakeComment} />);
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.disadvantage)).toBeInTheDocument();
  });
});
