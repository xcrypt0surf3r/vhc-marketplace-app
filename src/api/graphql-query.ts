import { gql } from '@apollo/client'
import setupApollo from './graphql-api'

class GraphqlQuery {
  constructor(private client: any) {}

  public getAssets = (): Promise<any> => {
    return this.client.query({
      query: gql`
        {
          assets {
            id
            name
            image
            attributes {
              name
              value
            }
          }
        }
      `
    })
  }
}

export default new GraphqlQuery(setupApollo())
