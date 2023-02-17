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
  type MenuModel,
  type MenuSearch,
} from "./menu.model.ts";
import {
  _internals as menuDao,
} from "./menu.dao.ts";

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
  revertByIds,
  forceDeleteByIds,
  importFile,
  exportExcel,
  findLastOrderBy,
};

/**
 * 根据条件查找总数
 * @param {MenuSearch} search? 搜索条件
 * @return {Promise<number>}
 */
async function findCount(
  search?: MenuSearch,
): Promise<number> {
  search = search || { };
  const data = await menuDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {MenuSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<MenuModel[]>} 
 */
async function findAll(
  search?: MenuSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<MenuModel[]> {
  search = search || { };
  const data: MenuModel[] = await menuDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {MenuSearch} search? 搜索条件
 */
async function findOne(
  search?: MenuSearch,
) {
  search = search || { };
  const data = await menuDao.findOne(search);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
async function findById(
  id?: string | null,
) {
  const data = await menuDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {MenuSearch} search? 搜索条件
 */
async function exist(
  search?: MenuSearch,
) {
  search = search || { };
  const data = await menuDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
async function existById(
  id?: string | null,
) {
  const data = await menuDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {MenuModel} model
 * @return {Promise<string>} id
 */
async function create(
  model: MenuModel,
): Promise<string> {
  const data = await menuDao.create(model);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {MenuModel} model
 * @return {Promise<string>}
 */
async function updateById(
  id: string,
  model: MenuModel,
): Promise<string> {
  const data = await menuDao.updateById(id, model);
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
  const data = await menuDao.deleteByIds(ids);
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
  const data = await menuDao.revertByIds(ids);
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
  const data = await menuDao.forceDeleteByIds(ids);
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
    "类型": "_type",
    "父菜单": "_menu_id",
    "名称": "lbl",
    "路由": "route_path",
    "参数": "route_query",
    "启用": "_is_enabled",
    "排序": "order_by",
    "备注": "rem",
  };
  const models = await getImportFileRows(id, header);
  
  let succNum = 0;
  let failNum = 0;
  const failErrMsgs: string[] = [ ];
  
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      await menuDao.create(model, { uniqueType: "update" });
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
 * @param {MenuSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<string>} 临时文件id
 */
async function exportExcel(
  search?: MenuSearch,
  sort?: SortInput|SortInput[],
): Promise<string> {
  const models = await findAll(search, undefined, sort);
  const buffer0 = await getTemplate(`menu.xlsx`);
  if (!buffer0) {
    throw new ServiceException(`模板文件 menu.xlsx 不存在!`);
  }
  const buffer = await renderExcel(buffer0, { models });
  const data = await tmpfileDao.upload(
    {
      content: buffer,
      name: "file",
      originalName: "菜单.xlsx",
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
  const data = await menuDao.findLastOrderBy();
  return data;
}
