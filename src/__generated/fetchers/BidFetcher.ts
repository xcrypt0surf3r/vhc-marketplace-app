import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { BidStatus } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface BidFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Bid', T, TVariables> {
  on<
    XName extends ImplementationType<'Bid'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): BidFetcher<
    XName extends 'Bid'
      ? T & X
      : WithTypeName<T, ImplementationType<'Bid'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Bid'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): BidFetcher<T, TVariables>

  readonly __typename: BidFetcher<
    T & { __typename: ImplementationType<'Bid'> },
    TVariables
  >

  readonly id: BidFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': BidFetcher<Omit<T, 'id'>, TVariables>

  readonly listingId: BidFetcher<T & { readonly listingId: string }, TVariables>

  'listingId+'<
    XAlias extends string = 'listingId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'listingId', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~listingId': BidFetcher<Omit<T, 'listingId'>, TVariables>

  readonly owner: BidFetcher<T & { readonly owner: string }, TVariables>

  'owner+'<
    XAlias extends string = 'owner',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'owner', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~owner': BidFetcher<Omit<T, 'owner'>, TVariables>

  readonly order: BidFetcher<T & { readonly order: string }, TVariables>

  'order+'<
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~order': BidFetcher<Omit<T, 'order'>, TVariables>

  amount<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Price', X, XVariables>
  ): BidFetcher<T & { readonly amount: X }, TVariables & XVariables>

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
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly status: BidFetcher<T & { readonly status: BidStatus }, TVariables>

  'status+'<
    XAlias extends string = 'status',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'status', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: BidStatus }
        : { readonly [key in XAlias]: BidStatus }),
    TVariables & XDirectiveVariables
  >

  readonly '~status': BidFetcher<Omit<T, 'status'>, TVariables>

  readonly createdAt: BidFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': BidFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly assetName: BidFetcher<T & { readonly assetName: string }, TVariables>

  'assetName+'<
    XAlias extends string = 'assetName',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'assetName', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~assetName': BidFetcher<Omit<T, 'assetName'>, TVariables>

  readonly activeUntil: BidFetcher<
    T & { readonly activeUntil: string },
    TVariables
  >

  'activeUntil+'<
    XAlias extends string = 'activeUntil',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'activeUntil', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BidFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~activeUntil': BidFetcher<Omit<T, 'activeUntil'>, TVariables>
}

export const bid$: BidFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Bid',
    'OBJECT',
    [],
    [
      {
        category: 'ID',
        name: 'id'
      },
      'listingId',
      'owner',
      'order',
      {
        category: 'SCALAR',
        name: 'amount',
        targetTypeName: 'Price'
      },
      'status',
      'createdAt',
      'assetName',
      'activeUntil'
    ]
  ),
  undefined
)

export const bid$$ =
  bid$.id.listingId.owner.order.status.createdAt.assetName.activeUntil
