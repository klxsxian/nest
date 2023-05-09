import {
  ns,
} from "/src/base/i18n/i18n.ts";

import * as authDao from "/lib/auth/auth.dao.ts";

import {
  type LangInput,
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type LangModel,
  type LangSearch,
} from "./lang.model.ts";

import * as langDao from "./lang.dao.ts";

/**
 * 根据条件查找总数
 * @param {LangSearch} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
  search?: LangSearch,
): Promise<number> {
  search = search || { };
  const data = await langDao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {LangSearch} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<LangModel[]>} 
 */
export async function findAll(
  search?: LangSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<LangModel[]> {
  search = search || { };
  const data: LangModel[] = await langDao.findAll(search, page, sort);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {LangSearch} search? 搜索条件
 */
export async function findOne(
  search?: LangSearch,
  sort?: SortInput|SortInput[],
) {
  search = search || { };
  const data = await langDao.findOne(search, sort);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
) {
  const data = await langDao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {LangSearch} search? 搜索条件
 */
export async function exist(
  search?: LangSearch,
) {
  search = search || { };
  const data = await langDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const data = await langDao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {LangModel} model
 * @return {Promise<string>} id
 */
export async function create(
  model: LangModel,
): Promise<string> {
  const data = await langDao.create(model);
  return data;
}

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {LangModel} model
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  model: LangModel,
): Promise<string> {
  const data = await langDao.updateById(id, model);
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
  const data = await langDao.deleteByIds(ids);
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
  const data = await langDao.revertByIds(ids);
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
  const data = await langDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldComments() {
  const data = await langDao.getFieldComments();
  return data;
}

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
): Promise<number> {
  const data = await langDao.findLastOrderBy();
  return data;
}
