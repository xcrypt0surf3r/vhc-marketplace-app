import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface SalesHistoryFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<'SalesHistory', T, TVariables> {
  on<
    XName extends ImplementationType<'SalesHistory'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SalesHistoryFetcher<
    XName extends 'SalesHistory'
      ? T & X
      : WithTypeName<T, ImplementationType<'SalesHistory'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'SalesHistory'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(
    name: string,
    args?: DirectiveArgs
  ): SalesHistoryFetcher<T, TVariables>

  readonly __typename: SalesHistoryFetcher<
    T & { __typename: ImplementationType<'SalesHistory'> },
    TVariables
  >

  readonly maker: SalesHistoryFetcher<
    T & { readonly maker: string },
    TVariables
  >

  'maker+'<
    XAlias extends string = 'maker',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'maker', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SalesHistoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~maker': SalesHistoryFetcher<Omit<T, 'maker'>, TVariables>

  readonly taker: SalesHistoryFetcher<
    T & { readonly taker: string },
    TVariables
  >

  'taker+'<
    XAlias extends string = 'taker',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'taker', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SalesHistoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~taker': SalesHistoryFetcher<Omit<T, 'taker'>, TVariables>

  price<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): SalesHistoryFetcher<T & { readonly price: X }, TVariables & XVariables>

  price<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'price',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'price', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SalesHistoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly dateOfSale: SalesHistoryFetcher<
    T & { readonly dateOfSale: string },
    TVariables
  >

  'dateOfSale+'<
    XAlias extends string = 'dateOfSale',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'dateOfSale', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SalesHistoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~dateOfSale': SalesHistoryFetcher<Omit<T, 'dateOfSale'>, TVariables>

  readonly txHash: SalesHistoryFetcher<
    T & { readonly txHash: string },
    TVariables
  >

  'txHash+'<
    XAlias extends string = 'txHash',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'txHash', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SalesHistoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~txHash': SalesHistoryFetcher<Omit<T, 'txHash'>, TVariables>
}

export const salesHistory$: SalesHistoryFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'SalesHistory',
    'EMBEDDED',
    [],
    [
      'maker',
      'taker',
      {
        category: 'SCALAR',
        name: 'price',
        targetTypeName: 'Price'
      },
      'dateOfSale',
      'txHash'
    ]
  ),
  undefined
)

export const salesHistory$$ = salesHistory$.maker.taker.dateOfSale.txHash
