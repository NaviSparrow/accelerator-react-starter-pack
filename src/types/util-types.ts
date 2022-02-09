import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from '@reduxjs/toolkit/query';
import {CommentPost} from './comment-post';
import {CommentList} from './comment';
import {Coupon} from './coupon';
import {OrderPost} from './orderPost';

export type AsyncCommentsMutation = MutationTrigger<MutationDefinition<CommentPost, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, never>, FetchBaseQueryMeta>, never, CommentList, 'mainAPI'>>;
export type AsyncCouponMutation = MutationTrigger<MutationDefinition<Coupon, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, never>, FetchBaseQueryMeta>, 'Comments', number, 'mainAPI'>>;
export type AsyncOrderMutation =  MutationTrigger<MutationDefinition<OrderPost, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, never>, FetchBaseQueryMeta>, 'Comments', number, 'mainAPI'>>;
