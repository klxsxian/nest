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
  getAuthModel,
} from "/lib/auth/auth.dao.ts";

import {
  UniqueType,
  SortOrderEnum,
} from "/gen/types.ts";

import type {
  PageInput,
  SortInput,
  DictType,
} from "/gen/types.ts";

import type {
  DictInput,
  DictModel,
  DictSearch,
  DictFieldComment,
  DictId,
} from "./dict.model.ts";

import {
  findAll as findAllDictDetail,
  create as createDictDetail,
  deleteByIds as deleteByIdsDictDetail,
  revertByIds as revertByIdsDictDetail,
  updateById as updateByIdDictDetail,
  forceDeleteByIds as forceDeleteByIdsDictDetail,
} from "/gen/base/dict_detail/dict_detail.dao.ts";

const route_path = "/base/dict";

async function getWhereQuery(
  args: QueryArgs,
  search?: DictSearch,
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
  if (search?.code !== undefined) {
    whereQuery += ` and t.code = ${ args.push(search.code) }`;
  }
  if (search?.code === null) {
    whereQuery += ` and t.code is null`;
  }
  if (isNotEmpty(search?.code_like)) {
    whereQuery += ` and t.code like ${ args.push("%" + sqlLike(search?.code_like) + "%") }`;
  }
  if (search?.lbl !== undefined) {
    whereQuery += ` and t.lbl = ${ args.push(search.lbl) }`;
  }
  if (search?.lbl === null) {
    whereQuery += ` and t.lbl is null`;
  }
  if (isNotEmpty(search?.lbl_like)) {
    whereQuery += ` and t.lbl like ${ args.push("%" + sqlLike(search?.lbl_like) + "%") }`;
  }
  if (search?.type && !Array.isArray(search?.type)) {
    search.type = [ search.type ];
  }
  if (search?.type && search?.type?.length > 0) {
    whereQuery += ` and t.type in ${ args.push(search.type) }`;
  }
  if (search?.is_locked && !Array.isArray(search?.is_locked)) {
    search.is_locked = [ search.is_locked ];
  }
  if (search?.is_locked && search?.is_locked?.length > 0) {
    whereQuery += ` and t.is_locked in ${ args.push(search.is_locked) }`;
  }
  if (search?.is_enabled && !Array.isArray(search?.is_enabled)) {
    search.is_enabled = [ search.is_enabled ];
  }
  if (search?.is_enabled && search?.is_enabled?.length > 0) {
    whereQuery += ` and t.is_enabled in ${ args.push(search.is_enabled) }`;
  }
  if (search?.order_by && search?.order_by?.length > 0) {
    if (search.order_by[0] != null) {
      whereQuery += ` and t.order_by >= ${ args.push(search.order_by[0]) }`;
    }
    if (search.order_by[1] != null) {
      whereQuery += ` and t.order_by <= ${ args.push(search.order_by[1]) }`;
    }
  }
  if (search?.rem !== undefined) {
    whereQuery += ` and t.rem = ${ args.push(search.rem) }`;
  }
  if (search?.rem === null) {
    whereQuery += ` and t.rem is null`;
  }
  if (isNotEmpty(search?.rem_like)) {
    whereQuery += ` and t.rem like ${ args.push("%" + sqlLike(search?.rem_like) + "%") }`;
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
  return whereQuery;
}

async function getFromQuery(
  options?: {
  },
) {
  let fromQuery = `
    base_dict t
    left join base_usr create_usr_id_lbl
      on create_usr_id_lbl.id = t.create_usr_id
    left join base_usr update_usr_id_lbl
      on update_usr_id_lbl.id = t.update_usr_id
  `;
  return fromQuery;
}

/**
 * 根据条件查找系统字典总数
 * @param { DictSearch } search?
 * @return {Promise<number>}
 */
export async function findCount(
  search?: DictSearch,
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
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
          ${ await getFromQuery(options) }
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
 * 根据搜索条件和分页查找系统字典列表
 * @param {DictSearch} search? 搜索条件
 * @param {SortInput|SortInput[]} sort? 排序
 */
export async function findAll(
  search?: DictSearch,
  page?: PageInput,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<DictModel[]> {
  const table = "base_dict";
  const method = "findAll";
  
  const args = new QueryArgs();
  let sql = `
    select t.*
      ,create_usr_id_lbl.lbl create_usr_id_lbl
      ,update_usr_id_lbl.lbl update_usr_id_lbl
    from
      ${ await getFromQuery(options) }
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
  
  // 缓存
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = await hash(JSON.stringify({ sql, args }));
  
  const result = await query<DictModel>(
    sql,
    args,
    {
      cacheKey1,
      cacheKey2,
    },
  );
  
  const [
    typeDict, // 数据类型
    is_lockedDict, // 锁定
    is_enabledDict, // 启用
  ] = await getDict([
    "dict_type",
    "is_locked",
    "is_enabled",
  ]);
  
  // 系统字典明细
  const dict_detail_models = await findAllDictDetail({
    dict_id: result.map((item) => item.id),
    is_deleted: search?.is_deleted,
  });
  
  for (let i = 0; i < result.length; i++) {
    const model = result[i];
    
    // 数据类型
    let type_lbl = model.type as string;
    if (!isEmpty(model.type)) {
      const dictItem = typeDict.find((dictItem) => dictItem.val === model.type);
      if (dictItem) {
        type_lbl = dictItem.lbl;
      }
    }
    model.type_lbl = type_lbl;
    
    // 锁定
    let is_locked_lbl = model.is_locked?.toString() || "";
    if (model.is_locked !== undefined && model.is_locked !== null) {
      const dictItem = is_lockedDict.find((dictItem) => dictItem.val === model.is_locked.toString());
      if (dictItem) {
        is_locked_lbl = dictItem.lbl;
      }
    }
    model.is_locked_lbl = is_locked_lbl;
    
    // 启用
    let is_enabled_lbl = model.is_enabled?.toString() || "";
    if (model.is_enabled !== undefined && model.is_enabled !== null) {
      const dictItem = is_enabledDict.find((dictItem) => dictItem.val === model.is_enabled.toString());
      if (dictItem) {
        is_enabled_lbl = dictItem.lbl;
      }
    }
    model.is_enabled_lbl = is_enabled_lbl;
    
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
    
    // 系统字典明细
    model.dict_detail_models = dict_detail_models
      .filter((item) => item.dict_id === model.id)
  }
  
  return result;
}

/** 根据lbl翻译业务字典, 外键关联id, 日期 */
export async function setIdByLbl(
  input: DictInput,
) {
  
  const [
    typeDict, // 数据类型
    is_lockedDict, // 锁定
    is_enabledDict, // 启用
  ] = await getDict([
    "dict_type",
    "is_locked",
    "is_enabled",
  ]);
  
  // 数据类型
  if (isNotEmpty(input.type_lbl) && input.type === undefined) {
    const val = typeDict.find((itemTmp) => itemTmp.lbl === input.type_lbl)?.val;
    if (val !== undefined) {
      input.type = val as DictType;
    }
  }
  
  // 锁定
  if (isNotEmpty(input.is_locked_lbl) && input.is_locked === undefined) {
    const val = is_lockedDict.find((itemTmp) => itemTmp.lbl === input.is_locked_lbl)?.val;
    if (val !== undefined) {
      input.is_locked = Number(val);
    }
  }
  
  // 启用
  if (isNotEmpty(input.is_enabled_lbl) && input.is_enabled === undefined) {
    const val = is_enabledDict.find((itemTmp) => itemTmp.lbl === input.is_enabled_lbl)?.val;
    if (val !== undefined) {
      input.is_enabled = Number(val);
    }
  }
}

/**
 * 获取系统字典字段注释
 */
export async function getFieldComments(): Promise<DictFieldComment> {
  const n = initN(route_path);
  const fieldComments: DictFieldComment = {
    id: await n("ID"),
    code: await n("编码"),
    lbl: await n("名称"),
    type: await n("数据类型"),
    type_lbl: await n("数据类型"),
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
 * 通过唯一约束获得系统字典列表
 * @param {DictInput} search0
 */
export async function findByUnique(
  search0: DictInput,
  options?: {
  },
): Promise<DictModel[]> {
  if (search0.id) {
    const model = await findOne({
      id: search0.id,
    }, undefined, options);
    if (!model) {
      return [ ];
    }
    return [ model ];
  }
  const models: DictModel[] = [ ];
  {
    if (search0.code == null) {
      return [ ];
    }
    const code = search0.code;
    const modelTmps = await findAll({
      code,
    }, undefined, undefined, options);
    models.push(...modelTmps);
  }
  {
    if (search0.lbl == null) {
      return [ ];
    }
    const lbl = search0.lbl;
    const modelTmps = await findAll({
      lbl,
    }, undefined, undefined, options);
    models.push(...modelTmps);
  }
  return models;
}

/**
 * 根据唯一约束对比对象是否相等
 * @param {DictModel} oldModel
 * @param {DictInput} input
 * @return {boolean}
 */
export function equalsByUnique(
  oldModel: DictModel,
  input: DictInput,
): boolean {
  if (!oldModel || !input) {
    return false;
  }
  if (
    oldModel.code === input.code
  ) {
    return true;
  }
  if (
    oldModel.lbl === input.lbl
  ) {
    return true;
  }
  return false;
}

/**
 * 通过唯一约束检查系统字典是否已经存在
 * @param {DictInput} input
 * @param {DictModel} oldModel
 * @param {UniqueType} uniqueType
 * @return {Promise<DictId | undefined>}
 */
export async function checkByUnique(
  input: DictInput,
  oldModel: DictModel,
  uniqueType: UniqueType = UniqueType.Throw,
  options?: {
  },
): Promise<DictId | undefined> {
  const isEquals = equalsByUnique(oldModel, input);
  if (isEquals) {
    if (uniqueType === UniqueType.Throw) {
      throw new UniqueException(await ns("此 {0} 已经存在", await ns("系统字典")));
    }
    if (uniqueType === UniqueType.Update) {
      const id: DictId = await updateById(
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
 * 根据条件查找第一个系统字典
 * @param {DictSearch} search?
 */
export async function findOne(
  search?: DictSearch,
  sort?: SortInput | SortInput[],
  options?: {
  },
): Promise<DictModel | undefined> {
  const page: PageInput = {
    pgOffset: 0,
    pgSize: 1,
  };
  const models = await findAll(search, page, sort, options);
  const model = models[0];
  return model;
}

/**
 * 根据 id 查找系统字典
 * @param {DictId} id
 */
export async function findById(
  id?: DictId | null,
  options?: {
  },
): Promise<DictModel | undefined> {
  if (isEmpty(id as unknown as string)) {
    return;
  }
  const model = await findOne({ id }, undefined, options);
  return model;
}

/**
 * 根据搜索条件判断系统字典是否存在
 * @param {DictSearch} search?
 */
export async function exist(
  search?: DictSearch,
  options?: {
  },
): Promise<boolean> {
  const model = await findOne(search, undefined, options);
  const exist = !!model;
  return exist;
}

/**
 * 根据id判断系统字典是否存在
 * @param {DictId} id
 */
export async function existById(
  id?: DictId | null,
  options?: {
  },
) {
  const table = "base_dict";
  const method = "existById";
  
  if (isEmpty(id as unknown as string)) {
    return false;
  }
  
  const args = new QueryArgs();
  const sql = `
    select
      1 e
    from
      base_dict t
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

/** 校验系统字典是否启用 */
export async function validateIsEnabled(
  model: DictModel,
) {
  if (model.is_enabled == 0) {
    throw `${ await ns("系统字典") } ${ await ns("已禁用") }`;
  }
}

/** 校验系统字典是否存在 */
export async function validateOption(
  model?: DictModel,
) {
  if (!model) {
    throw `${ await ns("系统字典") } ${ await ns("不存在") }`;
  }
  return model;
}

/**
 * 系统字典增加和修改时校验输入
 * @param input 
 */
export async function validate(
  input: DictInput,
) {
  const fieldComments = await getFieldComments();
  
  // ID
  await validators.chars_max_length(
    input.id,
    22,
    fieldComments.id,
  );
  
  // 编码
  await validators.chars_max_length(
    input.code,
    50,
    fieldComments.code,
  );
  
  // 名称
  await validators.chars_max_length(
    input.lbl,
    200,
    fieldComments.lbl,
  );
  
  // 数据类型
  await validators.chars_max_length(
    input.type,
    22,
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
 * 创建系统字典
 * @param {DictInput} input
 * @param {({
 *   uniqueType?: UniqueType,
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   update: 更新冲突数据
 * @return {Promise<DictId>} 
 */
export async function create(
  input: DictInput,
  options?: {
    uniqueType?: UniqueType;
    hasDataPermit?: boolean;
  },
): Promise<DictId> {
  const table = "base_dict";
  const method = "create";
  
  if (input.id) {
    throw new Error(`Can not set id when create in dao: ${ table }`);
  }
  
  await setIdByLbl(input);
  
  const oldModels = await findByUnique(input, options);
  if (oldModels.length > 0) {
    let id: DictId | undefined = undefined;
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
    input.id = shortUuidV4<DictId>();
    const isExist = await existById(input.id);
    if (!isExist) {
      break;
    }
    error(`ID_COLLIDE: ${ table } ${ input.id as unknown as string }`);
  }
  
  const args = new QueryArgs();
  let sql = `
    insert into base_dict(
      id
      ,create_time
      ,update_time
  `;
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
  if (input.code !== undefined) {
    sql += `,code`;
  }
  if (input.lbl !== undefined) {
    sql += `,lbl`;
  }
  if (input.type !== undefined) {
    sql += `,type`;
  }
  if (input.is_locked !== undefined) {
    sql += `,is_locked`;
  }
  if (input.is_enabled !== undefined) {
    sql += `,is_enabled`;
  }
  if (input.order_by !== undefined) {
    sql += `,order_by`;
  }
  if (input.rem !== undefined) {
    sql += `,rem`;
  }
  if (input.is_sys !== undefined) {
    sql += `,is_sys`;
  }
  sql += `) values(${ args.push(input.id) },${ args.push(reqDate()) },${ args.push(reqDate()) }`;
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
  if (input.code !== undefined) {
    sql += `,${ args.push(input.code) }`;
  }
  if (input.lbl !== undefined) {
    sql += `,${ args.push(input.lbl) }`;
  }
  if (input.type !== undefined) {
    sql += `,${ args.push(input.type) }`;
  }
  if (input.is_locked !== undefined) {
    sql += `,${ args.push(input.is_locked) }`;
  }
  if (input.is_enabled !== undefined) {
    sql += `,${ args.push(input.is_enabled) }`;
  }
  if (input.order_by !== undefined) {
    sql += `,${ args.push(input.order_by) }`;
  }
  if (input.rem !== undefined) {
    sql += `,${ args.push(input.rem) }`;
  }
  if (input.is_sys !== undefined) {
    sql += `,${ args.push(input.is_sys) }`;
  }
  sql += `)`;
  
  await delCache();
  const res = await execute(sql, args);
  log(JSON.stringify(res));
  
  // 系统字典明细
  if (input.dict_detail_models && input.dict_detail_models.length > 0) {
    for (let i = 0; i < input.dict_detail_models.length; i++) {
      const dict_detail_model = input.dict_detail_models[i];
      dict_detail_model.dict_id = input.id;
      await createDictDetail(dict_detail_model);
    }
  }
  
  await delCache();
  
  return input.id;
}

/**
 * 删除缓存
 */
export async function delCache() {
  const table = "base_dict";
  const method = "delCache";
  
  await delCacheCtx(`dao.sql.${ table }`);
  const foreignTables: string[] = [
    "base_usr",
  ];
  for (let k = 0; k < foreignTables.length; k++) {
    const foreignTable = foreignTables[k];
    if (foreignTable === table) continue;
    await delCacheCtx(`dao.sql.${ foreignTable }`);
  }
}

/**
 * 根据 id 修改系统字典
 * @param {DictId} id
 * @param {DictInput} input
 * @param {({
 *   uniqueType?: "ignore" | "throw" | "update",
 * })} options? 唯一约束冲突时的处理选项, 默认为 throw,
 *   ignore: 忽略冲突
 *   throw: 抛出异常
 *   create: 级联插入新数据
 * @return {Promise<DictId>}
 */
export async function updateById(
  id: DictId,
  input: DictInput,
  options?: {
    uniqueType?: "ignore" | "throw";
  },
): Promise<DictId> {
  const table = "base_dict";
  const method = "updateById";
  
  if (!id) {
    throw new Error("updateById: id cannot be empty");
  }
  if (!input) {
    throw new Error("updateById: input cannot be null");
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
        throw await ns("此 {0} 已经存在", await ns("系统字典"));
      } else if (options.uniqueType === UniqueType.Ignore) {
        return id;
      }
    }
  }
  
  const oldModel = await findById(id);
  
  if (!oldModel) {
    throw await ns("编辑失败, 此 {0} 已被删除", await ns("系统字典"));
  }
  
  const args = new QueryArgs();
  let sql = `
    update base_dict set
  `;
  let updateFldNum = 0;
  if (input.code !== undefined) {
    if (input.code != oldModel.code) {
      sql += `code = ${ args.push(input.code) },`;
      updateFldNum++;
    }
  }
  if (input.lbl !== undefined) {
    if (input.lbl != oldModel.lbl) {
      sql += `lbl = ${ args.push(input.lbl) },`;
      updateFldNum++;
    }
  }
  if (input.type !== undefined) {
    if (input.type != oldModel.type) {
      sql += `type = ${ args.push(input.type) },`;
      updateFldNum++;
    }
  }
  if (input.is_locked !== undefined) {
    if (input.is_locked != oldModel.is_locked) {
      sql += `is_locked = ${ args.push(input.is_locked) },`;
      updateFldNum++;
    }
  }
  if (input.is_enabled !== undefined) {
    if (input.is_enabled != oldModel.is_enabled) {
      sql += `is_enabled = ${ args.push(input.is_enabled) },`;
      updateFldNum++;
    }
  }
  if (input.order_by !== undefined) {
    if (input.order_by != oldModel.order_by) {
      sql += `order_by = ${ args.push(input.order_by) },`;
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
    
    await delCache();
    
    const res = await execute(sql, args);
    log(JSON.stringify(res));
  }
  
  // 系统字典明细
  if (input.dict_detail_models) {
    const dict_detail_models = await findAllDictDetail({
      dict_id: [ id ],
    });
    if (dict_detail_models.length > 0 && input.dict_detail_models.length > 0) {
      updateFldNum++;
    }
    for (let i = 0; i < dict_detail_models.length; i++) {
      const dict_detail_model = dict_detail_models[i];
      if (input.dict_detail_models.some((item) => item.id === dict_detail_model.id)) {
        continue;
      }
      await deleteByIdsDictDetail([ dict_detail_model.id ]);
    }
    for (let i = 0; i < input.dict_detail_models.length; i++) {
      const dict_detail_model = input.dict_detail_models[i];
      if (!dict_detail_model.id) {
        dict_detail_model.dict_id = id;
        await createDictDetail(dict_detail_model);
        continue;
      }
      if (dict_detail_models.some((item) => item.id === dict_detail_model.id)) {
        await revertByIdsDictDetail([ dict_detail_model.id ]);
      }
      await updateByIdDictDetail(dict_detail_model.id, dict_detail_model);
    }
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
 * 根据 ids 删除系统字典
 * @param {DictId[]} ids
 * @return {Promise<number>}
 */
export async function deleteByIds(
  ids: DictId[],
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
  const method = "deleteByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id: DictId = ids[i];
    const isExist = await existById(id);
    if (!isExist) {
      continue;
    }
    const args = new QueryArgs();
    const sql = `
      update
        base_dict
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
  
  // 系统字典明细
  const dict_detail_models = await findAllDictDetail({
    dict_id: ids,
    is_deleted: 0,
  });
  await deleteByIdsDictDetail(dict_detail_models.map((item) => item.id));
  
  await delCache();
  
  return num;
}

/**
 * 根据 ID 查找系统字典是否已启用
 * 不存在则返回 undefined
 * @param {DictId} id
 * @return {Promise<0 | 1 | undefined>}
 */
export async function getIsEnabledById(
  id: DictId,
  options?: {
  },
): Promise<0 | 1 | undefined> {
  const model = await findById(
    id,
    options,
  );
  const is_enabled = model?.is_enabled as (0 | 1 | undefined);
  return is_enabled;
}

/**
 * 根据 ids 启用或者禁用系统字典
 * @param {DictId[]} ids
 * @param {0 | 1} is_enabled
 * @return {Promise<number>}
 */
export async function enableByIds(
  ids: DictId[],
  is_enabled: 0 | 1,
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
  const method = "enableByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  const args = new QueryArgs();
  let sql = `
    update
      base_dict
    set
      is_enabled = ${ args.push(is_enabled) }
    
  `;
  {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,update_usr_id = ${ args.push(authModel.id) }`;
    }
  }
  sql += `
  
  where
      id in ${ args.push(ids) }
  `;
  const result = await execute(sql, args);
  const num = result.affectedRows;
  
  await delCache();
  
  return num;
}

/**
 * 根据 ID 查找系统字典是否已锁定
 * 已锁定的不能修改和删除
 * 不存在则返回 undefined
 * @param {DictId} id
 * @return {Promise<0 | 1 | undefined>}
 */
export async function getIsLockedById(
  id: DictId,
  options?: {
  },
): Promise<0 | 1 | undefined> {
  const model = await findById(
    id,
    options,
  );
  const is_locked = model?.is_locked as (0 | 1 | undefined);
  return is_locked;
}

/**
 * 根据 ids 锁定或者解锁系统字典
 * @param {DictId[]} ids
 * @param {0 | 1} is_locked
 * @return {Promise<number>}
 */
export async function lockByIds(
  ids: DictId[],
  is_locked: 0 | 1,
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
  const method = "lockByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  const args = new QueryArgs();
  let sql = `
    update
      base_dict
    set
      is_locked = ${ args.push(is_locked) }
    
  `;
  {
    const authModel = await getAuthModel();
    if (authModel?.id !== undefined) {
      sql += `,update_usr_id = ${ args.push(authModel.id) }`;
    }
  }
  sql += `
  
  where
      id in ${ args.push(ids) }
  `;
  const result = await execute(sql, args);
  const num = result.affectedRows;
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 还原系统字典
 * @param {DictId[]} ids
 * @return {Promise<number>}
 */
export async function revertByIds(
  ids: DictId[],
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
  const method = "revertByIds";
  
  if (!ids || !ids.length) {
    return 0;
  }
  
  if (ids.length > 0) {
    await delCache();
  }
  
  let num = 0;
  for (let i = 0; i < ids.length; i++) {
    const id: DictId = ids[i];
    const args = new QueryArgs();
    const sql = `
      update
        base_dict
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
        throw await ns("此 {0} 已经存在", await ns("系统字典"));
      }
    }
  }
  
  // 系统字典明细
  const dict_detail_models = await findAllDictDetail({
    dict_id: ids,
    is_deleted: 1,
  });
  await revertByIdsDictDetail(dict_detail_models.map((item) => item.id));
  
  await delCache();
  
  return num;
}

/**
 * 根据 ids 彻底删除系统字典
 * @param {DictId[]} ids
 * @return {Promise<number>}
 */
export async function forceDeleteByIds(
  ids: DictId[],
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
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
          base_dict
        where
          id = ${ args.push(id) }
      `;
      const model = await queryOne(sql, args);
      log("forceDeleteByIds:", model);
    }
    const args = new QueryArgs();
    const sql = `
      delete from
        base_dict
      where
        id = ${ args.push(id) }
        and is_deleted = 1
      limit 1
    `;
    const result = await execute(sql, args);
    num += result.affectedRows;
  }
  
  // 系统字典明细
  const dict_detail_models = await findAllDictDetail({
    dict_id: ids,
    is_deleted: 1,
  });
  await forceDeleteByIdsDictDetail(dict_detail_models.map((item) => item.id));
  
  await delCache();
  
  return num;
}
  
/**
 * 查找 系统字典 order_by 字段的最大值
 * @return {Promise<number>}
 */
export async function findLastOrderBy(
  options?: {
  },
): Promise<number> {
  const table = "base_dict";
  const method = "findLastOrderBy";
  
  let sql = `
    select
      t.order_by order_by
    from
      base_dict t
  `;
  const whereQuery: string[] = [ ];
  const args = new QueryArgs();
  whereQuery.push(`t.is_deleted = 0`);
  if (whereQuery.length > 0) {
    sql += " where " + whereQuery.join(" and ");
  }
  sql += `
    order by
      t.order_by desc
    limit 1
  `;
  
  interface Result {
    order_by: number;
  }
  let model = await queryOne<Result>(sql, args);
  let result = model?.order_by ?? 0;
  
  return result;
}
