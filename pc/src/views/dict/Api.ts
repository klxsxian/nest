import {
  type Query,
  type Mutation,
  type PageInput,
  type DictModel,
  type DictSearch,
  type DictInput,
} from "#/types";

import {
  type UsrSearch,
} from "#/types";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {DictSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: DictSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllDict: Query["findAllDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query($search: DictSearch, $page: PageInput, $sort: [SortInput]) {
        findAllDict(search: $search, page: $page, sort: $sort) {
          id
          code
          lbl
          type
          _type
          order_by
          is_enabled
          _is_enabled
          rem
          is_locked
          _is_locked
          create_usr_id
          _create_usr_id
          create_time
          update_usr_id
          _update_usr_id
          update_time
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result = data.findAllDict;
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
  }
  return result;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {DictSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: DictSearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountDict: Query["findCountDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query($search: DictSearch) {
        findCountDict(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const result = data.findCountDict;
  return result;
}

/**
 * 创建一条数据
 * @export create
 * @param {DictInput} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: DictInput,
  opt?: GqlOpt,
) {
  const data: {
    createDict: Mutation["createDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($model: DictInput!) {
        createDict(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const result = data.createDict;
  return result;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {DictInput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: DictInput,
  opt?: GqlOpt,
) {
  const data: {
    updateByIdDict: Mutation["updateByIdDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($id: ID!, $model: DictInput!) {
        updateByIdDict(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const result = data.updateByIdDict;
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
  const data: {
    findByIdDict: Query["findByIdDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query($id: ID!) {
        findByIdDict(id: $id) {
          id
          code
          lbl
          type
          _type
          order_by
          is_enabled
          _is_enabled
          rem
          is_locked
          _is_locked
          create_usr_id
          _create_usr_id
          create_time
          update_usr_id
          _update_usr_id
          update_time
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result = data.findByIdDict;
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
  const data: {
    deleteByIdsDict: Mutation["deleteByIdsDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        deleteByIdsDict(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.deleteByIdsDict;
  return result;
}

/**
 * 根据 ids 删除数据
 * @export lockByIds
 * @param {string[]} ids
 * @param {0 | 1} lockByIds
 * @param {GqlOpt} opt?
 */
export async function lockByIds(
  ids: string[],
  is_locked: 0 | 1,
  opt?: GqlOpt,
) {
  const data: {
    lockByIdsDict: Mutation["lockByIdsDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!, $is_locked: Int!) {
        lockByIdsDict(ids: $ids, is_locked: $is_locked)
      }
    `,
    variables: {
      ids,
      is_locked,
    },
  }, opt);
  const result = data.lockByIdsDict;
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
  const data: {
    revertByIdsDict: Mutation["revertByIdsDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        revertByIdsDict(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.revertByIdsDict;
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
  const data: {
    forceDeleteByIdsDict: Mutation["forceDeleteByIdsDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($ids: [ID!]!) {
        forceDeleteByIdsDict(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.forceDeleteByIdsDict;
  return result;
}

export async function findAllUsr(
  search?: UsrSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllUsr: Query["findAllUsr"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query($search: UsrSearch, $page: PageInput, $sort: [SortInput]) {
        findAllUsr(search: $search, page: $page, sort: $sort) {
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
  const result = data.findAllUsr;
  return result;
}

/**
 * 导出Excel
 * @export exportExcel
 * @param {DictSearch} search?
 * @param {Sort[]} sort?
 */
export async function exportExcel(
  search?: DictSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    exportExcelDict: Query["exportExcelDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query($search: DictSearch, $sort: [SortInput]) {
        exportExcelDict(search: $search, sort: $sort)
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const result = data.exportExcelDict;
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
  const data: {
    importFileDict: Mutation["importFileDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      mutation($id: ID!) {
        importFileDict(id: $id)
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result = data.importFileDict;
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
  const data: {
    findLastOrderByDict: Query["findLastOrderByDict"];
  } = await gqlQuery({
    query: /* GraphQL */ `
      query {
        findLastOrderByDict
      }
    `,
  }, opt);
  const result = data.findLastOrderByDict;
  return result;
}
