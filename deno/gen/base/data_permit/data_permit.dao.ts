// deno-lint-ignore-file prefer-const no-unused-vars ban-types require-await
import {
  escapeId,
  escape,
} from "sqlstring";

import dayjs from "dayjs";

import {
  log,
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

import type {
  PartialNull,
} from "/typings/types.ts";

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

import * as dictSrcDao from "/src/base/dict_detail/dict_detail.dao.ts";

import { UniqueException } from "/lib/exceptions/unique.execption.ts";

import * as authDao from "/lib/auth/auth.dao.ts";

import {
  UniqueType,
  SortOrderEnum,
} from "/gen/types.ts";

import type {
  PageInput,
  SortInput,
} from "/gen/types.ts";

import type {
  DataPermitInput,
  DataPermitModel,
  DataPermitSearch,
  DataPermitFieldComment,
} from "./data_permit.model.ts";

import * as menuDao from "/gen/base/menu/menu.dao.ts";

const route_path = "/base/data_permit";

async function getWhereQuery(
  args: QueryArgs,
  search?: DataPermitSearch,
  options?: {
  },
): Promise<string> {
  let whereQuery = "";
  whereQuery += ` t.is_deleted = ${ args.push(search?.is_deleted == null ? 0 : search.is_deleted) }`;
  if (isNotEmpty(search?.id)) {
    whereQuery += ` and t.id = ${ args.push(search?.id) }`;
  }
  if (search?.ids && !Array.isArray(search?.ids)) {
    search.ids = [ search.ids ];
  }
  if (search?.ids && search?.ids.length > 0) {
    whereQuery += ` and t.id in ${ args.push(search.ids) }`;
  }
  if (search?.menu_id && !Array.isArray(search?.menu_id)) {
    search.menu_id = [ search.menu_id ];
  }
  if (search?.menu_id && search?.menu_id.length > 0) {
    whereQuery += ` and menu_id_lbl.id in ${ args.push(search.menu_id) }`;
  }
  if (search?.menu_id === null) {
    whereQuery += ` and menu_id_lbl.id is null`;
  }
  if (search?.menu_id_is_null) {
    whereQuery += ` and menu_id_lbl.id is null`;
  }
  if (search?.lbl !== undefined) {
    whereQuery += ` and t.lbl = ${ args.push(search.lbl) }`;
  }
  if (search?.lbl === null) {
    whereQuery += ` and t.lbl is null`;
  }
  if (isNotEmpty(search?.lbl_like)) {
    whereQuery += ` and t.lbl like ${ args.push(sqlLike(search?.lbl_like) + "%") }`;
  }
  if (search?.scope && !Array.isArray(search?.scope)) {
    search.scope = [ search.scope ];
  }
  if (search?.scope && search?.scope?.length > 0) {
    whereQuery += ` and t.scope in ${ args.push(search.scope) }`;
  }
  if (search?.type && !Array.isArray(search?.type)) {
    search.type = [ search.type ];
  }
  if (search?.type && search?.type?.length > 0) {
    whereQuery += ` and t.type in ${ args.push(search.type) }`;
  }
  if (search?.rem !== undefined) {
    whereQuery += ` and t.rem = ${ args.push(search.rem) }`;
  }
  if (search?.rem === null) {
    whereQuery += ` and t.rem is null`;
  }
  if (isNotEmpty(search?.rem_like)) {
    whereQuery += ` and t.rem like ${ args.push(sqlLike(search?.rem_like) + "%") }`;
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
  if (search?.update_usr_id && !Array.isArray(search?.update_usr_id)) {
    search.update_usr_id = [ search.update_usr_id ];
  }
  if (search?.update_usr_id && search?.update_usr_id.length > 0) {
    whereQuery += ` and update_usr_id_lbl.id in ${ args.push(search.update_usr_id) }`;
  }
  if (search?.update_usr_id === null) {
    whereQuery += ` and update_usr_id_lbl.id is null`;
  }
  if (search?.update_usr_id_is_null) {
    whereQuery += ` and update_usr_id_lbl.id is null`;
  }
  if (search?.update_time && search?.update_time?.length > 0) {
    if (search.update_time[0] != null) {
      whereQuery += ` and t.update_time >= ${ args.push(search.update_time[0]) }`;
    }
    if (search.update_time[1] != null) {
      whereQuery += ` and t.update_time <= ${ args.push(search.update_time[1]) }`;
    }
  }
  if (search?.is_sys && !Array.isArray(search?.is_sys)) {
    search.is_sys = [ search.is_sys ];
  }
  if (search?.is_sys && search?.is_sys?.length > 0) {
    whereQuery += ` and t.is_sys in ${ args.push(search.is_sys) }`;
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
    base_data_permit t
    left join base_menu menu_id_lbl
      on menu_id_lbl.id = t.menu_id
    left join base_usr create_usr_id_lbl
      on create_usr_id_lbl.id = t.create_usr_id
    left join base_usr update_usr_id_lbl
      on update_usr_id_lbl.id = t.update_usr_id
  `;
  return fromQuery;
}

/**
 * 根据条件查找总数据数
 * @param { DataPermitSearch } search?
 * @return {Promise<number>}
 */
export async function findCount(
  search?: DataPermitSearch,
  options?: {
  },
): Promise<number> {
  const table = "base_data_permit";
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
        where
          ${ await getWhereQuery(args, search, options) }
        group by t.id
      ) t
  `;
  
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  interface Result {
    total: number,
  }
  const model = await queryOne<Result>(sql, args, { cacheKey1, cacheKey2 });
  let result = model?.total || 0;
  
  return result;
}

/**
 * 根据搜索条件和分页查找数据
 * @param {DataPermitSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 */
export async function findAll(
  search?: DataPermitSearch,
  page?: PageInput,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<DataPermitModel[]> {
  const table = "base_data_permit";
  const method = "findAll";
  
  const args = new QueryArgs();
  let sql = `
    select t.*
      ,menu_id_lbl.lbl menu_id_lbl
      ,create_usr_id_lbl.lbl create_usr_id_lbl
      ,update_usr_id_lbl.lbl update_usr_id_lbl
    from
      ${ await getFromQuery() }
    where
      ${ await getWhereQuery(args, search, options) }
    group by t.id
  `;
  
  // 排序
  if (!sort) {
    sort = [
      {
        prop: "update_time",
        order: SortOrderEnum.Desc,
      },
    ];
  } else if (!Array.isArray(sort)) {
    sort = [ sort ];
  }
  sort = sort.filter((item) => item.prop);
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
  
  // 缓存
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  const result = await query<DataPermitModel>(
    sql,
    args,
    {
      cacheKey1,
      cacheKey2,
    },
  );
  
  const [
    scopeDict, // 范围
    typeDict, // 类型
    is_sysDict, // 系统字段
  ] = await dictSrcDao.getDict([
    "data_permit_scope",
    "data_permit_type",
    "is_sys",
  ]);
  
  for (let i = 0; i < result.length; i++) {
    const model = result[i];
    
    // 范围
    let scope_lbl = model.scope;
    if (!isEmpty(model.scope)) {
      const dictItem = scopeDict.find((dictItem) => dictItem.val === model.scope);
      if (dictItem) {
        scope_lbl = dictItem.lbl;
      }
    }
    model.scope_lbl = scope_lbl;
    
    // 类型
    let type_lbl = model.type;
    if (!isEmpty(model.type)) {
      const dictItem = typeDict.find((dictItem) => dictItem.val === model.type);
      if (dictItem) {
        type_lbl = dictItem.lbl;
      }
    }
    model.type_lbl = type_lbl;
    
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
    
    // 系统字段
    let is_sys_lbl = model.is_sys?.toString() || "";
    if (model.is_sys !== undefined && model.is_sys !== null) {
      const dictItem = is_sysDict.find((dictItem) => dictItem.val === model.is_sys.toString());
      if (dictItem) {
        is_sys_lbl = dictItem.lbl;
      }
    }
    model.is_sys_lbl = is_sys_lbl;
  }
  
  return result;
}

/**
 * 获取字段对应的名称
 */
export async function getFieldComments(): Promise<DataPermitFieldComment> {
  const n = initN(route_path);
  const fieldComments: DataPermitFieldComment = {
    id: await n("ID"),
    menu_id: await n("菜单"),
    menu_id_lbl: await n("菜单"),
    lbl: await n("名称"),
    scope: await n("范围"),
    scope_lbl: await n("范围"),
    type: await n("类型"),
    type_lbl: await n("类型"),
    rem: await n("备注"),
    create_usr_id: await n("创建人"),
    create_usr_id_lbl: await n("创建人"),
    create_time: await n("创建时间"),
    create_time_lbl: await n("创建时间"),
    update_usr_id: await n("更新人"),
    update_usr_id_lbl: await n("更新人"),
    update_time: await n("更新时间"),
    update_time_lbl: await n("更新时间"),
    is_sys: await n("系统字段"),
    is_sys_lbl: await n("系统字段"),
  };
  return fieldComments;
}

/**
 * 通过唯一约束获得数据列表
 * @param {DataPermitSearch | PartialNull<DataPermitModel>} search0
 */
export async function findByUnique(
  search0: DataPermitSearch | PartialNull<DataPermitModel>,
  options?: {
  },
): Promise<DataPermitModel[]> {
  if (search0.id) {
    const model = await findOne({
      id: search0.id,
    });
    if (!model) {
      return [ ];
    }
    return [ model ];
  }
  const models: DataPermitModel[] = [ ];
  {
    if (search0.menu_id == null) {
      return [ ];
    }
    let menu_id: string[] = [ ];
    if (!Array.isArray(search0.menu_id)) {
      menu_id.push(search0.menu_id);
    } else {
      menu_id = search0.menu_id;
    }
    if (search0.scope == null) {
      return [ ];
    }
    let scope: string[] = [ ];
    if (!Array.isArray(search0.scope)) {
      scope.push(search0.scope);
    } else {
      scope = search0.scope;
    }
    const modelTmps = await findAll({
      menu_id,
      scope,
    });
    models.push(...modelTmps);
  }
  return models;
}

/**
 * 根据唯一约束对比对象是否相等
 * @param {DataPermitModel} oldModel
 * @param {PartialNull<DataPermitModel>} model
 * @return {boolean}
 */
export function equalsByUnique(
  oldModel: DataPermitModel,
  model: PartialNull<DataPermitModel>,
): boolean {
  if (!oldModel || !model) {
    return false;
  }
  if (
    oldModel.menu_id === model.menu_id &&
    oldModel.scope === model.scope
  ) {
    return true;
  }
  return false;
}

/**
 * 通过唯一约束检查数据是否已经存在
 * @param {DataPermitInput} model
 * @param {DataPermitModel} oldModel
 * @param {UniqueType} uniqueType
 * @return {Promise<string>}
 */
export async function checkByUnique(
  model: DataPermitInput,
  oldModel: DataPermitModel,
  uniqueType: UniqueType = UniqueType.Throw,
  options?: {
  },
): Promise<string | undefined> {
  const isEquals = equalsByUnique(oldModel, model);
  if (isEquals) {
    if (uniqueType === UniqueType.Throw) {
      throw new UniqueException(await ns("数据已经存在"));
    }
    if (uniqueType === UniqueType.Update) {
      const result = await updateById(
        oldModel.id,
        {
          ...model,
          id: undefined,
        },
        options
      );
      return result;
    }
    if (uniqueType === UniqueType.Ignore) {
      return;
    }
  }
  return;
}

/**
 * 根据条件查找第一条数据
 * @param {DataPermitSearch} search?
 */
export async function findOne(
  search?: DataPermitSearch,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<DataPermitModel | undefined> {
  const page: PageInput = {
    pgOffset: 0,
    pgSize: 1,
  };
  const result = await findAll(search, page, sort);
  if (result && result.length > 0) {
    return result[0];
  }
  return;
}

/**
 * 根据id查找数据
 * @param {string} id
 */
export async function findById(
  id?: string | null,
  options?: {
  },
): Promise<DataPermitModel | undefined> {
  if (isEmpty(id)) {
    return;
  }
  const model = await findOne({ id });
  return model;
}

/**
 * 根据搜索条件判断数据是否存在
 * @param {DataPermitSearch} search?
 */
export async function exist(
  search?: DataPermitSearch,
  options?: {
  },
): Promise<boolean> {
  const model = await findOne(search);
  const exist = !!model;
  return exist;
}

/**
 * 根据id判断数据是否存在
 * @param {string} id
 */
export async function existById(
  id?: string | null,
) {
  const table = "base_data_permit";
  const method = "existById";
  
  if (isEmpty(id)) {
    return false;
  }
  
  const args = new QueryArgs();
  const sql = `
    select
      1 e
    from
      base_data_permit t
    where
      t.id = ${ args.push(id) }
      and t.is_deleted = 0
    limit 1
  `;
  
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  interface Result {
    e: number,
  }
  let model = await queryOne<Result>(
    sql,
    args,{ cacheKey1, cacheKey2 },
  );
  let result = !!model?.e;
  
  return result;
}

/**
 * 增加和修改时校验输入
 * @param input 
 */
export async function validate(
  input: DataPermitInput,
) {
  const fieldComments = await getFieldComments();
  
  // ID
  await validators.chars_max_length(
    input.id,
    22,
    fieldComments.id,
  );
  
  // 菜单
  await validators.chars_max_length(
    input.menu_id,
    22,
    fieldComments.menu_id,
  );
  
  // 名称
  await validators.chars_max_length(
    input.lbl,
    100,
    fieldComments.lbl,
  );
  
  // 范围
  await validators.chars_max_length(
    input.scope,
    10,
    fieldComments.scope,
  );
  
  // 类型
  await validators.chars_max_length(
    input.type,
    10,
    fieldComments.type,
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
 * 创建数据
 * @param {DataPermitInput} input
 * @param {({
 *   uniqueType?: UniqueType,
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   update: 更新冲突数据
 * @return {Promise<string>} 
 */
export async function create(
  input: DataPermitInput,
  options?: {
    uniqueType?: UniqueType;
  },
): Promise<string> {
  const table = "base_data_permit";
  const method = "create";
  
  const [
    scopeDict, // 范围
    typeDict, // 类型
    is_sysDict, // 系统字段
  ] = await dictSrcDao.getDict([
    "data_permit_scope",
    "data_permit_type",
    "is_sys",
  ]);
  
  // 菜单
  if (isNotEmpty(input.menu_id_lbl) && input.menu_id === undefined) {
    input.menu_id_lbl = String(input.menu_id_lbl).trim();
    const menuModel = await menuDao.findOne({ lbl: input.menu_id_lbl });
    if (menuModel) {
      input.menu_id = menuModel.id;
    }
  }
  
  // 范围
  if (isNotEmpty(input.scope_lbl) && input.scope === undefined) {
    const val = scopeDict.find((itemTmp) => itemTmp.lbl === input.scope_lbl)?.val;
    if (val !== undefined) {
      input.scope = val;
    }
  }
  
  // 类型
  if (isNotEmpty(input.type_lbl) && input.type === undefined) {
    const val = typeDict.find((itemTmp) => itemTmp.lbl === input.type_lbl)?.val;
    if (val !== undefined) {
      input.type = val;
    }
  }
  
  // 系统字段
  if (isNotEmpty(input.is_sys_lbl) && input.is_sys === undefined) {
    const val = is_sysDict.find((itemTmp) => itemTmp.lbl === input.is_sys_lbl)?.val;
    if (val !== undefined) {
      input.is_sys = Number(val);
    }
  }
  
  const oldModels = await findByUnique(input, options);
  if (oldModels.length > 0) {
    let id: string | undefined = undefined;
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
  
  if (!input.id) {
    input.id = shortUuidV4();
  }
  
  const args = new QueryArgs();
  let sql = `
    insert into base_data_permit(
      id
      ,create_time
      ,update_time
  `;
  if (input.create_usr_id != null) {
    sql += `,create_usr_id`;
  } else {
    const authModel = await authDao.getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,create_usr_id`;
    }
  }
  if (input.update_usr_id != null) {
    sql += `,update_usr_id`;
  } else {
    const authModel = await authDao.getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,update_usr_id`;
    }
  }
  if (input.menu_id !== undefined) {
    sql += `,menu_id`;
  }
  if (input.lbl !== undefined) {
    sql += `,lbl`;
  }
  if (input.scope !== undefined) {
    sql += `,scope`;
  }
  if (input.type !== undefined) {
    sql += `,type`;
  }
  if (input.rem !== undefined) {
    sql += `,rem`;
  }
  if (input.is_sys !== undefined) {
    sql += `,is_sys`;
  }
  sql += `) values(${ args.push(input.id) },${ args.push(reqDate()) },${ args.push(reqDate()) }`;
  if (input.create_usr_id != null && input.create_usr_id !== "-") {
    sql += `,${ args.push(input.create_usr_id) }`;
  } else {
    const authModel = await authDao.getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,${ args.push(authModel.id) }`;
    }
  }
  if (input.update_usr_id != null && input.update_usr_id !== "-") {
    sql += `,${ args.push(input.update_usr_id) }`;
  } else {
    const authModel = await authDao.getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,${ args.push(authModel.id) }`;
    }
  }
  if (input.menu_id !== undefined) {
    sql += `,${ args.push(input.menu_id) }`;
  }
  if (input.lbl !== undefined) {
    sql += `,${ args.push(input.lbl) }`;
  }
  if (input.scope !== undefined) {
    sql += `,${ args.push(input.scope) }`;
  }
  if (input.type !== undefined) {
    sql += `,${ args.push(input.type) }`;
  }
  if (input.rem !== undefined) {
    sql += `,${ args.push(input.rem) }`;
  }
  if (input.is_sys !== undefined) {
    sql += `,${ args.push(input.is_sys) }`;
  }
  sql += `)`;
  
  const result = await execute(sql, args);
  
  await delCache();
  
  return input.id;
}

/**
 * 删除缓存
 */
export async function delCache() {
  const table = "base_data_permit";
  const method = "delCache";
  
  await delCacheCtx(`dao.sql.${ table }`);
  const foreignTables: string[] = [
    "base_menu",
    "base_usr",
  ];
  for (let k = 0; k < foreignTables.length; k++) {
    const foreignTable = foreignTables[k];
    if (foreignTable === table) continue;
    await delCacheCtx(`dao.sql.${ foreignTable }`);
  }
}

/**
 * 根据id修改一行数据
 * @param {string} id
 * @param {DataPermitInput} input
 * @param {({
 *   uniqueType?: "ignore" | "throw" | "update",
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   create: 级联插入新数据
 * @return {Promise<string>}
 */
export async function updateById(
  id: string,
  input: DataPermitInput,
  options?: {
    uniqueType?: "ignore" | "throw" | "create";
  },
): Promise<string> {
  const table = "base_data_permit";
  const method = "updateById";
  
  if (!id) {
    throw new Error("updateById: id cannot be empty");
  }
  if (!input) {
    throw new Error("updateById: input cannot be null");
  }
  
  const [
    scopeDict, // 范围
    typeDict, // 类型
    is_sysDict, // 系统字段
  ] = await dictSrcDao.getDict([
    "data_permit_scope",
    "data_permit_type",
    "is_sys",
  ]);
  
  // 菜单
  if (isNotEmpty(input.menu_id_lbl) && input.menu_id === undefined) {
    input.menu_id_lbl = String(input.menu_id_lbl).trim();
    const menuModel = await menuDao.findOne({ lbl: input.menu_id_lbl });
    if (menuModel) {
      input.menu_id = menuModel.id;
    }
  }
  
  // 范围
  if (isNotEmpty(input.scope_lbl) && input.scope === undefined) {
    const val = scopeDict.find((itemTmp) => itemTmp.lbl === input.scope_lbl)?.val;
    if (val !== undefined) {
      input.scope = val;
    }
  }
  
  // 类型
  if (isNotEmpty(input.type_lbl) && input.type === undefined) {
    const val = typeDict.find((itemTmp) => itemTmp.lbl === input.type_lbl)?.val;
    if (val !== undefined) {
      input.type = val;
    }
  }
  
  // 系统字段
  if (isNotEmpty(input.is_sys_lbl) && input.is_sys === undefined) {
    const val = is_sysDict.find((itemTmp) => itemTmp.lbl === input.is_sys_lbl)?.val;
    if (val !== undefined) {
      input.is_sys = Number(val);
    }
  }
  
  {
    const input2 = {
      ...input,
      id: undefined,
    };
    let models = await findByUnique(input2);
    models = models.filter((item) => item.id !== id);
    if (models.length > 0) {
      throw await ns("数据已经存在");
    }
  }
  
  const oldModel = await findById(id);
  
  if (!oldModel) {
    throw await ns("修改失败, 数据已被删除");
  }
  
  const args = new QueryArgs();
  let sql = `
    update base_data_permit set
  `;
  let updateFldNum = 0;
  if (input.menu_id !== undefined) {
    if (input.menu_id != oldModel.menu_id) {
      sql += `menu_id = ${ args.push(input.menu_id) },`;
      updateFldNum++;
    }
  }
  if (input.lbl !== undefined) {
    if (input.lbl != oldModel.lbl) {
      sql += `lbl = ${ args.push(input.lbl) },`;
      updateFldNum++;
    }
  }
  if (input.scope !== undefined) {
    if (input.scope != oldModel.scope) {
      sql += `scope = ${ args.push(input.scope) },`;
      updateFldNum++;
    }
  }
  if (input.type !== undefined) {
    if (input.type != oldModel.type) {
      sql += `type = ${ args.push(input.type) },`;
      updateFldNum++;
    }
  }
  if (input.rem !== undefined) {
    if (input.rem != oldModel.rem) {
      sql += `rem = ${ args.push(input.rem) },`;
      updateFldNum++;
    }
  }
  if (input.is_sys !== undefined) {
    if (input.is_sys != oldModel.is_sys) {
      sql += `is_sys = ${ args.push(input.is_sys) },`;
      updateFldNum++;
    }
  }
  if (updateFldNum > 0) {
    if (input.update_usr_id && input.update_usr_id !== "-") {
      sql += `update_usr_id = ${ args.push(input.update_usr_id) },`;
    } else {
      const authModel = await authDao.getAuthModel();
      if (authModel?.id !== undefined) {
        sql += `update_usr_id = ${ args.push(authModel.id) },`;
      }
    }
    sql += `update_time = ${ args.push(new Date()) }`;
    sql += ` where id = ${ args.push(id) } limit 1`;
    
    await delCache();
    
    const result = await execute(sql, args);
  }
  
  if (updateFldNum > 0) {
    await delCache();
  }
  
  const newModel = await findById(id);
  
  if (!deepCompare(oldModel, newModel)) {
    console.log(JSON.stringify(oldModel));
  }
  
  return id;
}

/**
 * 根据 ids 删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: string[],
  options?: {
  },
): Promise<number> {
  const table = "base_data_permit";
  const method = "deleteByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const isExist = await existById(id);
    if (!isExist) {
      continue;
    }
    const args = new QueryArgs();
    const sql = `
      update
        base_data_permit
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
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 还原数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: string[],
  options?: {
  },
): Promise<number> {
  const table = "base_data_permit";
  const method = "revertByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const args = new QueryArgs();
    const sql = `
      update
        base_data_permit
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
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 彻底删除数据
 * @param {string[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: string[],
  options?: {
  },
): Promise<number> {
  const table = "base_data_permit";
  const method = "forceDeleteByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
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
          base_data_permit
        where
          id = ${ args.push(id) }
      `;
      const model = await queryOne(sql, args);
      log("forceDeleteByIds:", model);
    }
    const args = new QueryArgs();
    const sql = `
      delete from
        base_data_permit
      where
        id = ${ args.push(id) }
        and is_deleted = 1
      limit 1
    `;
    const result = await execute(sql, args);
    num += result.affectedRows;
  }
  
  await delCache();
  
  return num;
}
