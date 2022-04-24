
export interface PermitModel {
  [key: string]: any,
  is_deleted?: 0|1,
  id?: string, //ID
  menu_id?: string, //菜单ID
  _menu_id?: string, //菜单名称
  lbl?: string, //名称
  rem?: string, //备注
}

export interface PermitSearch {
  is_deleted?: 0|1;
  lbl?: string; //名称
  lblLike?: string; //名称
}
