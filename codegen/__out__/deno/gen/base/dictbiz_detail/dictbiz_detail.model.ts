import type {
  SearchExtra,
} from "/lib/util/dao_util.ts";

import type {
  DictbizDetailInput as DictbizDetailInputType,
  DictbizDetailModel as DictbizDetailModelType,
  DictbizDetailSearch as DictbizDetailSearchType,
  DictbizDetailFieldComment as DictbizDetailFieldCommentType,
} from "/gen/types.ts";

export const dictbizDetailId = Symbol.for("DictbizDetailId");
export type DictbizDetailId = typeof dictbizDetailId;

export interface DictbizDetailSearch extends DictbizDetailSearchType {
  tenant_id?: string | null;
  $extra?: SearchExtra[];
}

export interface DictbizDetailModel extends DictbizDetailModelType {
  /** 系统字段 */
  is_sys: number;
  create_usr_id: string;
  create_time?: string | null;
  update_usr_id: string;
  update_time?: string | null;
  tenant_id: string;
}

export interface DictbizDetailInput extends DictbizDetailInputType {
  /** 系统字段 */
  is_sys?: number;
  create_usr_id?: string | null;
  create_time?: string | null;
  update_usr_id?: string | null;
  update_time?: string | null;
  is_deleted?: number | null;
  tenant_id?: string | null;
}

export type { DictbizDetailFieldCommentType as DictbizDetailFieldComment };
