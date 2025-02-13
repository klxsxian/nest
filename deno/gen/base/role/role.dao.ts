// deno-lint-ignore-file prefer-const no-unused-vars ban-types
import {
  get_is_debug,
  get_is_silent_mode,
  get_is_creating,
} from "/lib/context.ts";

import {
  escapeId,
} from "sqlstring";

import dayjs from "dayjs";

import {
  getDebugSearch,
  splitCreateArr,
  FIND_ALL_IDS_LIMIT,
} from "/lib/util/dao_util.ts";

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
  getParsedEnv,
} from "/lib/env.ts";

import {
  initN,
  ns,
} from "/src/base/i18n/i18n.ts";

import {
  isNotEmpty,
  isEmpty,
  sqlLike,
  shortUuidV4,
  hash,
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
  get_usr_id,
} from "/lib/auth/auth.dao.ts";

import {
  getTenant_id,
} from "/src/base/usr/usr.dao.ts";

import {
  existById as existByIdTenant,
} from "/gen/base/tenant/tenant.dao.ts";

import {
  many2manyUpdate,
} from "/lib/util/dao_util.ts";

import {
  UniqueType,
  SortOrderEnum,
} from "/gen/types.ts";

import type {
  PageInput,
  SortInput,
} from "/gen/types.ts";

import {
  findById as findByIdUsr,
} from "/gen/base/usr/usr.dao.ts";

import {
  route_path,
} from "./role.model.ts";

async function getWhereQuery(
  args: QueryArgs,
  search?: Readonly<RoleSearch>,
  options?: {
  },
): Promise<string> {
  let whereQuery = "";
  whereQuery += ` t.is_deleted=${ args.push(search?.is_deleted == null ? 0 : search.is_deleted) }`;
  
  if (search?.tenant_id == null) {
    const usr_id = await get_usr_id();
    const tenant_id = await getTenant_id(usr_id);
    if (tenant_id) {
      whereQuery += ` and t.tenant_id=${ args.push(tenant_id) }`;
    }
  } else if (search?.tenant_id != null && search?.tenant_id !== "-") {
    whereQuery += ` and t.tenant_id=${ args.push(search.tenant_id) }`;
  }
  if (search?.id != null) {
    whereQuery += ` and t.id=${ args.push(search?.id) }`;
  }
  if (search?.ids != null) {
    whereQuery += ` and t.id in ${ args.push(search.ids) }`;
  }
  if (search?.lbl != null) {
    whereQuery += ` and t.lbl=${ args.push(search.lbl) }`;
  }
  if (isNotEmpty(search?.lbl_like)) {
    whereQuery += ` and t.lbl like ${ args.push("%" + sqlLike(search?.lbl_like) + "%") }`;
  }
  if (search?.home_url != null) {
    whereQuery += ` and t.home_url=${ args.push(search.home_url) }`;
  }
  if (isNotEmpty(search?.home_url_like)) {
    whereQuery += ` and t.home_url like ${ args.push("%" + sqlLike(search?.home_url_like) + "%") }`;
  }
  if (search?.menu_ids != null) {
    whereQuery += ` and base_menu.id in ${ args.push(search.menu_ids) }`;
  }
  if (search?.menu_ids_is_null) {
    whereQuery += ` and base_menu.id is null`;
  }
  if (search?.permit_ids != null) {
    whereQuery += ` and base_permit.id in ${ args.push(search.permit_ids) }`;
  }
  if (search?.permit_ids_is_null) {
    whereQuery += ` and base_permit.id is null`;
  }
  if (search?.data_permit_ids != null) {
    whereQuery += ` and base_data_permit.id in ${ args.push(search.data_permit_ids) }`;
  }
  if (search?.data_permit_ids_is_null) {
    whereQuery += ` and base_data_permit.id is null`;
  }
  if (search?.is_locked != null) {
    whereQuery += ` and t.is_locked in ${ args.push(search.is_locked) }`;
  }
  if (search?.is_enabled != null) {
    whereQuery += ` and t.is_enabled in ${ args.push(search.is_enabled) }`;
  }
  if (search?.order_by != null) {
    if (search.order_by[0] != null) {
      whereQuery += ` and t.order_by>=${ args.push(search.order_by[0]) }`;
    }
    if (search.order_by[1] != null) {
      whereQuery += ` and t.order_by<=${ args.push(search.order_by[1]) }`;
    }
  }
  if (search?.rem != null) {
    whereQuery += ` and t.rem=${ args.push(search.rem) }`;
  }
  if (isNotEmpty(search?.rem_like)) {
    whereQuery += ` and t.rem like ${ args.push("%" + sqlLike(search?.rem_like) + "%") }`;
  }
  if (search?.create_usr_id != null) {
    whereQuery += ` and t.create_usr_id in ${ args.push(search.create_usr_id) }`;
  }
  if (search?.create_usr_id_is_null) {
    whereQuery += ` and t.create_usr_id is null`;
  }
  if (search?.create_usr_id_lbl != null) {
    whereQuery += ` and t.create_usr_id_lbl in ${ args.push(search.create_usr_id_lbl) }`;
  }
  if (search?.create_time != null) {
    if (search.create_time[0] != null) {
      whereQuery += ` and t.create_time>=${ args.push(search.create_time[0]) }`;
    }
    if (search.create_time[1] != null) {
      whereQuery += ` and t.create_time<=${ args.push(search.create_time[1]) }`;
    }
  }
  if (search?.update_usr_id != null) {
    whereQuery += ` and t.update_usr_id in ${ args.push(search.update_usr_id) }`;
  }
  if (search?.update_usr_id_is_null) {
    whereQuery += ` and t.update_usr_id is null`;
  }
  if (search?.update_usr_id_lbl != null) {
    whereQuery += ` and t.update_usr_id_lbl in ${ args.push(search.update_usr_id_lbl) }`;
  }
  if (search?.update_time != null) {
    if (search.update_time[0] != null) {
      whereQuery += ` and t.update_time>=${ args.push(search.update_time[0]) }`;
    }
    if (search.update_time[1] != null) {
      whereQuery += ` and t.update_time<=${ args.push(search.update_time[1]) }`;
    }
  }
  return whereQuery;
}

// deno-lint-ignore require-await
async function getFromQuery(
  args: QueryArgs,
  search?: Readonly<RoleSearch>,
  options?: {
  },
) {
  
  const is_deleted = search?.is_deleted ?? 0;
  let fromQuery = `base_role t
  left join base_role_menu
    on base_role_menu.role_id=t.id
    and base_role_menu.is_deleted=${ args.push(is_deleted) }
  left join base_menu
    on base_role_menu.menu_id=base_menu.id
    and base_menu.is_deleted=${ args.push(is_deleted) }
  left join(select
  json_objectagg(base_role_menu.order_by,base_menu.id) menu_ids,
  json_objectagg(base_role_menu.order_by,base_menu.lbl) menu_ids_lbl,
  base_role.id role_id
  from base_role_menu
  inner join base_menu on base_menu.id=base_role_menu.menu_id
  inner join base_role on base_role.id=base_role_menu.role_id
  where base_role_menu.is_deleted=${ args.push(is_deleted) }
  group by role_id) _menu on _menu.role_id=t.id
  left join base_role_permit
    on base_role_permit.role_id=t.id
    and base_role_permit.is_deleted=${ args.push(is_deleted) }
  left join base_permit
    on base_role_permit.permit_id=base_permit.id
    and base_permit.is_deleted=${ args.push(is_deleted) }
  left join(select
  json_objectagg(base_role_permit.order_by,base_permit.id) permit_ids,
  json_objectagg(base_role_permit.order_by,base_permit.lbl) permit_ids_lbl,
  base_role.id role_id
  from base_role_permit
  inner join base_permit on base_permit.id=base_role_permit.permit_id
  inner join base_role on base_role.id=base_role_permit.role_id
  where base_role_permit.is_deleted=${ args.push(is_deleted) }
  group by role_id) _permit on _permit.role_id=t.id
  left join base_role_data_permit
    on base_role_data_permit.role_id=t.id
    and base_role_data_permit.is_deleted=${ args.push(is_deleted) }
  left join base_data_permit
    on base_role_data_permit.data_permit_id=base_data_permit.id
    and base_data_permit.is_deleted=${ args.push(is_deleted) }
  left join(select
  json_objectagg(base_role_data_permit.order_by,base_data_permit.id) data_permit_ids,
  base_role.id role_id
  from base_role_data_permit
  inner join base_data_permit on base_data_permit.id=base_role_data_permit.data_permit_id
  inner join base_role on base_role.id=base_role_data_permit.role_id
  where base_role_data_permit.is_deleted=${ args.push(is_deleted) }
  group by role_id) _data_permit on _data_permit.role_id=t.id`;
  return fromQuery;
}

/**
 * 根据条件查找角色总数
 * @param {RoleSearch} search?
 * @return {Promise<number>}
 */
export async function findCount(
  search?: Readonly<RoleSearch>,
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "findCount";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (search) {
      msg += ` search:${ getDebugSearch(search) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  const args = new QueryArgs();
  let sql = `select count(1) total from (select 1 from ${ await getFromQuery(args, search, options) }`;
  const whereQuery = await getWhereQuery(args, search, options);
  if (isNotEmpty(whereQuery)) {
    sql += ` where ${ whereQuery }`;
  }
  sql += ` group by t.id) t`;
  
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  interface Result {
    total: number,
  }
  const model = await queryOne<Result>(sql, args, { cacheKey1, cacheKey2 });
  let result = Number(model?.total || 0);
  
  return result;
}

/**
 * 根据搜索条件和分页查找角色列表
 * @param {RoleSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 */
export async function findAll(
  search?: Readonly<RoleSearch>,
  page?: Readonly<PageInput>,
  sort?: SortInput | SortInput[],
  options?: {
    is_debug?: boolean;
    ids_limit?: number;
  },
): Promise<RoleModel[]> {
  
  const table = "base_role";
  const method = "findAll";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (search) {
      msg += ` search:${ getDebugSearch(search) }`;
    }
    if (page && Object.keys(page).length > 0) {
      msg += ` page:${ JSON.stringify(page) }`;
    }
    if (sort && Object.keys(sort).length > 0) {
      msg += ` sort:${ JSON.stringify(sort) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (search?.id === "") {
    return [ ];
  }
  if (search && search.ids && search.ids.length === 0) {
    return [ ];
  }
  // 菜单权限
  if (search && search.menu_ids != null) {
    const len = search.menu_ids.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.menu_ids.length > ${ ids_limit }`);
    }
  }
  // 按钮权限
  if (search && search.permit_ids != null) {
    const len = search.permit_ids.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.permit_ids.length > ${ ids_limit }`);
    }
  }
  // 数据权限
  if (search && search.data_permit_ids != null) {
    const len = search.data_permit_ids.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.data_permit_ids.length > ${ ids_limit }`);
    }
  }
  // 锁定
  if (search && search.is_locked != null) {
    const len = search.is_locked.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.is_locked.length > ${ ids_limit }`);
    }
  }
  // 启用
  if (search && search.is_enabled != null) {
    const len = search.is_enabled.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.is_enabled.length > ${ ids_limit }`);
    }
  }
  // 创建人
  if (search && search.create_usr_id != null) {
    const len = search.create_usr_id.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.create_usr_id.length > ${ ids_limit }`);
    }
  }
  // 更新人
  if (search && search.update_usr_id != null) {
    const len = search.update_usr_id.length;
    if (len === 0) {
      return [ ];
    }
    const ids_limit = options?.ids_limit ?? FIND_ALL_IDS_LIMIT;
    if (len > ids_limit) {
      throw new Error(`search.update_usr_id.length > ${ ids_limit }`);
    }
  }
  
  const args = new QueryArgs();
  let sql = `select f.* from (select t.*
      ,max(menu_ids) menu_ids
      ,max(menu_ids_lbl) menu_ids_lbl
      ,max(permit_ids) permit_ids
      ,max(permit_ids_lbl) permit_ids_lbl
      ,max(data_permit_ids) data_permit_ids
    from
      ${ await getFromQuery(args, search, options) }
  `;
  const whereQuery = await getWhereQuery(args, search, options);
  if (isNotEmpty(whereQuery)) {
    sql += ` where ${ whereQuery }`;
  }
  sql += ` group by t.id`;
  
  // 排序
  if (!sort) {
    sort = [
      {
        prop: "order_by",
        order: SortOrderEnum.Asc,
      },
    ];
  } else if (!Array.isArray(sort)) {
    sort = [ sort ];
  }
  sort = sort.filter((item) => item.prop);
  sort.push({
    prop: "order_by",
    order: SortOrderEnum.Asc,
  });
  if (!sort.some((item) => item.prop === "create_time")) {
    sort.push({
      prop: "create_time",
      order: SortOrderEnum.Desc,
    });
  }
  for (let i = 0; i < sort.length; i++) {
    const item = sort[i];
    if (i === 0) {
      sql += ` order by`;
    } else {
      sql += `,`;
    }
    sql += ` ${ escapeId(item.prop) } ${ escapeDec(item.order) }`;
  }
  sql += `) f`;
  
  // 分页
  if (page?.pgSize) {
    sql += ` limit ${ Number(page?.pgOffset) || 0 },${ Number(page.pgSize) }`;
  }
  
  // 缓存
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  const is_debug_sql = getParsedEnv("database_debug_sql") === "true";
  
  const result = await query<RoleModel>(
    sql,
    args,
    {
      cacheKey1,
      cacheKey2,
      debug: is_debug_sql,
    },
  );
  for (const item of result) {
    
    // 菜单权限
    if (item.menu_ids) {
      const obj = item.menu_ids;
      const keys = Object.keys(obj)
        .map((key) => Number(key))
        .sort((a, b) => {
          return a - b ? 1 : -1;
        });
      item.menu_ids = keys.map((key) => obj[key]);
    } else {
      item.menu_ids = [ ];
    }
    if (item.menu_ids_lbl) {
      const obj = item.menu_ids_lbl;
      const keys = Object.keys(obj)
        .map((key) => Number(key))
        .sort((a, b) => {
          return a - b ? 1 : -1;
        });
      item.menu_ids_lbl = keys.map((key) => obj[key]);
    } else {
      item.menu_ids_lbl = [ ];
    }
    
    // 按钮权限
    if (item.permit_ids) {
      const obj = item.permit_ids;
      const keys = Object.keys(obj)
        .map((key) => Number(key))
        .sort((a, b) => {
          return a - b ? 1 : -1;
        });
      item.permit_ids = keys.map((key) => obj[key]);
    } else {
      item.permit_ids = [ ];
    }
    if (item.permit_ids_lbl) {
      const obj = item.permit_ids_lbl;
      const keys = Object.keys(obj)
        .map((key) => Number(key))
        .sort((a, b) => {
          return a - b ? 1 : -1;
        });
      item.permit_ids_lbl = keys.map((key) => obj[key]);
    } else {
      item.permit_ids_lbl = [ ];
    }
    
    // 数据权限
    if (item.data_permit_ids) {
      const obj = item.data_permit_ids;
      const keys = Object.keys(obj)
        .map((key) => Number(key))
        .sort((a, b) => {
          return a - b ? 1 : -1;
        });
      item.data_permit_ids = keys.map((key) => obj[key]);
    } else {
      item.data_permit_ids = [ ];
    }
  }
  
  const [
    is_lockedDict, // 锁定
    is_enabledDict, // 启用
  ] = await getDict([
    "is_locked",
    "is_enabled",
  ]);
  
  for (let i = 0; i < result.length; i++) {
    const model = result[i];
    
    // 锁定
    let is_locked_lbl = model.is_locked?.toString() || "";
    if (model.is_locked != null) {
      const dictItem = is_lockedDict.find((dictItem) => dictItem.val === model.is_locked.toString());
      if (dictItem) {
        is_locked_lbl = dictItem.lbl;
      }
    }
    model.is_locked_lbl = is_locked_lbl || "";
    
    // 启用
    let is_enabled_lbl = model.is_enabled?.toString() || "";
    if (model.is_enabled != null) {
      const dictItem = is_enabledDict.find((dictItem) => dictItem.val === model.is_enabled.toString());
      if (dictItem) {
        is_enabled_lbl = dictItem.lbl;
      }
    }
    model.is_enabled_lbl = is_enabled_lbl || "";
    
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
    
    // 更新时间
    if (model.update_time) {
      const update_time = dayjs(model.update_time);
      if (isNaN(update_time.toDate().getTime())) {
        model.update_time_lbl = (model.update_time || "").toString();
      } else {
        model.update_time_lbl = update_time.format("YYYY-MM-DD HH:mm:ss");
      }
    } else {
      model.update_time_lbl = "";
    }
  }
  
  return result;
}

/** 根据lbl翻译业务字典, 外键关联id, 日期 */
export async function setIdByLbl(
  input: RoleInput,
) {
  
  const options = {
    is_debug: false,
  };
  
  const [
    is_lockedDict, // 锁定
    is_enabledDict, // 启用
  ] = await getDict([
    "is_locked",
    "is_enabled",
  ]);
  
  // 菜单权限
  if (!input.menu_ids && input.menu_ids_lbl) {
    input.menu_ids_lbl = input.menu_ids_lbl
      .map((item: string) => item.trim())
      .filter((item: string) => item);
    input.menu_ids_lbl = Array.from(new Set(input.menu_ids_lbl));
    if (input.menu_ids_lbl.length === 0) {
      input.menu_ids = [ ];
    } else {
      const is_debug_sql = getParsedEnv("database_debug_sql") === "true";
      const args = new QueryArgs();
      const sql = `select t.id from base_menu t where t.lbl in ${ args.push(input.menu_ids_lbl) }`;
      interface Result {
        id: MenuId;
      }
      const models = await query<Result>(sql, args, {
        debug: is_debug_sql,
      });
      input.menu_ids = models.map((item: { id: MenuId }) => item.id);
    }
  }
  
  // 按钮权限
  if (!input.permit_ids && input.permit_ids_lbl) {
    input.permit_ids_lbl = input.permit_ids_lbl
      .map((item: string) => item.trim())
      .filter((item: string) => item);
    input.permit_ids_lbl = Array.from(new Set(input.permit_ids_lbl));
    if (input.permit_ids_lbl.length === 0) {
      input.permit_ids = [ ];
    } else {
      const is_debug_sql = getParsedEnv("database_debug_sql") === "true";
      const args = new QueryArgs();
      const sql = `select t.id from base_permit t where t.lbl in ${ args.push(input.permit_ids_lbl) }`;
      interface Result {
        id: PermitId;
      }
      const models = await query<Result>(sql, args, {
        debug: is_debug_sql,
      });
      input.permit_ids = models.map((item: { id: PermitId }) => item.id);
    }
  }
  
  // 锁定
  if (isNotEmpty(input.is_locked_lbl) && input.is_locked == null) {
    const val = is_lockedDict.find((itemTmp) => itemTmp.lbl === input.is_locked_lbl)?.val;
    if (val != null) {
      input.is_locked = Number(val);
    }
  }
  
  // 启用
  if (isNotEmpty(input.is_enabled_lbl) && input.is_enabled == null) {
    const val = is_enabledDict.find((itemTmp) => itemTmp.lbl === input.is_enabled_lbl)?.val;
    if (val != null) {
      input.is_enabled = Number(val);
    }
  }
}

/**
 * 获取角色字段注释
 */
export async function getFieldComments(): Promise<RoleFieldComment> {
  const n = initN(route_path);
  const fieldComments: RoleFieldComment = {
    id: await n("ID"),
    lbl: await n("名称"),
    home_url: await n("首页"),
    menu_ids: await n("菜单权限"),
    menu_ids_lbl: await n("菜单权限"),
    permit_ids: await n("按钮权限"),
    permit_ids_lbl: await n("按钮权限"),
    data_permit_ids: await n("数据权限"),
    data_permit_ids_lbl: await n("数据权限"),
    is_locked: await n("锁定"),
    is_locked_lbl: await n("锁定"),
    is_enabled: await n("启用"),
    is_enabled_lbl: await n("启用"),
    order_by: await n("排序"),
    rem: await n("备注"),
    create_usr_id: await n("创建人"),
    create_usr_id_lbl: await n("创建人"),
    create_time: await n("创建时间"),
    create_time_lbl: await n("创建时间"),
    update_usr_id: await n("更新人"),
    update_usr_id_lbl: await n("更新人"),
    update_time: await n("更新时间"),
    update_time_lbl: await n("更新时间"),
  };
  return fieldComments;
}

/**
 * 通过唯一约束获得角色列表
 * @param {RoleInput} search0
 */
export async function findByUnique(
  search0: Readonly<RoleInput>,
  options?: {
    is_debug?: boolean;
  },
): Promise<RoleModel[]> {
  
  const table = "base_role";
  const method = "findByUnique";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (search0) {
      msg += ` search0:${ getDebugSearch(search0) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (search0.id) {
    const model = await findOne(
      {
        id: search0.id,
      },
      undefined,
      options,
    );
    if (!model) {
      return [ ];
    }
    return [ model ];
  }
  const models: RoleModel[] = [ ];
  {
    if (search0.lbl == null) {
      return [ ];
    }
    const lbl = search0.lbl;
    const modelTmps = await findAll(
      {
        lbl,
      },
      undefined,
      undefined,
      options,
    );
    models.push(...modelTmps);
  }
  
  return models;
}

/**
 * 根据唯一约束对比对象是否相等
 * @param {RoleModel} oldModel
 * @param {RoleInput} input
 * @return {boolean}
 */
export function equalsByUnique(
  oldModel: Readonly<RoleModel>,
  input: Readonly<RoleInput>,
): boolean {
  
  if (!oldModel || !input) {
    return false;
  }
  if (
    oldModel.lbl === input.lbl
  ) {
    return true;
  }
  return false;
}

/**
 * 通过唯一约束检查角色是否已经存在
 * @param {RoleInput} input
 * @param {RoleModel} oldModel
 * @param {UniqueType} uniqueType
 * @return {Promise<RoleId | undefined>}
 */
export async function checkByUnique(
  input: Readonly<RoleInput>,
  oldModel: Readonly<RoleModel>,
  uniqueType: Readonly<UniqueType> = UniqueType.Throw,
  options?: {
    is_debug?: boolean;
  },
): Promise<RoleId | undefined> {
  
  options = options ?? { };
  options.is_debug = false;
  
  const isEquals = equalsByUnique(oldModel, input);
  
  if (isEquals) {
    if (uniqueType === UniqueType.Throw) {
      throw new UniqueException(await ns("此 {0} 已经存在", await ns("角色")));
    }
    if (uniqueType === UniqueType.Update) {
      const id: RoleId = await updateById(
        oldModel.id,
        {
          ...input,
          id: undefined,
        },
        options,
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
 * 根据条件查找第一个角色
 * @param {RoleSearch} search?
 */
export async function findOne(
  search?: Readonly<RoleSearch>,
  sort?: SortInput | SortInput[],
  options?: {
    is_debug?: boolean;
  },
): Promise<RoleModel | undefined> {
  
  const table = "base_role";
  const method = "findOne";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (search) {
      msg += ` search:${ getDebugSearch(search) }`;
    }
    if (sort) {
      msg += ` sort:${ JSON.stringify(sort) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (search && search.ids && search.ids.length === 0) {
    return;
  }
  const page: PageInput = {
    pgOffset: 0,
    pgSize: 1,
  };
  const models = await findAll(
    search,
    page,
    sort,
    options,
  );
  const model = models[0];
  return model;
}

/**
 * 根据 id 查找角色
 * @param {RoleId} id
 */
export async function findById(
  id?: RoleId | null,
  options?: {
    is_debug?: boolean;
  },
): Promise<RoleModel | undefined> {
  
  const table = "base_role";
  const method = "findById";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (id) {
      msg += ` id:${ id }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!id) {
    return;
  }
  
  const model = await findOne(
    {
      id,
    },
    undefined,
    options,
  );
  
  return model;
}

/** 根据 ids 查找角色 */
export async function findByIds(
  ids: RoleId[],
  options?: {
    is_debug?: boolean;
  },
): Promise<RoleModel[]> {
  
  const table = "base_role";
  const method = "findByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ ids }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || ids.length === 0) {
    return [ ];
  }
  
  const models = await findAll(
    {
      ids,
    },
    undefined,
    undefined,
    options,
  );
  
  if (models.length !== ids.length) {
    throw new Error("findByIds: models.length !== ids.length");
  }
  
  const models2 = ids.map((id) => {
    const model = models.find((item) => item.id === id);
    if (!model) {
      throw new Error(`findByIds: id: ${ id } not found`);
    }
    return model;
  });
  
  return models2;
}

/**
 * 根据搜索条件判断角色是否存在
 * @param {RoleSearch} search?
 */
export async function exist(
  search?: Readonly<RoleSearch>,
  options?: {
    is_debug?: boolean;
  },
): Promise<boolean> {
  
  const table = "base_role";
  const method = "exist";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (search) {
      msg += ` search:${ getDebugSearch(search) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  const model = await findOne(search, undefined, options);
  const exist = !!model;
  
  return exist;
}

/**
 * 根据id判断角色是否存在
 * @param {RoleId} id
 */
export async function existById(
  id?: Readonly<RoleId | null>,
  options?: {
    is_debug?: boolean;
  },
) {
  
  const table = "base_role";
  const method = "existById";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (id == null) {
    return false;
  }
  
  const args = new QueryArgs();
  const sql = `select 1 e from base_role t where t.id=${ args.push(id) } and t.is_deleted = 0 limit 1`;
  
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  const queryOptions = {
    cacheKey1,
    cacheKey2,
  };
  
  interface Result {
    e: number,
  }
  const model = await queryOne<Result>(
    sql,
    args,
    queryOptions,
  );
  const result = !!model?.e;
  
  return result;
}

/** 校验角色是否启用 */
export async function validateIsEnabled(
  model: Readonly<RoleModel>,
) {
  if (model.is_enabled == 0) {
    throw `${ await ns("角色") } ${ await ns("已禁用") }`;
  }
}

/** 校验角色是否存在 */
export async function validateOption(
  model?: RoleModel,
) {
  if (!model) {
    const err_msg = `${ await ns("角色") } ${ await ns("不存在") }`;
    error(new Error(err_msg));
    throw err_msg;
  }
  return model;
}

/**
 * 角色增加和修改时校验输入
 * @param input 
 */
export async function validate(
  input: Readonly<RoleInput>,
) {
  const fieldComments = await getFieldComments();
  
  // ID
  await validators.chars_max_length(
    input.id,
    22,
    fieldComments.id,
  );
  
  // 名称
  await validators.chars_max_length(
    input.lbl,
    45,
    fieldComments.lbl,
  );
  
  // 首页
  await validators.chars_max_length(
    input.home_url,
    200,
    fieldComments.home_url,
  );
  
  // 备注
  await validators.chars_max_length(
    input.rem,
    100,
    fieldComments.rem,
  );
  
  // 创建人
  await validators.chars_max_length(
    input.create_usr_id,
    22,
    fieldComments.create_usr_id,
  );
  
  // 更新人
  await validators.chars_max_length(
    input.update_usr_id,
    22,
    fieldComments.update_usr_id,
  );
  
}

/**
 * 创建角色
 * @param {RoleInput} input
 * @param {({
 *   uniqueType?: UniqueType,
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   update: 更新冲突数据
 * @return {Promise<RoleId>} 
 */
export async function create(
  input: Readonly<RoleInput>,
  options?: {
    is_debug?: boolean;
    uniqueType?: UniqueType;
    hasDataPermit?: boolean;
    is_silent_mode?: boolean;
  },
): Promise<RoleId> {
  
  const table = "base_role";
  const method = "create";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (input) {
      msg += ` input:${ JSON.stringify(input) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!input) {
    throw new Error(`input is required in dao: ${ table }`);
  }
  
  const [
    id,
  ] = await _creates([ input ], options);
  
  return id;
}

/**
 * 批量创建角色
 * @param {RoleInput[]} inputs
 * @param {({
 *   uniqueType?: UniqueType,
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   update: 更新冲突数据
 * @return {Promise<RoleId[]>} 
 */
export async function creates(
  inputs: RoleInput[],
  options?: {
    is_debug?: boolean;
    uniqueType?: UniqueType;
    hasDataPermit?: boolean;
    is_silent_mode?: boolean;
  },
): Promise<RoleId[]> {
  
  const table = "base_role";
  const method = "creates";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (inputs) {
      msg += ` inputs:${ JSON.stringify(inputs) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  const ids = await _creates(inputs, options);
  
  return ids;
}

async function _creates(
  inputs: RoleInput[],
  options?: {
    is_debug?: boolean;
    uniqueType?: UniqueType;
    hasDataPermit?: boolean;
    is_silent_mode?: boolean;
  },
): Promise<RoleId[]> {
  
  if (inputs.length === 0) {
    return [ ];
  }
  
  const table = "base_role";
  
  const is_silent_mode = get_is_silent_mode(options?.is_silent_mode);
  
  const ids2: RoleId[] = [ ];
  const inputs2: RoleInput[] = [ ];
  
  for (const input of inputs) {
  
    if (input.id) {
      throw new Error(`Can not set id when create in dao: ${ table }`);
    }
    
    const oldModels = await findByUnique(input, options);
    if (oldModels.length > 0) {
      let id: RoleId | undefined = undefined;
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
        ids2.push(id);
        continue;
      }
      inputs2.push(input);
    } else {
      inputs2.push(input);
    }
    
    {
      const {
        filterMenuIdsByTenant,
      } = await import("/src/base/tenant/tenant.dao.ts");
      
      input.menu_ids = await filterMenuIdsByTenant(input.menu_ids);
    }
    
    const id = shortUuidV4<RoleId>();
    input.id = id;
    ids2.push(id);
  }
  
  if (inputs2.length === 0) {
    return ids2;
  }
  
  const args = new QueryArgs();
  let sql = "insert into base_role(id,create_time,update_time,tenant_id,create_usr_id,create_usr_id_lbl,update_usr_id,update_usr_id_lbl,lbl,home_url,is_locked,is_enabled,order_by,rem)values";
  
  const inputs2Arr = splitCreateArr(inputs2);
  for (const inputs2 of inputs2Arr) {
    for (let i = 0; i < inputs2.length; i++) {
      const input = inputs2[i];
      sql += `(${ args.push(input.id) }`;
      if (!is_silent_mode) {
        if (input.create_time != null || input.create_time_save_null) {
          sql += `,${ args.push(input.create_time) }`;
        } else {
          sql += `,${ args.push(reqDate()) }`;
        }
      } else {
        if (input.create_time != null || input.create_time_save_null) {
          sql += `,${ args.push(input.create_time) }`;
        } else {
          sql += `,null`;
        }
      }
      if (input.update_time != null || input.update_time_save_null) {
        sql += `,${ args.push(input.update_time) }`;
      } else {
        sql += `,null`;
      }
      if (input.tenant_id == null) {
        const usr_id = await get_usr_id();
        const tenant_id = await getTenant_id(usr_id);
        if (tenant_id) {
          sql += `,${ args.push(tenant_id) }`;
        } else {
          sql += ",default";
        }
      } else if (input.tenant_id as unknown as string === "-") {
        sql += ",default";
      } else {
        sql += `,${ args.push(input.tenant_id) }`;
      }
      if (!is_silent_mode) {
        if (input.create_usr_id == null) {
          let usr_id = await get_usr_id();
          let usr_lbl = "";
          if (usr_id) {
            const usr_model = await findByIdUsr(usr_id, options);
            if (!usr_model) {
              usr_id = undefined;
            } else {
              usr_lbl = usr_model.lbl;
            }
          }
          if (usr_id != null) {
            sql += `,${ args.push(usr_id) }`;
          } else {
            sql += ",default";
          }
          sql += `,${ args.push(usr_lbl) }`;
        } else if (input.create_usr_id as unknown as string === "-") {
          sql += ",default";
          sql += ",default";
        } else {
          let usr_id: UsrId | undefined = input.create_usr_id;
          let usr_lbl = "";
          const usr_model = await findByIdUsr(usr_id, options);
          if (!usr_model) {
            usr_id = undefined;
            usr_lbl = "";
          } else {
            usr_lbl = usr_model.lbl;
          }
          if (usr_id) {
            sql += `,${ args.push(usr_id) }`;
          } else {
            sql += ",default";
          }
          sql += `,${ args.push(usr_lbl) }`;
        }
      } else {
        if (input.create_usr_id == null) {
          sql += ",default";
        } else {
          sql += `,${ args.push(input.create_usr_id) }`;
        }
        if (input.create_usr_id_lbl == null) {
          sql += ",default";
        } else {
          sql += `,${ args.push(input.create_usr_id_lbl) }`;
        }
      }
      if (input.update_usr_id != null) {
        sql += `,${ args.push(input.update_usr_id) }`;
      } else {
        sql += ",default";
      }
      if (input.update_usr_id_lbl != null) {
        sql += `,${ args.push(input.update_usr_id_lbl) }`;
      } else {
        sql += ",default";
      }
      if (input.lbl != null) {
        sql += `,${ args.push(input.lbl) }`;
      } else {
        sql += ",default";
      }
      if (input.home_url != null) {
        sql += `,${ args.push(input.home_url) }`;
      } else {
        sql += ",default";
      }
      if (input.is_locked != null) {
        sql += `,${ args.push(input.is_locked) }`;
      } else {
        sql += ",default";
      }
      if (input.is_enabled != null) {
        sql += `,${ args.push(input.is_enabled) }`;
      } else {
        sql += ",default";
      }
      if (input.order_by != null) {
        sql += `,${ args.push(input.order_by) }`;
      } else {
        sql += ",default";
      }
      if (input.rem != null) {
        sql += `,${ args.push(input.rem) }`;
      } else {
        sql += ",default";
      }
      sql += ")";
      if (i !== inputs2.length - 1) {
        sql += ",";
      }
    }
  }
  
  await delCache();
  
  const is_debug_sql = getParsedEnv("database_debug_sql") === "true";
  
  const res = await execute(sql, args, {
    debug: is_debug_sql,
  });
  const affectedRows = res.affectedRows;
  
  if (affectedRows !== inputs2.length) {
    throw new Error(`affectedRows: ${ affectedRows } != ${ inputs2.length }`);
  }
  
  for (let i = 0; i < inputs2.length; i++) {
    const input = inputs2[i];
    
    // 菜单权限
    await many2manyUpdate(
      input,
      "menu_ids",
      {
        mod: "base",
        table: "role_menu",
        column1: "role_id",
        column2: "menu_id",
      },
    );
    
    // 按钮权限
    await many2manyUpdate(
      input,
      "permit_ids",
      {
        mod: "base",
        table: "role_permit",
        column1: "role_id",
        column2: "permit_id",
      },
    );
    
    // 数据权限
    await many2manyUpdate(
      input,
      "data_permit_ids",
      {
        mod: "base",
        table: "role_data_permit",
        column1: "role_id",
        column2: "data_permit_id",
      },
    );
  }
  
  await delCache();
  
  return ids2;
}

/**
 * 删除缓存
 */
export async function delCache() {
  await delCacheCtx(`dao.sql.base_role`);
  await delCacheCtx(`dao.sql.base_menu._getMenus`);
}

/**
 * 角色根据id修改租户id
 * @param {RoleId} id
 * @param {TenantId} tenant_id
 * @param {{
 *   }} [options]
 * @return {Promise<number>}
 */
export async function updateTenantById(
  id: RoleId,
  tenant_id: Readonly<TenantId>,
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "updateTenantById";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (id) {
      msg += ` id:${ id } `;
    }
    if (tenant_id) {
      msg += ` tenant_id:${ tenant_id }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  const tenantExist = await existByIdTenant(tenant_id, options);
  if (!tenantExist) {
    return 0;
  }
  
  const args = new QueryArgs();
  const sql = `update base_role set tenant_id=${ args.push(tenant_id) } where id=${ args.push(id) }`;
  const res = await execute(sql, args);
  const affectedRows = res.affectedRows;
  
  await delCache();
  return affectedRows;
}

/**
 * 根据 id 修改角色
 * @param {RoleId} id
 * @param {RoleInput} input
 * @param {({
 *   uniqueType?: Exclude<UniqueType, UniqueType.Update>;
 * })} options? 唯一约束冲突时的处理选项, 默认为 UniqueType.Throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   create: 级联插入新数据
 * @return {Promise<RoleId>}
 */
export async function updateById(
  id: RoleId,
  input: RoleInput,
  options?: {
    is_debug?: boolean;
    uniqueType?: Exclude<UniqueType, UniqueType.Update>;
    is_silent_mode?: boolean;
    is_creating?: boolean;
  },
): Promise<RoleId> {
  
  const table = "base_role";
  const method = "updateById";
  
  const is_debug = get_is_debug(options?.is_debug);
  const is_silent_mode = get_is_silent_mode(options?.is_silent_mode);
  const is_creating = get_is_creating(options?.is_creating);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (id) {
      msg += ` id:${ id }`;
    }
    if (input) {
      msg += ` input:${ JSON.stringify(input) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!id) {
    throw new Error("updateById: id cannot be empty");
  }
  if (!input) {
    throw new Error("updateById: input cannot be null");
  }
  
  // 修改租户id
  if (isNotEmpty(input.tenant_id)) {
    await updateTenantById(id, input.tenant_id, options);
  }
  
  {
    const input2 = {
      ...input,
      id: undefined,
    };
    let models = await findByUnique(input2, options);
    models = models.filter((item) => item.id !== id);
    if (models.length > 0) {
      if (!options || !options.uniqueType || options.uniqueType === UniqueType.Throw) {
        throw await ns("此 {0} 已经存在", await ns("角色"));
      } else if (options.uniqueType === UniqueType.Ignore) {
        return id;
      }
    }
  }
  
  const oldModel = await findById(id, options);
  
  if (!oldModel) {
    throw await ns("编辑失败, 此 {0} 已被删除", await ns("角色"));
  }
  
  {
    const {
      filterMenuIdsByTenant,
    } = await import("/src/base/tenant/tenant.dao.ts");
    
    input.menu_ids = await filterMenuIdsByTenant(input.menu_ids);
  }
  
  const args = new QueryArgs();
  let sql = `update base_role set `;
  let updateFldNum = 0;
  if (input.lbl != null) {
    if (input.lbl != oldModel.lbl) {
      sql += `lbl=${ args.push(input.lbl) },`;
      updateFldNum++;
    }
  }
  if (input.home_url != null) {
    if (input.home_url != oldModel.home_url) {
      sql += `home_url=${ args.push(input.home_url) },`;
      updateFldNum++;
    }
  }
  if (input.is_locked != null) {
    if (input.is_locked != oldModel.is_locked) {
      sql += `is_locked=${ args.push(input.is_locked) },`;
      updateFldNum++;
    }
  }
  if (input.is_enabled != null) {
    if (input.is_enabled != oldModel.is_enabled) {
      sql += `is_enabled=${ args.push(input.is_enabled) },`;
      updateFldNum++;
    }
  }
  if (input.order_by != null) {
    if (input.order_by != oldModel.order_by) {
      sql += `order_by=${ args.push(input.order_by) },`;
      updateFldNum++;
    }
  }
  if (input.rem != null) {
    if (input.rem != oldModel.rem) {
      sql += `rem=${ args.push(input.rem) },`;
      updateFldNum++;
    }
  }
  if (isNotEmpty(input.create_usr_id_lbl)) {
    sql += `create_usr_id_lbl=?,`;
    args.push(input.create_usr_id_lbl);
    updateFldNum++;
  }
  if (input.create_usr_id != null) {
    if (input.create_usr_id != oldModel.create_usr_id) {
      sql += `create_usr_id=${ args.push(input.create_usr_id) },`;
      updateFldNum++;
    }
  }
  if (input.create_time != null || input.create_time_save_null) {
    if (input.create_time != oldModel.create_time) {
      sql += `create_time=${ args.push(input.create_time) },`;
      updateFldNum++;
    }
  }
  let sqlSetFldNum = updateFldNum;
  
  updateFldNum++;
  
  // 菜单权限
  await many2manyUpdate(
    {
      ...input,
      id: id as unknown as string,
    },
    "menu_ids",
    {
      mod: "base",
      table: "role_menu",
      column1: "role_id",
      column2: "menu_id",
    },
  );
  
  updateFldNum++;
  
  // 按钮权限
  await many2manyUpdate(
    {
      ...input,
      id: id as unknown as string,
    },
    "permit_ids",
    {
      mod: "base",
      table: "role_permit",
      column1: "role_id",
      column2: "permit_id",
    },
  );
  
  updateFldNum++;
  
  // 数据权限
  await many2manyUpdate(
    {
      ...input,
      id: id as unknown as string,
    },
    "data_permit_ids",
    {
      mod: "base",
      table: "role_data_permit",
      column1: "role_id",
      column2: "data_permit_id",
    },
  );
  
  if (updateFldNum > 0) {
    if (!is_silent_mode && !is_creating) {
      if (input.update_usr_id == null) {
        let usr_id = await get_usr_id();
        let usr_lbl = "";
        if (usr_id) {
          const usr_model = await findByIdUsr(usr_id, options);
          if (!usr_model) {
            usr_id = undefined;
          } else {
            usr_lbl = usr_model.lbl;
          }
        }
        if (usr_id != null) {
          sql += `update_usr_id=${ args.push(usr_id) },`;
        }
        if (usr_lbl) {
          sql += `update_usr_id_lbl=${ args.push(usr_lbl) },`;
        }
      } else if (input.update_usr_id && input.update_usr_id as unknown as string !== "-") {
        let usr_id: UsrId | undefined = input.update_usr_id;
        let usr_lbl = "";
        if (usr_id) {
          const usr_model = await findByIdUsr(usr_id, options);
          if (!usr_model) {
            usr_id = undefined;
          } else {
            usr_lbl = usr_model.lbl;
          }
        }
        if (usr_id) {
          sql += `update_usr_id=${ args.push(usr_id) },`;
          sql += `update_usr_id_lbl=${ args.push(usr_lbl) },`;
        }
      }
    } else {
      if (input.update_usr_id != null) {
        sql += `update_usr_id=${ args.push(input.update_usr_id) },`;
      }
      if (input.update_usr_id_lbl != null) {
        sql += `update_usr_id_lbl=${ args.push(input.update_usr_id_lbl) },`;
      }
    }
    if (!is_silent_mode && !is_creating) {
      if (input.update_time != null || input.update_time_save_null) {
        sql += `update_time=${ args.push(input.update_time) },`;
      } else {
        sql += `update_time=${ args.push(reqDate()) },`;
      }
    } else if (input.update_time != null || input.update_time_save_null) {
      sql += `update_time=${ args.push(input.update_time) },`;
    }
    if (sql.endsWith(",")) {
      sql = sql.substring(0, sql.length - 1);
    }
    sql += ` where id=${ args.push(id) } limit 1`;
    
    await delCache();
    
    if (sqlSetFldNum > 0) {
      await execute(sql, args);
    }
  }
  
  if (updateFldNum > 0) {
    await delCache();
  }
  
  if (!is_silent_mode) {
    const newModel = await findById(id, options);
    
    if (!deepCompare(oldModel, newModel)) {
      log(JSON.stringify(oldModel));
    }
  }
  
  return id;
}

/**
 * 根据 ids 删除角色
 * @param {RoleId[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: RoleId[],
  options?: {
    is_debug?: boolean;
    is_silent_mode?: boolean;
    is_creating?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "deleteByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  const is_silent_mode = get_is_silent_mode(options?.is_silent_mode);
  const is_creating = get_is_creating(options?.is_creating);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ JSON.stringify(ids) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  await delCache();
  
  let affectedRows = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const oldModel = await findById(id, options);
    if (!oldModel) {
      continue;
    }
    const args = new QueryArgs();
    let sql = `update base_role set is_deleted=1`;
    if (!is_silent_mode && !is_creating) {
      let usr_id = await get_usr_id();
      if (usr_id != null) {
        sql += `,delete_usr_id=${ args.push(usr_id) }`;
      }
      let usr_lbl = "";
      if (usr_id) {
        const usr_model = await findByIdUsr(usr_id, options);
        if (!usr_model) {
          usr_id = undefined;
        } else {
          usr_lbl = usr_model.lbl;
        }
      }
      if (usr_lbl) {
        sql += `,delete_usr_id_lbl=${ args.push(usr_lbl) }`;
      }
      sql += `,delete_time=${ args.push(reqDate()) }`;
    }
    sql += ` where id=${ args.push(id) } limit 1`;
    const res = await execute(sql, args);
    affectedRows += res.affectedRows;
    {
      const menu_ids = oldModel.menu_ids;
      if (menu_ids && menu_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `update base_role_menu set is_deleted=1 where menu_id in ${ args.push(menu_ids) } and is_deleted=0`;
        await execute(sql, args);
      }
    }
    {
      const permit_ids = oldModel.permit_ids;
      if (permit_ids && permit_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `update base_role_permit set is_deleted=1 where permit_id in ${ args.push(permit_ids) } and is_deleted=0`;
        await execute(sql, args);
      }
    }
    {
      const data_permit_ids = oldModel.data_permit_ids;
      if (data_permit_ids && data_permit_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `update base_role_data_permit set is_deleted=1 where data_permit_id in ${ args.push(data_permit_ids) } and is_deleted=0`;
        await execute(sql, args);
      }
    }
    {
      const args = new QueryArgs();
      const sql = `update base_usr_role set is_deleted=1 where role_id=${ args.push(id) } and is_deleted=0`;
      await execute(sql, args);
    }
  }
  
  await delCache();
  
  return affectedRows;
}

/**
 * 根据 ID 查找角色是否已启用
 * 不存在则返回 undefined
 * @param {RoleId} id
 * @return {Promise<0 | 1 | undefined>}
 */
export async function getIsEnabledById(
  id: RoleId,
  options?: {
    is_debug?: boolean;
  },
): Promise<0 | 1 | undefined> {
  
  options = options ?? { };
  options.is_debug = false;
  
  const model = await findById(
    id,
    options,
  );
  const is_enabled = model?.is_enabled as (0 | 1 | undefined);
  
  return is_enabled;
}

/**
 * 根据 ids 启用或者禁用角色
 * @param {RoleId[]} ids
 * @param {0 | 1} is_enabled
 * @return {Promise<number>}
 */
export async function enableByIds(
  ids: RoleId[],
  is_enabled: Readonly<0 | 1>,
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "enableByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ JSON.stringify(ids) }`;
    }
    if (is_enabled != null) {
      msg += ` is_enabled:${ is_enabled }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  const args = new QueryArgs();
  const sql = `update base_role set is_enabled=${ args.push(is_enabled) } where id in ${ args.push(ids) }`;
  const result = await execute(sql, args);
  const num = result.affectedRows;
  
  await delCache();
  
  return num;
}

/**
 * 根据 ID 查找角色是否已锁定
 * 已锁定的不能修改和删除
 * 不存在则返回 undefined
 * @param {RoleId} id
 * @return {Promise<0 | 1 | undefined>}
 */
export async function getIsLockedById(
  id: RoleId,
  options?: {
    is_debug?: boolean;
  },
): Promise<0 | 1 | undefined> {
  
  options = options ?? { };
  options.is_debug = false;
  
  const model = await findById(
    id,
    options,
  );
  const is_locked = model?.is_locked as (0 | 1 | undefined);
  
  return is_locked;
}

/**
 * 根据 ids 锁定或者解锁角色
 * @param {RoleId[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function lockByIds(
  ids: RoleId[],
  is_locked: Readonly<0 | 1>,
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "lockByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ JSON.stringify(ids) }`;
    }
    if (is_locked != null) {
      msg += ` is_locked:${ is_locked }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  await delCache();
  
  const args = new QueryArgs();
  let sql = `update base_role set is_locked=${ args.push(is_locked) } where id in ${ args.push(ids) }`;
  const result = await execute(sql, args);
  const num = result.affectedRows;
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 还原角色
 * @param {RoleId[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: RoleId[],
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "revertByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ JSON.stringify(ids) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  await delCache();
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id: RoleId = ids[i];
    const args = new QueryArgs();
    const sql = `update base_role set is_deleted = 0 where id=${ args.push(id) } limit 1`;
    const result = await execute(sql, args);
    num += result.affectedRows;
    // 检查数据的唯一索引
    {
      const old_model = await findById(
        id,
        options,
      );
      if (!old_model) {
        continue;
      }
      const input = {
        ...old_model,
        id: undefined,
      } as RoleInput;
      let models = await findByUnique(input, options);
      models = models.filter((item) => item.id !== id);
      if (models.length > 0) {
        throw await ns("此 {0} 已经存在", await ns("角色"));
      }
    }
  }
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 彻底删除角色
 * @param {RoleId[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: RoleId[],
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "forceDeleteByIds";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (ids) {
      msg += ` ids:${ JSON.stringify(ids) }`;
    }
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  await delCache();
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const oldModel = await findOne(
      {
        id,
        is_deleted: 1,
      },
      undefined,
      options,
    );
    log("forceDeleteByIds:", oldModel);
    const args = new QueryArgs();
    const sql = `delete from base_role where id=${ args.push(id) } and is_deleted = 1 limit 1`;
    const result = await execute(sql, args);
    num += result.affectedRows;
    if (oldModel) {
      const menu_ids = oldModel.menu_ids;
      if (menu_ids && menu_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `delete from base_role_menu where menu_id in ${ args.push(menu_ids) }`;
        await execute(sql, args);
      }
    }
    if (oldModel) {
      const permit_ids = oldModel.permit_ids;
      if (permit_ids && permit_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `delete from base_role_permit where permit_id in ${ args.push(permit_ids) }`;
        await execute(sql, args);
      }
    }
    if (oldModel) {
      const data_permit_ids = oldModel.data_permit_ids;
      if (data_permit_ids && data_permit_ids.length > 0) {
        const args = new QueryArgs();
        const sql = `delete from base_role_data_permit where data_permit_id in ${ args.push(data_permit_ids) }`;
        await execute(sql, args);
      }
    }
    {
      const args = new QueryArgs();
      const sql = `delete from base_usr_role where role_id=${ args.push(id) }`;
      await execute(sql, args);
    }
  }
  
  await delCache();
  
  return num;
}
  
/**
 * 查找 角色 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
  options?: {
    is_debug?: boolean;
  },
): Promise<number> {
  
  const table = "base_role";
  const method = "findLastOrderBy";
  
  const is_debug = get_is_debug(options?.is_debug);
  
  if (is_debug !== false) {
    let msg = `${ table }.${ method }:`;
    if (options && Object.keys(options).length > 0) {
      msg += ` options:${ JSON.stringify(options) }`;
    }
    log(msg);
    options = options ?? { };
    options.is_debug = false;
  }
  
  let sql = `select t.order_by order_by from base_role t`;
  const whereQuery: string[] = [ ];
  const args = new QueryArgs();
  whereQuery.push(` t.is_deleted=0`);
  {
    const usr_id = await get_usr_id();
    const tenant_id = await getTenant_id(usr_id);
    whereQuery.push(` t.tenant_id=${ args.push(tenant_id) }`);
  }
  if (whereQuery.length > 0) {
    sql += " where " + whereQuery.join(" and ");
  }
  sql += ` order by t.order_by desc limit 1`;
  
  interface Result {
    order_by: number;
  }
  let model = await queryOne<Result>(sql, args);
  let result = model?.order_by ?? 0;
  
  return result;
}
