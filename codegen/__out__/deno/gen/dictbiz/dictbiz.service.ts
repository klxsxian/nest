import { renderExcel } from "ejsexcel";

import {
  _internals as authDao
} from "/lib/auth/auth.dao.ts";

import {
  _internals as tmpfileDao
} from "/lib/tmpfile/tmpfile.dao.ts";

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
  type DictbizModel,
  type DictbizSearch,
} from "./dictbiz.model.ts";
import {
  _internals as dictbizDao,
} from "./dictbiz.dao.ts";

export const _internals = {
  findCount,
  findAll,
  findOne,
  findById,
  exist,
  existById,
  create,
  updateById,
  deleteByIds,
  lockByIds,
  revertByIds,
  forceDeleteByIds,
  importFile,
  exportExcel,
  findLastOrderBy,
};

/**
 * 根据条件查找总数
 * @param {DictbizSearch} search? 搜索条件
 * @return {Promise<number>}
 */
async function findCount(
  search?: DictbizSearch,
): Promise<number> {
  search = search || { };
  
  search.tenant_id = undefined;
  const data = await dictbizDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {DictbizSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<DictbizModel[]>} 
 */
async function findAll(
  search?: DictbizSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<DictbizModel[]> {
  search = search || { };
  
  search.tenant_id = undefined;
  const data: DictbizModel[] = await dictbizDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {DictbizSearch} search? 搜索条件
 */
async function findOne(
  search?: DictbizSearch,
) {
  search = search || { };
  
  search.tenant_id = undefined;
  const data = await dictbizDao.findOne(search);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
async function findById(
  id?: string,
) {
  const data = await dictbizDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {DictbizSearch} search? 搜索条件
 */
async function exist(
  search?: DictbizSearch,
) {
  search = search || { };
  
  search.tenant_id = undefined;
  const data = await dictbizDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
async function existById(
  id: string,
) {
  const data = await dictbizDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {DictbizModel} model
 * @return {Promise<string>} id
 */
async function create(
  model: DictbizModel,
): Promise<string> {
  
  model.tenant_id = undefined;
  const data = await dictbizDao.create(model);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {DictbizModel} model
 * @return {Promise<string>}
 */
async function updateById(
  id: string,
  model: DictbizModel,
): Promise<string> {
  
  model.tenant_id = undefined;
  const data = await dictbizDao.updateById(id, model);
  return data;
}

/**
 * 根据 ids 删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
async function deleteByIds(
  ids: string[],
): Promise<number> {
  const data = await dictbizDao.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 锁定或解锁数据
 * @param {string[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
async function lockByIds(
  ids: string[],
  is_locked: 0 | 1,
): Promise<number> {
  const data = await dictbizDao.lockByIds(ids, is_locked);
  return data;
}

/**
 * 根据 ids 还原数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
async function revertByIds(
  ids: string[],
): Promise<number> {
  const data = await dictbizDao.revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
async function forceDeleteByIds(
  ids: string[],
): Promise<number> {
  const data = await dictbizDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 导入文件
 * @param {string} id
 */
async function importFile(
  id: string,
) {
  const header: { [key: string]: string } = {
    "编码": "code",
    "名称": "lbl",
    "数据类型": "_type",
    "排序": "order_by",
    "启用": "_is_enabled",
    "备注": "rem",
  };
  const models = await getImportFileRows(id, header);
  
  let succNum = 0;
  let failNum = 0;
  const failErrMsgs: string[] = [ ];
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    
    model.tenant_id = undefined;
    try {
      await dictbizDao.create(model, { uniqueType: "update" });
      succNum++;
    } catch (err) {
      failNum++;
      failErrMsgs.push(`第 ${ i + 1 } 行: ${ err.message || err.toString() }`);
    }
  }
  
  let data = "";
  if (succNum > 0) {
    data = `导入成功 ${ succNum } 条\n`;
  }
  if (failNum > 0) {
    data += `导入失败 ${ failNum } 条\n`;
  }
  if (failErrMsgs.length > 0) {
    data += failErrMsgs.join("\n");
  }
  
  return data;
}

/**
 * 导出Excel
 * @param {DictbizSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<string>} 临时文件id
 */
async function exportExcel(
  search?: DictbizSearch,
  sort?: SortInput|SortInput[],
): Promise<string> {
  const models = await findAll(search, undefined, sort);
  const buffer0 = await getTemplate(`dictbiz.xlsx`);
  if (!buffer0) {
    throw new ServiceException(`模板文件 dictbiz.xlsx 不存在!`);
  }
  const buffer = await renderExcel(buffer0, { models });
  const data = await tmpfileDao.upload(
    {
      content: buffer,
      name: "file",
      originalName: "业务字典.xlsx",
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  );
  return data;
}

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
async function findLastOrderBy(
): Promise<number> {
  const data = await dictbizDao.findLastOrderBy();
  return data;
}
