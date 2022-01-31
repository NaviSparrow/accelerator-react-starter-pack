import {render, screen} from '@testing-library/react';
import ProductInfo from './product-info';
import {fakeGuitar} from '../../mocks/mocks';

describe('Component: ProductInfo', () => {
  it('should render correct data from props', () => {
    render(<ProductInfo productInfo={fakeGuitar}/>);

    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.stringCount} струнная`)).toBeInTheDocument();
  });
});
