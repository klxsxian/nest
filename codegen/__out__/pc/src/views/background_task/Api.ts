import {
  type Query,
  type Mutation,
  type PageInput,
  type Background_TaskModel,
  type Background_TaskSearch,
  type Background_TaskInput,
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
 * @param {Background_TaskSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: Background_TaskSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: Background_TaskSearch, $page: PageInput, $sort: [SortInput]) {
        findAllBackground_task(search: $search, page: $page, sort: $sort) {
          id
          lbl
          state
          _state
          type
          _type
          result
          err_msg
          begin_time
          end_time
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
  const result: Query["findAllBackground_task"] = data?.findAllBackground_task || [ ];
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
  }
  return result;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {Background_TaskSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: Background_TaskSearch,
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: Background_TaskSearch) {
        findCountBackground_task(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const result: Query["findCountBackground_task"] = data?.findCountBackground_task || 0;
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
        findByIdBackground_task(id: $id) {
          id
          lbl
          state
          _state
          type
          _type
          result
          err_msg
          begin_time
          end_time
          rem
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result: Query["findByIdBackground_task"] = data?.findByIdBackground_task;
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
        deleteByIdsBackground_task(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["deleteByIdsBackground_task"] = data?.deleteByIdsBackground_task;
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
        revertByIdsBackground_task(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["revertByIdsBackground_task"] = data?.revertByIdsBackground_task;
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
        forceDeleteByIdsBackground_task(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result: Mutation["forceDeleteByIdsBackground_task"] = data?.forceDeleteByIdsBackground_task;
  return result;
}

/**
 * 导出Excel
 * @export exportExcel
 * @param {Background_TaskSearch} search?
 * @param {Sort[]} sort?
 */
export async function exportExcel(
  search?: Background_TaskSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data = await gqlQuery({
    query: /* GraphQL */ `
      query($search: Background_TaskSearch, $sort: [SortInput]) {
        exportExcelBackground_task(search: $search, sort: $sort)
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const result: Query["exportExcelBackground_task"] = data?.exportExcelBackground_task || "";
  return result;
}
