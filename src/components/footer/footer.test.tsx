import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {

  it('should render correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская /i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/8-812-500-50-50/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
  });
});
