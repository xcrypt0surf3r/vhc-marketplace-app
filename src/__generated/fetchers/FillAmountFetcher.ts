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
export interface FillAmountFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'FillAmount', T, TVariables> {
  on<
    XName extends ImplementationType<'FillAmount'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FillAmountFetcher<
    XName extends 'FillAmount'
      ? T & X
      : WithTypeName<T, ImplementationType<'FillAmount'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'FillAmount'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(
    name: string,
    args?: DirectiveArgs
  ): FillAmountFetcher<T, TVariables>

  readonly __typename: FillAmountFetcher<
    T & { __typename: ImplementationType<'FillAmount'> },
    TVariables
  >

  amount<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): FillAmountFetcher<T & { readonly amount: X }, TVariables & XVariables>

  amount<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'amount',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'amount', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillAmountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  fee<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): FillAmountFetcher<T & { readonly fee: X }, TVariables & XVariables>

  fee<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'fee',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'fee', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillAmountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  netAmount<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): FillAmountFetcher<T & { readonly netAmount: X }, TVariables & XVariables>

  netAmount<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'netAmount',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Price', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'netAmount', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillAmountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly usdRate: FillAmountFetcher<
    T & { readonly usdRate: number },
    TVariables
  >

  'usdRate+'<
    XAlias extends string = 'usdRate',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'usdRate', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillAmountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~usdRate': FillAmountFetcher<Omit<T, 'usdRate'>, TVariables>

  readonly gbpRate: FillAmountFetcher<
    T & { readonly gbpRate: number },
    TVariables
  >

  'gbpRate+'<
    XAlias extends string = 'gbpRate',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'gbpRate', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillAmountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~gbpRate': FillAmountFetcher<Omit<T, 'gbpRate'>, TVariables>
}

export const fillAmount$: FillAmountFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'FillAmount',
    'EMBEDDED',
    [],
    [
      {
        category: 'SCALAR',
        name: 'amount',
        targetTypeName: 'Price'
      },
      {
        category: 'SCALAR',
        name: 'fee',
        targetTypeName: 'Price'
      },
      {
        category: 'SCALAR',
        name: 'netAmount',
        targetTypeName: 'Price'
      },
      'usdRate',
      'gbpRate'
    ]
  ),
  undefined
)

export const fillAmount$$ = fillAmount$.usdRate.gbpRate
