import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import {UserEntity} from '../../utils/DB/entities/DBUsers';
import {ProfileEntity} from '../../utils/DB/entities/DBProfiles';
import {context} from '../../models/models'

export const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {type: GraphQLString},
    discounts: {type: GraphQLInt},
    monthPostsLimits: {type: GraphQLInt},
  })
})

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    content: {type: GraphQLString}
  })
})

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    avatar: {type: GraphQLString},
    sex: {type: GraphQLString},
    birthday: {type: GraphQLString},
    country: {type: GraphQLString},
    street: {type: GraphQLString},
    city: {type: GraphQLString},
    memberTypeId: {type: GraphQLString},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  })
})

export const userType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: GraphQLString},
    subscribedToUserIds: {type: new GraphQLList(GraphQLID)},
    posts: {
      type: new GraphQLList(new GraphQLNonNull(postType)),
      resolve: async (source: UserEntity, args: unknown, context: context) => {
        return await context.postsLoader.load(source.id)
      },
    },
    profiles: {
      type: new GraphQLList(new GraphQLNonNull(profileType)),
      resolve: async (source: UserEntity, args: unknown, context: context) => {
        return await context.profilesLoader.load(source.id).catch(() => new Error(`Profile id:${source.id} not found`))
      },
    },
    memberType: {
      type: new GraphQLList(new GraphQLNonNull(memberType)),
      resolve: async (source: UserEntity, args: unknown, context: context) => {

        const userProfile = await context.profilesLoader.load(source.id) as [ProfileEntity]
        if (!userProfile) throw new Error(`Profile with id:${source.id} not found`)


        return await context.memberTypesLoader.load(userProfile[0].memberTypeId)
      },
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(userType)),
      resolve: async (source: UserEntity, args: unknown, context: context) => {
        return await context.fastify.db.users.findMany({key: 'id', equalsAnyOf: source.subscribedToUserIds})
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(userType)),
      resolve: async (source: UserEntity, args: unknown, context: context) => {
        return await context.fastify.db.users.findMany({key: 'subscribedToUserIds', inArray: source.id})
      },
    }
  })
})