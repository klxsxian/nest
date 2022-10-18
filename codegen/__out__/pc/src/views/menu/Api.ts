import {
  type Query,
  type Mutation,
  type PageInput,
  type MenuModel,
  type MenuSearch,
  type MenuInput,
} from "#/types";

import dayjs from "dayjs";
import { uploadFile } from "@/utils/axios";

import {
  gqlQuery,
  type GqlOpt,
} from "@/utils/graphql";

import {
  type Sort,
} from "element-plus/lib/components/table/src/table/defaults";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {MenuSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: MenuSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: MenuSearch, $page: PageInput, $sort: [SortInput]) {
        findAllMenu(search: $search, page: $page, sort: $sort) {
          id
          type
          _type
          menu_id
          _menu_id
          lbl
          route_path
          route_query
          is_enabled
          _is_enabled
          order_by
          rem
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result: Query["findAllMenu"] = data?.findAllMenu || [ ];
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    item.route_query = item.route_query && JSON.stringify(item.route_query) || "";
  }
  return result;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {MenuSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: MenuSearch,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: MenuSearch) {
        findCountMenu(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const result: Query["findCountMenu"] = data?.findCountMenu || 0;
  return result;
}

/**
 * 创建一条数据
 * @export create
 * @param {MenuInput} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: MenuInput,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($model: MenuInput!) {
        createMenu(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const result: Mutation["createMenu"] = data?.createMenu;
  return result;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {MenuInput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: MenuInput,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($id: ID!, $model: MenuInput!) {
        updateByIdMenu(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const result: Mutation["updateByIdMenu"] = data?.updateByIdMenu;
  return result;
}

/**
 * 通过ID查找一条数据
 * @export findById
 * @param {string} id
 * @param {GqlOpt} opt?
 */
export async function findById(
  id: string,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($id: ID!) {
        findByIdMenu(id: $id) {
          id
          type
          _type
          menu_id
          _menu_id
          lbl
          route_path
          route_query
          is_enabled
          _is_enabled
          order_by
          rem
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Query["findByIdMenu"] = data?.findByIdMenu;
  if (result?.route_query) {
    result.route_query = JSON.stringify(result.route_query);
  }
  return result;
}

/**
 * 根据 ids 删除数据
 * @export deleteByIds
 * @param {string[]} ids
 * @param {GqlOpt} opt?
 */
export async function deleteByIds(
  ids: string[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        deleteByIdsMenu(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["deleteByIdsMenu"] = data?.deleteByIdsMenu;
  return result;
}

/**
 * 根据 ids 从回收站还原数据
 * @export revertByIds
 * @param {string[]} ids
 * @param {GqlOpt} opt?
 */
export async function revertByIds(
  ids: string[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        revertByIdsMenu(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["revertByIdsMenu"] = data?.revertByIdsMenu;
  return result;
}

/**
 * 根据 ids 彻底删除数据
 * @export forceDeleteByIds
 * @param {string[]} ids
 * @param {GqlOpt} opt?
 */
export async function forceDeleteByIds(
  ids: string[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        forceDeleteByIdsMenu(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["forceDeleteByIdsMenu"] = data?.forceDeleteByIdsMenu;
  return result;
}

export async function findAllMenu(
  search?: MenuSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: MenuSearch, $page: PageInput, $sort: [SortInput]) {
        findAllMenu(search: $search, page: $page, sort: $sort) {
          id
          lbl
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result: Query["findAllMenu"] = data?.findAllMenu || [ ];
  return result;
}

/**
 * 导出Excel
 * @export exportExcel
 * @param {MenuSearch} search?
 * @param {Sort[]} sort?
 */
export async function exportExcel(
  search?: MenuSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: MenuSearch, $sort: [SortInput]) {
        exportExcelMenu(search: $search, sort: $sort)
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const result: Query["exportExcelMenu"] = data?.exportExcelMenu || "";
  return result;
}

/**
 * 导入文件
 * @param {File} file
 * @export importFile
 */
export async function importFile(
  file: File,
  opt?: GqlOpt,
) {
  if (!file) return;
  const id = await uploadFile(file, undefined, { type: "tmpfile" });
  if (!id) return;
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($id: ID!) {
        importFileMenu(id: $id)
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Mutation["importFileMenu"] = data?.importFileMenu;
  return result;
}

/**
 * 查找order_by字段的最大值
 * @export findLastOrderBy
 * @param {GqlOpt} opt?
 */
export async function findLastOrderBy(
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query {
        findLastOrderByMenu
      }
    `,
  }, opt);
  const result: Query["findLastOrderByMenu"] = data?.findLastOrderByMenu || 0;
  return result;
}
