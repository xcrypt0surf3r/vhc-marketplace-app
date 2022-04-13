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
export interface UserFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'User', T, TVariables> {
  on<
    XName extends ImplementationType<'User'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): UserFetcher<
    XName extends 'User'
      ? T & X
      : WithTypeName<T, ImplementationType<'User'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'User'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): UserFetcher<T, TVariables>

  readonly __typename: UserFetcher<
    T & { __typename: ImplementationType<'User'> },
    TVariables
  >

  readonly walletAddress: UserFetcher<
    T & { readonly walletAddress: string },
    TVariables
  >

  'walletAddress+'<
    XAlias extends string = 'walletAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'walletAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~walletAddress': UserFetcher<Omit<T, 'walletAddress'>, TVariables>

  bids<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Bid', X, XVariables>
  ): UserFetcher<T & { readonly bids?: readonly X[] }, TVariables & XVariables>

  bids<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bids',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Bid', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bids', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): UserFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >

  assets<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Asset', X, XVariables>
  ): UserFetcher<
    T & { readonly assets?: readonly X[] },
    TVariables & XVariables
  >

  assets<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'assets',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Asset', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'assets', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): UserFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >
}

export const user$: UserFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'User',
    'EMBEDDED',
    [],
    [
      'walletAddress',
      {
        category: 'LIST',
        name: 'bids',
        targetTypeName: 'Bid',
        undefinable: true
      },
      {
        category: 'LIST',
        name: 'assets',
        targetTypeName: 'Asset',
        undefinable: true
      }
    ]
  ),
  undefined
)

export const user$$ = user$.walletAddress
