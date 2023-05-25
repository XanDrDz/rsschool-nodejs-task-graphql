import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return fastify.db.users.findMany()
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      const res = await this.db.users.findOne({key:"id", equals: request.id})
      return res ?? reply.code(404).send({message:'Not Found'})
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return fastify.db.users.create(request.body)
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return fastify.db.users.delete(request.params.id)
        .catch((error: Error) => reply.code(400).send({message: error ?? 'Invalid user id'}))
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | undefined> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
      if (user)
      return fastify.db.users.change(request.params.id, {
        subscribedToUserIds: [...user.subscribedToUserIds, request.body.userId],
      });
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | undefined> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
      if (user){
        const copySub = [...user.subscribedToUserIds];
        const index = user.subscribedToUserIds.findIndex((item) => item === request.params.id);
        copySub.splice(index, 1);
        return await fastify.db.users.change(request.params.id, { subscribedToUserIds: [...copySub] })
          .catch((error: Error) => reply.code(400).send({ message: error.message ?? 'Invalid user ids.' }));
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return fastify.db.users.change(request.params.id, request.body)
        .catch((error: Error) => reply.code(400).send({message:error.message || "Bad Request"}))
    }
  );
};

export default plugin;
