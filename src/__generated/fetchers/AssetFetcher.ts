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
export interface AssetFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Asset', T, TVariables> {
  on<
    XName extends ImplementationType<'Asset'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AssetFetcher<
    XName extends 'Asset'
      ? T & X
      : WithTypeName<T, ImplementationType<'Asset'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Asset'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): AssetFetcher<T, TVariables>

  readonly __typename: AssetFetcher<
    T & { __typename: ImplementationType<'Asset'> },
    TVariables
  >

  readonly tokenId: AssetFetcher<T & { readonly tokenId: number }, TVariables>

  'tokenId+'<
    XAlias extends string = 'tokenId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'tokenId', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~tokenId': AssetFetcher<Omit<T, 'tokenId'>, TVariables>

  readonly tokenAddress: AssetFetcher<
    T & { readonly tokenAddress: string },
    TVariables
  >

  'tokenAddress+'<
    XAlias extends string = 'tokenAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'tokenAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~tokenAddress': AssetFetcher<Omit<T, 'tokenAddress'>, TVariables>

  readonly tokenUri: AssetFetcher<T & { readonly tokenUri: string }, TVariables>

  'tokenUri+'<
    XAlias extends string = 'tokenUri',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'tokenUri', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~tokenUri': AssetFetcher<Omit<T, 'tokenUri'>, TVariables>

  readonly name: AssetFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': AssetFetcher<Omit<T, 'name'>, TVariables>

  readonly imageUrl: AssetFetcher<T & { readonly imageUrl: string }, TVariables>

  'imageUrl+'<
    XAlias extends string = 'imageUrl',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'imageUrl', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~imageUrl': AssetFetcher<Omit<T, 'imageUrl'>, TVariables>

  readonly animationUrl: AssetFetcher<
    T & { readonly animationUrl?: string },
    TVariables
  >

  'animationUrl+'<
    XAlias extends string = 'animationUrl',
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'animationUrl', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~animationUrl': AssetFetcher<Omit<T, 'animationUrl'>, TVariables>

  readonly gifUrl: AssetFetcher<T & { readonly gifUrl?: string }, TVariables>

  'gifUrl+'<
    XAlias extends string = 'gifUrl',
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'gifUrl', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~gifUrl': AssetFetcher<Omit<T, 'gifUrl'>, TVariables>

  readonly description: AssetFetcher<
    T & { readonly description?: string },
    TVariables
  >

  'description+'<
    XAlias extends string = 'description',
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~description': AssetFetcher<Omit<T, 'description'>, TVariables>

  assetData<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Vland', X, XVariables>
  ): AssetFetcher<T & { readonly assetData: X }, TVariables & XVariables>

  assetData<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'assetData',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Vland', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'assetData', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly createdAtTimestamp: AssetFetcher<
    T & { readonly createdAtTimestamp: number },
    TVariables
  >

  'createdAtTimestamp+'<
    XAlias extends string = 'createdAtTimestamp',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAtTimestamp', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAtTimestamp': AssetFetcher<
    Omit<T, 'createdAtTimestamp'>,
    TVariables
  >

  readonly creator: AssetFetcher<T & { readonly creator: string }, TVariables>

  'creator+'<
    XAlias extends string = 'creator',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'creator', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~creator': AssetFetcher<Omit<T, 'creator'>, TVariables>

  readonly owner: AssetFetcher<T & { readonly owner: string }, TVariables>

  'owner+'<
    XAlias extends string = 'owner',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'owner', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AssetFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~owner': AssetFetcher<Omit<T, 'owner'>, TVariables>

  activeListing<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): AssetFetcher<T & { readonly activeListing?: X }, TVariables & XVariables>

  activeListing<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'activeListing',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'activeListing', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  listings<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Listing', X, XVariables>
  ): AssetFetcher<
    T & { readonly listings?: readonly X[] },
    TVariables & XVariables
  >

  listings<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'listings',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'Listing', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'listings', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >

  salesHistory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'SalesHistory', X, XVariables>
  ): AssetFetcher<
    T & { readonly salesHistory?: readonly X[] },
    TVariables & XVariables
  >

  salesHistory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'salesHistory',
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<'SalesHistory', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'salesHistory', {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AssetFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >
}

export const asset$: AssetFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Asset',
    'EMBEDDED',
    [],
    [
      'tokenId',
      'tokenAddress',
      'tokenUri',
      'name',
      'imageUrl',
      {
        category: 'SCALAR',
        name: 'animationUrl',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'gifUrl',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'description',
        undefinable: true
      },
      {
        category: 'SCALAR',
        name: 'assetData',
        targetTypeName: 'Vland'
      },
      'createdAtTimestamp',
      'creator',
      'owner',
      {
        category: 'REFERENCE',
        name: 'activeListing',
        targetTypeName: 'Listing',
        undefinable: true
      },
      {
        category: 'LIST',
        name: 'listings',
        targetTypeName: 'Listing',
        undefinable: true
      },
      {
        category: 'LIST',
        name: 'salesHistory',
        targetTypeName: 'SalesHistory',
        undefinable: true
      }
    ]
  ),
  undefined
)

export const asset$$ =
  asset$.tokenId.tokenAddress.tokenUri.name.imageUrl.animationUrl.gifUrl
    .description.createdAtTimestamp.creator.owner
