import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { baseEntity$ } from './BaseEntityFetcher'
import { CollectionType } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface CollectionFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Collection', T, TVariables> {
  on<
    XName extends ImplementationType<'Collection'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): CollectionFetcher<
    XName extends 'Collection'
      ? T & X
      : WithTypeName<T, ImplementationType<'Collection'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Collection'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(
    name: string,
    args?: DirectiveArgs
  ): CollectionFetcher<T, TVariables>

  readonly __typename: CollectionFetcher<
    T & { __typename: ImplementationType<'Collection'> },
    TVariables
  >

  readonly id: CollectionFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CollectionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': CollectionFetcher<Omit<T, 'id'>, TVariables>

  readonly name: CollectionFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CollectionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': CollectionFetcher<Omit<T, 'name'>, TVariables>

  readonly type: CollectionFetcher<
    T & { readonly type: CollectionType },
    TVariables
  >

  'type+'<
    XAlias extends string = 'type',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'type', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CollectionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: CollectionType }
        : { readonly [key in XAlias]: CollectionType }),
    TVariables & XDirectiveVariables
  >

  readonly '~type': CollectionFetcher<Omit<T, 'type'>, TVariables>

  readonly contractAddress: CollectionFetcher<
    T & { readonly contractAddress: string },
    TVariables
  >

  'contractAddress+'<
    XAlias extends string = 'contractAddress',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'contractAddress', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CollectionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~contractAddress': CollectionFetcher<
    Omit<T, 'contractAddress'>,
    TVariables
  >

  assets<X extends object, XVariables extends object>(
    child: ObjectFetcher<'Asset', X, XVariables>
  ): CollectionFetcher<
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
  ): CollectionFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >

  readonly createdAtTimestamp: CollectionFetcher<
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
  ): CollectionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAtTimestamp': CollectionFetcher<
    Omit<T, 'createdAtTimestamp'>,
    TVariables
  >
}

export const collection$: CollectionFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Collection',
    'OBJECT',
    [baseEntity$.fetchableType],
    [
      'name',
      'type',
      'contractAddress',
      {
        category: 'LIST',
        name: 'assets',
        targetTypeName: 'Asset',
        undefinable: true
      },
      'createdAtTimestamp'
    ]
  ),
  undefined
)

export const collection$$ =
  collection$.id.name.type.contractAddress.createdAtTimestamp
