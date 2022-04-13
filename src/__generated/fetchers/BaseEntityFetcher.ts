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
export interface BaseEntityFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'BaseEntity', T, TVariables> {
  on<
    XName extends ImplementationType<'BaseEntity'>,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): BaseEntityFetcher<
    XName extends 'BaseEntity'
      ? T & X
      : WithTypeName<T, ImplementationType<'BaseEntity'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'BaseEntity'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(
    name: string,
    args?: DirectiveArgs
  ): BaseEntityFetcher<T, TVariables>

  readonly __typename: BaseEntityFetcher<
    T & { __typename: ImplementationType<'BaseEntity'> },
    TVariables
  >

  readonly id: BaseEntityFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): BaseEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': BaseEntityFetcher<Omit<T, 'id'>, TVariables>
}

export const baseEntity$: BaseEntityFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'BaseEntity',
    'OBJECT',
    [],
    [
      {
        category: 'ID',
        name: 'id'
      }
    ]
  ),
  undefined
)

export const baseEntity$$ = baseEntity$.id
