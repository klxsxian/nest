-- Active: 1666076695194@@180.76.246.215@3389
------------------------------------------------------------------------------------------------ 租户
drop table if exists `tenant`;
CREATE TABLE if not exists `tenant` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `host` varchar(255) NOT NULL DEFAULT '' COMMENT '域名绑定',
  `expiration` date DEFAULT NULL COMMENT '到期日',
  `max_usr_num` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '最大用户数',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用,dict:is_enabled',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`order_by`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='租户';

------------------------------------------------------------------------------------------------ 租户菜单
drop table if exists `tenant_menu`;
CREATE TABLE if not exists `tenant_menu` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `tenant_id` varchar(22) NOT NULL COMMENT '租户',
  `menu_id` varchar(22) NOT NULL COMMENT '菜单',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`tenant_id`, `menu_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='租户菜单';

------------------------------------------------------------------------------------------------ 用户
drop table if exists `usr`;
CREATE TABLE if not exists `usr` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `username` varchar(45) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(43) NOT NULL DEFAULT '' COMMENT '密码',
  `default_dept_id` varchar(22) NOT NULL DEFAULT '' COMMENT '默认部门',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`username`, `password`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户';

------------------------------------------------------------------------------------------------ 角色
drop table if exists `role`;
CREATE TABLE if not exists `role` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用,dict:is_enabled',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='角色';

------------------------------------------------------------------------------------------------ 用户角色
drop table if exists `usr_role`;
CREATE TABLE if not exists `usr_role` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '用户',
  `role_id` varchar(22) NOT NULL DEFAULT '' COMMENT '角色',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`usr_id`, `role_id`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户角色';

------------------------------------------------------------------------------------------------ 用户部门
drop table if exists `usr_dept`;
CREATE TABLE if not exists `usr_dept` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '用户',
  `dept_id` varchar(22) NOT NULL DEFAULT '' COMMENT '部门',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`usr_id`, `dept_id`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户部门';

------------------------------------------------------------------------------------------------ 菜单
drop table if exists `menu`;
CREATE TABLE if not exists `menu` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `type` varchar(10) NOT NULL DEFAULT 'pc' COMMENT '类型,dict:menu_type',
  `menu_id` varchar(22) NOT NULL DEFAULT '' COMMENT '父菜单',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `route_path` varchar(255) NOT NULL DEFAULT '' COMMENT '路由',
  `route_query` json COMMENT '参数',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用,dict:is_enabled',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='菜单';

------------------------------------------------------------------------------------------------ 权限
drop table if exists `permit`;
CREATE TABLE if not exists `permit` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `menu_id` varchar(22) NOT NULL DEFAULT '' COMMENT '菜单',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`menu_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='权限';

------------------------------------------------------------------------------------------------ 角色菜单
drop table if exists `role_menu`;
CREATE TABLE if not exists `role_menu` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `role_id` varchar(22) NOT NULL DEFAULT '' COMMENT '角色',
  `menu_id` varchar(22) NOT NULL DEFAULT '' COMMENT '菜单',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`role_id`, `menu_id`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='角色菜单';

------------------------------------------------------------------------------------------------ 后台任务
drop table if exists `background_task`;
CREATE TABLE if not exists `background_task` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl` varchar(45) NOT NULL DEFAULT '' COMMENT '名称',
  `state` varchar(10) NOT NULL DEFAULT '' COMMENT '状态,dict:background_task_state',
  `type` varchar(10) NOT NULL DEFAULT '' COMMENT '类型,dict:background_task_type',
  `result` varchar(500) NOT NULL DEFAULT '' COMMENT '执行结果',
  `err_msg` varchar(255) NOT NULL DEFAULT '' COMMENT '错误信息',
  `begin_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`begin_time`, `tenant_id`),
  INDEX (`end_time`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='后台任务';

------------------------------------------------------------------------------------------------ 选项
drop table if exists `option`;
CREATE TABLE if not exists `option` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `lbl` varchar(50) NOT NULL DEFAULT '' COMMENT '名称',
  `ky` varchar(50) NOT NULL DEFAULT '' COMMENT '键',
  `val` varchar(255) NOT NULL DEFAULT '' COMMENT '值',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`ky`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='选项';

------------------------------------------------------------------------------------------------ 操作记录
drop table if exists `operation_record`;
CREATE TABLE if not exists `operation_record` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `mod` varchar(50) NOT NULL DEFAULT '' COMMENT '模块',
  `mod_lbl` varchar(50) NOT NULL DEFAULT '' COMMENT '模块名称',
  `method` varchar(50) NOT NULL DEFAULT '' COMMENT '方法',
  `method_lbl` varchar(50) NOT NULL DEFAULT '' COMMENT '方法名称',
  `lbl` varchar(100) NOT NULL DEFAULT '' COMMENT '操作',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='操作记录';

------------------------------------------------------------------------------------------------ 部门
drop table if exists `dept`;
CREATE TABLE if not exists `dept` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `parent_id` varchar(22) NOT NULL DEFAULT '' COMMENT '父部门',
  `lbl` varchar(22) NOT NULL DEFAULT '' COMMENT '名称',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`parent_id`, `lbl`, `tenant_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='部门';

------------------------------------------------------------------------------------------------ 系统字典
drop table if exists `dict`;
CREATE TABLE if not exists `dict` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `code` varchar(22) NOT NULL DEFAULT '' COMMENT '编码',
  `lbl` varchar(100) NOT NULL DEFAULT '' COMMENT '名称',
  `type` varchar(22) NOT NULL DEFAULT 'string' COMMENT '数据类型,dict:dict_type',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`code`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='系统字典';

------------------------------------------------------------------------------------------------ 系统字典明细
drop table if exists `dict_detail`;
CREATE TABLE if not exists `dict_detail` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `dict_id` varchar(22) NOT NULL DEFAULT '' COMMENT '系统字典',
  `lbl` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(255) NOT NULL DEFAULT '' COMMENT '值',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`dict_id`, `lbl`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='系统字典明细';

------------------------------------------------------------------------------------------------ 业务字典
drop table if exists `dictbiz`;
CREATE TABLE if not exists `dictbiz` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `code` varchar(22) NOT NULL DEFAULT '' COMMENT '编码',
  `lbl` varchar(100) NOT NULL DEFAULT '' COMMENT '名称',
  `type` varchar(22) NOT NULL DEFAULT 'string' COMMENT '数据类型,dict:dict_type',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`code`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='业务字典';

------------------------------------------------------------------------------------------------ 业务字典明细
drop table if exists `dictbiz_detail`;
CREATE TABLE if not exists `dictbiz_detail` (
  `id` varchar(22) NOT NULL COMMENT 'ID',
  `dictbiz_id` varchar(22) NOT NULL DEFAULT '' COMMENT '业务字典',
  `lbl` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(255) NOT NULL DEFAULT '' COMMENT '值',
  `order_by` int(11) unsigned NOT NULL DEFAULT 1 COMMENT '排序',
  `is_enabled` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '启用,dict:is_enabled',
  `rem` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `is_locked` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '锁定,dict:is_locked',
  `tenant_id` varchar(22) NOT NULL DEFAULT '' COMMENT '租户',
  `create_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_usr_id` varchar(22) NOT NULL DEFAULT '' COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '删除,dict:is_deleted',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  INDEX (`dictbiz_id`, `lbl`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='业务字典明细';
