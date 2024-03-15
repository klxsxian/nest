import {
  useContext,
} from "/lib/context.ts";

import type {
  UniqueType,
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  DeptInput,
  DeptModel,
  DeptSearch,
  DeptFieldComment,
  DeptId,
} from "./dept.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

/**
 * 根据条件查找部门总数
 */
export async function findCountDept(
  search?: DeptSearch,
): Promise<number> {
  
  const {
    findCount,
  } = await import("./dept.service.ts");
  
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找部门列表
 */
export async function findAllDept(
  search?: DeptSearch,
  page?: PageInput,
  sort?: SortInput[],
): Promise<DeptModel[]> {
  
  const {
    findAll,
  } = await import("./dept.service.ts");
  
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取部门字段注释
 */
export async function getFieldCommentsDept(): Promise<DeptFieldComment> {
  const { getFieldComments } = await import("./dept.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一个部门
 */
export async function findOneDept(
  search?: DeptSearch,
  sort?: SortInput[],
): Promise<DeptModel | undefined> {
  
  const {
    findOne,
  } = await import("./dept.service.ts");
  
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找部门
 */
export async function findByIdDept(
  id: DeptId,
): Promise<DeptModel | undefined> {
  const { findById } = await import("./dept.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建部门
 */
export async function createDept(
  input: DeptInput,
  unique_type?: UniqueType,
): Promise<DeptId> {
  
  input.id = undefined;
  
  const {
    validate,
    setIdByLbl,
    create,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await validate(input);
  
  await usePermit(
    "/base/dept",
    "add",
  );
  const uniqueType = unique_type;
  const id: DeptId = await create(input, { uniqueType });
  return id;
}

/**
 * 根据 id 修改部门
 */
export async function updateByIdDept(
  id: DeptId,
  input: DeptInput,
): Promise<DeptId> {
  
  input.id = undefined;
  
  const {
    setIdByLbl,
    updateById,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await usePermit(
    "/base/dept",
    "edit",
  );
  const id2: DeptId = await updateById(id, input);
  return id2;
}

/**
 * 根据 ids 删除部门
 */
export async function deleteByIdsDept(
  ids: DeptId[],
): Promise<number> {
  
  const {
    deleteByIds,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dept",
    "delete",
  );
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 启用或者禁用部门
 */
export async function enableByIdsDept(
  ids: DeptId[],
  is_enabled: 0 | 1,
): Promise<number> {
  
  const {
    enableByIds,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIdsDept.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/base/dept",
    "edit",
  );
  const res = await enableByIds(ids, is_enabled);
  return res;
}

/**
 * 根据 ids 锁定或者解锁部门
 */
export async function lockByIdsDept(
  ids: DeptId[],
  is_locked: 0 | 1,
): Promise<number> {
  
  const {
    lockByIds,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsDept.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/base/dept",
    "edit",
  );
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原部门
 */
export async function revertByIdsDept(
  ids: DeptId[],
): Promise<number> {
  
  const {
    revertByIds,
  } = await import("./dept.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dept",
    "delete",
  );
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除部门
 */
export async function forceDeleteByIdsDept(
  ids: DeptId[],
): Promise<number> {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dept",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./dept.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 部门 order_by 字段的最大值
 */
export async function findLastOrderByDept(): Promise<number> {
  const { findLastOrderBy } = await import("./dept.service.ts");
  const res = findLastOrderBy();
  return res;
}
