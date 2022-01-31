import {render, screen} from '@testing-library/react';
import ModalReview from './modal-review';
import {fakeGuitar} from '../../mocks/mocks';
import userEvent from '@testing-library/user-event';

const fakeVisible = true;
const fakeOnClose = jest.fn();
const fakeOnSubmit = jest.fn();

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    render(<ModalReview productInfo={fakeGuitar} isVisible={fakeVisible} onClose={fakeOnClose} onSubmitNewReview={fakeOnSubmit} error={undefined}/>);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();

  });

  it('should call fakeOnClose', () => {
    render(<ModalReview productInfo={fakeGuitar} isVisible={fakeVisible} onClose={fakeOnClose} onSubmitNewReview={fakeOnSubmit} error={undefined} />);
    const button = screen.getByLabelText('Закрыть');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fakeOnClose).toBeCalledTimes(1);
  });
});
