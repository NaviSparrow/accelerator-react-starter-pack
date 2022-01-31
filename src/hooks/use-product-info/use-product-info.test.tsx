import {Guitar} from '../../types/guitar';
import {fakeGuitar} from '../../mocks/mocks';
import fetchMock from 'jest-fetch-mock';
import {renderHook} from '@testing-library/react-hooks';
import {useProductInfo} from './use-product-info';
import {ReactNode} from 'react';
import {setUpStore} from '../../store/store';
import {Provider} from 'react-redux';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const store = setUpStore();

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

describe('Hook: useProductInfo', () => {
  it('useProductInfo should work correctly', async () => {
    const fakeResponse: Guitar = fakeGuitar;
    const fakeId = '1';

    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useProductInfo(fakeId), {wrapper});
    expect(result.current.isInfoLoading).toBe(true);
    expect(result.current.productInfo).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isInfoLoading).toBe(false);
    expect(result.current.productInfo).toStrictEqual(fakeResponse);
  });
});
