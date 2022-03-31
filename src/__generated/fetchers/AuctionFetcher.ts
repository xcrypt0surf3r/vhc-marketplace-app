import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { AuctionType } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface AuctionFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Auction', T, TVariables> {
  on<
    XName extends ImplementationType<'Auction'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AuctionFetcher<
    XName extends 'Auction'
      ? T & X
      : WithTypeName<T, ImplementationType<'Auction'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Auction'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): AuctionFetcher<T, TVariables>

  readonly __typename: AuctionFetcher<
    T & { __typename: ImplementationType<'Auction'> },
    TVariables
  >

  readonly startDate: AuctionFetcher<
    T & { readonly startDate: string },
    TVariables
  >

  'startDate+'<
    XAlias extends string = 'startDate',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'startDate', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AuctionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~startDate': AuctionFetcher<Omit<T, 'startDate'>, TVariables>

  readonly endDate: AuctionFetcher<T & { readonly endDate: string }, TVariables>

  'endDate+'<
    XAlias extends string = 'endDate',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'endDate', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AuctionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~endDate': AuctionFetcher<Omit<T, 'endDate'>, TVariables>

  startingPrice<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): AuctionFetcher<T & { readonly startingPrice: X }, TVariables & XVariables>

  startingPrice<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'startingPrice',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'startingPrice', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AuctionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  reservePrice<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): AuctionFetcher<T & { readonly reservePrice?: X }, TVariables & XVariables>

  reservePrice<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'reservePrice',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'reservePrice', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AuctionFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  readonly type: AuctionFetcher<T & { readonly type: AuctionType }, TVariables>

  'type+'<
    XAlias extends string = 'type',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'type', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AuctionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: AuctionType }
        : { readonly [key in XAlias]: AuctionType }),
    TVariables & XDirectiveVariables
  >

  readonly '~type': AuctionFetcher<Omit<T, 'type'>, TVariables>

  bids<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Bid', X, XVariables>
  ): AuctionFetcher<
    T & { readonly bids: readonly X[] },
    TVariables & XVariables
  >

  bids<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bids',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Bid', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bids', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AuctionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const auction$: AuctionFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Auction',
    'EMBEDDED',
    [],
    [
      'startDate',
      'endDate',
      {
        category: 'SCALAR',
        name: 'startingPrice',
        targetTypeName: 'Price'
      },
      {
        category: 'SCALAR',
        name: 'reservePrice',
        targetTypeName: 'Price',
        undefinable: true
      },
      'type',
      {
        category: 'LIST',
        name: 'bids',
        targetTypeName: 'Bid'
      }
    ]
  ),
  undefined
)

export const auction$$ = auction$.startDate.endDate.type
