import {
  useContext,
} from "/lib/context.ts";

import type {
  UniqueType,
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  DictDetailInput,
  DictDetailModel,
  DictDetailSearch,
  DictDetailFieldComment,
  DictDetailId,
} from "./dict_detail.model.ts";

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";

/**
 * 根据条件查找系统字典明细总数
 */
export async function findCountDictDetail(
  search?: DictDetailSearch,
): Promise<number> {
  
  const {
    findCount,
  } = await import("./dict_detail.service.ts");
  
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找系统字典明细列表
 */
export async function findAllDictDetail(
  search?: DictDetailSearch,
  page?: PageInput,
  sort?: SortInput[],
): Promise<DictDetailModel[]> {
  
  const {
    findAll,
  } = await import("./dict_detail.service.ts");
  
  const res = await findAll(search, page, sort);
  return res;
}

/**
 * 获取系统字典明细字段注释
 */
export async function getFieldCommentsDictDetail(): Promise<DictDetailFieldComment> {
  const { getFieldComments } = await import("./dict_detail.service.ts");
  const res = await getFieldComments();
  return res;
}

/**
 * 根据条件查找第一个系统字典明细
 */
export async function findOneDictDetail(
  search?: DictDetailSearch,
  sort?: SortInput[],
): Promise<DictDetailModel | undefined> {
  
  const {
    findOne,
  } = await import("./dict_detail.service.ts");
  
  const res = await findOne(search, sort);
  return res;
}

/**
 * 根据 id 查找系统字典明细
 */
export async function findByIdDictDetail(
  id: DictDetailId,
): Promise<DictDetailModel | undefined> {
  const { findById } = await import("./dict_detail.service.ts");
  const res = await findById(id);
  return res;
}

/**
 * 创建系统字典明细
 */
export async function createDictDetail(
  input: DictDetailInput,
  unique_type?: UniqueType,
): Promise<DictDetailId> {
  
  input.id = undefined;
  
  input.create_usr_id = undefined;
  input.create_usr_id_lbl = undefined;
  
  input.create_time = undefined;
  input.create_time_lbl = undefined;
  
  input.update_usr_id = undefined;
  input.update_usr_id_lbl = undefined;
  
  input.update_time = undefined;
  input.update_time_lbl = undefined;
  
  input.is_deleted = undefined;
  
  const {
    validate,
    setIdByLbl,
    create,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await validate(input);
  
  await usePermit(
    "/base/dict_detail",
    "add",
  );
  const uniqueType = unique_type;
  const id: DictDetailId = await create(input, { uniqueType });
  return id;
}

/**
 * 根据 id 修改系统字典明细
 */
export async function updateByIdDictDetail(
  id: DictDetailId,
  input: DictDetailInput,
): Promise<DictDetailId> {
  
  input.id = undefined;
  
  input.create_usr_id = undefined;
  input.create_usr_id_lbl = undefined;
  
  input.create_time = undefined;
  input.create_time_lbl = undefined;
  
  input.update_usr_id = undefined;
  input.update_usr_id_lbl = undefined;
  
  input.update_time = undefined;
  input.update_time_lbl = undefined;
  
  input.is_deleted = undefined;
  
  const {
    setIdByLbl,
    updateById,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await usePermit(
    "/base/dict_detail",
    "edit",
  );
  const id2: DictDetailId = await updateById(id, input);
  return id2;
}

/**
 * 根据 ids 删除系统字典明细
 */
export async function deleteByIdsDictDetail(
  ids: DictDetailId[],
): Promise<number> {
  
  const {
    deleteByIds,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dict_detail",
    "delete",
  );
  const res = await deleteByIds(ids);
  return res;
}

/**
 * 根据 ids 启用或者禁用系统字典明细
 */
export async function enableByIdsDictDetail(
  ids: DictDetailId[],
  is_enabled: 0 | 1,
): Promise<number> {
  
  const {
    enableByIds,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIdsDictDetail.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/base/dict_detail",
    "edit",
  );
  const res = await enableByIds(ids, is_enabled);
  return res;
}

/**
 * 根据 ids 锁定或者解锁系统字典明细
 */
export async function lockByIdsDictDetail(
  ids: DictDetailId[],
  is_locked: 0 | 1,
): Promise<number> {
  
  const {
    lockByIds,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsDictDetail.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/base/dict_detail",
    "edit",
  );
  const res = await lockByIds(ids, is_locked);
  return res;
}

/**
 * 根据 ids 还原系统字典明细
 */
export async function revertByIdsDictDetail(
  ids: DictDetailId[],
): Promise<number> {
  
  const {
    revertByIds,
  } = await import("./dict_detail.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dict_detail",
    "delete",
  );
  const res = await revertByIds(ids);
  return res;
}

/**
 * 根据 ids 彻底删除系统字典明细
 */
export async function forceDeleteByIdsDictDetail(
  ids: DictDetailId[],
): Promise<number> {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/base/dict_detail",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./dict_detail.service.ts");
  const res = await forceDeleteByIds(ids);
  return res;
}

/**
 * 查找 系统字典明细 order_by 字段的最大值
 */
export async function findLastOrderByDictDetail(): Promise<number> {
  const { findLastOrderBy } = await import("./dict_detail.service.ts");
  const res = findLastOrderBy();
  return res;
}
