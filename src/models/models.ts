import {FastifyInstance} from "fastify";
import * as dataloader from "dataloader";

export type context = {
  fastify:FastifyInstance;
  postsLoader: dataloader<unknown, unknown, unknown>;
  profilesLoader: dataloader<unknown, unknown, unknown>;
  memberTypesLoader: dataloader<unknown, unknown, unknown>;
}