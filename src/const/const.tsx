import {Type, ViewState} from '../components/catalog/catalog';
import {Guitar, GuitarsList} from '../types/guitar';
import {Comment} from '../types/comment';
import dayjs from 'dayjs';
import {CartItemsType} from '../store/cart-reducer/cart-reducer';

export const INITIAL_GUITARS_COUNT = 9;
export const QUERY_MIN_PRICE  = 'price_gte';
export const QUERY_MAX_PRICE = 'price_lte';
export const STRING_COUNT = 'stringCount';
export const TYPE = 'type';
export const SORT = 'sort';
export const ORDER = 'order';
export const FOUR_STRINGS = 'fourStrings';
export const SIX_STRINGS = 'sixStrings';
export const SEVEN_STRINGS = 'sevenStrings';
export const TWELVE_STRINGS = 'twelveStrings';
export const PAGE_NOT_FOUND = 404;
export const PRODUCT_INFO_ERROR_TEXT = 'При загрузки информации о товаре произошла ошибка';
export const COMMENTS_ERROR_TEXT = 'При загрузки отзывов о товаре произошла ошибка';
export const REVIEW_FIELDS_ERROR_TEXT = 'Для отправки нужно заполнить все поля';
export const REVIEW_POST_ERROR_TEXT = 'Произошла ошибка. Попробуйте снова';
export const REVIEW_POST_SUCCESS_TEXT = 'Отзыв успешно отправлен';
export const REVIEWS_PER_STEP = 3;
export const NOT_FOUND = -1;
export const ONE_ITEM = 1;
export const NO_ITEMS_IN_CART = 'Товары в корзине отсутствуют';


export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum AppRoute {
  Root = '/',
  Guitars = '/guitars',
  Cart = '/cart',
}

export enum SortType {
  Price = 'по цене',
  Popularity = 'по популярности',
  Ascend = 'По возрастанию',
  Descend = 'По убыванию'
}

export const SortByType = new Map([
  ['по цене', 'price'],
  ['по популярности', 'rating'],
]);

export const SortByOrder = new Map([
  ['По возрастанию', 'asc'],
  ['По убыванию', 'desc'],
]);

export const GuitarType = new Map([
  ['acoustic', 'Аккустическая'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

export enum TypeFilter {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringFilter {
  FourStrings = '4',
  SixStrings = '6',
  SevenStrings = '7',
  TwelveStrings = '12',
}

export const reviewRating = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

export const getSort = (sort:string):string => SortByType.get(sort) as string;

export const getOrder = (order:string): string => SortByOrder.get(order) as string;

export const parseURLtoViewState = (urlQueryParams: string):ViewState => {
  const viewState = new URLSearchParams(urlQueryParams).entries();
  return Object.fromEntries(viewState) as ViewState;
};

export const stringifyViewState = (viewState: {[p: string]: string}) => new URLSearchParams(viewState).toString();

export const getURL = (type:string | undefined, stringCount:string | undefined):string => {
  if (type && stringCount === undefined) {
    return `${APIRoute.Guitars}?type=${type}`;
  }
  else if (stringCount && type === undefined) {
    return `${APIRoute.Guitars}?stringCount=${stringCount}`;
  }
  else if (type && stringCount) {
    return `${APIRoute.Guitars}?type=${type}&stringCount=${stringCount}`;
  }
  else {
    return APIRoute.Guitars;
  }
};

export const stringifyCheckedTypeFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&type=');
  }
  return items.join('');
};

export const stringifyCheckedStringCountFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&stringCount=');
  }
  return  items.join('');
};

export const deleteUncheckedTypeFilter = (checkedTypeFilters: string[], filterItem: string) => {
  const index = checkedTypeFilters.findIndex((item) => item === filterItem);
  checkedTypeFilters = [
    ...checkedTypeFilters.slice(0, index),
    ...checkedTypeFilters.slice(index + 1),
  ];
  return checkedTypeFilters;
};

export const deleteUncheckedStringCountFilter = (checkedStringCountFilters:string[],stringCountItem:string) => {
  const index = checkedStringCountFilters.findIndex((item) => item === stringCountItem);
  checkedStringCountFilters = [
    ...checkedStringCountFilters.slice(0, index),
    ...checkedStringCountFilters.slice(index + 1),
  ];
  return checkedStringCountFilters;
};

export const isFourStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.FourStrings);
export const isSixStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.SixStrings);
export const isSevenStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.SevenStrings);
export const isTwelveStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.TwelveStrings);

export const isAcousticChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Acoustic);
export const isElectricChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Electric);
export const isUkuleleChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Ukulele);

export const isFourStringsDisabled = (stateType: Type):boolean => stateType.acoustic === TypeFilter.Acoustic && stateType.electric === '' && stateType.ukulele === '';
export const isSixStringsDisabled = (stateType: Type):boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
export const isSevenStringsDisabled = (stateType: Type):boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
export const isTwelveStringsDisabled = (stateType: Type):boolean => (stateType.ukulele === TypeFilter.Ukulele || stateType.electric === TypeFilter.Electric) && stateType.acoustic === '';

export const getInitialPageNumber = (viewState:ViewState) => viewState.page ? viewState.page : '1';

export const getPaginationPages = (currentPage: number, pagesLimit: number):number[] => {
  const start = Math.floor(((currentPage - 1) / pagesLimit) * pagesLimit);
  return new Array(pagesLimit).fill(null).map(((value, index) => start + index + 1));
};

export const getStateMinimumPrice = (viewState: ViewState):string => viewState.price_gte ? viewState.price_gte : '';
export const getStateMaximumPrice = (viewState: ViewState) => viewState.price_lte ? viewState.price_lte : '';

export const compareFunc = (guitarA:Guitar, guitarB:Guitar) => {
  if (guitarA.name < guitarB.name) {
    return -1;
  }
  if (guitarA.name > guitarB.name) {
    return 1;
  }
  else {
    return 0;
  }
};

export const getSortedResult = (data:GuitarsList, searchTerm: string) => {
  const matchGuitars: GuitarsList = [];
  const notMatchGuitars:GuitarsList = [];
  if (data) {
    data.filter((item) =>
      item.name.toLowerCase().indexOf(searchTerm.charAt(0).toLowerCase()) === 0
        ? matchGuitars.push(item)
        : notMatchGuitars.push(item));
  }
  return [...matchGuitars, ...notMatchGuitars.sort(compareFunc)];
};

export const sortByDate = (reviewA:Comment, reviewB:Comment) => {
  const dateA = dayjs(reviewA.createAt);
  const dateB = dayjs(reviewB.createAt);

  return dateB.diff(dateA, 'minute');
};

export const isGuitarInCart = (cartItems:CartItemsType, currentGuitar:Guitar) => cartItems.findIndex((item) => item.guitar.id === currentGuitar.id);


