import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {setUpStore} from '../../store/store';
import {Provider} from 'react-redux';
import {makeFakeCommentsList} from '../../mocks/mocks';
import {renderHook} from '@testing-library/react-hooks';
import {useProductComments} from './use-product-comments';
import {CommentList} from '../../types/comment';

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

describe('Hook: useProductComments', () => {
  it('useProductComments should work correctly', async () => {
    const fakeResponse: CommentList = makeFakeCommentsList(2);
    const fakeId = '1';

    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useProductComments(fakeId), {wrapper});
    expect(result.current.productComments).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.productComments).toStrictEqual(fakeResponse);
    expect(result.current.isCommentsError).toBe(false);
  });
});
