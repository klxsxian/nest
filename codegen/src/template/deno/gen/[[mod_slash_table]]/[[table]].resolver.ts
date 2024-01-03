<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by');
const hasLocked = columns.some((column) => column.COLUMN_NAME === "is_locked");
const hasEnabled = columns.some((column) => column.COLUMN_NAME === "is_enabled");
const hasDefault = columns.some((column) => column.COLUMN_NAME === "is_default");
const hasPassword = columns.some((column) => column.isPassword);
const hasIsHidden = columns.some((column) => column.COLUMN_NAME === "is_hidden");
const hasIsDeleted = columns.some((column) => column.COLUMN_NAME === "is_deleted");
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
  const Table_Up2 = Table_Up.substring(0, Table_Up.length - 1) + Table_Up.substring(Table_Up.length - 1).toUpperCase();
  modelName = Table_Up2 + "model";
  fieldCommentName = Table_Up2 + "fieldComment";
  inputName = Table_Up2 + "input";
  searchName = Table_Up2 + "search";
} else {
  modelName = Table_Up + "Model";
  fieldCommentName = Table_Up + "FieldComment";
  inputName = Table_Up + "Input";
  searchName = Table_Up + "Search";
}
const hasSummary = columns.some((column) => column.showSummary);
#>import {
  useContext,
} from "/lib/context.ts";<#
let hasDecimal = false;
for (let i = 0; i < columns.length; i++) {
  const column = columns[i];
  if (column.ignoreCodegen) continue;
  if (column.onlyCodegenDeno) continue;
  if (column.noList) continue;
  const column_name = column.COLUMN_NAME;
  if (column_name === "id") continue;
  if (column_name === "version") continue;
  const foreignKey = column.foreignKey;
  let data_type = column.DATA_TYPE;
  let column_type = column.COLUMN_TYPE;
  if (!column_type) {
    continue;
  }
  if (!column_type.startsWith("decimal")) {
    continue;
  }
  hasDecimal = true;
}
#><#
if (hasDecimal) {
#>

import Decimal from "decimal.js";<#
}
#>

import type {
  SearchExtra,
} from "/lib/util/dao_util.ts";

import type {<#
  if (opts.noAdd !== true) {
  #>
  UniqueType,<#
  }
  #>
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {<#
  if (opts.noAdd !== true && opts.noEdit !== true) {
  #>
  <#=inputName#>,<#
  }
  #>
  <#=modelName#>,
  <#=searchName#>,
  <#=fieldCommentName#>,
  <#=Table_Up#>Id,
} from "./<#=table#>.model.ts";<#
if (hasSummary) {
#>

import {
  <#=Table_Up#>Summary,
} from "/gen/types.ts";<#
}
#>

import {
  usePermit,
} from "/src/base/permit/permit.service.ts";<#
if (mod === "cron" && table === "cron_job") {
#>

import "./cron_job.service.ts";<#
}
#>

/**
 * 根据条件查找<#=table_comment#>总数
 */
export async function findCount<#=Table_Up#>(
  search?: <#=searchName#> & { $extra?: SearchExtra[] },
): Promise<number> {
  
  const {
    findCount,
  } = await import("./<#=table#>.service.ts");<#
  if (hasIsHidden) {
  #>
  
  search = search || { };
  search.is_hidden = [ 0 ];<#
  }
  #>
  
  const res = await findCount(search);
  return res;
}

/**
 * 根据搜索条件和分页查找<#=table_comment#>列表
 */
export async function findAll<#=Table_Up#>(
  search?: <#=searchName#> & { $extra?: SearchExtra[] },
  page?: PageInput,
  sort?: SortInput[],
): Promise<<#=modelName#>[]> {
  
  const {
    findAll,
  } = await import("./<#=table#>.service.ts");<#
  if (hasIsHidden) {
  #>
  
  search = search || { };
  search.is_hidden = [ 0 ];<#
  }
  #>
  
  const res = await findAll(search, page, sort);<#
  if (hasPassword) {
  #>
  
  for (const model of res) {<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let column_comment = column.COLUMN_COMMENT || "";
      let selectList = [ ];
      let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
      if (selectStr) {
        selectList = eval(`(${ selectStr })`);
      }
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const isPassword = column.isPassword;
    #><#
      if (isPassword) {
    #>
    // <#=column_comment#>
    model.<#=column_name#> = "";<#
      }
    #><#
    }
    #>
  }<#
  }
  #>
  return res;
}

/**
 * 获取<#=table_comment#>字段注释
 */
export async function getFieldComments<#=Table_Up#>(): Promise<<#=fieldCommentName#>> {
  const { getFieldComments } = await import("./<#=table#>.service.ts");
  const res = await getFieldComments();
  return res;
}<#
if (hasSummary) {
#>

/**
 * 根据搜索条件查找<#=table_comment#>合计
 */
export async function findSummary<#=Table_Up#>(
  search?: <#=searchName#> & { $extra?: SearchExtra[] },
): Promise<<#=Table_Up#>Summary> {
  const { findSummary } = await import("./<#=table#>.service.ts");
  const res = await findSummary(search);
  return res;
}<#
}
#>

/**
 * 根据条件查找第一个<#=table_comment#>
 */
export async function findOne<#=Table_Up#>(
  search?: <#=searchName#> & { $extra?: SearchExtra[] },
  sort?: SortInput[],
): Promise<<#=modelName#> | undefined> {
  
  const {
    findOne,
  } = await import("./<#=table#>.service.ts");<#
  if (hasIsHidden) {
  #>
  
  search = search || { };
  search.is_hidden = [ 0 ];<#
  }
  #>
  
  const res = await findOne(search, sort);<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "id") continue;
    let column_comment = column.COLUMN_COMMENT || "";
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.indexOf("[") !== -1) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    const isPassword = column.isPassword;
  #><#
    if (isPassword) {
  #>
  
  if (res) {
    // <#=column_comment#>
    res.<#=column_name#> = "";
  }<#
    }
  #><#
  }
  #>
  return res;
}

/**
 * 根据 id 查找<#=table_comment#>
 */
export async function findById<#=Table_Up#>(
  id: <#=Table_Up#>Id,
): Promise<<#=modelName#> | undefined> {
  const { findById } = await import("./<#=table#>.service.ts");
  const res = await findById(id);<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "id") continue;
    let column_comment = column.COLUMN_COMMENT || "";
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.indexOf("[") !== -1) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    const isPassword = column.isPassword;
  #><#
    if (isPassword) {
  #>
  
  if (res) {
    // <#=column_comment#>
    res.<#=column_name#> = "";
  }<#
    }
  #><#
  }
  #>
  return res;
}<#
if (opts.noAdd !== true) {
#>

/**
 * 创建<#=table_comment#>
 */
export async function create<#=Table_Up#>(
  input: <#=inputName#>,
  unique_type?: UniqueType,
): Promise<<#=Table_Up#>Id> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenDeno) continue;
    if (column.noList) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "id") continue;
    if (column_name === "version") continue;
    const foreignKey = column.foreignKey;
    let data_type = column.DATA_TYPE;
    let column_type = column.COLUMN_TYPE;
    if (!column_type) {
      continue;
    }
    if (!column_type.startsWith("decimal")) {
      continue;
    }
    let column_comment = column.COLUMN_COMMENT || "";
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.indexOf("[") !== -1) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
  #>
  
  // <#=column_comment#>
  if (input.<#=column_name#> != null) {
    input.<#=column_name#> = new Decimal(input.<#=column_name#>);
  }<#
  }
  #>
  
  const {<#
    if (log) {
    #>
    findById,<#
    }
    #>
    validate,
    setIdByLbl,
    create,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await validate(input);
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "add",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const uniqueType = unique_type;
  const id: <#=Table_Up#>Id = await create(input, { uniqueType });<#
  if (log) {
  #>
  
  const new_data = await findById(id);
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "create",
    method_lbl: "创建",
    lbl: "创建",
    old_data: "{}",
    new_data: JSON.stringify(new_data),
  });<#
  }
  #>
  return id;
}<#
}
#><#
if (opts.noEdit !== true) {
#>

/**
 * 根据 id 修改<#=table_comment#>
 */
export async function updateById<#=Table_Up#>(
  id: <#=Table_Up#>Id,
  input: <#=inputName#>,
): Promise<<#=Table_Up#>Id> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenDeno) continue;
    if (column.noList) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "id") continue;
    if (column_name === "version") continue;
    const foreignKey = column.foreignKey;
    let data_type = column.DATA_TYPE;
    let column_type = column.COLUMN_TYPE;
    if (!column_type) {
      continue;
    }
    if (!column_type.startsWith("decimal")) {
      continue;
    }
    let column_comment = column.COLUMN_COMMENT || "";
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.indexOf("[") !== -1) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
  #>
  
  // <#=column_comment#>
  if (input.<#=column_name#> != null) {
    input.<#=column_name#> = new Decimal(input.<#=column_name#>);
  }<#
  }
  #>
  
  const {<#
    if (log) {
    #>
    findById,<#
    }
    #>
    setIdByLbl,
    updateById,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await setIdByLbl(input);
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "edit",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");
  const old_data = await findById<#=Table_Up#>(id);<#
  }
  #>
  const id2: <#=Table_Up#>Id = await updateById(id, input);<#
  if (log) {
  #>
  
  const new_data = await findById(id2);
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "updateById",
    method_lbl: "修改",
    lbl: "修改",
    old_data: JSON.stringify(old_data),
    new_data: JSON.stringify(new_data),
  });<#
  }
  #>
  return id2;
}<#
}
#><#
if (opts.noDelete !== true) {
#>

/**
 * 根据 ids 删除<#=table_comment#>
 */
export async function deleteByIds<#=Table_Up#>(
  ids: <#=Table_Up#>Id[],
): Promise<number> {
  
  const {<#
    if (log) {
    #>
    findAll,<#
    }
    #>
    deleteByIds,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "delete",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");
  const old_data = await findAll({
    ids,
  });<#
  }
  #>
  const res = await deleteByIds(ids);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "deleteByIds",
    method_lbl: "删除",
    lbl: "删除",
    old_data: JSON.stringify(old_data),
    new_data: "{}",
  });<#
  }
  #>
  return res;
}<#
}
#><#
  if (hasDefault && opts.noEdit !== true) {
#>

/**
 * 根据 id 设置默认<#=table_comment#>
 */
export async function defaultById<#=Table_Up#>(
  id: <#=Table_Up#>Id,
): Promise<number> {
  
  const {
    defaultById,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "default",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const res = await defaultById(id);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "defaultById",
    method_lbl: "默认",
    lbl: "默认",
    old_data: JSON.stringify(ids),
    new_data: "[]",
  });<#
  }
  #>
  return res;
}<#
  }
#><#
  if (hasEnabled && opts.noEdit !== true) {
#>

/**
 * 根据 ids 启用或者禁用<#=table_comment#>
 */
export async function enableByIds<#=Table_Up#>(
  ids: <#=Table_Up#>Id[],
  is_enabled: 0 | 1,
): Promise<number> {
  
  const {
    enableByIds,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_enabled !== 0 && is_enabled !== 1) {
    throw new Error(`enableByIds<#=Table_Up#>.is_enabled expect 0 or 1 but got ${ is_enabled }`);
  }
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "enable",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const res = await enableByIds(ids, is_enabled);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "enableByIds",
    method_lbl: "启用",
    lbl: "启用",
    old_data: JSON.stringify(ids),
    new_data: "[]",
  });<#
  }
  #>
  return res;
}<#
  }
#><#
  if (hasLocked && opts.noEdit !== true) {
#>

/**
 * 根据 ids 锁定或者解锁<#=table_comment#>
 */
export async function lockByIds<#=Table_Up#>(
  ids: <#=Table_Up#>Id[],
  is_locked: 0 | 1,
): Promise<number> {
  
  const {
    lockByIds,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  if (is_locked !== 0 && is_locked !== 1) {
    throw new Error(`lockByIds<#=Table_Up#>.is_locked expect 0 or 1 but got ${ is_locked }`);
  }
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "lock",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const res = await lockByIds(ids, is_locked);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "lockByIds",
    method_lbl: is_locked ? "锁定" : "解锁",
    lbl: is_locked ? "锁定" : "解锁",
    old_data: "",
    new_data: JSON.stringify({
      ids,
      is_locked,
    }),
  });<#
  }
  #>
  return res;
}<#
  }
#><#
if (opts.noRevert !== true && hasIsDeleted) {
#>

/**
 * 根据 ids 还原<#=table_comment#>
 */
export async function revertByIds<#=Table_Up#>(
  ids: <#=Table_Up#>Id[],
): Promise<number> {
  
  const {
    revertByIds,
  } = await import("./<#=table#>.service.ts");
  
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "delete",
  );<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const res = await revertByIds(ids);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "revertByIds",
    method_lbl: "还原",
    lbl: "还原",
    old_data: "[]",
    new_data: JSON.stringify(ids),
  });<#
  }
  #>
  return res;
}<#
}
#><#
if (opts.noDelete !== true && hasIsDeleted) {
#>

/**
 * 根据 ids 彻底删除<#=table_comment#>
 */
export async function forceDeleteByIds<#=Table_Up#>(
  ids: <#=Table_Up#>Id[],
): Promise<number> {
  const context = useContext();
  
  context.is_tran = true;
  
  await usePermit(
    "/<#=mod#>/<#=table#>",
    "force_delete",
  );
  
  const {
    forceDeleteByIds,
  } = await import("./<#=table#>.service.ts");<#
  if (log) {
  #>
  
  const { log } = await import("/src/base/operation_record/operation_record.service.ts");<#
  }
  #>
  const res = await forceDeleteByIds(ids);<#
  if (log) {
  #>
  
  await log({
    module: "<#=mod#>_<#=table#>",
    module_lbl: "<#=table_comment#>",
    method: "forceDeleteByIds",
    method_lbl: "彻底删除",
    lbl: "彻底删除",
    old_data: JSON.stringify(ids),
    new_data: "[]",
  });<#
  }
  #>
  return res;
}<#
}
#><#
if (hasOrderBy) {
#>

/**
 * 查找 <#=table_comment#> order_by 字段的最大值
 */
export async function findLastOrderBy<#=Table_Up#>(): Promise<number> {
  const { findLastOrderBy } = await import("./<#=table#>.service.ts");
  const res = findLastOrderBy();
  return res;
}<#
}
#>
