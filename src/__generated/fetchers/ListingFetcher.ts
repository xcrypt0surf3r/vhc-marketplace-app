import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { baseEntity$ } from './BaseEntityFetcher'
import { ListingType } from '../enums'

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

  readonly id: ListingFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ListingFetcher<Omit<T, 'id'>, TVariables>

  readonly makerAddress: ListingFetcher<
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
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~makerAddress': ListingFetcher<Omit<T, 'makerAddress'>, TVariables>

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

  buyNow<X extends object, XVariables extends object>(
    child: ObjectFetcher<'BuyNow', X, XVariables>
  ): ListingFetcher<T & { readonly buyNow?: X }, TVariables & XVariables>

  buyNow<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'buyNow',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'BuyNow', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'buyNow', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ListingFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  auction<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Auction', X, XVariables>
  ): ListingFetcher<T & { readonly auction?: X }, TVariables & XVariables>

  auction<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'auction',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Auction', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'auction', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ListingFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  fillDetails<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FillDetails', X, XVariables>
  ): ListingFetcher<T & { readonly fillDetails?: X }, TVariables & XVariables>

  fillDetails<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'fillDetails',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'FillDetails', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'fillDetails', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ListingFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  readonly cancelled: ListingFetcher<
    T & { readonly cancelled?: boolean },
    TVariables
  >

  'cancelled+'<
    XAlias extends string = 'cancelled',
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'cancelled', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ListingFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >

  readonly '~cancelled': ListingFetcher<Omit<T, 'cancelled'>, TVariables>

  readonly isActive: ListingFetcher<
    T & { readonly isActive: boolean },
    TVariables
  >

  'isActive+'<
    XAlias extends string = 'isActive',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'isActive', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >

  readonly '~isActive': ListingFetcher<Omit<T, 'isActive'>, TVariables>

  readonly isExpired: ListingFetcher<
    T & { readonly isExpired: boolean },
    TVariables
  >

  'isExpired+'<
    XAlias extends string = 'isExpired',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'isExpired', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >

  readonly '~isExpired': ListingFetcher<Omit<T, 'isExpired'>, TVariables>

  readonly isComplete: ListingFetcher<
    T & { readonly isComplete: boolean },
    TVariables
  >

  'isComplete+'<
    XAlias extends string = 'isComplete',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'isComplete', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ListingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >

  readonly '~isComplete': ListingFetcher<Omit<T, 'isComplete'>, TVariables>
}

export const listing$: ListingFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Listing',
    'OBJECT',
    [baseEntity$.fetchableType],
    [
      'makerAddress',
      'assetId',
      'assetAddress',
      'type',
      {
        category: 'SCALAR',
        name: 'buyNow',
        targetTypeName: 'BuyNow',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'auction',
        targetTypeName: 'Auction',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'fillDetails',
        targetTypeName: 'FillDetails',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'cancelled',
        undefinable: true
      },
      'isActive',
      'isExpired',
      'isComplete'
    ]
  ),
  undefined
)

export const listing$$ =
  listing$.id.makerAddress.assetId.assetAddress.type.cancelled.isActive
    .isExpired.isComplete
