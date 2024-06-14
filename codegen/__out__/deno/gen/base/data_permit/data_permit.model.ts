import type {
  DataPermitInput as DataPermitInputType,
  DataPermitModel as DataPermitModelType,
  DataPermitSearch as DataPermitSearchType,
  DataPermitFieldComment as DataPermitFieldCommentType,
  // 类型
  DataPermitType,
  SortInput,
} from "/gen/types.ts";

declare const dataPermitId: unique symbol;

declare global {
  
  type DataPermitId = Distinct<string, typeof dataPermitId>;

  interface DataPermitSearch extends DataPermitSearchType {
    /** 类型 */
    type?: DataPermitType[];
    /** 备注 */
    rem?: string;
    rem_like?: string;
    /** 创建时间 */
    create_time?: string[];
    /** 更新时间 */
    update_time?: string[];
  }

  interface DataPermitModel extends DataPermitModelType {
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

  interface DataPermitInput extends DataPermitInputType {
    /** 系统字段 */
    is_sys?: number | null;
    create_usr_id?: UsrId | null;
    create_usr_id_lbl?: string | null;
    create_time?: string | null;
    create_time_lbl?: string | null;
    create_time_save_null?: boolean | null;
    update_usr_id?: UsrId | null;
    update_usr_id_lbl?: string | null;
    update_time?: string | null;
    update_time_lbl?: string | null;
    update_time_save_null?: boolean | null;
    is_deleted?: number | null;
  }

  interface DataPermitFieldComment extends DataPermitFieldCommentType {
  }
  
}

/** 数据权限 前端允许排序的字段 */
export const canSortInApiDataPermit = {
  // 创建时间
  "create_time": true,
  // 更新时间
  "update_time": true,
};

/** 数据权限 检测字段是否允许前端排序 */
export function checkSortDataPermit(sort?: SortInput[]) {
  if (!sort) return;
  for (const item of sort) {
    const order = item.order;
    if (
      order !== "asc" && order !== "desc" &&
      order !== "ascending" && order !== "descending"
    ) {
      throw new Error(`checkSortDataPermit: ${ JSON.stringify(item) }`);
    }
    const prop = item.prop as keyof typeof canSortInApiDataPermit;
    if (!canSortInApiDataPermit[prop]) {
      throw new Error(`checkSortDataPermit: ${ JSON.stringify(item) }`);
    }
  }
}
