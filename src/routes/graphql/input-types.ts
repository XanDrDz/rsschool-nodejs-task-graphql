import {GraphQLInputObjectType} from "graphql/type";
import {GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const ProfileInputType = new GraphQLInputObjectType({
  name: 'ProfileInput',
  fields: () => ({
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLString },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
    userId: { type: GraphQLString },
  }),
});

export const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLString },
  }),
});

export const MemberTypeInputType = new GraphQLInputObjectType({
  name: 'MemberTypeInput',
  fields: () => ({
    id: { type: GraphQLID },
    discounts: { type: GraphQLInt },
    monthPostsLimits: { type: GraphQLInt },
  }),
});