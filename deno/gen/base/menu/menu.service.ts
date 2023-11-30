import {
  ns,
} from "/src/base/i18n/i18n.ts";

import type {
  UniqueType,
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  MenuInput,
  MenuModel,
  MenuSearch,
  MenuFieldComment,
  MenuId,
} from "./menu.model.ts";

import * as menuDao from "./menu.dao.ts";

/**
 * 根据条件查找总数
 * @param {MenuSearch} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
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
export async function findAll(
  search?: MenuSearch,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<MenuModel[]> {
  search = search || { };
  const models: MenuModel[] = await menuDao.findAll(search, page, sort);
  return models;
}

/** 根据lbl翻译业务字典, 外键关联id, 日期 */
export async function setIdByLbl(
  input: MenuInput,
) {
  const data = await menuDao.setIdByLbl(input);
  return data;
}

/**
 * 根据条件查找第一条数据
 * @param {MenuSearch} search? 搜索条件
 */
export async function findOne(
  search?: MenuSearch,
  sort?: SortInput|SortInput[],
): Promise<MenuModel | undefined> {
  search = search || { };
  const model = await menuDao.findOne(search, sort);
  return model;
}

/**
 * 根据id查找数据
 * @param {MenuId} id
 */
export async function findById(
  id?: MenuId | null,
): Promise<MenuModel | undefined> {
  const model = await menuDao.findById(id);
  return model;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {MenuSearch} search? 搜索条件
 */
export async function exist(
  search?: MenuSearch,
): Promise<boolean> {
  search = search || { };
  const data = await menuDao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {MenuId} id
 */
export async function existById(
  id?: MenuId | null,
): Promise<boolean> {
  const data = await menuDao.existById(id);
  return data;
}

/**
 * 增加和修改时校验输入
 * @param input 
 */
export async function validate(
  input: MenuInput,
): Promise<void> {
  const data = await menuDao.validate(input);
  return data;
}

/**
 * 创建数据
 * @param {MenuInput} input
 * @return {Promise<MenuId>} id
 */
export async function create(
  input: MenuInput,
  options?: {
    uniqueType?: UniqueType;
  },
): Promise<MenuId> {
  const id: MenuId = await menuDao.create(input, options);
  return id;
}

/**
 * 根据 id 修改数据
 * @param {MenuId} id
 * @param {MenuInput} input
 * @return {Promise<MenuId>}
 */
export async function updateById(
  id: MenuId,
  input: MenuInput,
): Promise<MenuId> {
  
  const is_locked = await menuDao.getIsLockedById(id);
  if (is_locked) {
    throw await ns("不能修改已经锁定的数据");
  }
  
  const id2: MenuId = await menuDao.updateById(id, input);
  return id2;
}

/**
 * 根据 ids 删除数据
 * @param {MenuId[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: MenuId[],
): Promise<number> {
  
  {
    const ids2: MenuId[] = [ ];
    for (let i = 0; i < ids.length; i++) {
      const id: MenuId = ids[i];
      const is_locked = await menuDao.getIsLockedById(id);
      if (!is_locked) {
        ids2.push(id);
      }
    }
    if (ids2.length === 0 && ids.length > 0) {
      throw await ns("不能删除已经锁定的数据");
    }
    ids = ids2;
  }
  
  const data = await menuDao.deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 启用或禁用数据
 * @param {MenuId[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function enableByIds(
  ids: MenuId[],
  is_enabled: 0 | 1,
): Promise<number> {
  const data = await menuDao.enableByIds(ids, is_enabled);
  return data;
}

/**
 * 根据 ids 锁定或解锁数据
 * @param {MenuId[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function lockByIds(
  ids: MenuId[],
  is_locked: 0 | 1,
): Promise<number> {
  const data = await menuDao.lockByIds(ids, is_locked);
  return data;
}

/**
 * 根据 ids 还原数据
 * @param {MenuId[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: MenuId[],
): Promise<number> {
  const data = await menuDao.revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 * @param {MenuId[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: MenuId[],
): Promise<number> {
  const data = await menuDao.forceDeleteByIds(ids);
  return data;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldComments(): Promise<MenuFieldComment> {
  const data = await menuDao.getFieldComments();
  return data;
}

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
): Promise<number> {
  const data = await menuDao.findLastOrderBy();
  return data;
}
