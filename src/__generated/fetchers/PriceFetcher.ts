import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { Currency } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface PriceFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Price', T, TVariables> {
  on<
    XName extends ImplementationType<'Price'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PriceFetcher<
    XName extends 'Price'
      ? T & X
      : WithTypeName<T, ImplementationType<'Price'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Price'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): PriceFetcher<T, TVariables>

  readonly __typename: PriceFetcher<
    T & { __typename: ImplementationType<'Price'> },
    TVariables
  >

  readonly currency: PriceFetcher<
    T & { readonly currency: Currency },
    TVariables
  >

  'currency+'<
    XAlias extends string = 'currency',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'currency', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: Currency }
        : { readonly [key in XAlias]: Currency }),
    TVariables & XDirectiveVariables
  >

  readonly '~currency': PriceFetcher<Omit<T, 'currency'>, TVariables>

  readonly value: PriceFetcher<T & { readonly value: number }, TVariables>

  'value+'<
    XAlias extends string = 'value',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'value', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~value': PriceFetcher<Omit<T, 'value'>, TVariables>
}

export const price$: PriceFetcher<{}, {}> = createFetcher(
  createFetchableType('Price', 'EMBEDDED', [], ['currency', 'value']),
  undefined
)

export const price$$ = price$.currency.value
