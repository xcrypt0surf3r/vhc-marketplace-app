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
import {
  AuctionInput,
  BidInput,
  CreateBuyNowInput,
  FillBuyNowInput
} from '../inputs'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface MutationFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Mutation', T, TVariables> {
  directive(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>

  createBuyNowListing<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createBuyNowListing: X },
    TVariables & XVariables & MutationArgs['createBuyNowListing']
  >

  createBuyNowListing<
    XArgs extends AcceptableVariables<MutationArgs['createBuyNowListing']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createBuyNowListing: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createBuyNowListing']>
  >

  createBuyNowListing<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createBuyNowListing',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createBuyNowListing', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      MutationArgs['createBuyNowListing'] &
      XDirectiveVariables
  >

  createBuyNowListing<
    XArgs extends AcceptableVariables<MutationArgs['createBuyNowListing']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createBuyNowListing',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createBuyNowListing', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createBuyNowListing']> &
      XDirectiveVariables
  >

  fillBuyNowListing<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly fillBuyNowListing: X },
    TVariables & XVariables & MutationArgs['fillBuyNowListing']
  >

  fillBuyNowListing<
    XArgs extends AcceptableVariables<MutationArgs['fillBuyNowListing']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly fillBuyNowListing: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['fillBuyNowListing']>
  >

  fillBuyNowListing<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'fillBuyNowListing',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'fillBuyNowListing', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      MutationArgs['fillBuyNowListing'] &
      XDirectiveVariables
  >

  fillBuyNowListing<
    XArgs extends AcceptableVariables<MutationArgs['fillBuyNowListing']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'fillBuyNowListing',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'fillBuyNowListing', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['fillBuyNowListing']> &
      XDirectiveVariables
  >

  createAuction<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createAuction: X },
    TVariables & XVariables & MutationArgs['createAuction']
  >

  createAuction<
    XArgs extends AcceptableVariables<MutationArgs['createAuction']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createAuction: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createAuction']>
  >

  createAuction<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createAuction',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createAuction', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      MutationArgs['createAuction'] &
      XDirectiveVariables
  >

  createAuction<
    XArgs extends AcceptableVariables<MutationArgs['createAuction']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createAuction',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createAuction', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createAuction']> &
      XDirectiveVariables
  >

  createBid<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createBid: X },
    TVariables & XVariables & MutationArgs['createBid']
  >

  createBid<
    XArgs extends AcceptableVariables<MutationArgs['createBid']>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>
  ): MutationFetcher<
    T & { readonly createBid: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createBid']>
  >

  createBid<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createBid',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createBid', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['createBid'] & XDirectiveVariables
  >

  createBid<
    XArgs extends AcceptableVariables<MutationArgs['createBid']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'createBid',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'createBid', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['createBid']> &
      XDirectiveVariables
  >
}

export const mutation$: MutationFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Mutation',
    'EMBEDDED',
    [],
    [
      {
        category: 'SCALAR',
        name: 'createBuyNowListing',
        argGraphQLTypeMap: { data: 'CreateBuyNowInput!' },
        targetTypeName: 'Listing'
      },
      {
        category: 'SCALAR',
        name: 'fillBuyNowListing',
        argGraphQLTypeMap: { data: 'FillBuyNowInput!' },
        targetTypeName: 'Listing'
      },
      {
        category: 'SCALAR',
        name: 'createAuction',
        argGraphQLTypeMap: { data: 'AuctionInput!' },
        targetTypeName: 'Listing'
      },
      {
        category: 'SCALAR',
        name: 'createBid',
        argGraphQLTypeMap: { data: 'BidInput!' },
        targetTypeName: 'Listing'
      }
    ]
  ),
  undefined
)

export interface MutationArgs {
  readonly createBuyNowListing: {
    readonly data: CreateBuyNowInput
  }

  readonly fillBuyNowListing: {
    readonly data: FillBuyNowInput
  }

  readonly createAuction: {
    readonly data: AuctionInput
  }

  readonly createBid: {
    readonly data: BidInput
  }
}
