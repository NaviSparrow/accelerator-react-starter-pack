import {render, screen} from '@testing-library/react';
import Sort from './sort';
import userEvent from '@testing-library/user-event';

const fakeViewState = {};
const fakeChangeURL = jest.fn();

describe('Component: Sort', () => {
  it('should do sort by type correctly', () => {
    render(<Sort viewState={fakeViewState} onChangeURL={fakeChangeURL}/>);
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('по цене'));
    expect(fakeChangeURL).toBeCalled();
    expect(screen.getByTestId('По возрастанию')).toHaveClass('catalog-sort__order-button--active');
    userEvent.click(screen.getByTestId('по популярности'));
    expect(fakeChangeURL).toBeCalled();
  });

  it('should do sort by order correctly', () => {
    render(<Sort viewState={fakeViewState} onChangeURL={fakeChangeURL}/>);
    userEvent.click(screen.getByTestId('По возрастанию'));
    expect(fakeChangeURL).toBeCalled();
    expect(screen.getByTestId('по цене')).toHaveClass('catalog-sort__type-button--active');
    userEvent.click(screen.getByTestId('По убыванию'));
    expect(fakeChangeURL).toBeCalled();
  });
});

