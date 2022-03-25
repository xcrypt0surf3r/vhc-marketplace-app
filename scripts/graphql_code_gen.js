const {
  AsyncGenerator,
  loadRemoteSchema
} = require('graphql-ts-client-codegen')
const path = require('path')

const generator = new AsyncGenerator({
  schemaLoader: async () => {
    return loadRemoteSchema('http://localhost:3000/graphql')
  },
  targetDir: path.join(__dirname, '../src/__generated'),
  recreateTargetDir: true
})
generator.generate()
