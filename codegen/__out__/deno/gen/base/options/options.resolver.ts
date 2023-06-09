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
  type OptionsInput,
  type OptionsSearch,
} from "./options.model.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountOptions(
  search?: OptionsSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./options.service.ts");
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllOptions(
  search?: OptionsSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./options.service.ts");
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsOptions() {
  const { getFieldComments } = await import("./options.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneOptions(
  search?: OptionsSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./options.service.ts");
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdOptions(
  id: string,
) {
  const { findById } = await import("./options.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createOptions(
  input: OptionsInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    create,
  } = await import("./options.service.ts");
  const res = await create(input);
  return res;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdOptions(
  id: string,
  input: OptionsInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    updateById,
  } = await import("./options.service.ts");
  const res = await updateById(id, input);
  return res;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsOptions(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    deleteByIds,
  } = await import("./options.service.ts");
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsOptions(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsOptions.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  const {
    lockByIds,
  } = await import("./options.service.ts");
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsOptions(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    revertByIds,
  } = await import("./options.service.ts");
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsOptions(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const {
    forceDeleteByIds,
  } = await import("./options.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByOptions() {
  const { findLastOrderBy } = await import("./options.service.ts");
  const res = findLastOrderBy();
  return res;
}
