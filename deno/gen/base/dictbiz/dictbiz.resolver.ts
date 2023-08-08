import {
  useContext,
} from "/lib/context.ts";

import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import {
  type UniqueType,
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type DictbizInput,
  type DictbizSearch,
} from "./dictbiz.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountDictbiz(
  search?: DictbizSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./dictbiz.service.ts");
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllDictbiz(
  search?: DictbizSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./dictbiz.service.ts");
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsDictbiz() {
  const { getFieldComments } = await import("./dictbiz.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneDictbiz(
  search?: DictbizSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./dictbiz.service.ts");
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdDictbiz(
  id: string,
) {
  const { findById } = await import("./dictbiz.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createDictbiz(
  input: DictbizInput,
  unique_type?: UniqueType,
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dictbiz",
    "add",
  );
  
  const {
    create,
  } = await import("./dictbiz.service.ts");
  const uniqueType = unique_type;
  const res = await create(input, { uniqueType });
  return res;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdDictbiz(
  id: string,
  input: DictbizInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dictbiz",
    "edit",
  );
  
  const {
    updateById,
  } = await import("./dictbiz.service.ts");
  const res = await updateById(id, input);
  return res;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsDictbiz(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dictbiz",
    "delete",
  );
  
  const {
    deleteByIds,
  } = await import("./dictbiz.service.ts");
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 启用或者禁用数据
 */
export async function enableByIdsDictbiz(
  ids: string[],
  is_enabled: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIdsDictbiz.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/base/dictbiz",
    "enable",
  );
  
  const {
    enableByIds,
  } = await import("./dictbiz.service.ts");
  const res = await enableByIds(ids, is_enabled);
  return res;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsDictbiz(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsDictbiz.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/base/dictbiz",
    "lock",
  );
  
  const {
    lockByIds,
  } = await import("./dictbiz.service.ts");
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsDictbiz(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dictbiz",
    "delete",
  );
  
  const {
    revertByIds,
  } = await import("./dictbiz.service.ts");
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsDictbiz(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dictbiz",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./dictbiz.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByDictbiz() {
  const { findLastOrderBy } = await import("./dictbiz.service.ts");
  const res = findLastOrderBy();
  return res;
}
