import {
  type Query,
  type Mutation,
  type PageInput,
  type DictbizModel,
  type DictbizSearch,
  type DictbizInput,
} from "#/types";

import {
  type UsrSearch,
} from "#/types";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {DictbizSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: DictbizSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllDictbiz: Query["findAllDictbiz"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DictbizSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllDictbiz(search: $search, page: $page, sort: $sort) {
          id
          code
          lbl
          type
          type_lbl
          order_by
          is_enabled
          is_enabled_lbl
          rem
          is_locked
          is_locked_lbl
          create_usr_id
          create_usr_id_lbl
          create_time
          create_time_lbl
          update_usr_id
          update_usr_id_lbl
          update_time
          update_time_lbl
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const result = data.findAllDictbiz;
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
  }
  return result;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {DictbizSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: DictbizSearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountDictbiz: Query["findCountDictbiz"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DictbizSearch) {
        findCountDictbiz(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const result = data.findCountDictbiz;
  return result;
}

/**
 * 创建一条数据
 * @export create
 * @param {DictbizInput} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: DictbizInput,
  opt?: GqlOpt,
) {
  const data: {
    createDictbiz: Mutation["createDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($model: DictbizInput!) {
        createDictbiz(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const result = data.createDictbiz;
  return result;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {DictbizInput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: DictbizInput,
  opt?: GqlOpt,
) {
  const data: {
    updateByIdDictbiz: Mutation["updateByIdDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($id: String!, $model: DictbizInput!) {
        updateByIdDictbiz(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const result = data.updateByIdDictbiz;
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
    findByIdDictbiz: Query["findByIdDictbiz"];
  } = await query({
    query: /* GraphQL */ `
      query($id: String!) {
        findByIdDictbiz(id: $id) {
          id
          code
          lbl
          type
          type_lbl
          order_by
          is_enabled
          is_enabled_lbl
          rem
          is_locked
          is_locked_lbl
          create_usr_id
          create_usr_id_lbl
          create_time
          create_time_lbl
          update_usr_id
          update_usr_id_lbl
          update_time
          update_time_lbl
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const result = data.findByIdDictbiz;
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
    deleteByIdsDictbiz: Mutation["deleteByIdsDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        deleteByIdsDictbiz(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.deleteByIdsDictbiz;
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
    lockByIdsDictbiz: Mutation["lockByIdsDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!, $is_locked: Int!) {
        lockByIdsDictbiz(ids: $ids, is_locked: $is_locked)
      }
    `,
    variables: {
      ids,
      is_locked,
    },
  }, opt);
  const result = data.lockByIdsDictbiz;
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
    revertByIdsDictbiz: Mutation["revertByIdsDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        revertByIdsDictbiz(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.revertByIdsDictbiz;
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
    forceDeleteByIdsDictbiz: Mutation["forceDeleteByIdsDictbiz"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        forceDeleteByIdsDictbiz(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const result = data.forceDeleteByIdsDictbiz;
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
  } = await query({
    query: /* GraphQL */ `
      query($search: UsrSearch, $page: PageInput, $sort: [SortInput!]) {
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

export async function getUsrList() {
  const data = await findAllUsr(
    undefined,
    {
    },
    [
      {
        prop: "",
        order: "ascending",
      },
    ],
    {
      notLoading: true,
    },
  );
  return data;
}

/**
 * 导出Excel
 */
export function useExportExcel() {
  const route = useRoute();
  const {
    nAsync,
    nsAsync,
  } = useI18n(route.path);
  const {
    workerFn,
    workerStatus,
    workerTerminate,
  } = useRenderExcel();
  async function workerFn2(
    search?: DictbizSearch,
    sort?: Sort[],
    opt?: GqlOpt,
  ) {
    const queryStr = getQueryUrl({
      query: /* GraphQL */ `
        query($search: DictbizSearch, $sort: [SortInput!]) {
          findAllDictbiz(search: $search, sort: $sort) {
            id
            code
            lbl
            type
            type_lbl
            order_by
            is_enabled
            is_enabled_lbl
            rem
            is_locked
            is_locked_lbl
            create_usr_id
            create_usr_id_lbl
            create_time
            create_time_lbl
            update_usr_id
            update_usr_id_lbl
            update_time
            update_time_lbl
          }
          getFieldCommentsDictbiz {
            code
            lbl
            type
            type_lbl
            order_by
            is_enabled
            is_enabled_lbl
            rem
            is_locked
            is_locked_lbl
            create_usr_id
            create_usr_id_lbl
            create_time
            create_time_lbl
            update_usr_id
            update_usr_id_lbl
            update_time
            update_time_lbl
          }
        }
      `,
      variables: {
        search,
        sort,
      },
    }, opt);
    try {
      const buffer = await workerFn(
        `${ location.origin }/excel_template/base/dictbiz.xlsx`,
        `${ location.origin }${ queryStr }`,
      );
      saveAsExcel(buffer, await nAsync("业务字典"));
    } catch (err) {
      ElMessage.error(await nsAsync("导出失败"));
      throw err;
    }
  }
  return {
    workerFn: workerFn2,
    workerStatus,
    workerTerminate,
  };
}

/**
 * 批量导入
 * @param {DictbizInput[]} models
 * @export importModels
 */
export async function importModels(
  models: DictbizInput[],
  percentage: Ref<number>,
  isCancel: Ref<boolean>,
  opt?: GqlOpt,
) {
  const {
    nsAsync,
  } = useI18n();
  
  let succNum = 0;
  let failNum = 0;
  const failErrMsgs: string[] = [ ];
  percentage.value = 0;
  
  for (let i = 0; i < models.length; i++) {
    if (isCancel.value) {
      break;
    }
    
    const item = models[i];
    
    opt = opt || { };
    opt.showErrMsg = false;
    opt.notLoading = true;
    
    try {
      await create(item, opt);
      succNum++;
    } catch (err) {
      failNum++;
      failErrMsgs.push(await nsAsync(`第 {0} 行导入失败: {1}`, i + 1, err));
    }
    
    percentage.value = Math.floor((i + 1) / models.length * 100);
  }
  
  return showUploadMsg(succNum, failNum, failErrMsgs);
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
    findLastOrderByDictbiz: Query["findLastOrderByDictbiz"];
  } = await query({
    query: /* GraphQL */ `
      query {
        findLastOrderByDictbiz
      }
    `,
  }, opt);
  const result = data.findLastOrderByDictbiz;
  return result;
}
