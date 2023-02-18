import {
  type SearchExtra,
} from "/lib/util/dao_util.ts";

import {
  type RoleModel as RoleModelType,
  type RoleSearch as RoleSearchType,
} from "/gen/types.ts";

export interface RoleSearch extends RoleSearchType {
  tenant_id?: string | null;
  $extra?: SearchExtra[];
}

export interface RoleModel extends RoleModelType {
  create_usr_id?: string | null;
  create_time?: string | null;
  update_usr_id?: string | null;
  update_time?: string | null;
  tenant_id?: string | null;
}
