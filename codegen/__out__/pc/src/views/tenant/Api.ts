import {
  type Query,
  type Mutation,
  type PageInput,
  type TenantModel,
  type TenantSearch,
  type TenantInput,
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

import {
  type MenuSearch,
} from "#/types";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {TenantSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: TenantSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: TenantSearch, $page: PageInput, $sort: [SortInput]) {
        findAllTenant(search: $search, page: $page, sort: $sort) {
          id
          lbl
          host
          expiration
          max_usr_num
          is_enabled
          _is_enabled
          menu_ids
          _menu_ids
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
  const result: Query["findAllTenant"] = data?.findAllTenant || [ ];
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
  }
  return result;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {TenantSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: TenantSearch,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: TenantSearch) {
        findCountTenant(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const result: Query["findCountTenant"] = data?.findCountTenant || 0;
  return result;
}

/**
 * 创建一条数据
 * @export create
 * @param {TenantInput} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: TenantInput,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($model: TenantInput!) {
        createTenant(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const result: Mutation["createTenant"] = data?.createTenant;
  return result;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {TenantInput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: TenantInput,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      mutation($id: ID!, $model: TenantInput!) {
        updateByIdTenant(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const result: Mutation["updateByIdTenant"] = data?.updateByIdTenant;
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
        findByIdTenant(id: $id) {
          id
          lbl
          host
          expiration
          max_usr_num
          is_enabled
          _is_enabled
          menu_ids
          _menu_ids
          order_by
          rem
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Query["findByIdTenant"] = data?.findByIdTenant;
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
        deleteByIdsTenant(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["deleteByIdsTenant"] = data?.deleteByIdsTenant;
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
        revertByIdsTenant(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["revertByIdsTenant"] = data?.revertByIdsTenant;
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
        forceDeleteByIdsTenant(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["forceDeleteByIdsTenant"] = data?.forceDeleteByIdsTenant;
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
 * @param {TenantSearch} search?
 * @param {Sort[]} sort?
 */
export async function exportExcel(
  search?: TenantSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: TenantSearch, $sort: [SortInput]) {
        exportExcelTenant(search: $search, sort: $sort)
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const result: Query["exportExcelTenant"] = data?.exportExcelTenant || "";
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
        importFileTenant(id: $id)
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Mutation["importFileTenant"] = data?.importFileTenant;
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
        findLastOrderByTenant
      }
    `,
  }, opt);
  const result: Query["findLastOrderByTenant"] = data?.findLastOrderByTenant || 0;
  return result;
}
