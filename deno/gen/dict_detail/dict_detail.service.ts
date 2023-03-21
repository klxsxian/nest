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
  type Dict_DetailModel,
  type Dict_DetailSearch,
} from "./dict_detail.model.ts";

import * as dict_detailDao from "./dict_detail.dao.ts";

/**
 * 根据条件查找总数
 * @param {Dict_DetailSearch} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
  search?: Dict_DetailSearch,
): Promise<number> {
  search = search || { };
  const data = await dict_detailDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {Dict_DetailSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<Dict_DetailModel[]>} 
 */
export async function findAll(
  search?: Dict_DetailSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<Dict_DetailModel[]> {
  search = search || { };
  const data: Dict_DetailModel[] = await dict_detailDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {Dict_DetailSearch} search? 搜索条件
 */
export async function findOne(
  search?: Dict_DetailSearch,
) {
  search = search || { };
  const data = await dict_detailDao.findOne(search);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
) {
  const data = await dict_detailDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {Dict_DetailSearch} search? 搜索条件
 */
export async function exist(
  search?: Dict_DetailSearch,
) {
  search = search || { };
  const data = await dict_detailDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const data = await dict_detailDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {Dict_DetailModel} model
 * @return {Promise<string>} id
 */
export async function create(
  model: Dict_DetailModel,
): Promise<string> {
  const data = await dict_detailDao.create(model);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {Dict_DetailModel} model
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  model: Dict_DetailModel,
): Promise<string> {
  
  const is_locked = await dict_detailDao.getIs_lockedById(id);
  if (is_locked) {
    throw await ns("不能修改已经锁定的数据");
  }
  const data = await dict_detailDao.updateById(id, model);
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
  
  const lockedIds: string[] = [ ];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const is_locked = await dict_detailDao.getIs_lockedById(id);
    if (is_locked) {
      lockedIds.push(id);
    }
  }
  if (lockedIds.length > 0 && lockedIds.length === ids.length) {
    throw await ns("不能删除已经锁定的数据");
  }
  const data = await dict_detailDao.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 锁定或解锁数据
 * @param {string[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function lockByIds(
  ids: string[],
  is_locked: 0 | 1,
): Promise<number> {
  const data = await dict_detailDao.lockByIds(ids, is_locked);
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
  const data = await dict_detailDao.revertByIds(ids);
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
  const data = await dict_detailDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 导入文件
 * @param {string} id
 */
export async function importFile(
  id: string,
) {
  const n = initN("/dict_detail");
  const header: { [key: string]: string } = {
    [ await n("系统字典") ]: "_dict_id",
    [ await n("名称") ]: "lbl",
    [ await n("值") ]: "val",
    [ await n("排序") ]: "order_by",
    [ await n("启用") ]: "_is_enabled",
    [ await n("备注") ]: "rem",
  };
  const models = await getImportFileRows(id, header);
  
  let succNum = 0;
  let failNum = 0;
  const failErrMsgs: string[] = [ ];
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      await dict_detailDao.create(model, { uniqueType: "update" });
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
 * @param {Dict_DetailSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<string>} 临时文件id
 */
export async function exportExcel(
  search?: Dict_DetailSearch,
  sort?: SortInput|SortInput[],
): Promise<string> {
  const n = initN("/dict_detail");
  const models = await findAll(search, undefined, sort);
  const buffer0 = await getTemplate(`dict_detail.xlsx`);
  if (!buffer0) {
    const msg = await ns("模板文件 {0}.xlsx 不存在", "dict_detail");
    throw new ServiceException(msg);
  }
  const buffer = await renderExcel(buffer0, { models, n });
  const data = await tmpfileDao.upload(
    {
      content: buffer,
      name: "file",
      originalName: `${ await ns("系统字典明细") }.xlsx`,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  );
  return data;
}

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
): Promise<number> {
  const data = await dict_detailDao.findLastOrderBy();
  return data;
}
