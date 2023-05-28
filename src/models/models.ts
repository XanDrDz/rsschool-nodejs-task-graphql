import {FastifyInstance} from "fastify";
import * as dataloader from "dataloader";

export type context = {
  fastify:FastifyInstance;
  postsDataLoader: dataloader<unknown, unknown, unknown>;
  profilesDataLoader: dataloader<unknown, unknown, unknown>;
  memberTypesDataLoader: dataloader<unknown, unknown, unknown>;
}