import {FastifyPluginAsyncJsonSchemaToTs} from '@fastify/type-provider-json-schema-to-ts';
import {idParamSchema} from '../../utils/reusedSchemas';
import {createProfileBodySchema, changeProfileBodySchema} from './schema';
import type {ProfileEntity} from '../../utils/DB/entities/DBProfiles';
import {checkIsValidID, isNotUser} from "../../helpers/helpers";

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<ProfileEntity[]> {
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
      const res = await fastify.db.profiles.findOne({key: 'id', equals: request.params.id})
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
      try {
        const user = await this.db.users.findOne({key: "id", equals: request.body.userId})
        const memberType = await this.db.memberTypes.findOne({key: "id", equals: request.body.memberTypeId})
        const profile = await this.db.profiles.findOne({key: "userId", equals: request.body.userId})

        if (isNotUser(user, memberType, profile)) {
          throw fastify.httpErrors.badRequest()
        }

        return fastify.db.profiles.create(request.body)
      } catch (error: any) {
        return reply.code(400).send({message: error.message ?? "Bad Request"})
      }

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
        .catch((error: Error) => reply.code(400).send({message: error.message ?? "Bad Request"}))
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
      if (!checkIsValidID(request.params.id)){
        throw fastify.httpErrors.badRequest()
      }

      return fastify.db.profiles.change(request.params.id, request.body)

        try {
        if (request.params.id) {
          const memberType = await fastify.db.memberTypes.findOne({key:'id', equals:request.params.id})
          if(!memberType) throw new Error ('MemberType does not exist');
        }
          return await fastify.db.profiles.change(request.params.id, request.body)
        }
      catch (error: any) {
        return reply.code(400).send({message: error.message || "Bad Request"})
      }
    }
  );
};

export default plugin;
