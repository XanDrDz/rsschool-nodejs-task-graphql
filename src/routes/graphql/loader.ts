import * as dataloader from "dataloader"
import {FastifyInstance} from "fastify"

export const createDataLoader = async (fastify: FastifyInstance) => {
  const getPostsByUserId = async (ids: any) => {
    const posts = await fastify.db.posts.findMany({
      key: 'userId',
      equalsAnyOf: ids
    })
    return ids.map((id: string) => posts.filter((post) => post.userId === id))
  }

  const getMemberTypesByUserId = async (ids: any) => {
    const memberType = await fastify.db.memberTypes.findMany({
      key: 'id',
      equalsAnyOf: ids
    })
    return ids.map((id: string) => memberType.filter((memberType) => memberType.id === id) ?? null)
  }

  const getProfilesByUserId = async (ids: any) => {
    const profile = await fastify.db.profiles.findMany({
      key: 'userId',
      equalsAnyOf: ids
    })
    return ids.map((id: string) => profile.filter((profile) => profile.userId === id) ?? null)
  }

  const postsLoader = new dataloader(getPostsByUserId)
  const profilesLoader = new dataloader(getProfilesByUserId)
  const memberTypesLoader = new dataloader(getMemberTypesByUserId)

  return {postsLoader, profilesLoader, memberTypesLoader}
}