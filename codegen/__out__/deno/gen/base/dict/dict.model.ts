import type {
  DictInput as DictInputType,
  DictModel as DictModelType,
  DictSearch as DictSearchType,
  DictFieldComment as DictFieldCommentType,
} from "/gen/types.ts";

import type {
  UsrId,
} from "/gen/base/usr/usr.model.ts";

declare const dictId: unique symbol;
export type DictId = Distinct<string, typeof dictId>;

export interface DictSearch extends DictSearchType {
}

export interface DictModel extends DictModelType {
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
}

export interface DictInput extends DictInputType {
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
}

export type { DictFieldCommentType as DictFieldComment };
