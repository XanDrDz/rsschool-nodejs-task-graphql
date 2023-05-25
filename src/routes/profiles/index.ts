import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<
    ProfileEntity[]
  > {
    return fastify.db.profiles.findMany()
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity | null> {
      const res = await fastify.db.profiles.findOne({key:'id', equals:request.params.id})
      return res ?? reply.code(404).send({message: 'Not found'})
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      return fastify.db.profiles.create(request.body)
        .catch((error: Error) => reply.code(400).send({message:error.message ?? "Bad Request"}))
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      return fastify.db.profiles.delete(request.params.id)
        .catch((error: Error) => reply.code(400).send({message:error.message ?? "Bad Request"}))
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      return fastify.db.profiles.change(request.params.id, request.body)
        .catch((error: Error) => reply.code(400).send({message:error.message || "Bad Request"}))
    }
  );
};

export default plugin;
