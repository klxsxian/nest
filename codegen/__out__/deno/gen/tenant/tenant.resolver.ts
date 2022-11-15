import {
  useContext,
} from "/lib/context.ts";

import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import * as tenantService from "./tenant.service.ts";

import {
  type TenantModel,
  type TenantSearch,
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

/**
 * 根据条件查找据数总数
 */
export async function findCountTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
) {
  const result = await tenantService.findCount(search);
  return result;
}

/**
 * 根据搜索条件和分页查找数据
 */
export async function findAllTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
) {
  const result = await tenantService.findAll(search, page, sort);
  return result;
}

/**
 * 根据搜索条件导出
 */
export async function exportExcelTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
  sort?: SortInput[],
) {
  const result = await tenantService.exportExcel(search, sort);
  return result;
}

/**
 * 根据条件查找第一条数据
 */
export async function findOneTenant(
  search?: TenantSearch & { $extra?: SearchExtra[] },
) {
  const result = await tenantService.findOne(search);
  return result;
}

/**
 * 根据 id 查找一条数据
 */
export async function findByIdTenant(
  id: string,
) {
  const result = await tenantService.findById(id);
  return result;
}

/**
 * 创建一条数据
 */
export async function createTenant(
  model: TenantModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const result = await tenantService.create(model);
  return result;
}

/**
 * 根据id修改一条数据
 */
export async function updateByIdTenant(
  id: string,
  model: TenantModel,
) {
  const context = useContext();
  
  context.is_tran = true;
  const result = await tenantService.updateById(id, model);
  return result;
}

/**
 * 根据 ids 删除数据
 */
export async function deleteByIdsTenant(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const result = await tenantService.deleteByIds(ids);
  return result;
}

/**
 * 导入租户
 */
export async function importFileTenant(
  id: string,
) {
  const result = await tenantService.importFile(id);
  return result;
}

/**
 * 根据 ids 还原数据
 */
export async function revertByIdsTenant(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const result = await tenantService.revertByIds(ids);
  return result;
}

/**
 * 根据 ids 彻底删除数据
 */
export async function forceDeleteByIdsTenant(
  ids: string[],
) {
  const context = useContext();
  
  context.is_tran = true;
  const result = await tenantService.forceDeleteByIds(ids);
  return result;
}

/**
 * 查找 order_by 字段的最大值
 */
export async function findLastOrderByTenant() {
  const result = await tenantService.findLastOrderBy();
  return result;
}
