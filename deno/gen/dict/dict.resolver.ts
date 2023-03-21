import {
  useContext,
} from "/lib/context.ts";

import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import * as dictService from "./dict.service.ts";

import {
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type DictModel,
  type DictSearch,
} from "./dict.model.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountDict(
  search?: DictSearch & { $extra?: SearchExtra[] },
) {
  const data = await dictService.findCount(search);
  return data;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllDict(
  search?: DictSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const data = await dictService.findAll(search, page, sort);
  return data;
}

/**
 * 根据搜索条件导出
 */
export async function exportExcelDict(
  search?: DictSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const data = await dictService.exportExcel(search, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneDict(
  search?: DictSearch & { $extra?: SearchExtra[] },
) {
  const data = await dictService.findOne(search);
  return data;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdDict(
  id: string,
) {
  const data = await dictService.findById(id);
  return data;
}

/**
 * 创建一条数据
 */
export async function createDict(
  model: DictModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const data = await dictService.create(model);
  return data;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdDict(
  id: string,
  model: DictModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const data = await dictService.updateById(id, model);
  return data;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsDict(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const data = await dictService.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsDict(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsDict.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  const data = await dictService.lockByIds(ids, is_locked);
  return data;
}

/**
 * 导入系统字典
 */
export async function importFileDict(
  id: string,
) {
  const data = await dictService.importFile(id);
  return data;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsDict(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const data = await dictService.revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsDict(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const data = await dictService.forceDeleteByIds(ids);
  return data;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByDict() {
  const data = await dictService.findLastOrderBy();
  return data;
}
