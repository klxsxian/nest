import { defineGraphql } from "/lib/context.ts";
import * as resolvers from "./<#=table#>.resolver.ts";

defineGraphql(resolvers, /* GraphQL */ `<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by' && !column.onlyCodegenNest);
#><#
const hasSummary = columns.some((column) => column.showSummary);
#>type FindAll<#=tableUp#> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenNest) continue;
    const column_name = column.COLUMN_NAME;
    const foreignKey = column.foreignKey;
    let data_type = column.DATA_TYPE;
    let _data_type = "String";
    if (column_name === 'id') {
      data_type = 'ID';
    }
    else if (foreignKey && foreignKey.multiple) {
      data_type = '[ID]';
      _data_type = "[String]";
    }
    else if (foreignKey && !foreignKey.multiple) {
      data_type = 'ID';
      _data_type = "String";
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'json') {
      data_type = 'JSON';
    }
    else if (column.DATA_TYPE === 'text') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'tinyint') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'decimal') {
      data_type = 'Float';
    }
    let column_comment = column.COLUMN_COMMENT;
    if (!column_comment && column_name !== "id") {
      throw `错误: 表: ${ table } 字段: ${ column_name } 无 comment`;
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
    if (column_name === 'id') column_comment = '';
  #><#
    if (!foreignKey && selectList.length === 0) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else {
  #>
  "<#=column_comment#>ID"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>名称"
  _<#=column_name#>: <#=_data_type#><#
    }
  }
  #>
}
input <#=tableUp#>Input {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenNest) continue;
    const column_name = column.COLUMN_NAME;
    const foreignKey = column.foreignKey;
    let data_type = column.DATA_TYPE;
    let _data_type = "String";
    if (column_name === 'id') {
      data_type = 'ID';
    }
    else if (foreignKey && foreignKey.multiple) {
      data_type = '[ID]';
      _data_type = "[String]";
    }
    else if (foreignKey && !foreignKey.multiple) {
      data_type = 'ID';
      _data_type = "String";
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'json') {
      data_type = 'JSON';
    }
    else if (column.DATA_TYPE === 'text') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'tinyint') {
      data_type = 'Int';
    }
    else if (column.DATA_TYPE === 'decimal') {
      data_type = 'Float';
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
    if (!foreignKey && selectList.length === 0) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else {
  #>
  "<#=column_comment#>ID"
  <#=column_name#>: <#=data_type#>
  "<#=column_comment#>名称"
  _<#=column_name#>: <#=_data_type#><#
    }
  }
  #>
}
input <#=tableUp#>Search {
  "是否已删除"
  is_deleted: Int
  "ID列表"
  ids: [ID]<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenNest) continue;
    const column_name = column.COLUMN_NAME;
    let data_type = column.DATA_TYPE;
    let column_type = column.DATA_TYPE;
    let column_comment = column.COLUMN_COMMENT || "";
    const foreignKey = column.foreignKey;
    const foreignTable = foreignKey && foreignKey.table;
    const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    const search = column.search;
    if (column_name === 'id') {
      data_type = 'ID';
    }
    else if (foreignKey) {
      data_type = '[String]';
    }
    else if (column.DATA_TYPE === 'varchar') {
      data_type = 'String';
    }
    else if (column.DATA_TYPE === 'date') {
      data_type = '[String]';
    }
    else if (column.DATA_TYPE === 'datetime') {
      data_type = '[String]';
    }
    else if (column.DATA_TYPE === 'int') {
      data_type = '[Int]';
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
      data_type = 'Float';
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
      data_type = '['+data_type+']';
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_comment.includes("[")) {
      column_comment = column_comment.substring(0, column_comment.indexOf("["));
    }
    if (column_name === 'id') {
      column_comment = 'ID';
    }
    if (selectList.length > 0) {
      if (column.DATA_TYPE === 'tinyint' || column.DATA_TYPE === 'int') {
        data_type = "[Int]";
      } else {
        data_type = "[String]";
      }
    }
  #><#
    if (foreignKey) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  _<#=column_name#>: <#=data_type#><#
    } else if (selectList && selectList.length > 0) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (column_name === "id") {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else if (
      column.DATA_TYPE === "int"
      || column.DATA_TYPE === "decimal"
      || column.DATA_TYPE === "date"
      || column.DATA_TYPE === "datetime"
    ) {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#><#
    } else {
  #>
  "<#=column_comment#>"
  <#=column_name#>: <#=data_type#>
  <#=column_name#>Like: <#=data_type#><#
    }
  #><#
  }
  #>
}<#
if (hasSummary) {
#>
type FindSummary<#=tableUp#> {<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (column.onlyCodegenNest) continue;
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
  findCount<#=tableUp#>(search: <#=tableUp#>Search): Int!
  "根据搜索条件和分页查找数据"
  findAll<#=tableUp#>(search: <#=tableUp#>Search, page: PageInput, sort: [SortInput]): [FindAll<#=tableUp#>]!
  "根据搜索条件导出"
  exportExcel<#=tableUp#>(search: <#=tableUp#>Search, sort: [SortInput]): String!<#
  if (hasSummary) {
  #>
  "根据搜索条件查找合计"
  findSummary<#=tableUp#>(search: <#=tableUp#>Search): FindSummary<#=tableUp#>!<#
  }
  #>
  "根据条件查找第一条数据"
  findOne<#=tableUp#>(search: <#=tableUp#>Search): FindAll<#=tableUp#>
  "根据id查找一条数据"
  findById<#=tableUp#>(id: ID!): FindAll<#=tableUp#><#
  if (hasOrderBy) {
  #>
  "查找order_by字段的最大值"
  findLastOrderBy<#=tableUp#>: Int!<#
  }
  #>
}
type Mutation {
  "创建一条数据"
  create<#=tableUp#>(model: <#=tableUp#>Input!): ID!
  "根据id修改一条数据"
  updateById<#=tableUp#>(id: ID!, model: <#=tableUp#>Input!): ID!
  "导入文件"
  importFile<#=tableUp#>(id: ID!): String
  "根据ids删除数据"
  deleteByIds<#=tableUp#>(ids: [ID]!): Int!
  "根据ids还原数据"
  revertByIds<#=tableUp#>(ids: [ID]!): Int!
}
`);
