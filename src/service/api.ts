import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {Guitar, GuitarsList} from '../types/guitar';
import {APIRoute, getURL, SortByOrder, SortByType, SortType} from '../const/const';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const X_TOTAL_COUNT = 'X-Total-Count';
const LIMIT_FOR_PRICE = 1;

export const mainAPI = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL}),
  endpoints: (build) => ({
    fetchGuitarsList: build.query<GuitarsList,
      { limit: number; sort:string | undefined; order:string | undefined; type:string | undefined, stringCount:string | undefined; minPrice:string | undefined; maxPrice: string | undefined; page: string | undefined } > ( {
        query: ({limit, sort, order, type, stringCount, minPrice, maxPrice, page}) => ({
          url: getURL(type, stringCount),
          params: {
            _limit: limit,
            _sort: sort,
            _order: order,
            stringCount: stringCount,
            'price_gte': minPrice,
            'price_lte': maxPrice,
            _page: page,
          },
        }),
      }),
    fetchGuitarsTotalCount: build.query<{ response: GuitarsList, totalCount: number }, number> ( {
      query: (limit) => ({
        url: APIRoute.Guitars,
        params: {_limit: limit},
      }),
      transformResponse:(response:GuitarsList, meta) => (
        {response, totalCount: Number(meta?.response?.headers.get(X_TOTAL_COUNT))}
      ),
    }),
    fetchAlikeGuitars: build.query<GuitarsList, string> ( {
      query: (name?:string ) => ({
        url: name ? `${APIRoute.Guitars}?name_like=${name}` : `${APIRoute.Guitars}?name`,
      }),
    }),
    fetchMinPrice: build.query<GuitarsList, { type: string | undefined; stringCount: string | undefined; }> ( {
      query: ({type, stringCount}) => ({
        url: getURL(type, stringCount),
        params: {
          _limit: LIMIT_FOR_PRICE, _sort: SortByType.get(SortType.Price), _order: SortByOrder.get(SortType.Ascend),
        },
      }),
    }),
    fetchMaxPrice: build.query<Guitar[], { type: string | undefined; stringCount: string | undefined; }> ( {
      query: ({type, stringCount}) => ({
        url: getURL(type, stringCount),
        params: {
          _limit: LIMIT_FOR_PRICE, _sort: SortByType.get(SortType.Price), _order: SortByOrder.get(SortType.Descend),
        },
      }),
    }),
  }),
});

export const {
  useFetchGuitarsListQuery,
  useFetchGuitarsTotalCountQuery,
  useFetchAlikeGuitarsQuery,
  useFetchMinPriceQuery,
  useFetchMaxPriceQuery,
} = mainAPI;
