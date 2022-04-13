import type {
  AcceptableVariables,
  UnresolvedVariables,
  FieldOptions,
  DirectiveArgs
} from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface QueryFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Query', T, TVariables> {
  directive(name: string, args?: DirectiveArgs): QueryFetcher<T, TVariables>

  asset<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Asset', X, XVariables>
  ): QueryFetcher<
    T & { readonly asset?: X },
    TVariables & XVariables & QueryArgs['asset']
  >

  asset<
    XArgs extends AcceptableVariables<QueryArgs['asset']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Asset', X, XVariables>
  ): QueryFetcher<
    T & { readonly asset?: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['asset']>
  >

  asset<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'asset',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Asset', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'asset', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs['asset'] & XDirectiveVariables
  >

  asset<
    XArgs extends AcceptableVariables<QueryArgs['asset']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'asset',
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Asset', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'asset', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['asset']> &
      XDirectiveVariables
  >

  assets<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Asset', X, XVariables>
  ): QueryFetcher<
    T & { readonly assets: readonly X[] },
    TVariables & XVariables
  >

  assets<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'assets',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Asset', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'assets', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >

  collections<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Collection', X, XVariables>
  ): QueryFetcher<
    T & { readonly collections: readonly X[] },
    TVariables & XVariables
  >

  collections<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'collections',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Collection', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'collections', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >

  collection<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Collection', X, XVariables>
  ): QueryFetcher<
    T & { readonly collection: X },
    TVariables & XVariables & QueryArgs['collection']
  >

  collection<
    XArgs extends AcceptableVariables<QueryArgs['collection']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Collection', X, XVariables>
  ): QueryFetcher<
    T & { readonly collection: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['collection']>
  >

  collection<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'collection',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Collection', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'collection', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['collection'] & XDirectiveVariables
  >

  collection<
    XArgs extends AcceptableVariables<QueryArgs['collection']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'collection',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Collection', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'collection', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['collection']> &
      XDirectiveVariables
  >

  listing<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): QueryFetcher<
    T & { readonly listing: readonly X[] },
    TVariables & XVariables
  >

  listing<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'listing',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'listing', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<'User', X, XVariables>
  ): QueryFetcher<
    T & { readonly user?: X },
    TVariables & XVariables & QueryArgs['user']
  >

  user<
    XArgs extends AcceptableVariables<QueryArgs['user']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'User', X, XVariables>
  ): QueryFetcher<
    T & { readonly user?: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['user']>
  >

  user<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'user',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'User', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'user', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs['user'] & XDirectiveVariables
  >

  user<
    XArgs extends AcceptableVariables<QueryArgs['user']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'user',
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'User', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'user', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['user']> &
      XDirectiveVariables
  >
}

export const query$: QueryFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Query',
    'OBJECT',
    [],
    [
      {
        category: 'REFERENCE',
        name: 'asset',
        argGraphQLTypeMap: { tokenId: 'Float!' },
        targetTypeName: 'Asset',
        undefinable: true
      },
      {
        category: 'LIST',
        name: 'assets',
        targetTypeName: 'Asset'
      },
      {
        category: 'LIST',
        name: 'collections',
        targetTypeName: 'Collection'
      },
      {
        category: 'REFERENCE',
        name: 'collection',
        argGraphQLTypeMap: { address: 'String!' },
        targetTypeName: 'Collection'
      },
      {
        category: 'LIST',
        name: 'listing',
        targetTypeName: 'Listing'
      },
      {
        category: 'SCALAR',
        name: 'user',
        argGraphQLTypeMap: { walletAddress: 'String!' },
        targetTypeName: 'User',
        undefinable: true
      }
    ]
  ),
  undefined
)

export interface QueryArgs {
  readonly asset: {
    readonly tokenId: number
  }

  readonly collection: {
    readonly address: string
  }

  readonly user: {
    readonly walletAddress: string
  }
}
