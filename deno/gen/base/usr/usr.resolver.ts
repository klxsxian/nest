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
  type UsrInput,
  type UsrSearch,
} from "./usr.model.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountUsr(
  search?: UsrSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./usr.service.ts");
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllUsr(
  search?: UsrSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./usr.service.ts");
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsUsr() {
  const { getFieldComments } = await import("./usr.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneUsr(
  search?: UsrSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./usr.service.ts");
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdUsr(
  id: string,
) {
  const { findById } = await import("./usr.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createUsr(
  input: UsrInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    create,
  } = await import("./usr.service.ts");
  const res = await create(input);
  return res;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdUsr(
  id: string,
  input: UsrInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    updateById,
  } = await import("./usr.service.ts");
  const res = await updateById(id, input);
  return res;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsUsr(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    deleteByIds,
  } = await import("./usr.service.ts");
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsUsr(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsUsr.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  const {
    lockByIds,
  } = await import("./usr.service.ts");
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsUsr(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    revertByIds,
  } = await import("./usr.service.ts");
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsUsr(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    forceDeleteByIds,
  } = await import("./usr.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}
