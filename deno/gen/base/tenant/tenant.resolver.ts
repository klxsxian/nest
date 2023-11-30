import {
  useContext,
} from "/lib/context.ts";

import type {
  SearchExtra,
} from "/lib/util/dao_util.ts";

import type {
  UniqueType,
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  TenantInput,
  TenantModel,
  TenantSearch,
  TenantFieldComment,
  TenantId,
} from "./tenant.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
): Promise<number> {
  
  const {
    findCount,
  } = await import("./tenant.service.ts");
  
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
): Promise<TenantModel[]> {
  
  const {
    findAll,
  } = await import("./tenant.service.ts");
  
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsTenant(): Promise<TenantFieldComment> {
  const { getFieldComments } = await import("./tenant.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
): Promise<TenantModel | undefined> {
  
  const {
    findOne,
  } = await import("./tenant.service.ts");
  
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdTenant(
  id: TenantId,
): Promise<TenantModel | undefined> {
  const { findById } = await import("./tenant.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建一条数据
 */
export async function createTenant(
  input: TenantInput,
  unique_type?: UniqueType,
): Promise<TenantId> {
  
  const {
    validate,
    setIdByLbl,
    create,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await validate(input);
  
  await usePermit(
    "/base/tenant",
    "add",
  );
  const uniqueType = unique_type;
  const id: TenantId = await create(input, { uniqueType });
  return id;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdTenant(
  id: TenantId,
  input: TenantInput,
): Promise<TenantId> {
  
  const {
    setIdByLbl,
    updateById,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await usePermit(
    "/base/tenant",
    "edit",
  );
  const id2: TenantId = await updateById(id, input);
  return id2;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsTenant(
  ids: TenantId[],
): Promise<number> {
  
  const {
    deleteByIds,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/tenant",
    "delete",
  );
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 启用或者禁用数据
 */
export async function enableByIdsTenant(
  ids: TenantId[],
  is_enabled: 0 | 1,
): Promise<number> {
  
  const {
    enableByIds,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIdsTenant.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/base/tenant",
    "enable",
  );
  const res = await enableByIds(ids, is_enabled);
  return res;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsTenant(
  ids: TenantId[],
  is_locked: 0 | 1,
): Promise<number> {
  
  const {
    lockByIds,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsTenant.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/base/tenant",
    "lock",
  );
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsTenant(
  ids: TenantId[],
): Promise<number> {
  
  const {
    revertByIds,
  } = await import("./tenant.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/tenant",
    "delete",
  );
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsTenant(
  ids: TenantId[],
): Promise<number> {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/tenant",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./tenant.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByTenant(): Promise<number> {
  const { findLastOrderBy } = await import("./tenant.service.ts");
  const res = findLastOrderBy();
  return res;
}
