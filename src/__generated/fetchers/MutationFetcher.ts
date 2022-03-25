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
        argGraphQLTypeMap: {
          assetAddress: 'String!',
          assetId: 'String!',
          order: 'String!'
        },
        targetTypeName: 'Listing'
      }
    ]
  ),
  undefined
)

export interface MutationArgs {
  readonly createBuyNowListing: {
    readonly assetAddress: string
    readonly assetId: string
    readonly order: string
  }
}
