import {
  set_is_tran,
} from "/lib/context.ts";

import type {
  PageInput,
  SortInput,
} from "/gen/types.ts";

import {
  checkSortLoginLog,
} from "./login_log.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

import {
  route_path,
} from "./login_log.model.ts";

/**
 * 根据条件查找登录日志总数
 */
export async function findCountLoginLog(
  search?: LoginLogSearch,
): Promise<number> {
  
  const {
    findCount,
  } = await import("./login_log.service.ts");
  
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找登录日志列表
 */
export async function findAllLoginLog(
  search?: LoginLogSearch,
  page?: PageInput,
  sort?: SortInput[],
): Promise<LoginLogModel[]> {
  
  const {
    findAll,
  } = await import("./login_log.service.ts");
  
  checkSortLoginLog(sort);
  
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取登录日志字段注释
 */
export async function getFieldCommentsLoginLog(): Promise<LoginLogFieldComment> {
  const { getFieldComments } = await import("./login_log.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一个登录日志
 */
export async function findOneLoginLog(
  search?: LoginLogSearch,
  sort?: SortInput[],
): Promise<LoginLogModel | undefined> {
  
  const {
    findOne,
  } = await import("./login_log.service.ts");
  
  checkSortLoginLog(sort);
  
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找登录日志
 */
export async function findByIdLoginLog(
  id: LoginLogId,
): Promise<LoginLogModel | undefined> {
  
  const {
    findById,
  } = await import("./login_log.service.ts");
  
  const res = await findById(id);
  
  return res;
}

/**
 * 根据 ids 删除登录日志
 */
export async function deleteByIdsLoginLog(
  ids: LoginLogId[],
): Promise<number> {
  
  const {
    deleteByIds,
  } = await import("./login_log.service.ts");
  
  set_is_tran(true);
  
  await usePermit(
    route_path,
    "delete",
  );
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 还原登录日志
 */
export async function revertByIdsLoginLog(
  ids: LoginLogId[],
): Promise<number> {
  
  const {
    revertByIds,
  } = await import("./login_log.service.ts");
  
  set_is_tran(true);
  
  await usePermit(
    route_path,
    "delete",
  );
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除登录日志
 */
export async function forceDeleteByIdsLoginLog(
  ids: LoginLogId[],
): Promise<number> {
  
  const {
    forceDeleteByIds,
  } = await import("./login_log.service.ts");
  
  set_is_tran(true);
  
  await usePermit(
    route_path,
    "force_delete",
  );
  const res = await forceDeleteByIds(ids);
  return res;
}
