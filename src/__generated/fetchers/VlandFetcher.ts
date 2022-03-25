import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { District, Typology, Island } from '../enums'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface VlandFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Vland', T, TVariables> {
  on<
    XName extends ImplementationType<'Vland'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VlandFetcher<
    XName extends 'Vland'
      ? T & X
      : WithTypeName<T, ImplementationType<'Vland'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'Vland'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): VlandFetcher<T, TVariables>

  readonly __typename: VlandFetcher<
    T & { __typename: ImplementationType<'Vland'> },
    TVariables
  >

  readonly vlandId: VlandFetcher<T & { readonly vlandId: string }, TVariables>

  'vlandId+'<
    XAlias extends string = 'vlandId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'vlandId', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~vlandId': VlandFetcher<Omit<T, 'vlandId'>, TVariables>

  readonly name: VlandFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': VlandFetcher<Omit<T, 'name'>, TVariables>

  readonly description: VlandFetcher<
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
  ): VlandFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~description': VlandFetcher<Omit<T, 'description'>, TVariables>

  readonly typology: VlandFetcher<
    T & { readonly typology: Typology },
    TVariables
  >

  'typology+'<
    XAlias extends string = 'typology',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'typology', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: Typology }
        : { readonly [key in XAlias]: Typology }),
    TVariables & XDirectiveVariables
  >

  readonly '~typology': VlandFetcher<Omit<T, 'typology'>, TVariables>

  readonly district: VlandFetcher<
    T & { readonly district: District },
    TVariables
  >

  'district+'<
    XAlias extends string = 'district',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'district', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: District }
        : { readonly [key in XAlias]: District }),
    TVariables & XDirectiveVariables
  >

  readonly '~district': VlandFetcher<Omit<T, 'district'>, TVariables>

  readonly island: VlandFetcher<T & { readonly island: Island }, TVariables>

  'island+'<
    XAlias extends string = 'island',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'island', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: Island }
        : { readonly [key in XAlias]: Island }),
    TVariables & XDirectiveVariables
  >

  readonly '~island': VlandFetcher<Omit<T, 'island'>, TVariables>

  readonly x: VlandFetcher<T & { readonly x: number }, TVariables>

  'x+'<
    XAlias extends string = 'x',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'x', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~x': VlandFetcher<Omit<T, 'x'>, TVariables>

  readonly y: VlandFetcher<T & { readonly y: number }, TVariables>

  'y+'<
    XAlias extends string = 'y',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'y', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~y': VlandFetcher<Omit<T, 'y'>, TVariables>

  readonly cluster: VlandFetcher<T & { readonly cluster: number }, TVariables>

  'cluster+'<
    XAlias extends string = 'cluster',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'cluster', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~cluster': VlandFetcher<Omit<T, 'cluster'>, TVariables>
}

export const vland$: VlandFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Vland',
    'EMBEDDED',
    [],
    [
      'vlandId',
      'name',
      {
        category: 'SCALAR',
        name: 'description',
        undefinable: true
      },
      'typology',
      'district',
      'island',
      'x',
      'y',
      'cluster'
    ]
  ),
  undefined
)

export const vland$$ =
  vland$.vlandId.name.description.typology.district.island.x.y.cluster
