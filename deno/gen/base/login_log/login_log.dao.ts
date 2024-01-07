// deno-lint-ignore-file prefer-const no-unused-vars ban-types require-await
import {
  escapeId,
} from "sqlstring";

import dayjs from "dayjs";

import {
  log,
  error,
  escapeDec,
  reqDate,
  delCache as delCacheCtx,
  query,
  queryOne,
  execute,
  QueryArgs,
} from "/lib/context.ts";

import {
  initN,
  ns,
} from "/src/base/i18n/i18n.ts";

import {
  isNotEmpty,
  isEmpty,
  sqlLike,
  shortUuidV4,
} from "/lib/util/string_util.ts";

import {
  deepCompare,
} from "/lib/util/object_util.ts";

import * as validators from "/lib/validators/mod.ts";

import {
  getDict,
} from "/src/base/dict_detail/dict_detail.dao.ts";

import { UniqueException } from "/lib/exceptions/unique.execption.ts";

import {
  getAuthModel,
} from "/lib/auth/auth.dao.ts";

import {
  getTenant_id,
} from "/src/base/usr/usr.dao.ts";

import {
  existById as existByIdTenant,
} from "/gen/base/tenant/tenant.dao.ts";

import {
  UniqueType,
  SortOrderEnum,
} from "/gen/types.ts";

import type {
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  TenantId,
} from "/gen/base/tenant/tenant.model.ts";

import type {
  LoginLogInput,
  LoginLogModel,
  LoginLogSearch,
  LoginLogFieldComment,
  LoginLogId,
} from "./login_log.model.ts";

const route_path = "/base/login_log";

async function getWhereQuery(
  args: QueryArgs,
  search?: LoginLogSearch,
  options?: {
  },
): Promise<string> {
  let whereQuery = "";
  whereQuery += ` t.is_deleted = ${ args.push(search?.is_deleted == null ? 0 : search.is_deleted) }`;
  if (search?.tenant_id == null) {
    const authModel = await getAuthModel();
    const tenant_id = await getTenant_id(authModel?.id);
    if (tenant_id) {
      whereQuery += ` and t.tenant_id = ${ args.push(tenant_id) }`;
    }
  } else if (isNotEmpty(search?.tenant_id) && search?.tenant_id !== "-") {
    whereQuery += ` and t.tenant_id = ${ args.push(search.tenant_id) }`;
  }
  if (isNotEmpty(search?.id)) {
    whereQuery += ` and t.id = ${ args.push(search?.id) }`;
  }
  if (search?.ids && !Array.isArray(search?.ids)) {
    search.ids = [ search.ids ];
  }
  if (search?.ids && search?.ids.length > 0) {
    whereQuery += ` and t.id in ${ args.push(search.ids) }`;
  }
  if (search?.username !== undefined) {
    whereQuery += ` and t.username = ${ args.push(search.username) }`;
  }
  if (search?.username === null) {
    whereQuery += ` and t.username is null`;
  }
  if (isNotEmpty(search?.username_like)) {
    whereQuery += ` and t.username like ${ args.push("%" + sqlLike(search?.username_like) + "%") }`;
  }
  if (search?.is_succ && !Array.isArray(search?.is_succ)) {
    search.is_succ = [ search.is_succ ];
  }
  if (search?.is_succ && search?.is_succ?.length > 0) {
    whereQuery += ` and t.is_succ in ${ args.push(search.is_succ) }`;
  }
  if (search?.ip !== undefined) {
    whereQuery += ` and t.ip = ${ args.push(search.ip) }`;
  }
  if (search?.ip === null) {
    whereQuery += ` and t.ip is null`;
  }
  if (isNotEmpty(search?.ip_like)) {
    whereQuery += ` and t.ip like ${ args.push("%" + sqlLike(search?.ip_like) + "%") }`;
  }
  if (search?.create_usr_id && !Array.isArray(search?.create_usr_id)) {
    search.create_usr_id = [ search.create_usr_id ];
  }
  if (search?.create_usr_id && search?.create_usr_id.length > 0) {
    whereQuery += ` and create_usr_id_lbl.id in ${ args.push(search.create_usr_id) }`;
  }
  if (search?.create_usr_id === null) {
    whereQuery += ` and create_usr_id_lbl.id is null`;
  }
  if (search?.create_usr_id_is_null) {
    whereQuery += ` and create_usr_id_lbl.id is null`;
  }
  if (search?.create_time && search?.create_time?.length > 0) {
    if (search.create_time[0] != null) {
      whereQuery += ` and t.create_time >= ${ args.push(search.create_time[0]) }`;
    }
    if (search.create_time[1] != null) {
      whereQuery += ` and t.create_time <= ${ args.push(search.create_time[1]) }`;
    }
  }
  if (search?.$extra) {
    const extras = search.$extra;
    for (let i = 0; i < extras.length; i++) {
      const extra = extras[i];
      const queryTmp = await extra(args);
      if (queryTmp) {
        whereQuery += ` ${ queryTmp }`;
      }
    }
  }
  return whereQuery;
}

async function getFromQuery() {
  let fromQuery = `
    base_login_log t
    left join base_usr create_usr_id_lbl
      on create_usr_id_lbl.id = t.create_usr_id
  `;
  return fromQuery;
}

/**
 * 根据条件查找登录日志总数
 * @param { LoginLogSearch } search?
 * @return {Promise<number>}
 */
export async function findCount(
  search?: LoginLogSearch,
  options?: {
  },
): Promise<number> {
  const table = "base_login_log";
  const method = "findCount";
  
  const args = new QueryArgs();
  let sql = `
    select
      count(1) total
    from
      (
        select
          1
        from
          ${ await getFromQuery() }
  `;
  const whereQuery = await getWhereQuery(args, search, options);
  if (isNotEmpty(whereQuery)) {
    sql += `
        where
          ${ whereQuery }
    `;
  }
  sql += `
        group by t.id
      ) t
  `;
  
  interface Result {
    total: number,
  }
  const model = await queryOne<Result>(sql, args);
  let result = Number(model?.total || 0);
  
  return result;
}

/**
 * 根据搜索条件和分页查找登录日志列表
 * @param {LoginLogSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 */
export async function findAll(
  search?: LoginLogSearch,
  page?: PageInput,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<LoginLogModel[]> {
  const table = "base_login_log";
  const method = "findAll";
  
  const args = new QueryArgs();
  let sql = `
    select t.*
      ,create_usr_id_lbl.lbl create_usr_id_lbl
    from
      ${ await getFromQuery() }
  `;
  const whereQuery = await getWhereQuery(args, search, options);
  if (isNotEmpty(whereQuery)) {
    sql += `
    where
      ${ whereQuery }
    `;
  }
  sql += `
    group by t.id
  `;
  
  // 排序
  if (!sort) {
    sort = [
      {
        prop: "create_time",
        order: SortOrderEnum.Desc,
      },
    ];
  } else if (!Array.isArray(sort)) {
    sort = [ sort ];
  }
  sort = sort.filter((item) => item.prop);
  sort.push({
    prop: "create_time",
    order: SortOrderEnum.Desc,
  });
  sort.push({
    prop: "create_time",
    order: SortOrderEnum.Desc,
  });
  for (let i = 0; i < sort.length; i++) {
    const item = sort[i];
    if (i === 0) {
      sql += ` order by`;
    } else {
      sql += `,`;
    }
    sql += ` ${ escapeId(item.prop) } ${ escapeDec(item.order) }`;
  }
  
  // 分页
  if (page?.pgSize) {
    sql += ` limit ${ Number(page?.pgOffset) || 0 },${ Number(page.pgSize) }`;
  }
  
  const result = await query<LoginLogModel>(
    sql,
    args,
  );
  
  const [
    is_succDict, // 登录成功
  ] = await getDict([
    "yes_no",
  ]);
  
  for (let i = 0; i < result.length; i++) {
    const model = result[i];
    
    // 登录成功
    let is_succ_lbl = model.is_succ?.toString() || "";
    if (model.is_succ !== undefined && model.is_succ !== null) {
      const dictItem = is_succDict.find((dictItem) => dictItem.val === model.is_succ.toString());
      if (dictItem) {
        is_succ_lbl = dictItem.lbl;
      }
    }
    model.is_succ_lbl = is_succ_lbl;
    
    // 创建时间
    if (model.create_time) {
      const create_time = dayjs(model.create_time);
      if (isNaN(create_time.toDate().getTime())) {
        model.create_time_lbl = (model.create_time || "").toString();
      } else {
        model.create_time_lbl = create_time.format("YYYY-MM-DD HH:mm:ss");
      }
    } else {
      model.create_time_lbl = "";
    }
  }
  
  return result;
}

/** 根据lbl翻译业务字典, 外键关联id, 日期 */
export async function setIdByLbl(
  input: LoginLogInput,
) {
  
  const [
    is_succDict, // 登录成功
  ] = await getDict([
    "yes_no",
  ]);
  
  // 登录成功
  if (isNotEmpty(input.is_succ_lbl) && input.is_succ === undefined) {
    const val = is_succDict.find((itemTmp) => itemTmp.lbl === input.is_succ_lbl)?.val;
    if (val !== undefined) {
      input.is_succ = Number(val);
    }
  }
}

/**
 * 获取登录日志字段注释
 */
export async function getFieldComments(): Promise<LoginLogFieldComment> {
  const n = initN(route_path);
  const fieldComments: LoginLogFieldComment = {
    id: await n("ID"),
    username: await n("用户名"),
    is_succ: await n("登录成功"),
    is_succ_lbl: await n("登录成功"),
    ip: await n("IP"),
    create_usr_id: await n("创建人"),
    create_usr_id_lbl: await n("创建人"),
    create_time: await n("创建时间"),
    create_time_lbl: await n("创建时间"),
  };
  return fieldComments;
}

/**
 * 通过唯一约束获得登录日志列表
 * @param {LoginLogInput} search0
 */
export async function findByUnique(
  search0: LoginLogInput,
  options?: {
  },
): Promise<LoginLogModel[]> {
  if (search0.id) {
    const model = await findOne({
      id: search0.id,
    });
    if (!model) {
      return [ ];
    }
    return [ model ];
  }
  const models: LoginLogModel[] = [ ];
  return models;
}

/**
 * 根据唯一约束对比对象是否相等
 * @param {LoginLogModel} oldModel
 * @param {LoginLogInput} input
 * @return {boolean}
 */
export function equalsByUnique(
  oldModel: LoginLogModel,
  input: LoginLogInput,
): boolean {
  if (!oldModel || !input) {
    return false;
  }
  return false;
}

/**
 * 通过唯一约束检查登录日志是否已经存在
 * @param {LoginLogInput} input
 * @param {LoginLogModel} oldModel
 * @param {UniqueType} uniqueType
 * @return {Promise<LoginLogId | undefined>}
 */
export async function checkByUnique(
  input: LoginLogInput,
  oldModel: LoginLogModel,
  uniqueType: UniqueType = UniqueType.Throw,
  options?: {
  },
): Promise<LoginLogId | undefined> {
  const isEquals = equalsByUnique(oldModel, input);
  if (isEquals) {
    if (uniqueType === UniqueType.Throw) {
      throw new UniqueException(await ns("数据已经存在"));
    }
    if (uniqueType === UniqueType.Update) {
      const id: LoginLogId = await updateById(
        oldModel.id,
        {
          ...input,
          id: undefined,
        },
        {
          ...options,
        },
      );
      return id;
    }
    if (uniqueType === UniqueType.Ignore) {
      return;
    }
  }
  return;
}

/**
 * 根据条件查找第一个登录日志
 * @param {LoginLogSearch} search?
 */
export async function findOne(
  search?: LoginLogSearch,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<LoginLogModel | undefined> {
  const page: PageInput = {
    pgOffset: 0,
    pgSize: 1,
  };
  const models = await findAll(search, page, sort);
  const model = models[0];
  return model;
}

/**
 * 根据 id 查找登录日志
 * @param {LoginLogId} id
 */
export async function findById(
  id?: LoginLogId | null,
  options?: {
  },
): Promise<LoginLogModel | undefined> {
  if (isEmpty(id as unknown as string)) {
    return;
  }
  const model = await findOne({ id });
  return model;
}

/**
 * 根据搜索条件判断登录日志是否存在
 * @param {LoginLogSearch} search?
 */
export async function exist(
  search?: LoginLogSearch,
  options?: {
  },
): Promise<boolean> {
  const model = await findOne(search);
  const exist = !!model;
  return exist;
}

/**
 * 根据id判断登录日志是否存在
 * @param {LoginLogId} id
 */
export async function existById(
  id?: LoginLogId | null,
) {
  const table = "base_login_log";
  const method = "existById";
  
  if (isEmpty(id as unknown as string)) {
    return false;
  }
  
  const args = new QueryArgs();
  const sql = `
    select
      1 e
    from
      base_login_log t
    where
      t.id = ${ args.push(id) }
      and t.is_deleted = 0
    limit 1
  `;
  
  interface Result {
    e: number,
  }
  let model = await queryOne<Result>(
    sql,
    args,
  );
  let result = !!model?.e;
  
  return result;
}

/** 校验登录日志是否存在 */
export async function validateOption(
  model?: LoginLogModel,
) {
  if (!model) {
    throw `${ await ns("登录日志") } ${ await ns("不存在") }`;
  }
  return model;
}

/**
 * 登录日志增加和修改时校验输入
 * @param input 
 */
export async function validate(
  input: LoginLogInput,
) {
  const fieldComments = await getFieldComments();
  
  // ID
  await validators.chars_max_length(
    input.id,
    22,
    fieldComments.id,
  );
  
  // 用户名
  await validators.chars_max_length(
    input.username,
    45,
    fieldComments.username,
  );
  
  // IP
  await validators.chars_max_length(
    input.ip,
    45,
    fieldComments.ip,
  );
  
  // 创建人
  await validators.chars_max_length(
    input.create_usr_id,
    22,
    fieldComments.create_usr_id,
  );
  
}

/**
 * 创建登录日志
 * @param {LoginLogInput} input
 * @param {({
 *   uniqueType?: UniqueType,
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   update: 更新冲突数据
 * @return {Promise<LoginLogId>} 
 */
export async function create(
  input: LoginLogInput,
  options?: {
    uniqueType?: UniqueType;
  },
): Promise<LoginLogId> {
  const table = "base_login_log";
  const method = "create";
  
  if (input.id) {
    throw new Error(`Can not set id when create in dao: ${ table }`);
  }
  
  await setIdByLbl(input);
  
  const oldModels = await findByUnique(input, options);
  if (oldModels.length > 0) {
    let id: LoginLogId | undefined = undefined;
    for (const oldModel of oldModels) {
      id = await checkByUnique(
        input,
        oldModel,
        options?.uniqueType,
        options,
      );
      if (id) {
        break;
      }
    }
    if (id) {
      return id;
    }
  }
  
  while (true) {
    input.id = shortUuidV4<LoginLogId>();
    const isExist = await existById(input.id);
    if (!isExist) {
      break;
    }
    error(`ID_COLLIDE: ${ table } ${ input.id as unknown as string }`);
  }
  
  const args = new QueryArgs();
  let sql = `
    insert into base_login_log(
      id
      ,create_time
      ,update_time
  `;
  if (input.tenant_id != null) {
    sql += `,tenant_id`;
  } else {
    const authModel = await getAuthModel();
    const tenant_id = await getTenant_id(authModel?.id);
    if (tenant_id) {
      sql += `,tenant_id`;
    }
  }
  if (input.create_usr_id != null) {
    sql += `,create_usr_id`;
  } else {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,create_usr_id`;
    }
  }
  if (input.update_usr_id != null) {
    sql += `,update_usr_id`;
  } else {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,update_usr_id`;
    }
  }
  if (input.username !== undefined) {
    sql += `,username`;
  }
  if (input.is_succ !== undefined) {
    sql += `,is_succ`;
  }
  if (input.ip !== undefined) {
    sql += `,ip`;
  }
  sql += `) values(${ args.push(input.id) },${ args.push(reqDate()) },${ args.push(reqDate()) }`;
  if (input.tenant_id != null) {
    sql += `,${ args.push(input.tenant_id) }`;
  } else {
    const authModel = await getAuthModel();
    const tenant_id = await getTenant_id(authModel?.id);
    if (tenant_id) {
      sql += `,${ args.push(tenant_id) }`;
    }
  }
  if (input.create_usr_id != null && input.create_usr_id as unknown as string !== "-") {
    sql += `,${ args.push(input.create_usr_id) }`;
  } else {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,${ args.push(authModel.id) }`;
    }
  }
  if (input.update_usr_id != null && input.update_usr_id as unknown as string !== "-") {
    sql += `,${ args.push(input.update_usr_id) }`;
  } else {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,${ args.push(authModel.id) }`;
    }
  }
  if (input.username !== undefined) {
    sql += `,${ args.push(input.username) }`;
  }
  if (input.is_succ !== undefined) {
    sql += `,${ args.push(input.is_succ) }`;
  }
  if (input.ip !== undefined) {
    sql += `,${ args.push(input.ip) }`;
  }
  sql += `)`;
  const res = await execute(sql, args);
  log(JSON.stringify(res));
  
  return input.id;
}

/**
 * 登录日志根据id修改租户id
 * @param {LoginLogId} id
 * @param {TenantId} tenant_id
 * @param {{
 *   }} [options]
 * @return {Promise<number>}
 */
export async function updateTenantById(
  id: LoginLogId,
  tenant_id: TenantId,
  options?: {
  },
): Promise<number> {
  const table = "base_login_log";
  const method = "updateTenantById";
  
  const tenantExist = await existByIdTenant(tenant_id);
  if (!tenantExist) {
    return 0;
  }
  
  const args = new QueryArgs();
  const sql = `
    update
      base_login_log
    set
      update_time = ${ args.push(reqDate()) },
      tenant_id = ${ args.push(tenant_id) }
    where
      id = ${ args.push(id) }
  `;
  const result = await execute(sql, args);
  const num = result.affectedRows;
  return num;
}

/**
 * 根据 id 修改登录日志
 * @param {LoginLogId} id
 * @param {LoginLogInput} input
 * @param {({
 *   uniqueType?: "ignore" | "throw" | "update",
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   create: 级联插入新数据
 * @return {Promise<LoginLogId>}
 */
export async function updateById(
  id: LoginLogId,
  input: LoginLogInput,
  options?: {
    uniqueType?: "ignore" | "throw";
  },
): Promise<LoginLogId> {
  const table = "base_login_log";
  const method = "updateById";
  
  if (!id) {
    throw new Error("updateById: id cannot be empty");
  }
  if (!input) {
    throw new Error("updateById: input cannot be null");
  }
  
  // 修改租户id
  if (isNotEmpty(input.tenant_id)) {
    await updateTenantById(id, input.tenant_id as unknown as TenantId);
  }
  
  await setIdByLbl(input);
  
  {
    const input2 = {
      ...input,
      id: undefined,
    };
    let models = await findByUnique(input2);
    models = models.filter((item) => item.id !== id);
    if (models.length > 0) {
      if (!options || options.uniqueType === UniqueType.Throw) {
        throw await ns("数据已经存在");
      } else if (options.uniqueType === UniqueType.Ignore) {
        return id;
      }
    }
  }
  
  const oldModel = await findById(id);
  
  if (!oldModel) {
    throw await ns("修改失败, 数据已被删除");
  }
  
  const args = new QueryArgs();
  let sql = `
    update base_login_log set
  `;
  let updateFldNum = 0;
  if (input.username !== undefined) {
    if (input.username != oldModel.username) {
      sql += `username = ${ args.push(input.username) },`;
      updateFldNum++;
    }
  }
  if (input.is_succ !== undefined) {
    if (input.is_succ != oldModel.is_succ) {
      sql += `is_succ = ${ args.push(input.is_succ) },`;
      updateFldNum++;
    }
  }
  if (input.ip !== undefined) {
    if (input.ip != oldModel.ip) {
      sql += `ip = ${ args.push(input.ip) },`;
      updateFldNum++;
    }
  }
  if (updateFldNum > 0) {
    if (input.update_usr_id && input.update_usr_id as unknown as string !== "-") {
      sql += `update_usr_id = ${ args.push(input.update_usr_id) },`;
    } else {
      const authModel = await getAuthModel();
      if (authModel?.id !== undefined) {
        sql += `update_usr_id = ${ args.push(authModel.id) },`;
      }
    }
    sql += `update_time = ${ args.push(new Date()) }`;
    sql += ` where id = ${ args.push(id) } limit 1`;
    
    const res = await execute(sql, args);
    log(JSON.stringify(res));
  }
  
  const newModel = await findById(id);
  
  if (!deepCompare(oldModel, newModel)) {
    console.log(JSON.stringify(oldModel));
  }
  
  return id;
}

/**
 * 根据 ids 删除登录日志
 * @param {LoginLogId[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: LoginLogId[],
  options?: {
  },
): Promise<number> {
  const table = "base_login_log";
  const method = "deleteByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id: LoginLogId = ids[i];
    const isExist = await existById(id);
    if (!isExist) {
      continue;
    }
    const args = new QueryArgs();
    const sql = `
      update
        base_login_log
      set
        is_deleted = 1,
        delete_time = ${ args.push(reqDate()) }
      where
        id = ${ args.push(id) }
      limit 1
    `;
    const result = await execute(sql, args);
    num += result.affectedRows;
  }
  
  return num;
}

/**
 * 根据 ids 还原登录日志
 * @param {LoginLogId[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: LoginLogId[],
  options?: {
  },
): Promise<number> {
  const table = "base_login_log";
  const method = "revertByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id: LoginLogId = ids[i];
    const args = new QueryArgs();
    const sql = `
      update
        base_login_log
      set
        is_deleted = 0
      where
        id = ${ args.push(id) }
      limit 1
    `;
    const result = await execute(sql, args);
    num += result.affectedRows;
    // 检查数据的唯一索引
    {
      const old_model = await findById(id);
      if (!old_model) {
        continue;
      }
      const input = {
        ...old_model,
        id: undefined,
      };
      let models = await findByUnique(input);
      models = models.filter((item) => item.id !== id);
      if (models.length > 0) {
        throw await ns("数据已经存在");
      }
    }
  }
  
  return num;
}

/**
 * 根据 ids 彻底删除登录日志
 * @param {LoginLogId[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: LoginLogId[],
  options?: {
  },
): Promise<number> {
  const table = "base_login_log";
  const method = "forceDeleteByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    {
      const args = new QueryArgs();
      const sql = `
        select
          *
        from
          base_login_log
        where
          id = ${ args.push(id) }
      `;
      const model = await queryOne(sql, args);
      log("forceDeleteByIds:", model);
    }
    const args = new QueryArgs();
    const sql = `
      delete from
        base_login_log
      where
        id = ${ args.push(id) }
        and is_deleted = 1
      limit 1
    `;
    const result = await execute(sql, args);
    num += result.affectedRows;
  }
  
  return num;
}
