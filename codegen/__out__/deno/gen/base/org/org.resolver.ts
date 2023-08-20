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
  type OrgInput,
  type OrgSearch,
} from "./org.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountOrg(
  search?: OrgSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./org.service.ts");
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllOrg(
  search?: OrgSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./org.service.ts");
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsOrg() {
  const { getFieldComments } = await import("./org.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneOrg(
  search?: OrgSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./org.service.ts");
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdOrg(
  id: string,
) {
  const { findById } = await import("./org.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createOrg(
  input: OrgInput,
  unique_type?: UniqueType,
) {
  
  const {
    validate,
    create,
  } = await import("./org.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await validate(input);
  
  await usePermit(
    "/base/org",
    "add",
  );
  const uniqueType = unique_type;
  const res = await create(input, { uniqueType });
  return res;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdOrg(
  id: string,
  input: OrgInput,
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/org",
    "edit",
  );
  
  const {
    updateById,
  } = await import("./org.service.ts");
  const res = await updateById(id, input);
  return res;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsOrg(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/org",
    "delete",
  );
  
  const {
    deleteByIds,
  } = await import("./org.service.ts");
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 启用或者禁用数据
 */
export async function enableByIdsOrg(
  ids: string[],
  is_enabled: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIdsOrg.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/base/org",
    "enable",
  );
  
  const {
    enableByIds,
  } = await import("./org.service.ts");
  const res = await enableByIds(ids, is_enabled);
  return res;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsOrg(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsOrg.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/base/org",
    "lock",
  );
  
  const {
    lockByIds,
  } = await import("./org.service.ts");
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsOrg(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/org",
    "delete",
  );
  
  const {
    revertByIds,
  } = await import("./org.service.ts");
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsOrg(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/org",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./org.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByOrg() {
  const { findLastOrderBy } = await import("./org.service.ts");
  const res = findLastOrderBy();
  return res;
}
