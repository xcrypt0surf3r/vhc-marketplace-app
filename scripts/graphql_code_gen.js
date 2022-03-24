const {
  AsyncGenerator,
  loadRemoteSchema
} = require('graphql-ts-client-codegen')
const path = require('path')

const generator = new AsyncGenerator({
  schemaLoader: async () => {
    return loadRemoteSchema('https://mp-server-staging.vaulthill.io/graphql')
  },
  targetDir: path.join(__dirname, '../src/__generated'),
  recreateTargetDir: true
  // defaultFetcherExcludeMap: {
  //   Department: ['avgSalary']
  // }
})
generator.generate()
