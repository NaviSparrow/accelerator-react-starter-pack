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
import {SerializedError} from '@reduxjs/toolkit';

export type AsyncFunctionMutation = MutationTrigger<MutationDefinition<CommentPost, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, never>, FetchBaseQueryMeta>, never, CommentList, 'mainAPI'>>;
export type QueryError =  FetchBaseQueryError | SerializedError | undefined;
export {};
