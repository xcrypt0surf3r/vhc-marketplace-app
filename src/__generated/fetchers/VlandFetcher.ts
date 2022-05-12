import type { FieldOptions, DirectiveArgs } from 'graphql-ts-client-api'
import {
  ObjectFetcher,
  createFetcher,
  createFetchableType
} from 'graphql-ts-client-api'
import type { WithTypeName, ImplementationType } from '../CommonTypes'
import { District, Island, Typology } from '../enums'

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

  readonly coordinates: VlandFetcher<
    T & { readonly coordinates: string },
    TVariables
  >

  'coordinates+'<
    XAlias extends string = 'coordinates',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'coordinates', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~coordinates': VlandFetcher<Omit<T, 'coordinates'>, TVariables>

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

  readonly cadId: VlandFetcher<T & { readonly cadId: string }, TVariables>

  'cadId+'<
    XAlias extends string = 'cadId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'cadId', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~cadId': VlandFetcher<Omit<T, 'cadId'>, TVariables>

  readonly subIsland: VlandFetcher<
    T & { readonly subIsland: number },
    TVariables
  >

  'subIsland+'<
    XAlias extends string = 'subIsland',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'subIsland', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~subIsland': VlandFetcher<Omit<T, 'subIsland'>, TVariables>

  readonly subIslandVariant: VlandFetcher<
    T & { readonly subIslandVariant: string },
    TVariables
  >

  'subIslandVariant+'<
    XAlias extends string = 'subIslandVariant',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'subIslandVariant', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~subIslandVariant': VlandFetcher<
    Omit<T, 'subIslandVariant'>,
    TVariables
  >

  readonly xy1: VlandFetcher<T & { readonly xy1: string }, TVariables>

  'xy1+'<
    XAlias extends string = 'xy1',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'xy1', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~xy1': VlandFetcher<Omit<T, 'xy1'>, TVariables>

  readonly xy2: VlandFetcher<T & { readonly xy2: string }, TVariables>

  'xy2+'<
    XAlias extends string = 'xy2',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'xy2', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~xy2': VlandFetcher<Omit<T, 'xy2'>, TVariables>

  readonly xy3: VlandFetcher<T & { readonly xy3: string }, TVariables>

  'xy3+'<
    XAlias extends string = 'xy3',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'xy3', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~xy3': VlandFetcher<Omit<T, 'xy3'>, TVariables>

  readonly xy4: VlandFetcher<T & { readonly xy4: string }, TVariables>

  'xy4+'<
    XAlias extends string = 'xy4',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'xy4', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VlandFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~xy4': VlandFetcher<Omit<T, 'xy4'>, TVariables>
}

export const vland$: VlandFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Vland',
    'EMBEDDED',
    [],
    [
      'vlandId',
      'typology',
      'district',
      'island',
      'coordinates',
      'cluster',
      'cadId',
      'subIsland',
      'subIslandVariant',
      'xy1',
      'xy2',
      'xy3',
      'xy4'
    ]
  ),
  undefined
)

export const vland$$ =
  vland$.vlandId.typology.district.island.coordinates.cluster.cadId.subIsland
    .subIslandVariant.xy1.xy2.xy3.xy4
