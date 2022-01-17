import React, {MouseEvent, useState} from 'react';
import {SortType, getSort, getOrder, ORDER, SORT} from '../../const/const';
import {ViewState} from '../catalog/catalog';

const ACTIVE = -1;
const NOT_ACTIVE = 0;

type SortProps = {
  viewState: ViewState;
  onChangeURL: (updatedViewState: ViewState) => void;
}

function Sort({viewState, onChangeURL}:SortProps):JSX.Element {
  const [currentSortType, setCurrentSortType] = useState('');
  const [currentSortOrder, setCurrentSortOrder] = useState('');

  const handleSortClick = (sort: string) => {
    currentSortOrder.length === 0
      ? onChangeURL({...viewState, [SORT]: getSort(sort), [ORDER]: getOrder(SortType.Ascend)})
      : onChangeURL({...viewState, [SORT]: getSort(sort)});
    setCurrentSortType(sort);
    if (currentSortOrder.length === 0) {
      setCurrentSortOrder(SortType.Ascend);
    }
  };

  const handleOrderClick = (order:string) => {
    currentSortType.length === 0
      ? onChangeURL({...viewState, [ORDER]: getOrder(order),  [SORT]: getSort(SortType.Price)})
      : onChangeURL({...viewState, [ORDER]: getOrder(order)});
    setCurrentSortOrder(order);
    if (currentSortType.length === 0) {
      setCurrentSortType(SortType.Price);
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${currentSortType === SortType.Price ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по цене"
          data-testid='по цене'
          tabIndex={currentSortType === SortType.Price ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${currentSortType === SortType.Popularity ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по популярности"
          data-testid='по популярности'
          tabIndex={currentSortType === SortType.Popularity ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${currentSortOrder === SortType.Ascend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          data-testid='По возрастанию'
          tabIndex={currentSortOrder === SortType.Ascend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleOrderClick(currentTarget.ariaLabel);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${currentSortOrder === SortType.Descend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          data-testid='По убыванию'
          tabIndex={currentSortOrder === SortType.Descend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleOrderClick(currentTarget.ariaLabel);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
