import { defineConfig } from "../config";

export default defineConfig({
  role: {
    opts: {
      cache: true,
      unique: [ "lbl" ],
    },
    columns: [
      {
        COLUMN_NAME: "menu_ids",
        COLUMN_COMMENT: "菜单",
        ORDINAL_POSITION: 5,
        require: false,
        search: true,
        minWidth: 50,
        foreignKey: {
          showType: "dialog",
        },
      },
    ],
  },
  tenant: {
    opts: {
      cache: true,
      unique: [ "lbl" ],
    },
    columns: [
      {
        COLUMN_NAME: "menu_ids",
        COLUMN_COMMENT: "菜单",
        ORDINAL_POSITION: 6,
        require: false,
        search: true,
        minWidth: 50,
        foreignKey: {
          showType: "dialog",
        },
      },
    ],
  },
  // 用户
  usr: {
    opts: {
      cache: true,
      ignoreCodegen: false,
      unique: [ "lbl" ],
    },
    columns: [
      {
        COLUMN_NAME: "username",
        require: true,
        search: true,
        sortable: true,
        minWidth: 140,
      },
      {
        COLUMN_NAME: "lbl",
        require: true,
        search: true,
        sortable: true,
        minWidth: 140,
      },
      {
        COLUMN_NAME: "password",
        minWidth: 140,
        isPassword: true,
      },
      {
        COLUMN_NAME: "is_locked",
      },
      {
        COLUMN_NAME: "is_enabled",
      },
      {
        COLUMN_NAME: "role_ids",
        COLUMN_COMMENT: "角色",
        ORDINAL_POSITION: 5,
        require: false,
        search: true,
        minWidth: 140,
      },
    ],
  },
  // 菜单
  menu: {
    opts: {
      cache: true,
      unique: [ "menu_id", "lbl" ],
      defaultSort: {
        prop: "order_by",
        order: "ascending",
      },
    },
    columns: [
      {
        COLUMN_NAME: "type",
        search: true,
        width: 100,
      },
      {
        COLUMN_NAME: "menu_id",
        require: false,
        search: true,
        sortable: true,
        width: 140,
        foreignKey: {
          table: "menu",
          column: "id",
          lbl: "lbl",
          multiple: false,
          defaultSort: {
            prop: "order_by",
            order: "ascending",
          },
        },
      },
      {
        COLUMN_NAME: "lbl",
        require: true,
        search: true,
        width: 140,
      },
      {
        COLUMN_NAME: "route_path",
        align: "left",
      },
      {
        COLUMN_NAME: "route_query",
        align: "left",
      },
      {
        COLUMN_NAME: "is_enabled",
        width: 60,
      },
      {
        COLUMN_NAME: "order_by",
        width: 100,
      },
      {
        COLUMN_NAME: "rem",
      },
    ]
  },
  permit: {
    opts: {
      cache: true,
      unique: [ "menu_id", "lbl" ],
    },
  },
  background_task: {
    opts: {
      noAdd: true,
      noEdit: true,
      noImport: true,
      noExport: true,
      filterDataByCreateUsr: true,
      defaultSort: {
        prop: "begin_time",
        order: "descending",
      },
    },
    columns: [
      {
        COLUMN_NAME: "lbl",
        require: true,
        search: true,
        minWidth: 120,
      },
      {
        COLUMN_NAME: "state",
        require: true,
        search: true,
        minWidth: 55,
      },
      {
        COLUMN_NAME: "type",
        require: true,
        search: true,
        minWidth: 55,
      },
      {
        COLUMN_NAME: "result",
        minWidth: 140,
      },
      {
        COLUMN_NAME: "begin_time",
        search: true,
        sortable: true,
        minWidth: 110,
      },
      {
        COLUMN_NAME: "end_time",
        sortable: true,
        minWidth: 110,
      },
      {
        COLUMN_NAME: "create_usr_id",
        ignoreCodegen: false,
        onlyCodegenDeno: true,
        foreignKey: {
          table: "usr",
        },
      },
    ]
  },
  // 选项
  option: {
    opts: {
      cache: true,
      unique: [ "ky" ],
    },
    columns: [
      {
        COLUMN_NAME: "lbl",
        search: true,
      },
      {
        COLUMN_NAME: "ky",
        require: true,
        search: true,
      },
      {
        COLUMN_NAME: "val",
        search: true,
      },
      {
        COLUMN_NAME: "is_enabled",
        require: true,
        width: 60,
      },
      {
        COLUMN_NAME: "rem",
      },
    ],
  },
  // 操作记录
  operation_record: {
    opts: {
      noAdd: true,
      noEdit: true,
      noImport: true,
    },
    columns: [
      {
        COLUMN_NAME: "mod",
        noList: true,
      },
      {
        COLUMN_NAME: "mod_lbl",
        search: true,
        width: 140,
      },
      {
        COLUMN_NAME: "method",
        noList: true,
      },
      {
        COLUMN_NAME: "method_lbl",
        search: true,
        width: 140,
      },
      {
        COLUMN_NAME: "lbl",
        search: true,
      },
      {
        COLUMN_NAME: "rem",
      },
      {
        COLUMN_NAME: "create_usr_id",
        ignoreCodegen: false,
        noAdd: true,
        noEdit: true,
        foreignKey: {
          table: "usr",
          column: "id",
          lbl: "lbl",
        },
        width: 100,
      },
      {
        COLUMN_NAME: "create_time",
        ignoreCodegen: false,
        noAdd: true,
        noEdit: true,
        width: 140,
      },
      {
        COLUMN_NAME: "update_usr_id",
        ignoreCodegen: false,
        noAdd: true,
        noEdit: true,
        foreignKey: {
          table: "usr",
          column: "id",
          lbl: "lbl",
        },
        width: 100,
      },
      {
        COLUMN_NAME: "update_time",
        ignoreCodegen: false,
        noAdd: true,
        noEdit: true,
        width: 140,
      },
    ],
  },
});
