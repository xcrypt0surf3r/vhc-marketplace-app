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
export interface BuyNowFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'BuyNow', T, TVariables> {
  on<
    XName extends ImplementationType<'BuyNow'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): BuyNowFetcher<
    XName extends 'BuyNow'
      ? T & X
      : WithTypeName<T, ImplementationType<'BuyNow'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'BuyNow'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): BuyNowFetcher<T, TVariables>

  readonly __typename: BuyNowFetcher<
    T & { __typename: ImplementationType<'BuyNow'> },
    TVariables
  >

  readonly startDate: BuyNowFetcher<
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
  ): BuyNowFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~startDate': BuyNowFetcher<Omit<T, 'startDate'>, TVariables>

  readonly endDate: BuyNowFetcher<T & { readonly endDate?: string }, TVariables>

  'endDate+'<
    XAlias extends string = 'endDate',
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'endDate', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): BuyNowFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~endDate': BuyNowFetcher<Omit<T, 'endDate'>, TVariables>

  price<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): BuyNowFetcher<T & { readonly price: X }, TVariables & XVariables>

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
  ): BuyNowFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly order: BuyNowFetcher<T & { readonly order: string }, TVariables>

  'order+'<
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BuyNowFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~order': BuyNowFetcher<Omit<T, 'order'>, TVariables>
}

export const buyNow$: BuyNowFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'BuyNow',
    'EMBEDDED',
    [],
    [
      'startDate',
      {
        category: 'SCALAR',
        name: 'endDate',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'price',
        targetTypeName: 'Price'
      },
      'order'
    ]
  ),
  undefined
)

export const buyNow$$ = buyNow$.startDate.endDate.order
