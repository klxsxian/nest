import {
  UniqueType,
} from "#/types";


import type {
  I18nId,
} from "@/typings/ids";

import type {
  Query,
  Mutation,
  PageInput,
  I18Nsearch,
  I18Ninput,
} from "#/types";

import type {
  LangSearch,
  MenuSearch,
} from "#/types";

import {
  findTree as findMenuTree,
} from "@/views/base/menu/Api";

/**
 * 根据搜索条件查找数据
 * @export findAll
 * @param {I18Nsearch} search?
 * @param {PageInput} page
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findAll(
  search?: I18Nsearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllI18n: Query["findAllI18n"];
  } = await query({
    query: /* GraphQL */ `
      query($search: I18Nsearch, $page: PageInput, $sort: [SortInput!]) {
        findAllI18n(search: $search, page: $page, sort: $sort) {
          id
          lang_id
          lang_id_lbl
          menu_id
          menu_id_lbl
          code
          lbl
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
  const res = data.findAllI18n;
  for (let i = 0; i < res.length; i++) {
    const item = res[i];
  }
  return res;
}

/**
 * 根据搜索条件查找第一条记录
 * @export findOne
 * @param {I18Nsearch} search?
 * @param {Sort[]} sort?
 * @param {GqlOpt} opt?
 */
export async function findOne(
  search?: I18Nsearch,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findOneI18n: Query["findOneI18n"];
  } = await query({
    query: /* GraphQL */ `
      query($search: I18Nsearch, $sort: [SortInput!]) {
        findOneI18n(search: $search, sort: $sort) {
          id
          lang_id
          lang_id_lbl
          menu_id
          menu_id_lbl
          code
          lbl
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
  const model = data.findOneI18n;
  if (model) {
  }
  return model;
}

/**
 * 根据搜索条件查找数据总数
 * @export findCount
 * @param {I18Nsearch} search?
 * @param {GqlOpt} opt?
 */
export async function findCount(
  search?: I18Nsearch,
  opt?: GqlOpt,
) {
  const data: {
    findCountI18n: Query["findCountI18n"];
  } = await query({
    query: /* GraphQL */ `
      query($search: I18Nsearch) {
        findCountI18n(search: $search)
      }
    `,
    variables: {
      search,
    },
  }, opt);
  const res = data.findCountI18n;
  return res;
}

/**
 * 创建一条数据
 * @export create
 * @param {I18Ninput} model
 * @param {UniqueType} unique_type?
 * @param {GqlOpt} opt?
 */
export async function create(
  model: I18Ninput,
  unique_type?: UniqueType,
  opt?: GqlOpt,
): Promise<I18nId> {
  const data: {
    createI18n: Mutation["createI18n"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($model: I18Ninput!, $unique_type: UniqueType) {
        createI18n(model: $model, unique_type: $unique_type)
      }
    `,
    variables: {
      model,
      unique_type,
    },
  }, opt);
  const id: I18nId = data.createI18n;
  return id;
}

/**
 * 根据id修改一条数据
 * @export updateById
 * @param {I18nId} id
 * @param {I18Ninput} model
 * @param {GqlOpt} opt?
 */
export async function updateById(
  id: I18nId,
  model: I18Ninput,
  opt?: GqlOpt,
): Promise<I18nId> {
  const data: {
    updateByIdI18n: Mutation["updateByIdI18n"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($id: I18nId!, $model: I18Ninput!) {
        updateByIdI18n(id: $id, model: $model)
      }
    `,
    variables: {
      id,
      model,
    },
  }, opt);
  const id2: I18nId = data.updateByIdI18n;
  return id2;
}

/**
 * 通过ID查找一条数据
 * @export findById
 * @param {I18nId} id
 * @param {GqlOpt} opt?
 */
export async function findById(
  id: I18nId,
  opt?: GqlOpt,
) {
  const data: {
    findByIdI18n: Query["findByIdI18n"];
  } = await query({
    query: /* GraphQL */ `
      query($id: I18nId!) {
        findByIdI18n(id: $id) {
          id
          lang_id
          lang_id_lbl
          menu_id
          menu_id_lbl
          code
          lbl
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
      }
    `,
    variables: {
      id,
    },
  }, opt);
  const res = data.findByIdI18n;
  return res;
}

/**
 * 根据 ids 删除数据
 * @export deleteByIds
 * @param {I18nId[]} ids
 * @param {GqlOpt} opt?
 */
export async function deleteByIds(
  ids: I18nId[],
  opt?: GqlOpt,
) {
  const data: {
    deleteByIdsI18n: Mutation["deleteByIdsI18n"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [I18nId!]!) {
        deleteByIdsI18n(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.deleteByIdsI18n;
  return res;
}

/**
 * 根据 ids 从回收站还原数据
 * @export revertByIds
 * @param {I18nId[]} ids
 * @param {GqlOpt} opt?
 */
export async function revertByIds(
  ids: I18nId[],
  opt?: GqlOpt,
) {
  const data: {
    revertByIdsI18n: Mutation["revertByIdsI18n"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [I18nId!]!) {
        revertByIdsI18n(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.revertByIdsI18n;
  return res;
}

/**
 * 根据 ids 彻底删除数据
 * @export forceDeleteByIds
 * @param {I18nId[]} ids
 * @param {GqlOpt} opt?
 */
export async function forceDeleteByIds(
  ids: I18nId[],
  opt?: GqlOpt,
) {
  const data: {
    forceDeleteByIdsI18n: Mutation["forceDeleteByIdsI18n"];
  } = await mutation({
    query: /* GraphQL */ `
      mutation($ids: [I18nId!]!) {
        forceDeleteByIdsI18n(ids: $ids)
      }
    `,
    variables: {
      ids,
    },
  }, opt);
  const res = data.forceDeleteByIdsI18n;
  return res;
}

export async function findAllLang(
  search?: LangSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllLang: Query["findAllLang"];
  } = await query({
    query: /* GraphQL */ `
      query($search: LangSearch, $page: PageInput, $sort: [SortInput!]) {
        findAllLang(search: $search, page: $page, sort: $sort) {
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
  const res = data.findAllLang;
  return res;
}

export async function getLangList() {
  const data = await findAllLang(
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

export async function findAllMenu(
  search?: MenuSearch,
  page?: PageInput,
  sort?: Sort[],
  opt?: GqlOpt,
) {
  const data: {
    findAllMenu: Query["findAllMenu"];
  } = await query({
    query: /* GraphQL */ `
      query($search: MenuSearch, $page: PageInput, $sort: [SortInput!]) {
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
  const res = data.findAllMenu;
  return res;
}

export async function getMenuList() {
  const data = await findAllMenu(
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

export async function getMenuTree() {
  const data = await findMenuTree(
    {
      is_enabled: [ 1 ],
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

/**
 * 下载导入模板
 */
export function useDownloadImportTemplate(routePath: string) {
  const {
    nAsync,
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
          getFieldCommentsI18n {
            lang_id_lbl
            menu_id_lbl
            code
            lbl
            rem
          }
          findAllLang {
            id
            lbl
          }
          findAllMenu {
            id
            lbl
          }
        }
      `,
      variables: {
      },
    });
    const buffer = await workerFn(
      `${ location.origin }/import_template/base/i18n.xlsx`,
      {
        data,
      },
    );
    saveAsExcel(buffer, `${ await nAsync("国际化") }${ await nsAsync("导入") }`);
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
    nAsync,
    nsAsync,
  } = useI18n(routePath);
  const {
    workerFn,
    workerStatus,
    workerTerminate,
  } = useRenderExcel();
  async function workerFn2(
    search?: I18Nsearch,
    sort?: Sort[],
    opt?: GqlOpt,
  ) {
    const data = await query({
      query: /* GraphQL */ `
        query($search: I18Nsearch, $sort: [SortInput!]) {
          findAllI18n(search: $search, sort: $sort) {
            id
            lang_id
            lang_id_lbl
            menu_id
            menu_id_lbl
            code
            lbl
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
          getFieldCommentsI18n {
            lang_id_lbl
            menu_id_lbl
            code
            lbl
            rem
            create_usr_id_lbl
            create_time_lbl
            update_usr_id_lbl
            update_time_lbl
          }
          findAllLang {
            lbl
          }
          findAllMenu {
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
      const buffer = await workerFn(
        `${ location.origin }/excel_template/base/i18n.xlsx`,
        {
          data,
        },
      );
      saveAsExcel(buffer, await nAsync("国际化"));
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
 * @param {I18Ninput[]} models
 * @export importModels
 */
export async function importModels(
  models: I18Ninput[],
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
