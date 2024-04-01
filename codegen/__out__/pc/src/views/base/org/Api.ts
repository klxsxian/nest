import {
  UniqueType,
} from "#/types";

import type {
  OrgId,
} from "@/typings/ids";

import type {
  Query,
  Mutation,
  PageInput,
} from "#/types";

import type {
  OrgSearch,
  OrgInput,
  OrgModel,
} from "./Model";

async function setLblById(
  model?: OrgModel | null,
  isExcelExport = false,
) {
  if (!model) {
    return;
  }
}

export function intoInput(
  model?: Record<string, any>,
) {
  const input: OrgInput = {
    // ID
    id: model?.id,
    // 名称
    lbl: model?.lbl,
    // 锁定
    is_locked: model?.is_locked,
    is_locked_lbl: model?.is_locked_lbl,
    // 启用
    is_enabled: model?.is_enabled,
    is_enabled_lbl: model?.is_enabled_lbl,
    // 排序
    order_by: model?.order_by,
    // 备注
    rem: model?.rem,
  };
  return input;
}

/**
 * 根据搜索条件查找组织列表
 * @param {OrgSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: OrgSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllOrg: OrgModel[];
  } = await query({
    query: /* GraphQL */ `
      query($search: OrgSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllOrg(search: $search, page: $page, sort: $sort) {
          id
          lbl
          is_locked
          is_locked_lbl
          is_enabled
          is_enabled_lbl
          order_by
          rem
          create_usr_id
          create_usr_id_lbl
          create_time
          create_time_lbl
          update_usr_id
          update_usr_id_lbl
          update_time
          update_time_lbl
          is_deleted
        }
      }
    `,
    variables: {
      search,
      page,
      sort,
    },
  }, opt);
  const models = data.findAllOrg;
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    await setLblById(model);
  }
  return models;
}

/**
 * 根据条件查找第一个组织
 * @param {OrgSearch} search?
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findOne(
  search?: OrgSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findOneOrg?: OrgModel;
  } = await query({
    query: /* GraphQL */ `
      query($search: OrgSearch, $sort: [SortInput!]) {
        findOneOrg(search: $search, sort: $sort) {
          id
          lbl
          is_locked
          is_locked_lbl
          is_enabled
          is_enabled_lbl
          order_by
          rem
          create_usr_id
          create_usr_id_lbl
          create_time
          create_time_lbl
          update_usr_id
          update_usr_id_lbl
          update_time
          update_time_lbl
          is_deleted
        }
      }
    `,
    variables: {
      search,
      sort,
    },
  }, opt);
  const model = data.findOneOrg;
  await setLblById(model);
  return model;
}

/**
 * 根据搜索条件查找组织总数
 * @param {OrgSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: OrgSearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountOrg: Query["findCountOrg"];
  } = await query({
    query: /* GraphQL */ `
      query($search: OrgSearch) {
        findCountOrg(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const count = data.findCountOrg;
  return count;
}

/**
 * 创建组织
 * @param {OrgInput} input
 * @param {UniqueType} unique_type?
 * @param {GqlOpt} opt?
 */
export async function create(
  input: OrgInput,
  unique_type?: UniqueType,
  opt?: GqlOpt,
): Promise<OrgId> {
  input = intoInput(input);
  const data: {
    createOrg: Mutation["createOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($input: OrgInput!, $unique_type: UniqueType) {
        createOrg(input: $input, unique_type: $unique_type)
      }
    `,
    variables: {
      input,
      unique_type,
    },
  }, opt);
  const id: OrgId = data.createOrg;
  return id;
}

/**
 * 根据 id 修改组织
 * @param {OrgId} id
 * @param {OrgInput} input
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: OrgId,
  input: OrgInput,
  opt?: GqlOpt,
): Promise<OrgId> {
  input = intoInput(input);
  const data: {
    updateByIdOrg: Mutation["updateByIdOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($id: OrgId!, $input: OrgInput!) {
        updateByIdOrg(id: $id, input: $input)
      }
    `,
    variables: {
      id,
      input,
    },
  }, opt);
  const id2: OrgId = data.updateByIdOrg;
  return id2;
}

/**
 * 根据 id 查找组织
 * @param {OrgId} id
 * @param {GqlOpt} opt?
 */
export async function findById(
  id: OrgId,
  opt?: GqlOpt,
) {
  const data: {
    findByIdOrg?: OrgModel;
  } = await query({
    query: /* GraphQL */ `
      query($id: OrgId!) {
        findByIdOrg(id: $id) {
          id
          lbl
          is_locked
          is_locked_lbl
          is_enabled
          is_enabled_lbl
          order_by
          rem
          create_usr_id
          create_usr_id_lbl
          create_time
          create_time_lbl
          update_usr_id
          update_usr_id_lbl
          update_time
          update_time_lbl
          is_deleted
        }
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const model = data.findByIdOrg;
  await setLblById(model);
  return model;
}

/**
 * 根据 ids 删除组织
 * @param {OrgId[]} ids
 * @param {GqlOpt} opt?
 */
export async function deleteByIds(
  ids: OrgId[],
  opt?: GqlOpt,
) {
  const data: {
    deleteByIdsOrg: Mutation["deleteByIdsOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [OrgId!]!) {
        deleteByIdsOrg(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.deleteByIdsOrg;
  return res;
}

/**
 * 根据 ids 启用或禁用组织
 * @param {OrgId[]} ids
 * @param {0 | 1} is_enabled
 * @param {GqlOpt} opt?
 */
export async function enableByIds(
  ids: OrgId[],
  is_enabled: 0 | 1,
  opt?: GqlOpt,
) {
  const data: {
    enableByIdsOrg: Mutation["enableByIdsOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [OrgId!]!, $is_enabled: Int!) {
        enableByIdsOrg(ids: $ids, is_enabled: $is_enabled)
      }
    `,
    variables: {
      ids,
      is_enabled,
    },
  }, opt);
  const res = data.enableByIdsOrg;
  return res;
}

/**
 * 根据 ids 锁定或解锁组织
 * @param {OrgId[]} ids
 * @param {0 | 1} is_locked
 * @param {GqlOpt} opt?
 */
export async function lockByIds(
  ids: OrgId[],
  is_locked: 0 | 1,
  opt?: GqlOpt,
) {
  const data: {
    lockByIdsOrg: Mutation["lockByIdsOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [OrgId!]!, $is_locked: Int!) {
        lockByIdsOrg(ids: $ids, is_locked: $is_locked)
      }
    `,
    variables: {
      ids,
      is_locked,
    },
  }, opt);
  const res = data.lockByIdsOrg;
  return res;
}

/**
 * 根据 ids 还原组织
 * @param {OrgId[]} ids
 * @param {GqlOpt} opt?
 */
export async function revertByIds(
  ids: OrgId[],
  opt?: GqlOpt,
) {
  const data: {
    revertByIdsOrg: Mutation["revertByIdsOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [OrgId!]!) {
        revertByIdsOrg(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.revertByIdsOrg;
  return res;
}

/**
 * 根据 ids 彻底删除组织
 * @param {OrgId[]} ids
 * @param {GqlOpt} opt?
 */
export async function forceDeleteByIds(
  ids: OrgId[],
  opt?: GqlOpt,
) {
  const data: {
    forceDeleteByIdsOrg: Mutation["forceDeleteByIdsOrg"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [OrgId!]!) {
        forceDeleteByIdsOrg(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.forceDeleteByIdsOrg;
  return res;
}

/**
 * 下载导入模板
 */
export function useDownloadImportTemplate(routePath: string) {
  const {
    nsAsync,
  } = useI18n(routePath);
  const {
    workerFn,
    workerStatus,
    workerTerminate,
  } = useRenderExcel();
  async function workerFn2() {
    const data = await query({
      query: /* GraphQL */ `
        query {
          getFieldCommentsOrg {
            lbl
            order_by
            rem
          }
        }
      `,
      variables: {
      },
    });
    try {
      const sheetName = await nsAsync("组织");
      const buffer = await workerFn(
        `${ location.origin }/import_template/base/org.xlsx`,
        {
          sheetName,
          data,
        },
      );
      saveAsExcel(buffer, `${ sheetName }${ await nsAsync("导入") }`);
    } catch (err) {
      ElMessage.error(await nsAsync("下载失败"));
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
 * 导出Excel
 */
export function useExportExcel(routePath: string) {
  const {
    nsAsync,
  } = useI18n(routePath);
  const {
    workerFn,
    workerStatus,
    workerTerminate,
  } = useRenderExcel();
  
  const loading = ref(false);
  
  async function workerFn2(
    columns: ExcelColumnType[],
    search?: OrgSearch,
    sort?: Sort[],
    opt?: GqlOpt,
  ) {
    workerStatus.value = "PENDING";
    
    loading.value = true;
    
    try {
      const data = await query({
        query: /* GraphQL */ `
          query($search: OrgSearch, $sort: [SortInput!]) {
            findAllOrg(search: $search, sort: $sort) {
              id
              lbl
              is_locked
              is_locked_lbl
              is_enabled
              is_enabled_lbl
              order_by
              rem
              create_usr_id
              create_usr_id_lbl
              create_time
              create_time_lbl
              update_usr_id
              update_usr_id_lbl
              update_time
              update_time_lbl
            }
            getDict(codes: [
              "is_locked",
              "is_enabled",
            ]) {
              code
              lbl
            }
          }
        `,
        variables: {
          search,
          sort,
        },
      }, opt);
      for (const model of data.findAllOrg) {
        await setLblById(model, true);
      }
      try {
        const sheetName = await nsAsync("组织");
        const buffer = await workerFn(
          `${ location.origin }/excel_template/base/org.xlsx`,
          {
            sheetName,
            columns,
            data,
          },
        );
        saveAsExcel(buffer, sheetName);
      } catch (err) {
        ElMessage.error(await nsAsync("导出失败"));
        throw err;
      }
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    workerFn: workerFn2,
    workerStatus,
    workerTerminate,
  };
}

/**
 * 批量导入
 * @param {OrgInput[]} models
 */
export async function importModels(
  models: OrgInput[],
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
    
    percentage.value = Math.floor((i + 1) / models.length * 100);
    
    const item = models[i];
    
    opt = opt || { };
    opt.showErrMsg = false;
    opt.notLoading = true;
    
    try {
      await create(
        item,
        UniqueType.Update,
        opt,
      );
      succNum++;
    } catch (err) {
      failNum++;
      failErrMsgs.push(await nsAsync(`第 {0} 行导入失败: {1}`, i + 1, err));
    }
    
  }
  
  return showUploadMsg(succNum, failNum, failErrMsgs);
}

/**
 * 查找 组织 order_by 字段的最大值
 * @param {GqlOpt} opt?
 */
export async function findLastOrderBy(
  opt?: GqlOpt,
) {
  const data: {
    findLastOrderByOrg: Query["findLastOrderByOrg"];
  } = await query({
    query: /* GraphQL */ `
      query {
        findLastOrderByOrg
      }
    `,
  }, opt);
  const res = data.findLastOrderByOrg;
  return res;
}

/** 新增时的默认值 */
export async function getDefaultInput() {
  const defaultInput: OrgInput = {
    is_locked: 0,
    is_enabled: 1,
    order_by: 1,
  };
  return defaultInput;
}
