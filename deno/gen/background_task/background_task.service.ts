import { renderExcel } from "ejsexcel";

import {
  initN,
  ns,
} from "/src/i18n/i18n.ts";

import * as authDao from "/lib/auth/auth.dao.ts";

import * as tmpfileDao from "/lib/tmpfile/tmpfile.dao.ts";

import {
  getTemplate,
  getImportFileRows,
} from "/lib/util/excel_util.ts";

import {
  ServiceException,
} from "/lib/exceptions/service.exception.ts";

import {
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type Background_TaskModel,
  type Background_TaskSearch,
} from "./background_task.model.ts";

import * as background_taskDao from "./background_task.dao.ts";

/**
 * 根据条件查找总数
 * @param {Background_TaskSearch} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
  search?: Background_TaskSearch,
): Promise<number> {
  search = search || { };
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }
  const data = await background_taskDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {Background_TaskSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<Background_TaskModel[]>} 
 */
export async function findAll(
  search?: Background_TaskSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<Background_TaskModel[]> {
  search = search || { };
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }
  const data: Background_TaskModel[] = await background_taskDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {Background_TaskSearch} search? 搜索条件
 */
export async function findOne(
  search?: Background_TaskSearch,
) {
  search = search || { };
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }
  const data = await background_taskDao.findOne(search);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
) {
  const data = await background_taskDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {Background_TaskSearch} search? 搜索条件
 */
export async function exist(
  search?: Background_TaskSearch,
) {
  search = search || { };
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }
  const data = await background_taskDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const data = await background_taskDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {Background_TaskModel} model
 * @return {Promise<string>} id
 */
export async function create(
  model: Background_TaskModel,
): Promise<string> {
  const data = await background_taskDao.create(model);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {Background_TaskModel} model
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  model: Background_TaskModel,
): Promise<string> {
  const data = await background_taskDao.updateById(id, model);
  return data;
}

/**
 * 根据 ids 删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: string[],
): Promise<number> {
  const data = await background_taskDao.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 还原数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: string[],
): Promise<number> {
  const data = await background_taskDao.revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: string[],
): Promise<number> {
  const data = await background_taskDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 导入文件
 * @param {string} id
 */
export async function importFile(
  id: string,
) {
  const n = initN("/background_task");
  const header: { [key: string]: string } = {
    [ await n("名称") ]: "lbl",
    [ await n("状态") ]: "_state",
    [ await n("类型") ]: "_type",
    [ await n("执行结果") ]: "result",
    [ await n("错误信息") ]: "err_msg",
    [ await n("开始时间") ]: "begin_time",
    [ await n("结束时间") ]: "end_time",
    [ await n("备注") ]: "rem",
  };
  const models = await getImportFileRows(id, header);
  
  let succNum = 0;
  let failNum = 0;
  const failErrMsgs: string[] = [ ];
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      await background_taskDao.create(model, { uniqueType: "update" });
      succNum++;
    } catch (err) {
      failNum++;
      failErrMsgs.push(await ns("第 {0} 行: {1}", (i + 1).toString(), err.message || err.toString()));
    }
  }
  
  let data = "";
  if (succNum > 0) {
    data = await ns("导入成功 {0} 条", succNum.toString());
    data += "\n";
  }
  if (failNum > 0) {
    data += await ns("导入失败 {0} 条", failNum.toString());
    data += "\n";
  }
  if (failErrMsgs.length > 0) {
    data += failErrMsgs.join("\n");
  }
  
  return data;
}

/**
 * 导出Excel
 * @param {Background_TaskSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<string>} 临时文件id
 */
export async function exportExcel(
  search?: Background_TaskSearch,
  sort?: SortInput|SortInput[],
): Promise<string> {
  const n = initN("/background_task");
  const models = await findAll(search, undefined, sort);
  const buffer0 = await getTemplate(`background_task.xlsx`);
  if (!buffer0) {
    const msg = await ns("模板文件 {0}.xlsx 不存在", "background_task");
    throw new ServiceException(msg);
  }
  const buffer = await renderExcel(buffer0, { models, n });
  const data = await tmpfileDao.upload(
    {
      content: buffer,
      name: "file",
      originalName: `${ await ns("后台任务") }.xlsx`,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  );
  return data;
}
