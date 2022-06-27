import { Query } from "#/types.ts";
import dayjs from "dayjs";
import { TenantModel, TenantSearch } from "./Model";
import { uploadFile } from "@/utils/axios";
import { gql, GqlOpt, gqlQuery, baseURL } from "@/utils/graphql";
import { Page, Sort } from "@/utils/page.model";

import { MenuModel, MenuSearch } from "../menu/Model";
/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {TenantSearch} search?
 * @param {Page} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: TenantSearch,
  page?: Page,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
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
  const result: Query.findAllMenu = data?.findAllTenant || [ ];
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    item.expiration = item.expiration && new Date(item.expiration).toLocaleDateString() || "";
  }
  return result;
}

/**
 * 根据搜索条件和分页查找数据和总数
 * @export findAllAndCount
 * @param {TenantSearch} search?
 * @param {Page} page?
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAllAndCount(
  search?: TenantSearch,
  page?: Page,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
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
        findCountTenant(search: $search)
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result = {
    data: data?.findAllTenant || [ ],
    count: data?.findCountTenant || 0,
  };
  for (let i = 0; i < result.data.length; i++) {
    const item = result.data[i];
    item.expiration = item.expiration && dayjs(item.expiration).format("YYYY-MM-DD") || "";
  }
  return result;
}

/**
 * 创建一条数据
 * @export create
 * @param {TenantModel} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: TenantModel,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
      mutation($model: TenantInput!) {
        createTenant(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const result: Query.createMenu = data?.createTenant;
  return result;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: TenantModel,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
      mutation($id: ID!, $model: TenantInput!) {
        updateByIdTenant(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const result: Query.updateByIdMenu = data?.updateByIdTenant;
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
    query: gql`
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
  const result: Query.findByIdTenant = data?.findByIdTenant;
  return result;
}

/**
 * 根据ID列表删除数据
 * @export deleteByIds
 * @param {string[]} ids
 * @param {GqlOpt} opt?
 */
export async function deleteByIds(
  ids: string[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
      mutation($ids: [ID]!) {
        deleteByIdsTenant(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Query.deleteByIdsTenant = data?.deleteByIdsTenant;
  return result;
}

/**
 * 根据ID列表从回收站还原数据
 * @export revertByIds
 * @param {string[]} ids
 * @param {GqlOpt} opt?
 */
export async function revertByIds(
  ids: string[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
      mutation($ids: [ID]!) {
        revertByIdsTenant(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Query.revertByIdsTenant = data?.revertByIdsTenant;
  return result;
}

export async function findAllAndCountMenu(
  search?: MenuSearch,
  page?: Page,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
      query($search: MenuSearch, $page: PageInput, $sort: [SortInput]) {
        findAllMenu(search: $search, page: $page, sort: $sort) {
          id
          lbl
        }
        findCountMenu(search: $search)
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result: {
    data: Query.findAllMenu,
    count: Query.findCountMenu,
  } = {
    data: data?.findAllMenu || [ ],
    count: data?.findCountMenu || 0,
  };
  return result;
}

export async function findAllMenu(
  search?: MenuSearch,
  page?: Page,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: gql`
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
  const result: Query.findAllMenu = data?.findAllMenu || [ ];
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
    query: gql`
      query($search: TenantSearch, $sort: [SortInput]) {
        exportExcelTenant(search: $search, sort: $sort)
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const result: Query.exportExcelTenant = data?.exportExcelTenant || "";
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
): Promise<string> {
  if (!file) return;
  const id = await uploadFile(file, undefined, { type: "tmpfile" });
  if (!id) return;
  const rvData = await gqlQuery({
    query: gql`
      mutation($id: ID!) {
        importFileTenant(id: $id)
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Query.importFileTenant = rvData?.importFileTenant || "";
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
    query: gql`
      query {
        findLastOrderByTenant
      }
    `,
  }, opt);
  const result: Query.findLastOrderByTenant = data?.findLastOrderByTenant || 0;
  return result;
}
