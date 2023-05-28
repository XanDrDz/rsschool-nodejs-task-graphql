import {FastifyPluginAsyncJsonSchemaToTs} from '@fastify/type-provider-json-schema-to-ts';
import {graphqlBodySchema} from './schema';
import {createDataLoader} from './loader';
import {GraphQLSchema, graphql} from 'graphql';
import {queryGeneralType} from './query';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  const {postsLoader, profilesLoader, memberTypesLoader} = await createDataLoader(fastify)
  fastify.post('/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function name(request, reply) {
      const {body: {query, variables}} = request
      return await graphql({
        schema: new GraphQLSchema({
          query: queryGeneralType,
          mutation: mutationGeneralType
        }),
        source: query ?? '',
        contextValue: {
          fastify,
          postsLoader,
          profilesLoader,
          memberTypesLoader
        },
        variableValues: variables
      })
    }
  )
}
export default plugin;