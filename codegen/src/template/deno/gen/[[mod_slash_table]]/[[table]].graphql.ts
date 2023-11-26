<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by' && !column.onlyCodegenDeno);
const hasLocked = columns.some((column) => column.COLUMN_NAME === "is_locked");
const hasEnabled = columns.some((column) => column.COLUMN_NAME === "is_enabled");
const hasDefault = columns.some((column) => column.COLUMN_NAME === "is_default");
const hasOrgId = columns.some((column) => column.COLUMN_NAME === "org_id");
const hasInlineForeignTabs = opts?.inlineForeignTabs && opts?.inlineForeignTabs.length > 0;
const inlineForeignTabs = opts?.inlineForeignTabs || [ ];
const hasIsHidden = columns.some((column) => column.COLUMN_NAME === "is_hidden");
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
#>import { defineGraphql } from "/lib/context.ts";

import * as resolver from "./<#=table#>.resolver.ts";

defineGraphql(resolver, /* GraphQL */ `
scalar <#=Table_Up#>Id
<#
for (let i = 0; i < columns.length; i++) {
  const column = columns[i];
  if (column.ignoreCodegen) continue;
  const column_name = column.COLUMN_NAME;
  if (
    column_name === "tenant_id" ||
    column_name === "org_id" ||
    column_name === "is_sys" ||
    column_name === "is_deleted" ||
    column_name === "is_hidden"
  ) continue;
  const data_type = column.DATA_TYPE;
  const column_comment = column.COLUMN_COMMENT;
#><#
  if (
    (column.dict || column.dictbiz) &&
    ![ "int", "decimal", "tinyint" ].includes(data_type)
  ) {
    let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
    Column_Up = Column_Up.split("_").map(function(item) {
      return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join("");
    const enumColumnName = Table_Up + Column_Up;
#>
"<#=table_comment#><#=column_comment#>"
scalar <#=enumColumnName#><#
  }
  #><#
}
#>

type <#=modelName#> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    // if (column.onlyCodegenDeno) continue;
    const column_name = column.COLUMN_NAME;
    let is_nullable = column.IS_NULLABLE === "YES";
    const foreignKey = column.foreignKey;
    const foreignTable = foreignKey && foreignKey.table;
    const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
      return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join("");
    let data_type = column.DATA_TYPE;
    if (column_name === "is_sys") {
      continue;
    }
    if (column_name === 'is_deleted') {
      continue;
    }
    if (column_name === 'org_id') {
      continue;
    }
    if (column_name === 'tenant_id') {
      continue;
    }
    if (column_name === 'is_hidden') {
      continue;
    }
    let _data_type = "String";
    if (column_name === 'id') {
      data_type = 'String';
      _data_type = `${ Table_Up }Id`;
    }
    else if (foreignKey && foreignKey.multiple) {
      data_type = '[String!]';
      _data_type = `[${ foreignTable_Up }Id!]`;
      is_nullable = true;
    }
    else if (foreignKey && !foreignKey.multiple) {
      data_type = 'String';
      _data_type = `${ foreignTable_Up }Id`;
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = 'NaiveDate';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = 'NaiveDateTime';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = 'Int';
      _data_type = "Int";
    }
    else if (column.DATA_TYPE === 'json') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'text') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'tinyint') {
      data_type = 'Int';
      _data_type = "Int";
    }
    else if (column.DATA_TYPE === 'decimal') {
      data_type = 'Decimal';
      _data_type = "Decimal";
    }
    let column_comment = column.COLUMN_COMMENT;
    if (!column_comment && column_name !== "id") {
      console.log(column);
      throw `错误: 表: ${mod}_${ table } 字段: ${ column_name } 无 comment`;
    }
    let selectList = [ ];
    if (column_comment.endsWith("multiple")) {
      _data_type = "[String]";
    }
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_name === 'id') column_comment = 'ID';
    if (!is_nullable) {
      data_type += "!";
    }
  #><#
    if (!foreignKey && selectList.length === 0 && !column.dict && !column.dictbiz
      && column.DATA_TYPE !== "date" && column.DATA_TYPE !== "datetime"
    ) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (column.DATA_TYPE === "date" || column.DATA_TYPE === "datetime") {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: String!<#
    } else if (column.dict || column.dictbiz) {
      let enumColumnName = data_type;
      if (![ "int", "decimal", "tinyint" ].includes(column.DATA_TYPE)) {
        let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
        Column_Up = Column_Up.split("_").map(function(item) {
          return item.substring(0, 1).toUpperCase() + item.substring(1);
        }).join("");
        enumColumnName = Table_Up + Column_Up;
      }
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=enumColumnName#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: String!<#
    } else {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: <#=_data_type#><#
    }
  }
  #>
  "是否已删除"
  is_deleted: Int!<#
  for (const inlineForeignTab of inlineForeignTabs) {
    const inlineForeignSchema = optTables[inlineForeignTab.mod + "_" + inlineForeignTab.table];
    if (!inlineForeignSchema) {
      throw `表: ${ mod }_${ table } 的 inlineForeignTabs 中的 ${ inlineForeignTab.mod }_${ inlineForeignTab.table } 不存在`;
      process.exit(1);
    }
    const table = inlineForeignTab.table;
    const mod = inlineForeignTab.mod;
    const tableUp = table.substring(0, 1).toUpperCase()+table.substring(1);
    const Table_Up = tableUp.split("_").map(function(item) {
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
  #>
  "<#=inlineForeignTab.label#>"
  <#=table#>_models: [<#=modelName#>!]<#
  }
  #>
}
type <#=fieldCommentName#> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    const column_name = column.COLUMN_NAME;
    let is_nullable = column.IS_NULLABLE === "YES";
    const foreignKey = column.foreignKey;
    const foreignTable = foreignKey && foreignKey.table;
    const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
      return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join("");
    let column_comment = column.COLUMN_COMMENT;
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_name === "is_sys") {
      continue;
    }
    if (column_name === "is_deleted") {
      continue;
    }
    if (column_name === "org_id") {
      continue;
    }
    if (column_name === "tenant_id") {
      continue;
    }
    if (column_name === 'is_hidden') {
      continue;
    }
    const isPassword = column.isPassword;
    if (isPassword) continue;
  #><#
    if (foreignKey) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: String!
  "<#=column_comment#>"
  <#=column_name#>_lbl: String!<#
    } else if (column.DATA_TYPE === "date" || column.DATA_TYPE === "datetime") {
  #>
  "<#=column_comment#>"
  <#=column_name#>: String!
  "<#=column_comment#>"
  <#=column_name#>_lbl: String!<#
    } else if ((selectList && selectList.length > 0) || column.dict || column.dictbiz) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: String!
  "<#=column_comment#>"
  <#=column_name#>_lbl: String!<#
    } else {
  #>
  "<#=column_comment#>"
  <#=column_name#>: String!<#
    }
  }
  #>
}
input <#=inputName#> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    // if (column.onlyCodegenDeno) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "is_deleted") continue;
    const foreignKey = column.foreignKey;
    const foreignTable = foreignKey && foreignKey.table;
    const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
      return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join("");
    let data_type = column.DATA_TYPE;
    if (column_name === "is_sys") {
      continue;
    }
    if (column_name === "org_id") {
      continue;
    }
    if (column_name === "tenant_id") {
      continue;
    }
    if (column_name === 'is_hidden') {
      continue;
    }
    let _data_type = "String";
    if (column_name === 'id') {
      data_type = `${ Table_Up }Id`;
    }
    else if (foreignKey && foreignKey.multiple) {
      data_type = '[String!]';
      _data_type = `[${ foreignTable_Up }Id!]`;
    }
    else if (foreignKey && !foreignKey.multiple) {
      data_type = 'String';
      _data_type = `${ foreignTable_Up }Id`;
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = 'NaiveDate';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = 'NaiveDateTime';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'json') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'text') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'tinyint') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'decimal') {
      data_type = 'Decimal';
    }
    let column_comment = column.COLUMN_COMMENT;
    let selectList = [ ];
    if (column_comment.endsWith("multiple")) {
      _data_type = "[String]";
    }
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_name === 'id') column_comment = '';
  #><#
    if (foreignKey) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: <#=_data_type#><#
    } else if (!foreignKey && selectList.length === 0 && !column.dict && !column.dictbiz
      && column.DATA_TYPE !== "date" && !column.DATA_TYPE === "datetime"
    ) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (column.DATA_TYPE === "date" || column.DATA_TYPE === "datetime") {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: <#=_data_type#><#
    } else if (selectList.length > 0 || column.dict || column.dictbiz) {
      let enumColumnName = data_type;
      if (![ "int", "decimal", "tinyint" ].includes(column.DATA_TYPE)) {
        let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
        Column_Up = Column_Up.split("_").map(function(item) {
          return item.substring(0, 1).toUpperCase() + item.substring(1);
        }).join("");
        enumColumnName = Table_Up + Column_Up;
      }
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=enumColumnName#>
  "<#=column_comment#>"
  <#=column_name#>_lbl: String<#
    } else {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    }
  #><#
  }
  #><#
  for (const inlineForeignTab of inlineForeignTabs) {
    const inlineForeignSchema = optTables[inlineForeignTab.mod + "_" + inlineForeignTab.table];
    if (!inlineForeignSchema) {
      throw `表: ${ mod }_${ table } 的 inlineForeignTabs 中的 ${ inlineForeignTab.mod }_${ inlineForeignTab.table } 不存在`;
      process.exit(1);
    }
    const table = inlineForeignTab.table;
    const mod = inlineForeignTab.mod;
    const tableUp = table.substring(0, 1).toUpperCase()+table.substring(1);
    const Table_Up = tableUp.split("_").map(function(item) {
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
  #>
  "<#=inlineForeignTab.label#>"
  <#=table#>_models: [<#=inputName#>!]<#
  }
  #>
}
input <#=searchName#> {
  "是否已删除"
  is_deleted: Int
  "ID列表"
  ids: [String]<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    // if (column.isVirtual) continue;
    const column_name = column.COLUMN_NAME;
    let data_type = column.DATA_TYPE;
    let column_type = column.COLUMN_TYPE;
    let column_comment = column.COLUMN_COMMENT || "";
    const foreignKey = column.foreignKey;
    const foreignTable = foreignKey && foreignKey.table;
    const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
      return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join("");
    const isPassword = column.isPassword;
    if (isPassword) continue;
    const search = column.search;
    if (column_name === 'org_id') {
      continue;
    }
    if (column_name === 'tenant_id') {
      continue;
    }
    if (column_name === 'is_sys') {
      continue;
    }
    if (column_name === 'is_deleted') {
      continue;
    }
    if (column_name === 'is_hidden') {
      continue;
    }
    if (column_name === 'id') {
      data_type = `${ Table_Up }Id`;
    }
    else if (foreignKey) {
      data_type = `[${ foreignTable_Up }Id!]`;
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = '[NaiveDate!]';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = '[NaiveDateTime!]';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = '[Int!]';
    }
    else if (column.DATA_TYPE === 'json') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'text') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'tinyint') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'decimal') {
      data_type = '[Decimal!]';
    }
    if (column_name.startsWith("is_")) {
      data_type = 'Int';
    }
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (selectList.length > 0) {
      data_type = '['+data_type+'!]';
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_name === 'id') {
      column_comment = 'String';
    }
    if (selectList.length > 0) {
      if (column.DATA_TYPE === 'tinyint' || column.DATA_TYPE === 'int') {
        data_type = "[Int!]";
      } else {
        data_type = "[String!]";
      }
    } else if (column.dict || column.dictbiz) {
      if (column.DATA_TYPE === 'tinyint' || column.DATA_TYPE === 'int') {
        data_type = "[Int!]";
      } else {
        data_type = "[String!]";
      }
    }
  #><#
    if (foreignKey) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  <#=column_name#>_is_null: Boolean<#
    } else if (selectList && selectList.length > 0) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (column.dict || column.dictbiz) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (column_name === "id") {
  #>
  "ID"
  <#=column_name#>: <#=data_type#><#
    } else if (
      column.DATA_TYPE === "int"
      || column.DATA_TYPE === "decimal"
    ) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (
      column.DATA_TYPE === "date"
      || column.DATA_TYPE === "datetime"
    ) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (!column.isEncrypt) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  <#=column_name#>_like: <#=data_type#><#
    }
  #><#
  }
  #>
}<#
if (hasSummary) {
#>
type <#=Table_Up#>Summary {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.isVirtual) continue;
    // if (column.onlyCodegenDeno) continue;
    const column_name = column.COLUMN_NAME;
    if (column_name === "id") continue;
    let column_comment = column.COLUMN_COMMENT;
    let data_type = column.DATA_TYPE;
    let selectList = [ ];
    let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
    if (selectStr) {
      selectList = eval(`(${ selectStr })`);
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (data_type === 'id') column_comment = '';
  #><#
    if (column.showSummary) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: Int<#
    }
  #><#
  }
  #>
}<#
}
#>
type Query {
  "根据条件查找据数总数"
  findCount<#=Table_Up#>(search: <#=searchName#>): Int!
  "根据搜索条件和分页查找数据"
  findAll<#=Table_Up#>(search: <#=searchName#>, page: PageInput, sort: [SortInput!]): [<#=modelName#>!]!
  "获取字段对应的名称"
  getFieldComments<#=Table_Up#>: <#=fieldCommentName#>!<#
  if (hasSummary) {
  #>
  "根据搜索条件查找合计"
  findSummary<#=Table_Up#>(search: <#=searchName#>): <#=Table_Up#>Summary!<#
  }
  #>
  "根据条件查找第一条数据"
  findOne<#=Table_Up#>(search: <#=searchName#>, sort: [SortInput!]): <#=modelName#>
  "根据id查找一条数据"
  findById<#=Table_Up#>(id: String!): <#=modelName#><#
  if (hasOrderBy) {
  #>
  "查找order_by字段的最大值"
  findLastOrderBy<#=Table_Up#>: Int!<#
  }
  #>
}<#
if (opts.noAdd !== true
  || opts.noEdit !== true
  || opts.noDelete !== true
) {
#>
type Mutation {<#
  if (opts.noAdd !== true) {
  #>
  "创建一条数据"
  create<#=Table_Up#>(model: <#=inputName#>!, unique_type: UniqueType): String!<#
  }
  #><#
  if (opts.noEdit !== true) {
  #>
  "根据id修改一条数据"
  updateById<#=Table_Up#>(id: String!, model: <#=inputName#>!): String!<#
  }
  #><#
  if (opts.noDelete !== true) {
  #>
  "根据 ids 删除数据"
  deleteByIds<#=Table_Up#>(ids: [String!]!): Int!<#
  }
  #><#
  if (hasDefault && opts.noEdit !== true) {
  #>
  "根据 id 设置默认记录"
  defaultById<#=Table_Up#>(id: String!): Int!<#
  }
  #><#
  if (hasEnabled && opts.noEdit !== true) {
  #>
  "根据 ids 启用或者禁用数据"
  enableByIds<#=Table_Up#>(ids: [String!]!, is_enabled: Int!): Int!<#
  }
  #><#
  if (hasLocked && opts.noEdit !== true) {
  #>
  "根据 ids 锁定或者解锁数据"
  lockByIds<#=Table_Up#>(ids: [String!]!, is_locked: Int!): Int!<#
  }
  #><#
  if (opts.noDelete !== true) {
  #>
  "根据 ids 还原数据"
  revertByIds<#=Table_Up#>(ids: [String!]!): Int!
  "根据 ids 彻底删除数据"
  forceDeleteByIds<#=Table_Up#>(ids: [String!]!): Int!<#
  }
  #>
}<#
}
#>

`);
