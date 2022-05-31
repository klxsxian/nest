import { defineGraphql } from "/lib/context.ts";
import * as resolvers from "./oss.resolver.ts";

defineGraphql(resolvers, /* GraphQL */`
type GetStatusOss {
  id: ID!
  lbl: String!
  content_type: String
}

type Query {
  "获取附件信息列表, 包括文件名"
  getStatsOss(ids: [ID]!): [GetStatusOss]!
}
`);
