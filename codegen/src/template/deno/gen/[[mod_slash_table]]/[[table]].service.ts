<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by');
const hasLocked = columns.some((column) => column.COLUMN_NAME === "is_locked");
const hasEnabled = columns.some((column) => column.COLUMN_NAME === "is_enabled");
const hasDefault = columns.some((column) => column.COLUMN_NAME === "is_default");
const hasVersion = columns.some((column) => column.COLUMN_NAME === "version");
let Table_Up = tableUp.split("_").map(function(item) {
  return item.substring(0, 1).toUpperCase() + item.substring(1);
}).join("");
let modelName = "";
let fieldCommentName = "";
let inputName = "";
let searchName = "";
if (/^[A-Za-z]+$/.test(Table_Up.charAt(Table_Up.length - 1))
  && !/^[A-Za-z]+$/.test(Table_Up.charAt(Table_Up.length - 2))
) {
  Table_Up = Table_Up.substring(0, Table_Up.length - 1) + Table_Up.substring(Table_Up.length - 1).toUpperCase();
  modelName = Table_Up + "model";
  fieldCommentName = Table_Up + "fieldComment";
  inputName = Table_Up + "input";
  searchName = Table_Up + "search";
} else {
  modelName = Table_Up + "Model";
  fieldCommentName = Table_Up + "FieldComment";
  inputName = Table_Up + "Input";
  searchName = Table_Up + "Search";
}
#><#
const hasSummary = columns.some((column) => column.showSummary);
#><#
if (hasLocked) {
#>import {
  ns,
} from "/src/base/i18n/i18n.ts";<#
}
#><#
if (opts.filterDataByCreateUsr) {
#>
import * as authDao from "/lib/auth/auth.dao.ts";<#
}
#>

import {
  type PageInput,
  type SortInput,
} from "/gen/types.ts";

import {
  type <#=inputName#>,
  type <#=modelName#>,
  type <#=searchName#>,
} from "./<#=table#>.model.ts";<#
if (hasSummary) {
#>

import {
  <#=Table_Up#>Summary,
} from "/gen/types.ts";<#
}
#>

import * as <#=table#>Dao from "./<#=table#>.dao.ts";

/**
 * 根据条件查找总数
 * @param {<#=searchName#>} search? 搜索条件
 * @return {Promise<number>}
 */
export async function findCount(
  search?: <#=searchName#>,
): Promise<number> {
  search = search || { };<#
    if (opts.filterDataByCreateUsr) {
  #>
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }<#
    }
  #>
  const data = await <#=table#>Dao.findCount(search);
  return data;
}

/**
 * 根据条件和分页查找数据
 * @param {<#=searchName#>} search? 搜索条件
 * @param {PageInput} page? 分页条件
 * @param {SortInput|SortInput[]} sort? 排序
 * @return {Promise<<#=modelName#>[]>} 
 */
export async function findAll(
  search?: <#=searchName#>,
  page?: PageInput,
  sort?: SortInput|SortInput[],
): Promise<<#=modelName#>[]> {
  search = search || { };<#
    if (opts.filterDataByCreateUsr) {
  #>
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }<#
    }
  #>
  const data: <#=modelName#>[] = await <#=table#>Dao.findAll(search, page, sort);
  return data;
}<#
if (hasSummary) {
#>

/**
 * 根据条件和分页查找数据
 * @param {<#=searchName#>} search? 搜索条件
 * @return {Promise<<#=Table_Up#>Summary>} 
 */
export async function findSummary(
  search?: <#=searchName#>,
): Promise<<#=Table_Up#>Summary> {
  search = search || { };<#
    if (opts.filterDataByCreateUsr) {
  #>
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }<#
    }
  #>
  const data = await <#=table#>Dao.findSummary(search);
  return data;
}<#
}
#>

/**
 * 根据条件查找第一条数据
 * @param {<#=searchName#>} search? 搜索条件
 */
export async function findOne(
  search?: <#=searchName#>,
  sort?: SortInput|SortInput[],
) {
  search = search || { };<#
    if (opts.filterDataByCreateUsr) {
  #>
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }<#
    }
  #>
  const data = await <#=table#>Dao.findOne(search, sort);
  return data;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
) {
  const data = await <#=table#>Dao.findById(id);
  return data;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {<#=searchName#>} search? 搜索条件
 */
export async function exist(
  search?: <#=searchName#>,
) {
  search = search || { };<#
    if (opts.filterDataByCreateUsr) {
  #>
  
  const authModel = await authDao.getAuthModel();
  if (authModel?.id) {
    search.create_usr_id = [ authModel.id ];
  }<#
    }
  #>
  const data = await <#=table#>Dao.exist(search);
  return data;
}

/**
 * 根据id查找数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const data = await <#=table#>Dao.existById(id);
  return data;
}

/**
 * 创建数据
 * @param {<#=inputName#>} input
 * @return {Promise<string>} id
 */
export async function create(
  input: <#=inputName#>,
): Promise<string> {
  const data = await <#=table#>Dao.create(input);
  return data;
}<#
if (hasVersion) {
#>

/**
 * 根据 id 获取版本号
 */
export async function getVersionById(id: string) {
  const version = await <#=table#>Dao.getVersionById(id);
  return version;
}<#
}
#>

/**
 * 根据 id 修改数据
 * @param {string} id
 * @param {<#=inputName#>} input
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  input: <#=inputName#>,
): Promise<string> {<#
  if (hasLocked) {
  #>
  
  const is_locked = await <#=table#>Dao.getIsLockedById(id);
  if (is_locked) {
    throw await ns("不能修改已经锁定的数据");
  }<#
  }
  #>
  const data = await <#=table#>Dao.updateById(id, input);<#
  if (table === "i18n") {
  #>
  
  {
    const optionsDaoSrc = await import("/src/base/options/options.dao.ts");
    await optionsDaoSrc.updateI18n_version();
  }<#
  }
  #>
  return data;
}

/**
 * 根据 ids 删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: string[],
): Promise<number> {<#
  if (hasLocked) {
  #>
  
  const lockedIds: string[] = [ ];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const is_locked = await <#=table#>Dao.getIsLockedById(id);
    if (is_locked) {
      lockedIds.push(id);
    }
  }
  if (lockedIds.length > 0 && lockedIds.length === ids.length) {
    throw await ns("不能删除已经锁定的数据");
  }<#
  }
  #>
  const data = await <#=table#>Dao.deleteByIds(ids);<#
  if (table === "i18n") {
  #>
  
  {
    const optionsDaoSrc = await import("/src/base/options/options.dao.ts");
    await optionsDaoSrc.updateI18n_version();
  }<#
  }
  #>
  return data;
}<#
  if (hasDefault) {
#>

/**
 * 根据 ids 启用或禁用数据
 * @param {string} id
 * @return {Promise<number>}
 */
export async function defaultById(
  id: string,
): Promise<number> {
  const data = await <#=table#>Dao.defaultById(id);
  return data;
}<#
  }
#><#
  if (hasEnabled) {
#>

/**
 * 根据 ids 启用或禁用数据
 * @param {string[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function enableByIds(
  ids: string[],
  is_enabled: 0 | 1,
): Promise<number> {
  const data = await <#=table#>Dao.enableByIds(ids, is_enabled);
  return data;
}<#
  }
#><#
  if (hasLocked) {
#>

/**
 * 根据 ids 锁定或解锁数据
 * @param {string[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function lockByIds(
  ids: string[],
  is_locked: 0 | 1,
): Promise<number> {
  const data = await <#=table#>Dao.lockByIds(ids, is_locked);
  return data;
}<#
  }
#>

/**
 * 根据 ids 还原数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: string[],
): Promise<number> {
  const data = await <#=table#>Dao.revertByIds(ids);
  return data;
}

/**
 * 根据 ids 彻底删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: string[],
): Promise<number> {
  const data = await <#=table#>Dao.forceDeleteByIds(ids);
  return data;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldComments() {
  const data = await <#=table#>Dao.getFieldComments();
  return data;
}<#
if (hasOrderBy) {
#>

/**
 * 查找 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
): Promise<number> {
  const data = await <#=table#>Dao.findLastOrderBy();
  return data;
}<#
}
#>
