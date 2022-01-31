import {render, screen} from '@testing-library/react';
import ModalSuccessPostReview from './modal-success-post-review';
import userEvent from '@testing-library/user-event';

const fakeVisible = true;
const fakeOnClose = jest.fn();

describe('Component: ModalSuccessPostReview', () => {
  it('should render correctly', () => {
    render(<ModalSuccessPostReview isVisible={fakeVisible} onClose={fakeOnClose} />);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('Закрыть'));
    expect(fakeOnClose).toBeCalled();
  });
});
