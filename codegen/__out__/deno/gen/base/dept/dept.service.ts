import {
  ns,
} from "/src/base/i18n/i18n.ts";

import {
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type DeptInput,
  type DeptModel,
  type DeptSearch,
} from "./dept.model.ts";

import * as deptDao from "./dept.dao.ts";

/**
 * 根据条件查找总数
 * @param {DeptSearch} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
  search?: DeptSearch,
): Promise<number> {
  search = search || { };
  const data = await deptDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {DeptSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<DeptModel[]>} 
 */
export async function findAll(
  search?: DeptSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<DeptModel[]> {
  search = search || { };
  const data: DeptModel[] = await deptDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {DeptSearch} search? 搜索条件
 */
export async function findOne(
  search?: DeptSearch,
  sort?: SortInput|SortInput[],
) {
  search = search || { };
  const data = await deptDao.findOne(search, sort);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
) {
  const data = await deptDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {DeptSearch} search? 搜索条件
 */
export async function exist(
  search?: DeptSearch,
) {
  search = search || { };
  const data = await deptDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const data = await deptDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {DeptInput} input
 * @return {Promise<string>} id
 */
export async function create(
  input: DeptInput,
): Promise<string> {
  const data = await deptDao.create(input);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {DeptInput} input
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  input: DeptInput,
): Promise<string> {
  
  const is_locked = await deptDao.getIsLockedById(id);
  if (is_locked) {
    throw await ns("不能修改已经锁定的数据");
  }
  const data = await deptDao.updateById(id, input);
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
    const is_locked = await deptDao.getIsLockedById(id);
    if (is_locked) {
      lockedIds.push(id);
    }
  }
  if (lockedIds.length > 0 && lockedIds.length === ids.length) {
    throw await ns("不能删除已经锁定的数据");
  }
  const data = await deptDao.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 启用或禁用数据
 * @param {string[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function enableByIds(
  ids: string[],
  is_enabled: 0 | 1,
): Promise<number> {
  const data = await deptDao.enableByIds(ids, is_enabled);
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
  const data = await deptDao.lockByIds(ids, is_locked);
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
  const data = await deptDao.revertByIds(ids);
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
  const data = await deptDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldComments() {
  const data = await deptDao.getFieldComments();
  return data;
}

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
): Promise<number> {
  const data = await deptDao.findLastOrderBy();
  return data;
}
