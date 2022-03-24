import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CategoryRelationResponseCollection>;
  posts?: Maybe<PostRelationResponseCollection>;
  slug?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CategoryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  posts?: InputMaybe<PostFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  data: Array<CategoryEntity>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<UsersPermissionsUserEntityResponse>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CommentRelationResponseCollection>;
  post?: Maybe<PostEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CommentLocalizationsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CommentEntity = {
  __typename?: 'CommentEntity';
  attributes?: Maybe<Comment>;
  id?: Maybe<Scalars['ID']>;
};

export type CommentEntityResponse = {
  __typename?: 'CommentEntityResponse';
  data?: Maybe<CommentEntity>;
};

export type CommentEntityResponseCollection = {
  __typename?: 'CommentEntityResponseCollection';
  data: Array<CommentEntity>;
  meta: ResponseCollectionMeta;
};

export type CommentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CommentFiltersInput>>>;
  author?: InputMaybe<UsersPermissionsUserFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CommentFiltersInput>;
  not?: InputMaybe<CommentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CommentFiltersInput>>>;
  post?: InputMaybe<PostFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CommentInput = {
  author?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<Scalars['ID']>;
};

export type CommentRelationResponseCollection = {
  __typename?: 'CommentRelationResponseCollection';
  data: Array<CommentEntity>;
};

export type ComponentFaqFaQs = {
  __typename?: 'ComponentFaqFaQs';
  Answer?: Maybe<Scalars['String']>;
  Question?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentFaqFaQsFiltersInput = {
  Answer?: InputMaybe<StringFilterInput>;
  Question?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentFaqFaQsFiltersInput>>>;
  not?: InputMaybe<ComponentFaqFaQsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentFaqFaQsFiltersInput>>>;
};

export type ComponentFaqFaQsInput = {
  Answer?: InputMaybe<Scalars['String']>;
  Question?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Contact = {
  __typename?: 'Contact';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ContactEntity = {
  __typename?: 'ContactEntity';
  attributes?: Maybe<Contact>;
  id?: Maybe<Scalars['ID']>;
};

export type ContactEntityResponse = {
  __typename?: 'ContactEntityResponse';
  data?: Maybe<ContactEntity>;
};

export type ContactInput = {
  content?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type Faq = {
  __typename?: 'Faq';
  content?: Maybe<Array<Maybe<ComponentFaqFaQs>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  heading?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type FaqContentArgs = {
  filters?: InputMaybe<ComponentFaqFaQsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FaqEntity = {
  __typename?: 'FaqEntity';
  attributes?: Maybe<Faq>;
  id?: Maybe<Scalars['ID']>;
};

export type FaqEntityResponse = {
  __typename?: 'FaqEntityResponse';
  data?: Maybe<FaqEntity>;
};

export type FaqInput = {
  content?: InputMaybe<Array<InputMaybe<ComponentFaqFaQsInput>>>;
  heading?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Category | Comment | ComponentFaqFaQs | Contact | Faq | I18NLocale | OurStory | Post | PostClap | Tag | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createComment?: Maybe<CommentEntityResponse>;
  createCommentLocalization?: Maybe<CommentEntityResponse>;
  createOurStoryLocalization?: Maybe<OurStoryEntityResponse>;
  createPost?: Maybe<PostEntityResponse>;
  createPostClap?: Maybe<PostClapEntityResponse>;
  createPostLocalization?: Maybe<PostEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteComment?: Maybe<CommentEntityResponse>;
  deleteContact?: Maybe<ContactEntityResponse>;
  deleteFaq?: Maybe<FaqEntityResponse>;
  deleteOurStory?: Maybe<OurStoryEntityResponse>;
  deletePost?: Maybe<PostEntityResponse>;
  deletePostClap?: Maybe<PostClapEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateComment?: Maybe<CommentEntityResponse>;
  updateContact?: Maybe<ContactEntityResponse>;
  updateFaq?: Maybe<FaqEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateOurStory?: Maybe<OurStoryEntityResponse>;
  updatePost?: Maybe<PostEntityResponse>;
  updatePostClap?: Maybe<PostClapEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCommentArgs = {
  data: CommentInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCommentLocalizationArgs = {
  data?: InputMaybe<CommentInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateOurStoryLocalizationArgs = {
  data?: InputMaybe<OurStoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePostArgs = {
  data: PostInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePostClapArgs = {
  data: PostClapInput;
};


export type MutationCreatePostLocalizationArgs = {
  data?: InputMaybe<PostInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateTagArgs = {
  data: TagInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteOurStoryArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePostClapArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateCommentArgs = {
  data: CommentInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateContactArgs = {
  data: ContactInput;
};


export type MutationUpdateFaqArgs = {
  data: FaqInput;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateOurStoryArgs = {
  data: OurStoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePostArgs = {
  data: PostInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePostClapArgs = {
  data: PostClapInput;
  id: Scalars['ID'];
};


export type MutationUpdateTagArgs = {
  data: TagInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type OurStory = {
  __typename?: 'OurStory';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<OurStoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type OurStoryLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type OurStoryEntity = {
  __typename?: 'OurStoryEntity';
  attributes?: Maybe<OurStory>;
  id?: Maybe<Scalars['ID']>;
};

export type OurStoryEntityResponse = {
  __typename?: 'OurStoryEntityResponse';
  data?: Maybe<OurStoryEntity>;
};

export type OurStoryInput = {
  content?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OurStoryRelationResponseCollection = {
  __typename?: 'OurStoryRelationResponseCollection';
  data: Array<OurStoryEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  authors?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  comments?: Maybe<CommentRelationResponseCollection>;
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  featuredImage: UploadFileEntityResponse;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PostRelationResponseCollection>;
  postClaps?: Maybe<PostClapRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  readTime?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PostAuthorsArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PostCommentsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PostLocalizationsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PostPostClapsArgs = {
  filters?: InputMaybe<PostClapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PostTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PostClap = {
  __typename?: 'PostClap';
  createdAt?: Maybe<Scalars['DateTime']>;
  post?: Maybe<PostEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users_permissions_user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type PostClapEntity = {
  __typename?: 'PostClapEntity';
  attributes?: Maybe<PostClap>;
  id?: Maybe<Scalars['ID']>;
};

export type PostClapEntityResponse = {
  __typename?: 'PostClapEntityResponse';
  data?: Maybe<PostClapEntity>;
};

export type PostClapEntityResponseCollection = {
  __typename?: 'PostClapEntityResponseCollection';
  data: Array<PostClapEntity>;
  meta: ResponseCollectionMeta;
};

export type PostClapFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PostClapFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PostClapFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostClapFiltersInput>>>;
  post?: InputMaybe<PostFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users_permissions_user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type PostClapInput = {
  post?: InputMaybe<Scalars['ID']>;
  users_permissions_user?: InputMaybe<Scalars['ID']>;
};

export type PostClapRelationResponseCollection = {
  __typename?: 'PostClapRelationResponseCollection';
  data: Array<PostClapEntity>;
};

export type PostEntity = {
  __typename?: 'PostEntity';
  attributes?: Maybe<Post>;
  id?: Maybe<Scalars['ID']>;
};

export type PostEntityResponse = {
  __typename?: 'PostEntityResponse';
  data?: Maybe<PostEntity>;
};

export type PostEntityResponseCollection = {
  __typename?: 'PostEntityResponseCollection';
  data: Array<PostEntity>;
  meta: ResponseCollectionMeta;
};

export type PostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  authors?: InputMaybe<UsersPermissionsUserFiltersInput>;
  category?: InputMaybe<CategoryFiltersInput>;
  comments?: InputMaybe<CommentFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PostFiltersInput>;
  not?: InputMaybe<PostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  postClaps?: InputMaybe<PostClapFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  readTime?: InputMaybe<IntFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PostInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category?: InputMaybe<Scalars['ID']>;
  comments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  featuredImage?: InputMaybe<Scalars['ID']>;
  postClaps?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  readTime?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostRelationResponseCollection = {
  __typename?: 'PostRelationResponseCollection';
  data: Array<PostEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  comment?: Maybe<CommentEntityResponse>;
  comments?: Maybe<CommentEntityResponseCollection>;
  contact?: Maybe<ContactEntityResponse>;
  faq?: Maybe<FaqEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  ourStory?: Maybe<OurStoryEntityResponse>;
  post?: Maybe<PostEntityResponse>;
  postClap?: Maybe<PostClapEntityResponse>;
  postClaps?: Maybe<PostClapEntityResponseCollection>;
  posts?: Maybe<PostEntityResponseCollection>;
  tag?: Maybe<TagEntityResponse>;
  tags?: Maybe<TagEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryCommentArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryCommentsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryContactArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryFaqArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOurStoryArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPostClapArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPostClapsArgs = {
  filters?: InputMaybe<PostClapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt?: Maybe<Scalars['DateTime']>;
  posts?: Maybe<PostRelationResponseCollection>;
  slug?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type TagPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TagEntity = {
  __typename?: 'TagEntity';
  attributes?: Maybe<Tag>;
  id?: Maybe<Scalars['ID']>;
};

export type TagEntityResponse = {
  __typename?: 'TagEntityResponse';
  data?: Maybe<TagEntity>;
};

export type TagEntityResponseCollection = {
  __typename?: 'TagEntityResponseCollection';
  data: Array<TagEntity>;
  meta: ResponseCollectionMeta;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  posts?: InputMaybe<PostFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TagRelationResponseCollection = {
  __typename?: 'TagRelationResponseCollection';
  data: Array<TagEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  avatar?: Maybe<UploadFileEntityResponse>;
  bio?: Maybe<Scalars['String']>;
  blocked?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<CommentRelationResponseCollection>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  linkedinUrl?: Maybe<Scalars['String']>;
  post_claps?: Maybe<PostClapRelationResponseCollection>;
  posts?: Maybe<PostRelationResponseCollection>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  twitterUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};


export type UsersPermissionsUserCommentsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsUserPost_ClapsArgs = {
  filters?: InputMaybe<PostClapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsUserPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  bio?: InputMaybe<StringFilterInput>;
  blocked?: InputMaybe<BooleanFilterInput>;
  comments?: InputMaybe<CommentFiltersInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  linkedinUrl?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  post_claps?: InputMaybe<PostClapFiltersInput>;
  posts?: InputMaybe<PostFiltersInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  twitterUrl?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  avatar?: InputMaybe<Scalars['ID']>;
  bio?: InputMaybe<Scalars['String']>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  comments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  linkedinUrl?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  post_claps?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetAllCategoriesQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoryEntityResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title: string, slug?: string | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', pageCount: number, total: number, pageSize: number, page: number } } } | null };

export type GetAllTagsQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetAllTagsQuery = { __typename?: 'Query', tags?: { __typename?: 'TagEntityResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, slug?: string | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', pageCount: number, total: number, pageSize: number, page: number } } } | null };

export type GetOneCategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOneCategoryQuery = { __typename?: 'Query', category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title: string, slug?: string | null } | null } | null } | null };

export type GetOneTagQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOneTagQuery = { __typename?: 'Query', tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, slug?: string | null } | null } | null } | null };

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentEntityResponseCollection', data: Array<{ __typename?: 'CommentEntity', id?: string | null, attributes?: { __typename?: 'Comment', content?: string | null, createdAt?: any | null, author?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type GetOneCommentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOneCommentQuery = { __typename?: 'Query', comment?: { __typename?: 'CommentEntityResponse', data?: { __typename?: 'CommentEntity', id?: string | null, attributes?: { __typename?: 'Comment', content?: string | null, author?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'CommentEntityResponse', data?: { __typename?: 'CommentEntity', id?: string | null } | null } | null };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'CommentEntityResponse', data?: { __typename?: 'CommentEntity', id?: string | null, attributes?: { __typename?: 'Comment', content?: string | null, createdAt?: any | null, author?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string } | null } | null } | null } | null } | null } | null };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['ID'];
  authorId: Scalars['ID'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CommentEntityResponse', data?: { __typename?: 'CommentEntity', id?: string | null } | null } | null };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['ID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentEntityResponseCollection', data: Array<{ __typename?: 'CommentEntity', id?: string | null, attributes?: { __typename?: 'Comment', content?: string | null, createdAt?: any | null, post?: { __typename?: 'PostEntityResponse', data?: { __typename?: 'PostEntity', id?: string | null } | null } | null, author?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type GetFaqQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFaqQuery = { __typename?: 'Query', faq?: { __typename?: 'FaqEntityResponse', data?: { __typename?: 'FaqEntity', id?: string | null, attributes?: { __typename?: 'Faq', content?: Array<{ __typename?: 'ComponentFaqFaQs', Question?: string | null, Answer?: string | null } | null> | null } | null } | null } | null };

export type GetStoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoryQuery = { __typename?: 'Query', ourStory?: { __typename?: 'OurStoryEntityResponse', data?: { __typename?: 'OurStoryEntity', id?: string | null, attributes?: { __typename?: 'OurStory', content?: string | null } | null } | null } | null };

export type GetPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostBySlugQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', id?: string | null, attributes?: { __typename?: 'Post', title: string, publishedAt?: any | null, slug?: string | null, description: string, readTime?: number | null, content: string, featuredImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, previewUrl?: string | null, width?: number | null, height?: number | null, caption?: string | null } | null } | null }, authors?: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, bio?: string | null, twitterUrl?: string | null, linkedinUrl?: string | null, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null } | null } | null } | null } | null }> } | null, category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', slug?: string | null } | null } | null } | null, postClaps?: { __typename?: 'PostClapRelationResponseCollection', data: Array<{ __typename?: 'PostClapEntity', id?: string | null }> } | null, comments?: { __typename?: 'CommentRelationResponseCollection', data: Array<{ __typename?: 'CommentEntity', id?: string | null }> } | null } | null }> } | null };

export type GetPostsByCategoryQueryVariables = Exact<{
  slug: Scalars['String'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetPostsByCategoryQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', id?: string | null, attributes?: { __typename?: 'Post', title: string, publishedAt?: any | null, slug?: string | null, description: string, readTime?: number | null, tags?: { __typename?: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, slug?: string | null } | null }> } | null, category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title: string, slug?: string | null } | null } | null } | null, authors?: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string } | null }> } | null, featuredImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', width?: number | null, height?: number | null, alternativeText?: string | null, caption?: string | null, url: string } | null } | null } } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type GetAllPostsQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetAllPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', id?: string | null, attributes?: { __typename?: 'Post', title: string, publishedAt?: any | null, slug?: string | null, description: string, readTime?: number | null, tags?: { __typename?: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, slug?: string | null } | null }> } | null, category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title: string, slug?: string | null } | null } | null } | null, authors?: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null }> } | null, featuredImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', width?: number | null, height?: number | null, alternativeText?: string | null, caption?: string | null, url: string } | null } | null } } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type GetMinimalPostsByCategoryQueryVariables = Exact<{
  slug: Scalars['String'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetMinimalPostsByCategoryQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', id?: string | null, attributes?: { __typename?: 'Post', title: string, slug?: string | null, description: string, featuredImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', width?: number | null, height?: number | null, alternativeText?: string | null, caption?: string | null, url: string } | null } | null } } | null }> } | null };

export type PostCommentCountQueryVariables = Exact<{
  postSlug: Scalars['String'];
}>;


export type PostCommentCountQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type GetPostsByTagQueryVariables = Exact<{
  slug: Scalars['String'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetPostsByTagQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', id?: string | null, attributes?: { __typename?: 'Post', title: string, publishedAt?: any | null, slug?: string | null, description: string, readTime?: number | null, tags?: { __typename?: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, slug?: string | null } | null }> } | null, category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title: string, slug?: string | null } | null } | null } | null, authors?: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string } | null }> } | null, featuredImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', width?: number | null, height?: number | null, alternativeText?: string | null, caption?: string | null, url: string } | null } | null } } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type ClapMutationVariables = Exact<{
  postId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type ClapMutation = { __typename?: 'Mutation', createPostClap?: { __typename?: 'PostClapEntityResponse', data?: { __typename?: 'PostClapEntity', id?: string | null } | null } | null };

export type UnclapMutationVariables = Exact<{
  clapId: Scalars['ID'];
}>;


export type UnclapMutation = { __typename?: 'Mutation', deletePostClap?: { __typename?: 'PostClapEntityResponse', data?: { __typename?: 'PostClapEntity', id?: string | null } | null } | null };

export type GetPostClapsQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetPostClapsQuery = { __typename?: 'Query', postClaps?: { __typename?: 'PostClapEntityResponseCollection', data: Array<{ __typename?: 'PostClapEntity', id?: string | null, attributes?: { __typename?: 'PostClap', users_permissions_user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number } } } | null };

export type GetUserProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', usersPermissionsUser?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, bio?: string | null, twitterUrl?: string | null, linkedinUrl?: string | null, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null };

export type UpdateMeMutationVariables = Exact<{
  id: Scalars['ID'];
  bio?: InputMaybe<Scalars['String']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  linkedinUrl?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateUsersPermissionsUser: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', bio?: string | null, twitterUrl?: string | null, linkedinUrl?: string | null } | null } | null } };

export type CategoriesForSitemapQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type CategoriesForSitemapQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoryEntityResponseCollection', data: Array<{ __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', slug?: string | null, updatedAt?: any | null } | null }> } | null };

export type TagsForSitemapQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type TagsForSitemapQuery = { __typename?: 'Query', tags?: { __typename?: 'TagEntityResponseCollection', data: Array<{ __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', slug?: string | null, updatedAt?: any | null } | null }> } | null };

export type PostsForSitemapQueryVariables = Exact<{
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type PostsForSitemapQuery = { __typename?: 'Query', posts?: { __typename?: 'PostEntityResponseCollection', data: Array<{ __typename?: 'PostEntity', attributes?: { __typename?: 'Post', slug?: string | null, updatedAt?: any | null } | null }> } | null };


export const GetAllCategoriesDocument = `
    query getAllCategories($page: Int!, $pageSize: Int!) {
  categories(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      id
      attributes {
        title
        slug
      }
    }
    meta {
      pagination {
        pageCount
        total
        pageSize
        page
      }
    }
  }
}
    `;
export const useGetAllCategoriesQuery = <
      TData = GetAllCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllCategoriesQueryVariables,
      options?: UseQueryOptions<GetAllCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllCategoriesQuery, TError, TData>(
      ['getAllCategories', variables],
      fetcher<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(client, GetAllCategoriesDocument, variables, headers),
      options
    );
export const GetAllTagsDocument = `
    query getAllTags($page: Int!, $pageSize: Int!) {
  tags(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      id
      attributes {
        title
        slug
      }
    }
    meta {
      pagination {
        pageCount
        total
        pageSize
        page
      }
    }
  }
}
    `;
export const useGetAllTagsQuery = <
      TData = GetAllTagsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllTagsQueryVariables,
      options?: UseQueryOptions<GetAllTagsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllTagsQuery, TError, TData>(
      ['getAllTags', variables],
      fetcher<GetAllTagsQuery, GetAllTagsQueryVariables>(client, GetAllTagsDocument, variables, headers),
      options
    );
export const GetOneCategoryDocument = `
    query getOneCategory($id: ID!) {
  category(id: $id) {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
}
    `;
export const useGetOneCategoryQuery = <
      TData = GetOneCategoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetOneCategoryQueryVariables,
      options?: UseQueryOptions<GetOneCategoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOneCategoryQuery, TError, TData>(
      ['getOneCategory', variables],
      fetcher<GetOneCategoryQuery, GetOneCategoryQueryVariables>(client, GetOneCategoryDocument, variables, headers),
      options
    );
export const GetOneTagDocument = `
    query getOneTag($id: ID!) {
  tag(id: $id) {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
}
    `;
export const useGetOneTagQuery = <
      TData = GetOneTagQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetOneTagQueryVariables,
      options?: UseQueryOptions<GetOneTagQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOneTagQuery, TError, TData>(
      ['getOneTag', variables],
      fetcher<GetOneTagQuery, GetOneTagQueryVariables>(client, GetOneTagDocument, variables, headers),
      options
    );
export const GetCommentsDocument = `
    query getComments($postId: ID!, $page: Int!, $pageSize: Int!) {
  comments(
    filters: {post: {id: {eq: $postId}}}
    pagination: {page: $page, pageSize: $pageSize}
    sort: ["createdAt:desc"]
  ) {
    data {
      id
      attributes {
        content
        createdAt
        author {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const useGetCommentsQuery = <
      TData = GetCommentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCommentsQueryVariables,
      options?: UseQueryOptions<GetCommentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCommentsQuery, TError, TData>(
      ['getComments', variables],
      fetcher<GetCommentsQuery, GetCommentsQueryVariables>(client, GetCommentsDocument, variables, headers),
      options
    );
export const GetOneCommentDocument = `
    query getOneComment($id: ID!) {
  comment(id: $id) {
    data {
      id
      attributes {
        content
        author {
          data {
            id
            attributes {
              avatar {
                data {
                  id
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetOneCommentQuery = <
      TData = GetOneCommentQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetOneCommentQueryVariables,
      options?: UseQueryOptions<GetOneCommentQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOneCommentQuery, TError, TData>(
      ['getOneComment', variables],
      fetcher<GetOneCommentQuery, GetOneCommentQueryVariables>(client, GetOneCommentDocument, variables, headers),
      options
    );
export const DeleteCommentDocument = `
    mutation deleteComment($id: ID!) {
  deleteComment(id: $id) {
    data {
      id
    }
  }
}
    `;
export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      ['deleteComment'],
      (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(client, DeleteCommentDocument, variables, headers)(),
      options
    );
export const UpdateCommentDocument = `
    mutation updateComment($id: ID!, $content: String!) {
  updateComment(id: $id, data: {content: $content}) {
    data {
      id
      attributes {
        content
        createdAt
        author {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
  }
}
    `;
export const useUpdateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>(
      ['updateComment'],
      (variables?: UpdateCommentMutationVariables) => fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(client, UpdateCommentDocument, variables, headers)(),
      options
    );
export const CreateCommentDocument = `
    mutation createComment($content: String!, $postId: ID!, $authorId: ID!) {
  createComment(data: {content: $content, post: $postId, author: $authorId}) {
    data {
      id
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['createComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const GetCommentsByPostIdDocument = `
    query getCommentsByPostId($postId: ID!, $page: Int!, $pageSize: Int!) {
  comments(
    filters: {post: {id: {eq: $postId}}}
    pagination: {page: $page, pageSize: $pageSize}
    sort: ["createdAt:desc"]
  ) {
    data {
      id
      attributes {
        content
        post {
          data {
            id
          }
        }
        createdAt
        author {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const useGetCommentsByPostIdQuery = <
      TData = GetCommentsByPostIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCommentsByPostIdQueryVariables,
      options?: UseQueryOptions<GetCommentsByPostIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCommentsByPostIdQuery, TError, TData>(
      ['getCommentsByPostId', variables],
      fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(client, GetCommentsByPostIdDocument, variables, headers),
      options
    );
export const GetFaqDocument = `
    query getFAQ {
  faq {
    data {
      id
      attributes {
        content {
          Question
          Answer
        }
      }
    }
  }
}
    `;
export const useGetFaqQuery = <
      TData = GetFaqQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetFaqQueryVariables,
      options?: UseQueryOptions<GetFaqQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetFaqQuery, TError, TData>(
      variables === undefined ? ['getFAQ'] : ['getFAQ', variables],
      fetcher<GetFaqQuery, GetFaqQueryVariables>(client, GetFaqDocument, variables, headers),
      options
    );
export const GetStoryDocument = `
    query getStory {
  ourStory {
    data {
      id
      attributes {
        content
      }
    }
  }
}
    `;
export const useGetStoryQuery = <
      TData = GetStoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetStoryQueryVariables,
      options?: UseQueryOptions<GetStoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetStoryQuery, TError, TData>(
      variables === undefined ? ['getStory'] : ['getStory', variables],
      fetcher<GetStoryQuery, GetStoryQueryVariables>(client, GetStoryDocument, variables, headers),
      options
    );
export const GetPostBySlugDocument = `
    query getPostBySlug($slug: String!) {
  posts(filters: {slug: {eq: $slug}}) {
    data {
      id
      attributes {
        title
        publishedAt
        slug
        description
        readTime
        content
        featuredImage {
          data {
            attributes {
              url
              previewUrl
              width
              height
              caption
            }
          }
        }
        authors {
          data {
            id
            attributes {
              username
              bio
              avatar {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              twitterUrl
              linkedinUrl
            }
          }
        }
        category {
          data {
            id
            attributes {
              slug
            }
          }
        }
        postClaps {
          data {
            id
          }
        }
        comments {
          data {
            id
          }
        }
      }
    }
  }
}
    `;
export const useGetPostBySlugQuery = <
      TData = GetPostBySlugQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostBySlugQueryVariables,
      options?: UseQueryOptions<GetPostBySlugQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostBySlugQuery, TError, TData>(
      ['getPostBySlug', variables],
      fetcher<GetPostBySlugQuery, GetPostBySlugQueryVariables>(client, GetPostBySlugDocument, variables, headers),
      options
    );
export const GetPostsByCategoryDocument = `
    query getPostsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {
  posts(
    filters: {category: {slug: {eq: $slug}}}
    pagination: {page: $page, pageSize: $pageSize}
  ) {
    data {
      id
      attributes {
        title
        publishedAt
        slug
        description
        readTime
        tags {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        category {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        authors {
          data {
            id
            attributes {
              username
            }
          }
        }
        featuredImage {
          data {
            id
            attributes {
              width
              height
              alternativeText
              caption
              url
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const useGetPostsByCategoryQuery = <
      TData = GetPostsByCategoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostsByCategoryQueryVariables,
      options?: UseQueryOptions<GetPostsByCategoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsByCategoryQuery, TError, TData>(
      ['getPostsByCategory', variables],
      fetcher<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>(client, GetPostsByCategoryDocument, variables, headers),
      options
    );
export const GetAllPostsDocument = `
    query getAllPosts($page: Int!, $pageSize: Int!) {
  posts(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      id
      attributes {
        title
        publishedAt
        slug
        description
        readTime
        tags {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        category {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        authors {
          data {
            id
            attributes {
              username
              avatar {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        featuredImage {
          data {
            id
            attributes {
              width
              height
              alternativeText
              caption
              url
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const useGetAllPostsQuery = <
      TData = GetAllPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllPostsQueryVariables,
      options?: UseQueryOptions<GetAllPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllPostsQuery, TError, TData>(
      ['getAllPosts', variables],
      fetcher<GetAllPostsQuery, GetAllPostsQueryVariables>(client, GetAllPostsDocument, variables, headers),
      options
    );
export const GetMinimalPostsByCategoryDocument = `
    query getMinimalPostsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {
  posts(
    filters: {category: {slug: {eq: $slug}}}
    pagination: {page: $page, pageSize: $pageSize}
  ) {
    data {
      id
      attributes {
        title
        slug
        description
        featuredImage {
          data {
            id
            attributes {
              width
              height
              alternativeText
              caption
              url
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetMinimalPostsByCategoryQuery = <
      TData = GetMinimalPostsByCategoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetMinimalPostsByCategoryQueryVariables,
      options?: UseQueryOptions<GetMinimalPostsByCategoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMinimalPostsByCategoryQuery, TError, TData>(
      ['getMinimalPostsByCategory', variables],
      fetcher<GetMinimalPostsByCategoryQuery, GetMinimalPostsByCategoryQueryVariables>(client, GetMinimalPostsByCategoryDocument, variables, headers),
      options
    );
export const PostCommentCountDocument = `
    query postCommentCount($postSlug: String!) {
  comments(filters: {post: {slug: {eq: $postSlug}}}) {
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const usePostCommentCountQuery = <
      TData = PostCommentCountQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostCommentCountQueryVariables,
      options?: UseQueryOptions<PostCommentCountQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostCommentCountQuery, TError, TData>(
      ['postCommentCount', variables],
      fetcher<PostCommentCountQuery, PostCommentCountQueryVariables>(client, PostCommentCountDocument, variables, headers),
      options
    );
export const GetPostsByTagDocument = `
    query getPostsByTag($slug: String!, $page: Int!, $pageSize: Int!) {
  posts(
    filters: {tags: {slug: {eq: $slug}}}
    pagination: {page: $page, pageSize: $pageSize}
  ) {
    data {
      id
      attributes {
        title
        publishedAt
        slug
        description
        readTime
        tags {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        category {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        authors {
          data {
            id
            attributes {
              username
            }
          }
        }
        featuredImage {
          data {
            id
            attributes {
              width
              height
              alternativeText
              caption
              url
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;
export const useGetPostsByTagQuery = <
      TData = GetPostsByTagQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostsByTagQueryVariables,
      options?: UseQueryOptions<GetPostsByTagQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsByTagQuery, TError, TData>(
      ['getPostsByTag', variables],
      fetcher<GetPostsByTagQuery, GetPostsByTagQueryVariables>(client, GetPostsByTagDocument, variables, headers),
      options
    );
export const ClapDocument = `
    mutation clap($postId: ID!, $userId: ID!) {
  createPostClap(data: {post: $postId, users_permissions_user: $userId}) {
    data {
      id
    }
  }
}
    `;
export const useClapMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ClapMutation, TError, ClapMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ClapMutation, TError, ClapMutationVariables, TContext>(
      ['clap'],
      (variables?: ClapMutationVariables) => fetcher<ClapMutation, ClapMutationVariables>(client, ClapDocument, variables, headers)(),
      options
    );
export const UnclapDocument = `
    mutation unclap($clapId: ID!) {
  deletePostClap(id: $clapId) {
    data {
      id
    }
  }
}
    `;
export const useUnclapMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UnclapMutation, TError, UnclapMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UnclapMutation, TError, UnclapMutationVariables, TContext>(
      ['unclap'],
      (variables?: UnclapMutationVariables) => fetcher<UnclapMutation, UnclapMutationVariables>(client, UnclapDocument, variables, headers)(),
      options
    );
export const GetPostClapsDocument = `
    query getPostClaps($postId: ID!) {
  postClaps(filters: {post: {id: {eq: $postId}}}) {
    data {
      id
      attributes {
        users_permissions_user {
          data {
            id
          }
        }
      }
    }
    meta {
      pagination {
        total
      }
    }
  }
}
    `;
export const useGetPostClapsQuery = <
      TData = GetPostClapsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostClapsQueryVariables,
      options?: UseQueryOptions<GetPostClapsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostClapsQuery, TError, TData>(
      ['getPostClaps', variables],
      fetcher<GetPostClapsQuery, GetPostClapsQueryVariables>(client, GetPostClapsDocument, variables, headers),
      options
    );
export const GetUserProfileDocument = `
    query getUserProfile($id: ID!) {
  usersPermissionsUser(id: $id) {
    data {
      id
      attributes {
        username
        bio
        twitterUrl
        linkedinUrl
        avatar {
          data {
            id
            attributes {
              url
              alternativeText
              width
              height
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetUserProfileQuery = <
      TData = GetUserProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserProfileQueryVariables,
      options?: UseQueryOptions<GetUserProfileQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserProfileQuery, TError, TData>(
      ['getUserProfile', variables],
      fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(client, GetUserProfileDocument, variables, headers),
      options
    );
export const UpdateMeDocument = `
    mutation updateMe($id: ID!, $bio: String, $twitterUrl: String, $linkedinUrl: String) {
  updateUsersPermissionsUser(
    id: $id
    data: {bio: $bio, twitterUrl: $twitterUrl, linkedinUrl: $linkedinUrl}
  ) {
    data {
      id
      attributes {
        bio
        twitterUrl
        linkedinUrl
      }
    }
  }
}
    `;
export const useUpdateMeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateMeMutation, TError, UpdateMeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateMeMutation, TError, UpdateMeMutationVariables, TContext>(
      ['updateMe'],
      (variables?: UpdateMeMutationVariables) => fetcher<UpdateMeMutation, UpdateMeMutationVariables>(client, UpdateMeDocument, variables, headers)(),
      options
    );
export const CategoriesForSitemapDocument = `
    query categoriesForSitemap($page: Int!, $pageSize: Int!) {
  categories(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      attributes {
        slug
        updatedAt
      }
    }
  }
}
    `;
export const useCategoriesForSitemapQuery = <
      TData = CategoriesForSitemapQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CategoriesForSitemapQueryVariables,
      options?: UseQueryOptions<CategoriesForSitemapQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CategoriesForSitemapQuery, TError, TData>(
      ['categoriesForSitemap', variables],
      fetcher<CategoriesForSitemapQuery, CategoriesForSitemapQueryVariables>(client, CategoriesForSitemapDocument, variables, headers),
      options
    );
export const TagsForSitemapDocument = `
    query tagsForSitemap($page: Int!, $pageSize: Int!) {
  tags(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      attributes {
        slug
        updatedAt
      }
    }
  }
}
    `;
export const useTagsForSitemapQuery = <
      TData = TagsForSitemapQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: TagsForSitemapQueryVariables,
      options?: UseQueryOptions<TagsForSitemapQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TagsForSitemapQuery, TError, TData>(
      ['tagsForSitemap', variables],
      fetcher<TagsForSitemapQuery, TagsForSitemapQueryVariables>(client, TagsForSitemapDocument, variables, headers),
      options
    );
export const PostsForSitemapDocument = `
    query postsForSitemap($page: Int!, $pageSize: Int!) {
  posts(pagination: {page: $page, pageSize: $pageSize}) {
    data {
      attributes {
        slug
        updatedAt
      }
    }
  }
}
    `;
export const usePostsForSitemapQuery = <
      TData = PostsForSitemapQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostsForSitemapQueryVariables,
      options?: UseQueryOptions<PostsForSitemapQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsForSitemapQuery, TError, TData>(
      ['postsForSitemap', variables],
      fetcher<PostsForSitemapQuery, PostsForSitemapQueryVariables>(client, PostsForSitemapDocument, variables, headers),
      options
    );