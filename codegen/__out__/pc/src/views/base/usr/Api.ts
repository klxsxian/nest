import {
  type Query,
  type Mutation,
  type PageInput,
  type UsrSearch,
  type UsrInput,
} from "#/types";

import {
  type DeptSearch,
  type RoleSearch,
} from "#/types";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {UsrSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
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
          username
          default_dept_id
          default_dept_id_lbl
          dept_ids
          dept_ids_lbl
          is_enabled
          is_enabled_lbl
          role_ids
          role_ids_lbl
          rem
          is_locked
          is_locked_lbl
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const res = data.findAllUsr;
  for (let i = 0; i < res.length; i++) {
    const item = res[i];
  }
  return res;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {UsrSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: UsrSearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountUsr: Query["findCountUsr"];
  } = await query({
    query: /* GraphQL */ `
      query($search: UsrSearch) {
        findCountUsr(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const res = data.findCountUsr;
  return res;
}

/**
 * 创建一条数据
 * @export create
 * @param {UsrInput} model
 * @param {GqlOpt} opt?
 */
export async function create(
  model: UsrInput,
  opt?: GqlOpt,
) {
  const data: {
    createUsr: Mutation["createUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($model: UsrInput!) {
        createUsr(model: $model)
      }
    `,
    variables: {
      model,
    },
  }, opt);
  const res = data.createUsr;
  return res;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {string} id
 * @param {UsrInput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: string,
  model: UsrInput,
  opt?: GqlOpt,
) {
  const data: {
    updateByIdUsr: Mutation["updateByIdUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($id: String!, $model: UsrInput!) {
        updateByIdUsr(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const res = data.updateByIdUsr;
  return res;
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
    findByIdUsr: Query["findByIdUsr"];
  } = await query({
    query: /* GraphQL */ `
      query($id: String!) {
        findByIdUsr(id: $id) {
          id
          lbl
          username
          password
          default_dept_id
          default_dept_id_lbl
          dept_ids
          dept_ids_lbl
          is_enabled
          is_enabled_lbl
          role_ids
          role_ids_lbl
          rem
          is_locked
          is_locked_lbl
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const res = data.findByIdUsr;
  return res;
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
    deleteByIdsUsr: Mutation["deleteByIdsUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        deleteByIdsUsr(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.deleteByIdsUsr;
  return res;
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
    lockByIdsUsr: Mutation["lockByIdsUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!, $is_locked: Int!) {
        lockByIdsUsr(ids: $ids, is_locked: $is_locked)
      }
    `,
    variables: {
      ids,
      is_locked,
    },
  }, opt);
  const res = data.lockByIdsUsr;
  return res;
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
    revertByIdsUsr: Mutation["revertByIdsUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        revertByIdsUsr(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.revertByIdsUsr;
  return res;
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
    forceDeleteByIdsUsr: Mutation["forceDeleteByIdsUsr"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [String!]!) {
        forceDeleteByIdsUsr(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.forceDeleteByIdsUsr;
  return res;
}

export async function findAllDept(
  search?: DeptSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllDept: Query["findAllDept"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DeptSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllDept(search: $search, page: $page, sort: $sort) {
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
  const res = data.findAllDept;
  return res;
}

export async function getDeptList() {
  const data = await findAllDept(
    undefined,
    {
    },
    [
      {
        prop: "order_by",
        order: "ascending",
      },
    ],
    {
      notLoading: true,
    },
  );
  return data;
}

export async function findAllRole(
  search?: RoleSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllRole: Query["findAllRole"];
  } = await query({
    query: /* GraphQL */ `
      query($search: RoleSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllRole(search: $search, page: $page, sort: $sort) {
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
  const res = data.findAllRole;
  return res;
}

export async function getRoleList() {
  const data = await findAllRole(
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
export function useExportExcel(routePath: string) {
  const {
    nAsync,
    nsAsync,
  } = useI18n(routePath);
  const {
    workerFn,
    workerStatus,
    workerTerminate,
  } = useRenderExcel();
  async function workerFn2(
    search?: UsrSearch,
    sort?: Sort[],
    opt?: GqlOpt,
  ) {
    const queryStr = getQueryUrl({
      query: /* GraphQL */ `
        query($search: UsrSearch, $sort: [SortInput!]) {
          findAllUsr(search: $search, sort: $sort) {
            id
            lbl
            username
            password
            default_dept_id
            default_dept_id_lbl
            dept_ids
            dept_ids_lbl
            is_enabled
            is_enabled_lbl
            role_ids
            role_ids_lbl
            rem
            is_locked
            is_locked_lbl
          }
          getFieldCommentsUsr {
            lbl
            username
            default_dept_id
            default_dept_id_lbl
            dept_ids
            dept_ids_lbl
            is_enabled
            is_enabled_lbl
            role_ids
            role_ids_lbl
            rem
            is_locked
            is_locked_lbl
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
        `${ location.origin }/excel_template/base/usr.xlsx`,
        `${ location.origin }${ queryStr }`,
      );
      saveAsExcel(buffer, await nAsync("用户"));
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
 * @param {UsrInput[]} models
 * @export importModels
 */
export async function importModels(
  models: UsrInput[],
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
