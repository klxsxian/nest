import {
  useContext,
} from "/lib/context.ts";

import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import {
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type MenuInput,
  type MenuSearch,
} from "./menu.model.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountMenu(
  search?: MenuSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./menu.service.ts");
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllMenu(
  search?: MenuSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./menu.service.ts");
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsMenu() {
  const { getFieldComments } = await import("./menu.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneMenu(
  search?: MenuSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./menu.service.ts");
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdMenu(
  id: string,
) {
  const { findById } = await import("./menu.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createMenu(
  input: MenuInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    create,
  } = await import("./menu.service.ts");
  const res = await create(input);
  return res;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdMenu(
  id: string,
  input: MenuInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    updateById,
  } = await import("./menu.service.ts");
  const res = await updateById(id, input);
  return res;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsMenu(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    deleteByIds,
  } = await import("./menu.service.ts");
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsMenu(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    revertByIds,
  } = await import("./menu.service.ts");
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsMenu(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    forceDeleteByIds,
  } = await import("./menu.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByMenu() {
  const { findLastOrderBy } = await import("./menu.service.ts");
  const res = findLastOrderBy();
  return res;
}
