import { GraphQLNonNull, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { FastifyInstance } from 'fastify';
import { userType, profileType, postType, memberType } from './types';
import { UserEntity } from '../../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

export const mutationGeneralType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (source: unknown, { firstName, lastName, email }: UserEntity, { fastify }: { fastify: FastifyInstance }) => {
        return await fastify.db.users.create({ firstName, lastName, email });
      },
    },
    createProfile: {
      type: profileType,
      args: {
        avatar: { type: GraphQLString },
        sex: { type: GraphQLString },
        birthday: { type: GraphQLString },
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        memberTypeId: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (
        source: unknown,
        { avatar, sex, birthday, country, street, city, memberTypeId, userId }: ProfileEntity,
        { fastify }: { fastify: FastifyInstance }
      ) => {
        return await fastify.db.profiles.create({
          avatar,
          sex,
          birthday,
          country,
          street,
          city,
          memberTypeId,
          userId,
        });
      },
    },
    createPost: {
      type: postType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source: unknown, { title, content, userId }: PostEntity, { fastify }: { fastify: FastifyInstance }) => {
        return await fastify.db.posts.create({ title, content, userId });
      },
    },
    createMemberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        discounts: { type: GraphQLInt },
        monthPostsLimits: { type: GraphQLInt },
      },
      resolve: async (
        source: unknown,
        {id, discount, monthPostsLimit }: MemberTypeEntity,
        { fastify }: { fastify: FastifyInstance }
      ) => {
        return await fastify.db.memberTypes.create({id, discount, monthPostsLimit });
      },
    },
  }),
});
