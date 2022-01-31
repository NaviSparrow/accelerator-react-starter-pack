import Tabs from './tabs';
import {fakeGuitar} from '../../mocks/mocks';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: Tabs', () => {
  it('should change to description', () => {
    render(<Tabs productInfo={fakeGuitar} />);
    expect(screen.getByText(fakeGuitar.vendorCode)).toBeInTheDocument();
    userEvent.click(screen.getByText(/описание/i));
    expect(screen.getByText(fakeGuitar.description)).toBeInTheDocument();
  });
});
