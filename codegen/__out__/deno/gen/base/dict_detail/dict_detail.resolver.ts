import {
  useContext,
} from "/lib/context.ts";

import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import {
  type DictDetailInput,
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type DictDetailModel,
  type DictDetailSearch,
} from "./dict_detail.model.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountDictDetail(
  search?: DictDetailSearch & { $extra?: SearchExtra[] },
) {
  const { findCount } = await import("./dict_detail.service.ts");
  const data = await findCount(search);
  return data;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllDictDetail(
  search?: DictDetailSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const { findAll } = await import("./dict_detail.service.ts");
  const data = await findAll(search, page, sort);
  return data;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldCommentsDictDetail() {
  const { getFieldComments } = await import("./dict_detail.service.ts");
  const data = await getFieldComments();
  return data;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneDictDetail(
  search?: DictDetailSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const { findOne } = await import("./dict_detail.service.ts");
  const data = await findOne(search, sort);
  return data;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdDictDetail(
  id: string,
) {
  const { findById } = await import("./dict_detail.service.ts");
  const data = await findById(id);
  return data;
}

/**
 * 创建一条数据
 */
export async function createDictDetail(
  model: DictDetailModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const { create } = await import("./dict_detail.service.ts");
  const data = await create(model);
  return data;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdDictDetail(
  id: string,
  model: DictDetailModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const { updateById } = await import("./dict_detail.service.ts");
  const data = await updateById(id, model);
  return data;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsDictDetail(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const { deleteByIds } = await import("./dict_detail.service.ts");
  const data = await deleteByIds(ids);
  return data;
}

/**
 * 根据 ids 锁定或者解锁数据
 */
export async function lockByIdsDictDetail(
  ids: string[],
  is_locked: 0 | 1,
) {
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIdsDictDetail.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  const { lockByIds } = await import("./dict_detail.service.ts");
  const data = await lockByIds(ids, is_locked);
  return data;
}

/**
 * 批量导入
 */
export async function importModelsDictDetail(
  models: DictDetailInput[],
) {
  const { importModels } = await import("./dict_detail.service.ts");
  const data = await importModels(models);
  return data;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsDictDetail(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const { revertByIds } = await import("./dict_detail.service.ts");
  const data = await revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsDictDetail(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const { forceDeleteByIds } = await import("./dict_detail.service.ts");
  const data = await forceDeleteByIds(ids);
  return data;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByDictDetail() {
  const { findLastOrderBy } = await import("./dict_detail.service.ts");
  const data = findLastOrderBy();
  return data;
}
