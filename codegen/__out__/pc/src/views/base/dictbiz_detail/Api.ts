import {
  UniqueType,
} from "#/types";

import type {
  DictbizDetailId,
} from "@/typings/ids";

import type {
  Query,
  Mutation,
  PageInput,
  DictbizDetailSearch,
  DictbizDetailInput,
  DictbizDetailModel,
} from "#/types";

import type {
  DictbizSearch,
} from "#/types";

async function setLblById(
  model?: DictbizDetailModel | null,
) {
  if (!model) {
    return;
  }
}

export function intoInput(
  model?: Record<string, any>,
) {
  const input: DictbizDetailInput = {
    // ID
    id: model?.id,
    // 业务字典
    dictbiz_id: model?.dictbiz_id,
    dictbiz_id_lbl: model?.dictbiz_id_lbl,
    // 名称
    lbl: model?.lbl,
    // 值
    val: model?.val,
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
 * 根据搜索条件查找业务字典明细列表
 * @param {DictbizDetailSearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: DictbizDetailSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllDictbizDetail: Query["findAllDictbizDetail"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DictbizDetailSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllDictbizDetail(search: $search, page: $page, sort: $sort) {
          id
          dictbiz_id
          dictbiz_id_lbl
          lbl
          val
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
  const models = data.findAllDictbizDetail;
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    await setLblById(model);
  }
  return models;
}

/**
 * 根据条件查找第一个业务字典明细
 * @param {DictbizDetailSearch} search?
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findOne(
  search?: DictbizDetailSearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findOneDictbizDetail: Query["findOneDictbizDetail"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DictbizDetailSearch, $sort: [SortInput!]) {
        findOneDictbizDetail(search: $search, sort: $sort) {
          id
          dictbiz_id
          dictbiz_id_lbl
          lbl
          val
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
  const model = data.findOneDictbizDetail;
  await setLblById(model);
  return model;
}

/**
 * 根据搜索条件查找业务字典明细总数
 * @param {DictbizDetailSearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: DictbizDetailSearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountDictbizDetail: Query["findCountDictbizDetail"];
  } = await query({
    query: /* GraphQL */ `
      query($search: DictbizDetailSearch) {
        findCountDictbizDetail(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const count = data.findCountDictbizDetail;
  return count;
}

/**
 * 创建业务字典明细
 * @param {DictbizDetailInput} input
 * @param {UniqueType} unique_type?
 * @param {GqlOpt} opt?
 */
export async function create(
  input: DictbizDetailInput,
  unique_type?: UniqueType,
  opt?: GqlOpt,
): Promise<DictbizDetailId> {
  input = intoInput(input);
  const data: {
    createDictbizDetail: Mutation["createDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($input: DictbizDetailInput!, $unique_type: UniqueType) {
        createDictbizDetail(input: $input, unique_type: $unique_type)
      }
    `,
    variables: {
      input,
      unique_type,
    },
  }, opt);
  const id: DictbizDetailId = data.createDictbizDetail;
  return id;
}

/**
 * 根据 id 修改业务字典明细
 * @param {DictbizDetailId} id
 * @param {DictbizDetailInput} input
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: DictbizDetailId,
  input: DictbizDetailInput,
  opt?: GqlOpt,
): Promise<DictbizDetailId> {
  input = intoInput(input);
  const data: {
    updateByIdDictbizDetail: Mutation["updateByIdDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($id: DictbizDetailId!, $input: DictbizDetailInput!) {
        updateByIdDictbizDetail(id: $id, input: $input)
      }
    `,
    variables: {
      id,
      input,
    },
  }, opt);
  const id2: DictbizDetailId = data.updateByIdDictbizDetail;
  return id2;
}

/**
 * 根据 id 查找业务字典明细
 * @param {DictbizDetailId} id
 * @param {GqlOpt} opt?
 */
export async function findById(
  id: DictbizDetailId,
  opt?: GqlOpt,
) {
  const data: {
    findByIdDictbizDetail: Query["findByIdDictbizDetail"];
  } = await query({
    query: /* GraphQL */ `
      query($id: DictbizDetailId!) {
        findByIdDictbizDetail(id: $id) {
          id
          dictbiz_id
          dictbiz_id_lbl
          lbl
          val
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
  const model = data.findByIdDictbizDetail;
  await setLblById(model);
  return model;
}

/**
 * 根据 ids 删除业务字典明细
 * @param {DictbizDetailId[]} ids
 * @param {GqlOpt} opt?
 */
export async function deleteByIds(
  ids: DictbizDetailId[],
  opt?: GqlOpt,
) {
  const data: {
    deleteByIdsDictbizDetail: Mutation["deleteByIdsDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [DictbizDetailId!]!) {
        deleteByIdsDictbizDetail(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.deleteByIdsDictbizDetail;
  return res;
}

/**
 * 根据 ids 启用或禁用业务字典明细
 * @param {DictbizDetailId[]} ids
 * @param {0 | 1} is_enabled
 * @param {GqlOpt} opt?
 */
export async function enableByIds(
  ids: DictbizDetailId[],
  is_enabled: 0 | 1,
  opt?: GqlOpt,
) {
  const data: {
    enableByIdsDictbizDetail: Mutation["enableByIdsDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [DictbizDetailId!]!, $is_enabled: Int!) {
        enableByIdsDictbizDetail(ids: $ids, is_enabled: $is_enabled)
      }
    `,
    variables: {
      ids,
      is_enabled,
    },
  }, opt);
  const res = data.enableByIdsDictbizDetail;
  return res;
}

/**
 * 根据 ids 锁定或解锁业务字典明细
 * @param {DictbizDetailId[]} ids
 * @param {0 | 1} is_locked
 * @param {GqlOpt} opt?
 */
export async function lockByIds(
  ids: DictbizDetailId[],
  is_locked: 0 | 1,
  opt?: GqlOpt,
) {
  const data: {
    lockByIdsDictbizDetail: Mutation["lockByIdsDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [DictbizDetailId!]!, $is_locked: Int!) {
        lockByIdsDictbizDetail(ids: $ids, is_locked: $is_locked)
      }
    `,
    variables: {
      ids,
      is_locked,
    },
  }, opt);
  const res = data.lockByIdsDictbizDetail;
  return res;
}

/**
 * 根据 ids 还原业务字典明细
 * @param {DictbizDetailId[]} ids
 * @param {GqlOpt} opt?
 */
export async function revertByIds(
  ids: DictbizDetailId[],
  opt?: GqlOpt,
) {
  const data: {
    revertByIdsDictbizDetail: Mutation["revertByIdsDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [DictbizDetailId!]!) {
        revertByIdsDictbizDetail(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.revertByIdsDictbizDetail;
  return res;
}

/**
 * 根据 ids 彻底删除业务字典明细
 * @param {DictbizDetailId[]} ids
 * @param {GqlOpt} opt?
 */
export async function forceDeleteByIds(
  ids: DictbizDetailId[],
  opt?: GqlOpt,
) {
  const data: {
    forceDeleteByIdsDictbizDetail: Mutation["forceDeleteByIdsDictbizDetail"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [DictbizDetailId!]!) {
        forceDeleteByIdsDictbizDetail(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.forceDeleteByIdsDictbizDetail;
  return res;
}

export async function findAllDictbiz(
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
  const res = data.findAllDictbiz;
  return res;
}

export async function getDictbizList() {
  const data = await findAllDictbiz(
    {
      is_enabled: [ 1 ],
    },
    undefined,
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
          getFieldCommentsDictbizDetail {
            dictbiz_id_lbl
            lbl
            val
            order_by
            rem
          }
          findAllDictbiz {
            id
            lbl
          }
        }
      `,
      variables: {
      },
    });
    try {
      const sheetName = await nsAsync("业务字典明细");
      const buffer = await workerFn(
        `${ location.origin }/import_template/base/dictbiz_detail.xlsx`,
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
    search?: DictbizDetailSearch,
    sort?: Sort[],
    opt?: GqlOpt,
  ) {
    workerStatus.value = "PENDING";
    
    loading.value = true;
    
    try {
      const data = await query({
        query: /* GraphQL */ `
          query($search: DictbizDetailSearch, $sort: [SortInput!]) {
            findAllDictbizDetail(search: $search, sort: $sort) {
              id
              dictbiz_id
              dictbiz_id_lbl
              lbl
              val
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
            findAllDictbiz {
              lbl
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
      try {
        const sheetName = await nsAsync("业务字典明细");
        const buffer = await workerFn(
          `${ location.origin }/excel_template/base/dictbiz_detail.xlsx`,
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
 * @param {DictbizDetailInput[]} models
 */
export async function importModels(
  models: DictbizDetailInput[],
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
 * 查找 业务字典明细 order_by 字段的最大值
 * @param {GqlOpt} opt?
 */
export async function findLastOrderBy(
  opt?: GqlOpt,
) {
  const data: {
    findLastOrderByDictbizDetail: Query["findLastOrderByDictbizDetail"];
  } = await query({
    query: /* GraphQL */ `
      query {
        findLastOrderByDictbizDetail
      }
    `,
  }, opt);
  const res = data.findLastOrderByDictbizDetail;
  return res;
}

/** 新增时的默认值 */
export async function getDefaultInput() {
  const defaultInput: DictbizDetailInput = {
    is_locked: 0,
    is_enabled: 1,
    order_by: 1,
  };
  return defaultInput;
}
