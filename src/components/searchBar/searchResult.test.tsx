import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {useFetchAlikeGuitarsQuery} from '../../service/api';
import {Guitar} from '../../types/guitar';
import {makeFakeGuitarsList} from '../../mocks/mocks';
import {renderHook} from '@testing-library/react-hooks';
import {setUpStore} from '../../store/store';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

const store = setUpStore();
const fakeTerm = 'fake';

describe('Component: SearchResult', () => {
  it('useFetchAlikeGuitarsQuery should work correctly',async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);

    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchAlikeGuitarsQuery(fakeTerm), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });
});
