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
export interface FillDetailsFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'FillDetails', T, TVariables> {
  on<
    XName extends ImplementationType<'FillDetails'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FillDetailsFetcher<
    XName extends 'FillDetails'
      ? T & X
      : WithTypeName<T, ImplementationType<'FillDetails'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'FillDetails'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(
    name: string,
    args?: DirectiveArgs
  ): FillDetailsFetcher<T, TVariables>

  readonly __typename: FillDetailsFetcher<
    T & { __typename: ImplementationType<'FillDetails'> },
    TVariables
  >

  readonly fillDate: FillDetailsFetcher<
    T & { readonly fillDate: string },
    TVariables
  >

  'fillDate+'<
    XAlias extends string = 'fillDate',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'fillDate', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~fillDate': FillDetailsFetcher<Omit<T, 'fillDate'>, TVariables>

  readonly makerAddress: FillDetailsFetcher<
    T & { readonly makerAddress: string },
    TVariables
  >

  'makerAddress+'<
    XAlias extends string = 'makerAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'makerAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~makerAddress': FillDetailsFetcher<
    Omit<T, 'makerAddress'>,
    TVariables
  >

  readonly takerAddress: FillDetailsFetcher<
    T & { readonly takerAddress: string },
    TVariables
  >

  'takerAddress+'<
    XAlias extends string = 'takerAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'takerAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~takerAddress': FillDetailsFetcher<
    Omit<T, 'takerAddress'>,
    TVariables
  >

  fillAmount<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FillAmount', X, XVariables>
  ): FillDetailsFetcher<T & { readonly fillAmount: X }, TVariables & XVariables>

  fillAmount<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'fillAmount',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'FillAmount', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'fillAmount', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly txHash: FillDetailsFetcher<
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
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~txHash': FillDetailsFetcher<Omit<T, 'txHash'>, TVariables>

  readonly txReceipt: FillDetailsFetcher<
    T & { readonly txReceipt: string },
    TVariables
  >

  'txReceipt+'<
    XAlias extends string = 'txReceipt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'txReceipt', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FillDetailsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~txReceipt': FillDetailsFetcher<Omit<T, 'txReceipt'>, TVariables>
}

export const fillDetails$: FillDetailsFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'FillDetails',
    'EMBEDDED',
    [],
    [
      'fillDate',
      'makerAddress',
      'takerAddress',
      {
        category: 'SCALAR',
        name: 'fillAmount',
        targetTypeName: 'FillAmount'
      },
      'txHash',
      'txReceipt'
    ]
  ),
  undefined
)

export const fillDetails$$ =
  fillDetails$.fillDate.makerAddress.takerAddress.txHash.txReceipt
