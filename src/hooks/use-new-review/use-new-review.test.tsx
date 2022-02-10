import {renderHook} from '@testing-library/react-hooks';
import {useNewReview} from './useNewReview';
import fetchMock from 'jest-fetch-mock';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {testStore} from '../../store/store';
import {useAddReviewMutation} from '../../service/api';
import {CommentPost} from '../../types/comment-post';
import {makeFakeCommentsList} from '../../mocks/mocks';
import {act} from 'react-test-renderer';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const store = testStore;

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}: ProviderProps):JSX.Element => (
  <Provider store={store}>{children}</Provider>
);


describe('Hook useNewReview', () => {
  it('should return correct elements', () => {
    const {result} = renderHook(() => useNewReview(), {wrapper});
    const {addReview, isReviewPostSuccess, reset,  error} = result.current;

    expect(addReview).toBeInstanceOf(Function);
    expect(isReviewPostSuccess).toBe(false);
    expect(reset).toBeInstanceOf(Function);
    expect(error).toBe(undefined);
  });

  it('should do useAddReviewMutation correct', async () => {
    const fakeResponse = makeFakeCommentsList(2);
    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

    const fakeReview: CommentPost = {
      guitarId: 1,
      userName: 'name',
      advantage: 'advantages',
      disadvantage: 'disadvantages',
      comment: 'comment',
      rating: 2,
    };

    const {result, waitForNextUpdate} = renderHook(() => useAddReviewMutation(undefined), {wrapper});
    const [addReview] = result.current;

    act(() => {
      void addReview(fakeReview);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBe(undefined);
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.data).toStrictEqual(fakeResponse);
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });
});
