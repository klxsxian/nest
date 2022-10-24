import {
  type Context,
} from "/lib/context.ts";

import {
  isEmpty,
} from "/lib/util/string_util.ts";

import * as authService from "/lib/auth/auth.service.ts";
import * as usrDao from "./usr.dao.ts";
import * as usrDaoGen from "/gen/usr/usr.dao.ts";
import * as deptDaoGen from "/gen/dept/dept.dao.ts";
import { getAuthModel } from "/lib/auth/auth.service.ts"

import {
  type MutationLoginArgs,
} from "/gen/types.ts";

/**
 * 登录获得 authorization
 * @param {Context} context
 * @param {MutationLoginArgs["username"]} username 用户名
 * @param {MutationLoginArgs["password"]} password 密码,传递进来的密码已经被前端md5加密过一次
 * @param {MutationLoginArgs["tenant_id"]} tenant_id 租户id
 * @param {MutationLoginArgs["dept_id"]} dept_id 部门id
 */
export async function login(
  context: Context,
  username: MutationLoginArgs["username"],
  password: MutationLoginArgs["password"],
  tenant_id: MutationLoginArgs["tenant_id"],
  dept_id: MutationLoginArgs["dept_id"],
) {
  if (isEmpty(username) || isEmpty(password)) {
    throw "用户名或密码不能为空!";
  }
  if (isEmpty(tenant_id)) {
    throw "请选择租户!";
  }
  const password2 = await authService.getPassword(password);
  const model = await usrDao.findLoginUsr(
    context,
    username,
    password2,
    tenant_id,
  );
  if (!model || !model.id) {
    throw "用户名或密码错误!";
  }
  if (dept_id === null) {
    dept_id = undefined;
  }
  const dept_ids = (await usrDao.getDept_idsById(
    context,
    model.id,
  ))!;
  if (!dept_id) {
    dept_id = model.default_dept_id || dept_ids[0];
  }
  if (dept_id) {
    if (!dept_ids.includes(dept_id)) {
      dept_id = undefined;
    }
  }
  const { authorization } = await authService.createToken({
    id: model.id,
    dept_id,
  });
  return {
    authorization,
    dept_id,
  };
}

export async function getLoginInfo(
  context: Context,
) {
  const authModel = await getAuthModel(context);
  if (!authModel) {
    throw "未登录";
  }
  const dept_id = authModel.dept_id;
  const id = authModel.id;
  const usrModel = await usrDaoGen.findById(context, id);
  if (!usrModel) {
    throw `用户 id: ${ id } 不存在`;
  }
  const dept_ids = usrModel.dept_ids || [ ];
  const deptModels = await deptDaoGen.findAll(context);
  const dept_idModels: { id: string, lbl: string }[] = [ ];
  for (let i = 0; i < dept_ids.length; i++) {
    const dept_id = dept_ids[i];
    const deptModel = deptModels.find((item) => item.id === dept_id);
    if (!deptModel) {
      continue;
    }
    dept_idModels.push({
      id: dept_id,
      lbl: deptModel.lbl,
    });
  }
  return {
    lbl: usrModel.lbl,
    dept_id,
    dept_idModels,
  };
}
