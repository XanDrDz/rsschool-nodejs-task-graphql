import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import {FastifyPluginAsync} from 'fastify';
import * as depthLimit from "graphql-depth-limit";

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {},
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {},
  });

  fastify.addHook('preValidation', async (request: any, reply: any) => {
    if (request.body?.operationName === 'graphql') {
      const maxDepth = 5;
      try {
        depthLimit(
          maxDepth,
          { ignore: [ 'introspectionQuery' ] },
        )(request, reply);
      } catch (error: any) {
        reply.send({ errors: [{ message: error.message }] });
      }
    }
  });
};

export default app;
