import {FastifyPluginAsyncJsonSchemaToTs} from '@fastify/type-provider-json-schema-to-ts';
import {idParamSchema} from '../../utils/reusedSchemas';
import {changeMemberTypeBodySchema} from './schema';
import type {MemberTypeEntity} from '../../utils/DB/entities/DBMemberTypes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<MemberTypeEntity[]> {
    return fastify.db.memberTypes.findMany()
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity | null> {
      const res = fastify.db.memberTypes.findOne({key: "id", equals: request.params.id})

      return res ?? reply.code(404).send({message: 'Not found'})
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      return fastify.db.memberTypes.change(request.params.id, request.body)
        .catch((error: Error) => reply.code(400)
          .send({message: error.message ?? "Bad Request"}))
    }
  );
};

export default plugin;
