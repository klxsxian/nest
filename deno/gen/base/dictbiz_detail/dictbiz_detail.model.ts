import type {
  DictbizDetailInput as DictbizDetailInputType,
  DictbizDetailModel as DictbizDetailModelType,
  DictbizDetailSearch as DictbizDetailSearchType,
  DictbizDetailFieldComment as DictbizDetailFieldCommentType,
} from "/gen/types.ts";

import type {
  TenantId,
} from "/gen/base/tenant/tenant.model.ts";

import type {
  UsrId,
} from "/gen/base/usr/usr.model.ts";

declare const dictbizDetailId: unique symbol;
export type DictbizDetailId = Distinct<string, typeof dictbizDetailId>;

export interface DictbizDetailSearch extends DictbizDetailSearchType {
  tenant_id?: string | null;
}

export interface DictbizDetailModel extends DictbizDetailModelType {
  /** 系统字段 */
  is_sys: number;
  create_usr_id: UsrId;
  create_usr_id_lbl: string;
  create_time?: string | null;
  create_time_lbl: string;
  update_usr_id: UsrId;
  update_usr_id_lbl: string;
  update_time?: string | null;
  update_time_lbl: string;
  tenant_id: TenantId;
}

export interface DictbizDetailInput extends DictbizDetailInputType {
  /** 系统字段 */
  is_sys?: number;
  create_usr_id?: UsrId | null;
  create_usr_id_lbl?: string | null;
  create_time?: string | null;
  create_time_lbl?: string | null;
  update_usr_id?: UsrId | null;
  update_usr_id_lbl?: string | null;
  update_time?: string | null;
  update_time_lbl?: string | null;
  is_deleted?: number | null;
  tenant_id?: TenantId | null;
}

export type { DictbizDetailFieldCommentType as DictbizDetailFieldComment };
