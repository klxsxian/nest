<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by');
const hasPassword = columns.some((column) => column.isPassword);
const hasLocked = columns.some((column) => column.COLUMN_NAME === "is_locked");
const hasIsDeleted = columns.some((column) => column.COLUMN_NAME === "is_deleted");
const hasIsSys = columns.some((column) => column.COLUMN_NAME === "is_sys");
const hasIsHidden = columns.some((column) => column.COLUMN_NAME === "is_hidden");
let Table_Up = tableUp.split("_").map(function(item) {
  return item.substring(0, 1).toUpperCase() + item.substring(1);
}).join("");
let table_Up = Table_Up.substring(0, 1).toLowerCase() + Table_Up.substring(1);
let modelName = "";
let fieldCommentName = "";
let inputName = "";
let searchName = "";
let commentName = "";
if (/^[A-Za-z]+$/.test(Table_Up.charAt(Table_Up.length - 1))
  && !/^[A-Za-z]+$/.test(Table_Up.charAt(Table_Up.length - 2))
) {
  modelName = Table_Up + "Model";
  fieldCommentName = Table_Up + "FieldComment";
  inputName = Table_Up + "Input";
  searchName = Table_Up + "Search";
  commentName = Table_Up + "Comment";
} else {
  modelName = Table_Up + "Model";
  fieldCommentName = Table_Up + "FieldComment";
  inputName = Table_Up + "Input";
  searchName = Table_Up + "Search";
  commentName = Table_Up + "Comment";
}
#>import type {
  <#=inputName#> as <#=inputName#>Type,
  <#=modelName#> as <#=modelName#>Type,
  <#=searchName#> as <#=searchName#>Type,
  <#=fieldCommentName#> as <#=fieldCommentName#>Type,<#
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.ignoreCodegen) continue;
    if (
      !column.onlyCodegenDeno
      && column.canSearch === true
    ) continue;
    const column_name = column.COLUMN_NAME;
    const column_comment = column.COLUMN_COMMENT || "";
  #><#
    if (column.dict || column.dictbiz) {
      let enumColumnName = "";
      const columnDictModels = [
        ...dictModels.filter(function(item) {
          return item.code === column.dict || item.code === column.dict;
        }),
        ...dictbizModels.filter(function(item) {
          return item.code === column.dict || item.code === column.dictbiz;
        }),
      ];
      if (![ "int", "decimal", "tinyint" ].includes(column.DATA_TYPE) && columnDictModels.length > 0) {
        let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
        Column_Up = Column_Up.split("_").map(function(item) {
          return item.substring(0, 1).toUpperCase() + item.substring(1);
        }).join("");
        enumColumnName = Table_Up + Column_Up;
      } else {
        continue;
      }
  #>
  // <#=column_comment#>
  <#=enumColumnName#>,<#
    }
  #><#
  }
  #>
} from "/gen/types.ts";

declare const <#=table_Up#>Id: unique symbol;

declare global {
  
  type <#=Table_Up#>Id = Distinct<string, typeof <#=table_Up#>Id>;

  interface <#=searchName#> extends <#=searchName#>Type {<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.ignoreCodegen) continue;
      if (
        !column.onlyCodegenDeno
        && column.canSearch === true
      ) continue;
      // if (column.isVirtual) continue;
      const column_name = column.COLUMN_NAME;
      let data_type = column.DATA_TYPE;
      const column_type = column.COLUMN_TYPE;
      const column_comment = column.COLUMN_COMMENT || "";
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
        return item.substring(0, 1).toUpperCase() + item.substring(1);
      }).join("");
      const modelLabel = column.modelLabel;
      const isPassword = column.isPassword;
      if (isPassword) continue;
      const search = column.search;
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
        data_type = `${ foreignTable_Up }Id[]`;
      }
      else if (column.DATA_TYPE === 'varchar') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'date') {
        data_type = 'string[]';
      }
      else if (column.DATA_TYPE === 'datetime') {
        data_type = 'string[]';
      }
      else if (column.DATA_TYPE === 'int') {
        data_type = 'number[]';
      }
      else if (column.DATA_TYPE === 'json') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'text') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'tinyint') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'decimal') {
        data_type = 'string[]';
      }
      if (column_name.startsWith("is_")) {
        data_type = 'number';
      }
    #><#
      if (hasCreateUsrId && column_name === "create_usr_id") {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;
    <#=column_name#>_is_null?: boolean;
    <#=column_name#>_lbl?: string[];<#
      } else if (hasCreateUsrId && column_name === "update_usr_id") {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;
    <#=column_name#>_is_null?: boolean;
    <#=column_name#>_lbl?: string[];<#
      } else if (foreignKey) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;
    <#=column_name#>_is_null?: boolean;<#
      if (modelLabel) {
    #>
    /** <#=column_comment#> */
    <#=modelLabel#>?: string[];<#
      }
    #><#
      } else if (column.dict || column.dictbiz) {
        let enumColumnName = data_type;
        const columnDictModels = [
          ...dictModels.filter(function(item) {
            return item.code === column.dict || item.code === column.dict;
          }),
          ...dictbizModels.filter(function(item) {
            return item.code === column.dict || item.code === column.dictbiz;
          }),
        ];
        if (![ "int", "decimal", "tinyint" ].includes(column.DATA_TYPE) && columnDictModels.length > 0) {
          let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
          Column_Up = Column_Up.split("_").map(function(item) {
            return item.substring(0, 1).toUpperCase() + item.substring(1);
          }).join("");
          enumColumnName = Table_Up + Column_Up;
        } else if (column.DATA_TYPE === 'int') {
          enumColumnName = 'number';
        }
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=enumColumnName#>[];<#
      } else if (column_name === "id") {
    #>
    /** ID */
    <#=column_name#>?: <#=data_type#>;<#
      } else if (
        column.DATA_TYPE === "int"
        || column.DATA_TYPE === "decimal"
      ) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;<#
      } else if (
        column.DATA_TYPE === "date"
        || column.DATA_TYPE === "datetime"
      ) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;<#
      } else if (!column.isEncrypt) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#>;
    <#=column_name#>_like?: <#=data_type#>;<#
      }
    #><#
    }
    #><#
    if (hasTenant_id) {
    #>
    tenant_id?: TenantId | null;<#
    }
    #><#
    if (hasIsHidden) {
    #>
    is_hidden?: (0|1)[];<#
    }
    #>
  }

  interface <#=modelName#> extends <#=modelName#>Type {<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.ignoreCodegen) continue;
      if (!column.onlyCodegenDeno) continue;
      const column_name = column.COLUMN_NAME;
      if ([
        "create_usr_id",
        "create_time",
        "update_usr_id",
        "update_time",
        "tenant_id",
        "is_hidden",
      ].includes(column_name)) continue;
      let is_nullable = column.IS_NULLABLE === "YES";
      let data_type = column.DATA_TYPE;
      const column_comment = column.COLUMN_COMMENT;
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
        return item.substring(0, 1).toUpperCase() + item.substring(1);
      }).join("");
      const modelLabel = column.modelLabel;
      if (!column_comment && column_name !== "id") {
        throw `错误: 表: ${ table } 字段: ${ column_name } 无 comment`;
      }
      let _data_type = "string";
      if (foreignKey && foreignKey.multiple) {
        data_type = 'string[]';
        _data_type = "string[]";
        is_nullable = true;
      }
      else if (foreignKey && !foreignKey.multiple) {
        data_type = `${ foreignTable_Up }Id`;
        _data_type = "string";
      }
      else if (column.DATA_TYPE === 'varchar') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'date') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'datetime') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'int') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'json') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'text') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'tinyint') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'decimal') {
        data_type = 'number';
      }
    #><#
      if (is_nullable) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#> | null;<#
      } else {
    #>
    /** <#=column_comment#> */
    <#=column_name#>: <#=data_type#>;<#
      }
    #><#
    }
    #><#
    if (hasCreateUsrId) {
    #>
    create_usr_id: UsrId;
    create_usr_id_lbl: string;<#
    }
    #><#
    if (hasCreateTime) {
    #>
    create_time?: string | null;
    create_time_lbl: string;<#
    }
    #><#
    if (hasUpdateUsrId) {
    #>
    update_usr_id: UsrId;
    update_usr_id_lbl: string;<#
    }
    #><#
    if (hasUpdateTime) {
    #>
    update_time?: string | null;
    update_time_lbl: string;<#
    }
    #><#
    if (hasTenant_id) {
    #>
    tenant_id: TenantId;<#
    }
    #><#
    if (hasIsHidden) {
    #>
    is_hidden: 0|1;<#
    }
    #>
  }

  interface <#=inputName#> extends <#=inputName#>Type {<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.ignoreCodegen) continue;
      if (!column.onlyCodegenDeno) continue;
      const column_name = column.COLUMN_NAME;
      if ([
        "create_usr_id",
        "create_time",
        "update_usr_id",
        "update_time",
        "tenant_id",
        "is_hidden",
      ].includes(column_name)) continue;
      let data_type = column.DATA_TYPE;
      const column_comment = column.COLUMN_COMMENT;
      if (!column_comment && column_name !== "id") {
        throw `错误: 表: ${ table } 字段: ${ column_name } 无 comment`;
      }
      let is_nullable = column.IS_NULLABLE === "YES";
      const foreignKey = column.foreignKey;
      const foreignTableUp = foreignKey && foreignKey.table && foreignKey.table.substring(0, 1).toUpperCase()+foreignKey.table.substring(1);
      const foreignTable_Up = foreignTableUp && foreignTableUp.split("_").map(function(item) {
        return item.substring(0, 1).toUpperCase() + item.substring(1);
      }).join("");
      let modelLabel = column.modelLabel;
      let cascade_fields = [ ];
      if (foreignKey) {
        cascade_fields = foreignKey.cascade_fields || [ ];
        if (foreignKey.lbl && cascade_fields.includes(foreignKey.lbl) && !modelLabel) {
          cascade_fields = cascade_fields.filter((item) => item !== column_name + "_" + foreignKey.lbl);
        } else if (modelLabel) {
          cascade_fields = cascade_fields.filter((item) => item !== modelLabel);
        }
      }
      if (foreignKey && foreignKey.lbl && !modelLabel) {
        modelLabel = column_name + "_" + foreignKey.lbl;
      } else if (!foreignKey && !modelLabel) {
        modelLabel = column_name + "_lbl";
      }
      let hasModelLabel = !!column.modelLabel;
      if (column.dict || column.dictbiz || data_type === "date" || data_type === "datetime") {
        hasModelLabel = true;
      } else if (foreignKey && foreignKey.lbl) {
        hasModelLabel = true;
      }
      let _data_type = "string";
      if (column_name === 'id') {
        data_type = `${ Table_Up }Id`;
      }
      else if (foreignKey && foreignKey.multiple) {
        data_type = `${ foreignTable_Up }Id[]`;
        _data_type = "string[]";
        is_nullable = true;
      }
      else if (foreignKey && !foreignKey.multiple) {
        data_type = `${ foreignTable_Up }Id`;
        _data_type = "string";
      }
      else if (column.DATA_TYPE === 'varchar') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'date') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'datetime') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'int') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'json') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'text') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'tinyint') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'decimal') {
        data_type = 'Decimal';
        _data_type = "string";
      }
    #><#
      if (!foreignKey && !column.dict && !column.dictbiz
        && column.DATA_TYPE !== "date" && !column.DATA_TYPE === "datetime"
      ) {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#> | null;<#
      } else if (column.DATA_TYPE === "date" || column.DATA_TYPE === "datetime") {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#> | null;
    <#=column_name#>_lbl?: String | null;<#
      if (is_nullable) {
    #>
    <#=column_name#>_save_null?: number | null;<#
      }
    #><#
      } else if (column.dict || column.dictbiz) {
        let enumColumnName = data_type;
        const columnDictModels = [
          ...dictModels.filter(function(item) {
            return item.code === column.dict || item.code === column.dict;
          }),
          ...dictbizModels.filter(function(item) {
            return item.code === column.dict || item.code === column.dictbiz;
          }),
        ];
        if (![ "int", "decimal", "tinyint" ].includes(column.DATA_TYPE) && columnDictModels.length > 0) {
          let Column_Up = column_name.substring(0, 1).toUpperCase()+column_name.substring(1);
          Column_Up = Column_Up.split("_").map(function(item) {
            return item.substring(0, 1).toUpperCase() + item.substring(1);
          }).join("");
          enumColumnName = Table_Up + Column_Up;
        }
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=enumColumnName#> | null;<#
      if (hasModelLabel) {
    #>
    /** <#=column_comment#> */
    <#=modelLabel#>?: String | null;<#
      }
    #><#
      } else {
    #>
    /** <#=column_comment#> */
    <#=column_name#>?: <#=data_type#> | null;<#
      }
    #><#
    }
    #><#
    if (hasCreateUsrId) {
    #>
    create_usr_id?: UsrId | null;
    create_usr_id_lbl?: string | null;<#
    }
    #><#
    if (hasCreateTime) {
    #>
    create_time?: string | null;
    create_time_lbl?: string | null;
    create_time_save_null?: boolean | null;<#
    }
    #><#
    if (hasUpdateUsrId) {
    #>
    update_usr_id?: UsrId | null;
    update_usr_id_lbl?: string | null;<#
    }
    #><#
    if (hasUpdateTime) {
    #>
    update_time?: string | null;
    update_time_lbl?: string | null;
    update_time_save_null?: boolean | null;<#
    }
    #><#
    if (hasIsDeleted) {
    #>
    is_deleted?: number | null;<#
    }
    #><#
    if (hasTenant_id) {
    #>
    tenant_id?: TenantId | null;<#
    }
    #><#
    if (hasIsHidden) {
    #>
    is_hidden?: 0|1|null;<#
    }
    #>
  }

  interface <#=fieldCommentName#> extends <#=fieldCommentName#>Type {
  }
  
}
