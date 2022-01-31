import {fakeGuitar, makeFakeCommentsList} from '../../mocks/mocks';
import ReviewsList from './reviewsList';
import {Provider} from 'react-redux';
import {setUpStore} from '../../store/store';
import {render, screen} from '@testing-library/react';

const store = setUpStore();

const fakeComments = makeFakeCommentsList(2);

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <ReviewsList reviews={fakeComments} productInfo={fakeGuitar}/>
      </Provider>,
    );
    expect(screen.getAllByText(/Отзывы/i).length).toBe(2);
    expect(screen.getByText(fakeComments[0].comment)).toBeInTheDocument();
  });
});
