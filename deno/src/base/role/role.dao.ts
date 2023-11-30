import {
  getAuthModel,
} from "/lib/auth/auth.dao.ts";

import {
  findById as findByIdUsr,
} from "/gen/base/usr/usr.dao.ts";

/**
 * 获取当前用户拥有的角色id列表
 */
export async function getAuthRoleIds() {
  const authModel = await getAuthModel(false);
  if (!authModel) {
    return [ ];
  }
  const usrModel = await findByIdUsr(authModel.id);
  if (!usrModel || !usrModel.is_enabled) {
    return [ ];
  }
  const role_ids = usrModel.role_ids || [ ];
  return role_ids;
}
