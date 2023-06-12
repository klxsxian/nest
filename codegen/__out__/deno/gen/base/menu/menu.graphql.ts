import { defineGraphql } from "/lib/context.ts";

import * as resolver from "./menu.resolver.ts";

defineGraphql(resolver, /* GraphQL */ `

type MenuModel {
  "ID"
  id: String!
  "类型"
  type: String!
  "类型"
  type_lbl: String
  "父菜单"
  parent_id: String!
  "父菜单"
  parent_id_lbl: String
  "名称"
  lbl: String!
  "路由"
  route_path: String!
  "参数"
  route_query: String
  "启用"
  is_enabled: Int!
  "启用"
  is_enabled_lbl: String
  "排序"
  order_by: Int!
  "备注"
  rem: String!
}
type MenuFieldComment {
  "类型"
  type: String!
  "类型"
  type_lbl: String!
  "父菜单"
  parent_id: String!
  "父菜单"
  parent_id_lbl: String!
  "名称"
  lbl: String!
  "路由"
  route_path: String!
  "参数"
  route_query: String!
  "启用"
  is_enabled: String!
  "启用"
  is_enabled_lbl: String!
  "排序"
  order_by: String!
  "备注"
  rem: String!
}
input MenuInput {
  ""
  id: String
  "类型"
  type: String
  "类型"
  type_lbl: String
  "父菜单"
  parent_id: String
  "父菜单"
  parent_id_lbl: String
  "名称"
  lbl: String
  "路由"
  route_path: String
  "参数"
  route_query: String
  "启用"
  is_enabled: Int
  "启用"
  is_enabled_lbl: String
  "排序"
  order_by: Int
  "备注"
  rem: String
}
input MenuSearch {
  "是否已删除"
  is_deleted: Int
  "ID列表"
  ids: [String]
  "String"
  id: String
  "类型"
  type: [String!]
  "父菜单"
  parent_id: [String!]
  parent_id_is_null: Boolean
  "名称"
  lbl: String
  lbl_like: String
  "路由"
  route_path: String
  route_path_like: String
  "参数"
  route_query: String
  route_query_like: String
  "启用"
  is_enabled: [Int!]
  "排序"
  order_by: [Int!]
  "备注"
  rem: String
  rem_like: String
}
type Query {
  "根据条件查找据数总数"
  findCountMenu(search: MenuSearch): Int!
  "根据搜索条件和分页查找数据"
  findAllMenu(search: MenuSearch, page: PageInput, sort: [SortInput!]): [MenuModel!]!
  "获取字段对应的名称"
  getFieldCommentsMenu: MenuFieldComment!
  "根据条件查找第一条数据"
  findOneMenu(search: MenuSearch, sort: [SortInput!]): MenuModel
  "根据id查找一条数据"
  findByIdMenu(id: String!): MenuModel
  "查找order_by字段的最大值"
  findLastOrderByMenu: Int!
}
type Mutation {
  "创建一条数据"
  createMenu(model: MenuInput!): String!
  "根据id修改一条数据"
  updateByIdMenu(id: String!, model: MenuInput!): String!
  "根据 ids 删除数据"
  deleteByIdsMenu(ids: [String!]!): Int!
  "根据 ids 还原数据"
  revertByIdsMenu(ids: [String!]!): Int!
  "根据 ids 彻底删除数据"
  forceDeleteByIdsMenu(ids: [String!]!): Int!
}

`);
