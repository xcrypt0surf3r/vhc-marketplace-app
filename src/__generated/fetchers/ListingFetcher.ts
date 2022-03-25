import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { ListingType, ListingStatus } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface ListingFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Listing', T, TVariables> {
  on<
    XName extends ImplementationType<'Listing'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ListingFetcher<
    XName extends 'Listing'
      ? T & X
      : WithTypeName<T, ImplementationType<'Listing'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Listing'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ListingFetcher<T, TVariables>

  readonly __typename: ListingFetcher<
    T & { __typename: ImplementationType<'Listing'> },
    TVariables
  >

  readonly assetId: ListingFetcher<T & { readonly assetId: string }, TVariables>

  'assetId+'<
    XAlias extends string = 'assetId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'assetId', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~assetId': ListingFetcher<Omit<T, 'assetId'>, TVariables>

  readonly assetAddress: ListingFetcher<
    T & { readonly assetAddress: string },
    TVariables
  >

  'assetAddress+'<
    XAlias extends string = 'assetAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'assetAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~assetAddress': ListingFetcher<Omit<T, 'assetAddress'>, TVariables>

  readonly type: ListingFetcher<T & { readonly type: ListingType }, TVariables>

  'type+'<
    XAlias extends string = 'type',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'type', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ListingType }
        : { readonly [key in XAlias]: ListingType }),
    TVariables & XDirectiveVariables
  >

  readonly '~type': ListingFetcher<Omit<T, 'type'>, TVariables>

  readonly status: ListingFetcher<
    T & { readonly status: ListingStatus },
    TVariables
  >

  'status+'<
    XAlias extends string = 'status',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'status', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ListingStatus }
        : { readonly [key in XAlias]: ListingStatus }),
    TVariables & XDirectiveVariables
  >

  readonly '~status': ListingFetcher<Omit<T, 'status'>, TVariables>

  readonly order: ListingFetcher<T & { readonly order: string }, TVariables>

  'order+'<
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~order': ListingFetcher<Omit<T, 'order'>, TVariables>
}

export const listing$: ListingFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Listing',
    'EMBEDDED',
    [],
    ['assetId', 'assetAddress', 'type', 'status', 'order']
  ),
  undefined
)

export const listing$$ = listing$.assetId.assetAddress.type.status.order
