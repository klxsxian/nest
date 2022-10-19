export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Background_TaskInput = {
  /** 状态名称 */
  _state?: InputMaybe<Scalars['String']>;
  /** 类型名称 */
  _type?: InputMaybe<Scalars['String']>;
  /** 开始时间 */
  begin_time?: InputMaybe<Scalars['String']>;
  /** 结束时间 */
  end_time?: InputMaybe<Scalars['String']>;
  /** 错误信息 */
  err_msg?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 执行结果 */
  result?: InputMaybe<Scalars['String']>;
  /** 状态ID */
  state?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
  /** 类型ID */
  type?: InputMaybe<Scalars['String']>;
};

export type Background_TaskModel = {
  __typename?: 'Background_TaskModel';
  /** 状态名称 */
  _state?: Maybe<Scalars['String']>;
  /** 类型名称 */
  _type?: Maybe<Scalars['String']>;
  /** 开始时间 */
  begin_time?: Maybe<Scalars['String']>;
  /** 结束时间 */
  end_time?: Maybe<Scalars['String']>;
  /** 错误信息 */
  err_msg: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 备注 */
  rem: Scalars['String'];
  /** 执行结果 */
  result: Scalars['String'];
  /** 状态ID */
  state: Scalars['String'];
  /** 类型ID */
  type: Scalars['String'];
};

export type Background_TaskSearch = {
  _create_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 开始时间 */
  begin_time?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 创建人 */
  create_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 结束时间 */
  end_time?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 错误信息 */
  err_msg?: InputMaybe<Scalars['String']>;
  err_msgLike?: InputMaybe<Scalars['String']>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
  /** 执行结果 */
  result?: InputMaybe<Scalars['String']>;
  resultLike?: InputMaybe<Scalars['String']>;
  /** 状态 */
  state?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 类型 */
  type?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GetLoginTenants = {
  __typename?: 'GetLoginTenants';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 名称 */
  lbl?: Maybe<Scalars['String']>;
};

export type GetMenus = {
  __typename?: 'GetMenus';
  children?: Maybe<Scalars['JSON']>;
  id: Scalars['String'];
  lbl: Scalars['String'];
  route_path?: Maybe<Scalars['String']>;
  route_query?: Maybe<Scalars['String']>;
};

export type MenuInput = {
  /** 启用名称 */
  _is_enabled?: InputMaybe<Scalars['String']>;
  /** 父菜单名称 */
  _menu_id?: InputMaybe<Scalars['String']>;
  /** 类型名称 */
  _type?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 启用ID */
  is_enabled?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 父菜单ID */
  menu_id?: InputMaybe<Scalars['ID']>;
  /** 排序 */
  order_by?: InputMaybe<Scalars['Int']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 路由 */
  route_path?: InputMaybe<Scalars['String']>;
  /** 参数 */
  route_query?: InputMaybe<Scalars['JSON']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
  /** 类型ID */
  type?: InputMaybe<Scalars['String']>;
};

export type MenuModel = {
  __typename?: 'MenuModel';
  /** 启用名称 */
  _is_enabled?: Maybe<Scalars['String']>;
  /** 父菜单名称 */
  _menu_id?: Maybe<Scalars['String']>;
  /** 类型名称 */
  _type?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 启用ID */
  is_enabled: Scalars['Int'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 父菜单ID */
  menu_id: Scalars['ID'];
  /** 排序 */
  order_by: Scalars['Int'];
  /** 备注 */
  rem: Scalars['String'];
  /** 路由 */
  route_path: Scalars['String'];
  /** 参数 */
  route_query?: Maybe<Scalars['JSON']>;
  /** 类型ID */
  type: Scalars['String'];
};

export type MenuSearch = {
  _menu_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 启用 */
  is_enabled?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 父菜单 */
  menu_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 排序 */
  order_by?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
  /** 路由 */
  route_path?: InputMaybe<Scalars['String']>;
  route_pathLike?: InputMaybe<Scalars['String']>;
  /** 参数 */
  route_query?: InputMaybe<Scalars['String']>;
  route_queryLike?: InputMaybe<Scalars['String']>;
  /** 类型 */
  type?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 创建一条数据 */
  createMenu: Scalars['ID'];
  /** 创建一条数据 */
  createOption: Scalars['ID'];
  /** 创建一条数据 */
  createPermit: Scalars['ID'];
  /** 创建一条数据 */
  createRole: Scalars['ID'];
  /** 创建一条数据 */
  createTenant: Scalars['ID'];
  /** 创建一条数据 */
  createUsr: Scalars['ID'];
  /** 根据 ids 删除数据 */
  deleteByIdsBackground_task: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsMenu: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsOperation_record: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsOption: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsPermit: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsRole: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsTenant: Scalars['Int'];
  /** 根据 ids 删除数据 */
  deleteByIdsUsr: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsBackground_task: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsMenu: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsOperation_record: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsOption: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsPermit: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsRole: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsTenant: Scalars['Int'];
  /** 根据 ids 彻底删除数据 */
  forceDeleteByIdsUsr: Scalars['Int'];
  /** 导入文件 */
  importFileMenu?: Maybe<Scalars['String']>;
  /** 导入文件 */
  importFileOption?: Maybe<Scalars['String']>;
  /** 导入文件 */
  importFilePermit?: Maybe<Scalars['String']>;
  /** 导入文件 */
  importFileRole?: Maybe<Scalars['String']>;
  /** 导入文件 */
  importFileTenant?: Maybe<Scalars['String']>;
  /** 导入文件 */
  importFileUsr?: Maybe<Scalars['String']>;
  /** 根据 ids 锁定或者解锁数据 */
  lockByIdsUsr: Scalars['Int'];
  /** 登录 */
  login: Scalars['String'];
  /** 根据 ids 还原数据 */
  revertByIdsBackground_task: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsMenu: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsOperation_record: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsOption: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsPermit: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsRole: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsTenant: Scalars['Int'];
  /** 根据 ids 还原数据 */
  revertByIdsUsr: Scalars['Int'];
  /** 根据id修改一条数据 */
  updateByIdMenu: Scalars['ID'];
  /** 根据id修改一条数据 */
  updateByIdOption: Scalars['ID'];
  /** 根据id修改一条数据 */
  updateByIdPermit: Scalars['ID'];
  /** 根据id修改一条数据 */
  updateByIdRole: Scalars['ID'];
  /** 根据id修改一条数据 */
  updateByIdTenant: Scalars['ID'];
  /** 根据id修改一条数据 */
  updateByIdUsr: Scalars['ID'];
};


export type MutationCreateMenuArgs = {
  model: MenuInput;
};


export type MutationCreateOptionArgs = {
  model: OptionInput;
};


export type MutationCreatePermitArgs = {
  model: PermitInput;
};


export type MutationCreateRoleArgs = {
  model: RoleInput;
};


export type MutationCreateTenantArgs = {
  model: TenantInput;
};


export type MutationCreateUsrArgs = {
  model: UsrInput;
};


export type MutationDeleteByIdsBackground_TaskArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsMenuArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsOperation_RecordArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsOptionArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsPermitArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsRoleArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsTenantArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteByIdsUsrArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsBackground_TaskArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsMenuArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsOperation_RecordArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsOptionArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsPermitArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsRoleArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsTenantArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationForceDeleteByIdsUsrArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationImportFileMenuArgs = {
  id: Scalars['ID'];
};


export type MutationImportFileOptionArgs = {
  id: Scalars['ID'];
};


export type MutationImportFilePermitArgs = {
  id: Scalars['ID'];
};


export type MutationImportFileRoleArgs = {
  id: Scalars['ID'];
};


export type MutationImportFileTenantArgs = {
  id: Scalars['ID'];
};


export type MutationImportFileUsrArgs = {
  id: Scalars['ID'];
};


export type MutationLockByIdsUsrArgs = {
  ids: Array<Scalars['ID']>;
  is_locked: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  tenant_id: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRevertByIdsBackground_TaskArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsMenuArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsOperation_RecordArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsOptionArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsPermitArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsRoleArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsTenantArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationRevertByIdsUsrArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationUpdateByIdMenuArgs = {
  id: Scalars['ID'];
  model: MenuInput;
};


export type MutationUpdateByIdOptionArgs = {
  id: Scalars['ID'];
  model: OptionInput;
};


export type MutationUpdateByIdPermitArgs = {
  id: Scalars['ID'];
  model: PermitInput;
};


export type MutationUpdateByIdRoleArgs = {
  id: Scalars['ID'];
  model: RoleInput;
};


export type MutationUpdateByIdTenantArgs = {
  id: Scalars['ID'];
  model: TenantInput;
};


export type MutationUpdateByIdUsrArgs = {
  id: Scalars['ID'];
  model: UsrInput;
};

export type Operation_RecordInput = {
  /** 创建人名称 */
  _create_usr_id?: InputMaybe<Scalars['String']>;
  /** 更新人名称 */
  _update_usr_id?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  create_time?: InputMaybe<Scalars['String']>;
  /** 创建人ID */
  create_usr_id?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 操作 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 方法 */
  method?: InputMaybe<Scalars['String']>;
  /** 方法名称 */
  method_lbl?: InputMaybe<Scalars['String']>;
  /** 模块 */
  mod?: InputMaybe<Scalars['String']>;
  /** 模块名称 */
  mod_lbl?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  update_time?: InputMaybe<Scalars['String']>;
  /** 更新人ID */
  update_usr_id?: InputMaybe<Scalars['ID']>;
};

export type Operation_RecordModel = {
  __typename?: 'Operation_RecordModel';
  /** 创建人名称 */
  _create_usr_id?: Maybe<Scalars['String']>;
  /** 更新人名称 */
  _update_usr_id?: Maybe<Scalars['String']>;
  /** 创建时间 */
  create_time?: Maybe<Scalars['String']>;
  /** 创建人ID */
  create_usr_id: Scalars['ID'];
  /** ID */
  id: Scalars['ID'];
  /** 操作 */
  lbl: Scalars['String'];
  /** 方法 */
  method: Scalars['String'];
  /** 方法名称 */
  method_lbl: Scalars['String'];
  /** 模块 */
  mod: Scalars['String'];
  /** 模块名称 */
  mod_lbl: Scalars['String'];
  /** 备注 */
  rem: Scalars['String'];
  /** 更新时间 */
  update_time?: Maybe<Scalars['String']>;
  /** 更新人ID */
  update_usr_id: Scalars['ID'];
};

export type Operation_RecordSearch = {
  _create_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _update_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 创建时间 */
  create_time?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 创建人 */
  create_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 操作 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 方法 */
  method?: InputMaybe<Scalars['String']>;
  methodLike?: InputMaybe<Scalars['String']>;
  /** 方法名称 */
  method_lbl?: InputMaybe<Scalars['String']>;
  method_lblLike?: InputMaybe<Scalars['String']>;
  /** 模块 */
  mod?: InputMaybe<Scalars['String']>;
  modLike?: InputMaybe<Scalars['String']>;
  /** 模块名称 */
  mod_lbl?: InputMaybe<Scalars['String']>;
  mod_lblLike?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  update_time?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 更新人 */
  update_usr_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OptionInput = {
  /** 启用名称 */
  _is_enabled?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 启用ID */
  is_enabled?: InputMaybe<Scalars['Int']>;
  /** 键 */
  ky?: InputMaybe<Scalars['String']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
  /** 值 */
  val?: InputMaybe<Scalars['String']>;
};

export type OptionModel = {
  __typename?: 'OptionModel';
  /** 启用名称 */
  _is_enabled?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 启用ID */
  is_enabled: Scalars['Int'];
  /** 键 */
  ky: Scalars['String'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 备注 */
  rem: Scalars['String'];
  /** 值 */
  val: Scalars['String'];
};

export type OptionSearch = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 启用 */
  is_enabled?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 键 */
  ky?: InputMaybe<Scalars['String']>;
  kyLike?: InputMaybe<Scalars['String']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
  /** 值 */
  val?: InputMaybe<Scalars['String']>;
  valLike?: InputMaybe<Scalars['String']>;
};

/** 分页输入 */
export type PageInput = {
  orderBy?: InputMaybe<Scalars['String']>;
  orderDec?: InputMaybe<Scalars['Boolean']>;
  pgOffset?: InputMaybe<Scalars['Int']>;
  pgSize?: InputMaybe<Scalars['Int']>;
};

export type PermitInput = {
  /** 菜单名称 */
  _menu_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 菜单ID */
  menu_id?: InputMaybe<Scalars['ID']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
};

export type PermitModel = {
  __typename?: 'PermitModel';
  /** 菜单名称 */
  _menu_id?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 菜单ID */
  menu_id: Scalars['ID'];
  /** 备注 */
  rem: Scalars['String'];
};

export type PermitSearch = {
  _menu_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 菜单 */
  menu_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _version?: Maybe<Scalars['String']>;
  /** 根据搜索条件导出 */
  exportExcelBackground_task: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelMenu: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelOperation_record: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelOption: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelPermit: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelRole: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelTenant: Scalars['String'];
  /** 根据搜索条件导出 */
  exportExcelUsr: Scalars['String'];
  /** 根据搜索条件和分页查找数据 */
  findAllBackground_task: Array<Background_TaskModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllMenu: Array<MenuModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllOperation_record: Array<Operation_RecordModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllOption: Array<OptionModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllPermit: Array<PermitModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllRole: Array<RoleModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllTenant: Array<TenantModel>;
  /** 根据搜索条件和分页查找数据 */
  findAllUsr: Array<UsrModel>;
  /** 根据id查找一条数据 */
  findByIdBackground_task?: Maybe<Background_TaskModel>;
  /** 根据id查找一条数据 */
  findByIdMenu?: Maybe<MenuModel>;
  /** 根据id查找一条数据 */
  findByIdOperation_record?: Maybe<Operation_RecordModel>;
  /** 根据id查找一条数据 */
  findByIdOption?: Maybe<OptionModel>;
  /** 根据id查找一条数据 */
  findByIdPermit?: Maybe<PermitModel>;
  /** 根据id查找一条数据 */
  findByIdRole?: Maybe<RoleModel>;
  /** 根据id查找一条数据 */
  findByIdTenant?: Maybe<TenantModel>;
  /** 根据id查找一条数据 */
  findByIdUsr?: Maybe<UsrModel>;
  /** 根据条件查找据数总数 */
  findCountBackground_task: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountMenu: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountOperation_record: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountOption: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountPermit: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountRole: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountTenant: Scalars['Int'];
  /** 根据条件查找据数总数 */
  findCountUsr: Scalars['Int'];
  /** 查找order_by字段的最大值 */
  findLastOrderByMenu: Scalars['Int'];
  /** 查找order_by字段的最大值 */
  findLastOrderByTenant: Scalars['Int'];
  /** 根据条件查找第一条数据 */
  findOneBackground_task?: Maybe<Background_TaskModel>;
  /** 根据条件查找第一条数据 */
  findOneMenu?: Maybe<MenuModel>;
  /** 根据条件查找第一条数据 */
  findOneOperation_record?: Maybe<Operation_RecordModel>;
  /** 根据条件查找第一条数据 */
  findOneOption?: Maybe<OptionModel>;
  /** 根据条件查找第一条数据 */
  findOnePermit?: Maybe<PermitModel>;
  /** 根据条件查找第一条数据 */
  findOneRole?: Maybe<RoleModel>;
  /** 根据条件查找第一条数据 */
  findOneTenant?: Maybe<TenantModel>;
  /** 根据条件查找第一条数据 */
  findOneUsr?: Maybe<UsrModel>;
  /** 根据 当前网址的域名+端口 获取 租户列表 */
  getLoginTenants: Array<Maybe<GetLoginTenants>>;
  /** 获取主页菜单 */
  getMenus: Array<Maybe<GetMenus>>;
};


export type QueryExportExcelBackground_TaskArgs = {
  search?: InputMaybe<Background_TaskSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelMenuArgs = {
  search?: InputMaybe<MenuSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelOperation_RecordArgs = {
  search?: InputMaybe<Operation_RecordSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelOptionArgs = {
  search?: InputMaybe<OptionSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelPermitArgs = {
  search?: InputMaybe<PermitSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelRoleArgs = {
  search?: InputMaybe<RoleSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelTenantArgs = {
  search?: InputMaybe<TenantSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryExportExcelUsrArgs = {
  search?: InputMaybe<UsrSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllBackground_TaskArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<Background_TaskSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllMenuArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<MenuSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllOperation_RecordArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<Operation_RecordSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllOptionArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<OptionSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllPermitArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<PermitSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllRoleArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<RoleSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllTenantArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<TenantSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindAllUsrArgs = {
  page?: InputMaybe<PageInput>;
  search?: InputMaybe<UsrSearch>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};


export type QueryFindByIdBackground_TaskArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdMenuArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdOperation_RecordArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdOptionArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdPermitArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdRoleArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdTenantArgs = {
  id: Scalars['ID'];
};


export type QueryFindByIdUsrArgs = {
  id: Scalars['ID'];
};


export type QueryFindCountBackground_TaskArgs = {
  search?: InputMaybe<Background_TaskSearch>;
};


export type QueryFindCountMenuArgs = {
  search?: InputMaybe<MenuSearch>;
};


export type QueryFindCountOperation_RecordArgs = {
  search?: InputMaybe<Operation_RecordSearch>;
};


export type QueryFindCountOptionArgs = {
  search?: InputMaybe<OptionSearch>;
};


export type QueryFindCountPermitArgs = {
  search?: InputMaybe<PermitSearch>;
};


export type QueryFindCountRoleArgs = {
  search?: InputMaybe<RoleSearch>;
};


export type QueryFindCountTenantArgs = {
  search?: InputMaybe<TenantSearch>;
};


export type QueryFindCountUsrArgs = {
  search?: InputMaybe<UsrSearch>;
};


export type QueryFindOneBackground_TaskArgs = {
  search?: InputMaybe<Background_TaskSearch>;
};


export type QueryFindOneMenuArgs = {
  search?: InputMaybe<MenuSearch>;
};


export type QueryFindOneOperation_RecordArgs = {
  search?: InputMaybe<Operation_RecordSearch>;
};


export type QueryFindOneOptionArgs = {
  search?: InputMaybe<OptionSearch>;
};


export type QueryFindOnePermitArgs = {
  search?: InputMaybe<PermitSearch>;
};


export type QueryFindOneRoleArgs = {
  search?: InputMaybe<RoleSearch>;
};


export type QueryFindOneTenantArgs = {
  search?: InputMaybe<TenantSearch>;
};


export type QueryFindOneUsrArgs = {
  search?: InputMaybe<UsrSearch>;
};


export type QueryGetLoginTenantsArgs = {
  host: Scalars['String'];
};


export type QueryGetMenusArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type RoleInput = {
  /** 启用名称 */
  _is_enabled?: InputMaybe<Scalars['String']>;
  /** 菜单名称 */
  _menu_ids?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  /** 启用ID */
  is_enabled?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 菜单ID */
  menu_ids?: InputMaybe<Array<Scalars['ID']>>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
};

export type RoleModel = {
  __typename?: 'RoleModel';
  /** 启用名称 */
  _is_enabled?: Maybe<Scalars['String']>;
  /** 菜单名称 */
  _menu_ids?: Maybe<Array<Scalars['String']>>;
  /** ID */
  id: Scalars['ID'];
  /** 启用ID */
  is_enabled: Scalars['Int'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 菜单ID */
  menu_ids?: Maybe<Array<Scalars['ID']>>;
  /** 备注 */
  rem: Scalars['String'];
};

export type RoleSearch = {
  _menu_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 启用 */
  is_enabled?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 菜单 */
  menu_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
};

/** 排序输入 */
export type SortInput = {
  order?: InputMaybe<SortOrderEnum>;
  prop?: InputMaybe<Scalars['String']>;
};

export enum SortOrderEnum {
  Asc = 'asc',
  Ascending = 'ascending',
  Desc = 'desc',
  Descending = 'descending'
}

export type TenantInput = {
  /** 启用名称 */
  _is_enabled?: InputMaybe<Scalars['String']>;
  /** 菜单名称 */
  _menu_ids?: InputMaybe<Array<Scalars['String']>>;
  /** 到期日 */
  expiration?: InputMaybe<Scalars['String']>;
  /** 域名绑定 */
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** 启用ID */
  is_enabled?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 最大用户数 */
  max_usr_num?: InputMaybe<Scalars['Int']>;
  /** 菜单ID */
  menu_ids?: InputMaybe<Array<Scalars['ID']>>;
  /** 排序 */
  order_by?: InputMaybe<Scalars['Int']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
};

export type TenantModel = {
  __typename?: 'TenantModel';
  /** 启用名称 */
  _is_enabled?: Maybe<Scalars['String']>;
  /** 菜单名称 */
  _menu_ids?: Maybe<Array<Scalars['String']>>;
  /** 到期日 */
  expiration?: Maybe<Scalars['String']>;
  /** 域名绑定 */
  host: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 启用ID */
  is_enabled: Scalars['Int'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 最大用户数 */
  max_usr_num: Scalars['Int'];
  /** 菜单ID */
  menu_ids?: Maybe<Array<Scalars['ID']>>;
  /** 排序 */
  order_by: Scalars['Int'];
  /** 备注 */
  rem: Scalars['String'];
};

export type TenantSearch = {
  _menu_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 到期日 */
  expiration?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 域名绑定 */
  host?: InputMaybe<Scalars['String']>;
  hostLike?: InputMaybe<Scalars['String']>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 启用 */
  is_enabled?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 最大用户数 */
  max_usr_num?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 菜单 */
  menu_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 排序 */
  order_by?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
};

export type UsrInput = {
  /** 启用名称 */
  _is_enabled?: InputMaybe<Scalars['String']>;
  /** 锁定名称 */
  _is_locked?: InputMaybe<Scalars['String']>;
  /** 角色名称 */
  _role_ids?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  /** 启用ID */
  is_enabled?: InputMaybe<Scalars['Int']>;
  /** 锁定ID */
  is_locked?: InputMaybe<Scalars['Int']>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  /** 密码 */
  password?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  /** 角色ID */
  role_ids?: InputMaybe<Array<Scalars['ID']>>;
  /** 租户ID */
  tenant_id?: InputMaybe<Scalars['String']>;
  /** 用户名 */
  username?: InputMaybe<Scalars['String']>;
};

export type UsrModel = {
  __typename?: 'UsrModel';
  /** 启用名称 */
  _is_enabled?: Maybe<Scalars['String']>;
  /** 锁定名称 */
  _is_locked?: Maybe<Scalars['String']>;
  /** 角色名称 */
  _role_ids?: Maybe<Array<Scalars['String']>>;
  /** ID */
  id: Scalars['ID'];
  /** 启用ID */
  is_enabled: Scalars['Int'];
  /** 锁定ID */
  is_locked: Scalars['Int'];
  /** 名称 */
  lbl: Scalars['String'];
  /** 密码 */
  password: Scalars['String'];
  /** 备注 */
  rem: Scalars['String'];
  /** 角色ID */
  role_ids?: Maybe<Array<Scalars['ID']>>;
  /** 用户名 */
  username: Scalars['String'];
};

export type UsrSearch = {
  _role_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** ID列表 */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** 是否已删除 */
  is_deleted?: InputMaybe<Scalars['Int']>;
  /** 启用 */
  is_enabled?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 锁定 */
  is_locked?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 名称 */
  lbl?: InputMaybe<Scalars['String']>;
  lblLike?: InputMaybe<Scalars['String']>;
  /** 密码 */
  password?: InputMaybe<Scalars['String']>;
  passwordLike?: InputMaybe<Scalars['String']>;
  /** 备注 */
  rem?: InputMaybe<Scalars['String']>;
  remLike?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 用户名 */
  username?: InputMaybe<Scalars['String']>;
  usernameLike?: InputMaybe<Scalars['String']>;
};
