<#
const hasOrderBy = columns.some((column) => column.COLUMN_NAME === 'order_by');
#>import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ResultSetHeader } from "mysql2/promise";
import { useContext } from "../common/interceptors/context.interceptor";
import { PageModel } from "../common/page.model";
import { isEmpty, sqlLike } from "../common/util/StringUitl";
import { many2manyUpdate, setModelIds } from "../common/util/DaoUtil";
import { <#=tableUp#>Model, <#=tableUp#>Search } from "./<#=table#>.model";

@Injectable()
export class <#=tableUp#>Dao {
  
  constructor(
    private readonly eventEmitter2: EventEmitter2,
  ) { }
  
  private getWhereQuery(
    args: any[],
    search?: <#=tableUp#>Search,
  ) {
    const context = useContext();
    let whereQuery = "";
    whereQuery += ` t.is_deleted = ?`;
    args.push(search?.is_deleted == null ? 0 : search.is_deleted);<#
    if (hasTenant_id) {
    #>
    if (context.tenant_id) {
      whereQuery += ` and t.tenant_id = ?`;
      args.push(context.tenant_id);
    }<#
    }
    #><#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      let data_type = column.DATA_TYPE;
      let column_type = column.DATA_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      let selectList = [ ];
      let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
      if (selectStr) {
        selectList = eval(`(${ selectStr })`);
      }
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    #><#
      if (foreignKey) {
    #>
    if (search?.<#=column_name#> && search?.<#=column_name#>.length > 0) {
      whereQuery += ` and <#=foreignKey.table#>.id in (?)`;
      args.push(search.<#=column_name#>);
    }
    if (search?.<#=foreignKey.table#>__<#=foreignKey.lbl#> && search.<#=foreignKey.table#>__<#=foreignKey.lbl#>?.length > 0) {
      whereQuery += ` and <#=foreignKey.table#>__<#=foreignKey.lbl#> in (?)`;
      args.push(search.<#=foreignKey.table#>__<#=foreignKey.lbl#>);
    }<#
      } else if (selectList && selectList.length > 0) {
    #>
    if (search?.<#=column_name#> && search?.<#=column_name#>?.length > 0) {
      whereQuery += ` and t.<#=column_name#> in (?)`;
      args.push(search.<#=column_name#>);
    }<#
      } else if (column_name === "id") {
    #>
    if (!isEmpty(search?.<#=column_name#>)) {
      whereQuery += ` and t.<#=column_name#> = ?`;
      args.push(search.<#=column_name#>);
    }<#
    } else if (data_type === "int" && column_name.startsWith("is_")) {
    #>
    if (!isEmpty(search?.<#=column_name#>)) {
      whereQuery += ` and t.<#=column_name#> = ?`;
      args.push(search.<#=column_name#>);
    }<#
      } else if (data_type === "int" || data_type === "decimal" || data_type === "double" || data_type === "datetime" || data_type === "date") {
    #>
    if (!isEmpty(search?.<#=column_name#>)) {
      whereQuery += ` and t.<#=column_name#> = ?`;
      args.push(search.<#=column_name#>);
    }
    if (!isEmpty(search?.<#=column_name#>Gt)) {
      whereQuery += ` and t.<#=column_name#> > ?`;
      args.push(search.<#=column_name#>Gt);
    }
    if (!isEmpty(search?.<#=column_name#>Lt)) {
      whereQuery += ` and t.<#=column_name#> < ?`;
      args.push(search.<#=column_name#>Lt);
    }
    if (!isEmpty(search?.<#=column_name#>GtEq)) {
      whereQuery += ` and t.<#=column_name#> >= ?`;
      args.push(search.<#=column_name#>GtEq);
    }
    if (!isEmpty(search?.<#=column_name#>LtEq)) {
      whereQuery += ` and t.<#=column_name#> <= ?`;
      args.push(search.<#=column_name#>LtEq);
    }<#
    } else if (data_type === "tinyint") {
    #>
    if (!isEmpty(search?.<#=column_name#>)) {
      whereQuery += ` and t.<#=column_name#> = ?`;
      args.push(search.<#=column_name#>);
    }<#
      } else {
    #>
    if (search?.<#=column_name#> !== undefined) {
      whereQuery += ` and t.<#=column_name#> = ?`;
      args.push(search.<#=column_name#>);
    }
    if (!isEmpty(search?.<#=column_name#>Like)) {
      whereQuery += ` and t.<#=column_name#> like ?`;
      args.push(sqlLike(search.<#=column_name#>Like) + "%");
    }<#
      }
    #><#
    }
    #>
    return whereQuery;
  }
  
  /**
   * 根据条件查找总数据数
   * @param {<#=tableUp#>Search} [search]
   * @return {Promise<number>}
   * @memberof <#=tableUp#>Dao
   */
  async findCount(
    search?: <#=tableUp#>Search,
  ): Promise<number> {
    const t = this;
    
    const table = "<#=table#>";
    const method = "findCount";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { search });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const context = useContext();
    const args = [ ];
    let sql = `
      select
        count(1) total
      from <#=table#> t<#
        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          if (column.ignoreCodegen) continue;
          const column_name = column.COLUMN_NAME;
          const foreignKey = column.foreignKey;
          let data_type = column.DATA_TYPE;
          if (!foreignKey) continue;
          const foreignTable = foreignKey.table;
          const foreignTableUp = foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
          const many2many = column.many2many;
        #><#
          if (foreignKey && foreignKey.type === "many2many") {
        #>
        left join <#=many2many.table#>
          on <#=many2many.table#>.<#=many2many.column1#> = t.id and <#=many2many.table#>.is_deleted = 0
        left join <#=foreignTable#>
          on <#=many2many.table#>.<#=many2many.column2#> = <#=foreignTable#>.<#=foreignKey.column#> and <#=foreignTable#>.is_deleted = 0
        left join (
          select
            json_arrayagg(<#=foreignTable#>.id) <#=foreignTable#>_ids,
            json_arrayagg(<#=foreignTable#>.<#=foreignKey.lbl#>) _<#=foreignTable#>_ids,
            <#=table#>.id <#=many2many.column1#>
          from <#=many2many.table#>
          inner join <#=foreignKey.table#>
            on <#=foreignKey.table#>.<#=foreignKey.column#> = <#=many2many.table#>.<#=many2many.column2#>
            and <#=foreignKey.table#>.is_deleted = 0
          inner join <#=table#>
            on <#=table#>.id = <#=many2many.table#>.<#=many2many.column1#>
            and <#=table#>.is_deleted = 0
          where
            <#=many2many.table#>.is_deleted = 0
          group by <#=many2many.column1#>
        ) _<#=foreignTable#>
          on _<#=foreignTable#>.<#=many2many.column1#> = t.id<#
          } else if (foreignKey && !foreignKey.multiple) {
        #>
        left join <#=foreignTable#>
          on <#=foreignTable#>.<#=foreignKey.column#> = t.<#=column_name#><#
          }
        #><#
        }
        #>
      where
        ${ t.getWhereQuery(args, search) }
    `;<#
    if (cache) {
    #>
    
    const cacheKey1 = `dao.sql.${ table }`;
    const cacheKey2 = JSON.stringify({ sql, args });<#
    }
    #>
    
    const model = await context.queryOne<{
      total: number,
    }>(sql, args<#
    if (cache) {
    #>, { cacheKey1, cacheKey2 }<#
    }
    #>);
    let result = model?.total || 0;
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { search, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据搜索条件和分页查找数据
   * @param {<#=tableUp#>Search} search 搜索条件
   * @memberof <#=tableUp#>Dao
   */
  async findAll(
    search?: <#=tableUp#>Search,
    pageModel?: PageModel,
  ) {
    const t = this;
    
    const table = "<#=table#>";
    const method = "findAll";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { search });
    if (beforeEvent?.isReturn) return <typeof result>beforeEvent.data;
    
    const context = useContext();
    const args = [ ];
    let sql = `
      select t.*<#
        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          if (column.ignoreCodegen) continue;
          const column_name = column.COLUMN_NAME;
          const foreignKey = column.foreignKey;
          let data_type = column.DATA_TYPE;
          if (!foreignKey) continue;
          const foreignTable = foreignKey.table;
          const foreignTableUp = foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
          const many2many = column.many2many;
        #><#
          if (foreignKey && foreignKey.type === "many2many") {
        #>
          ,max(<#=column_name#>) <#=column_name#>
          ,max(_<#=column_name#>) _<#=column_name#><#
        } else if (foreignKey && !foreignKey.multiple) {
        #>
          ,<#=foreignTable#>.<#=foreignKey.lbl#> _<#=column_name#><#
          }
        #><#
        }
        #>
      from <#=table#> t<#
        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          if (column.ignoreCodegen) continue;
          const column_name = column.COLUMN_NAME;
          const foreignKey = column.foreignKey;
          let data_type = column.DATA_TYPE;
          if (!foreignKey) continue;
          const foreignTable = foreignKey.table;
          const foreignTableUp = foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
          const many2many = column.many2many;
        #><#
          if (foreignKey && foreignKey.type === "many2many") {
        #>
        left join <#=many2many.table#>
          on <#=many2many.table#>.<#=many2many.column1#> = t.id
          and <#=many2many.table#>.is_deleted = 0
        left join <#=foreignTable#>
          on <#=many2many.table#>.<#=many2many.column2#> = <#=foreignTable#>.<#=foreignKey.column#>
          and <#=foreignTable#>.is_deleted = 0
        left join (
          select
            json_arrayagg(<#=foreignTable#>.id) <#=column_name#>,
            json_arrayagg(<#=foreignTable#>.<#=foreignKey.lbl#>) _<#=column_name#>,
            <#=table#>.id <#=many2many.column1#>
          from <#=many2many.table#>
          inner join <#=foreignKey.table#>
            on <#=foreignKey.table#>.<#=foreignKey.column#> = <#=many2many.table#>.<#=many2many.column2#>
            and <#=foreignKey.table#>.is_deleted = 0
          inner join <#=table#>
            on <#=table#>.id = <#=many2many.table#>.<#=many2many.column1#>
            and <#=table#>.is_deleted = 0
          where
            <#=many2many.table#>.is_deleted = 0
          group by <#=many2many.column1#>
        ) _<#=foreignTable#>
          on _<#=foreignTable#>.<#=many2many.column1#> = t.id<#
          } else if (foreignKey && !foreignKey.multiple) {
        #>
        left join <#=foreignTable#>
          on <#=foreignTable#>.<#=foreignKey.column#> = t.<#=column_name#><#
          }
        #><#
        }
        #>
      where
        ${ t.getWhereQuery(args, search) }
      group by t.id
    `;<#
    if (defaultSort) {
    #>
    if (!search) {
      search = { };
    }
    if (!search.orderBy) {
      search.orderBy = "<#=defaultSort.prop#>";
      search.orderDec = "<#=defaultSort.order#>";
    }
    if (search.orderBy) {
      sql += ` order by ${ context.escapeId(search.orderBy) } ${ context.escapeDec(search.orderDec) }`;
    }<#
    } else {
    #>
    if (search?.orderBy) {
      sql += ` order by ${ context.escapeId(search.orderBy) } ${ context.escapeDec(search.orderDec) }`;
    }<#
    }
    #>
    if (pageModel?.pgSize) {
      sql += ` limit ${ Number(pageModel?.pgOffset) || 0 },${ Number(pageModel.pgSize) }`;
    }<#/*
    let typeArr = [ ];
    const froeignTypeArr = [ ];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      let data_type = column.DATA_TYPE;
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      if (column_name === 'id') {
        data_type = 'string';
      }
      else if (foreignKey) {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'varchar') {
        data_type = 'string';
      }
      else if (column.DATA_TYPE === 'date') {
        data_type = 'Date';
      }
      else if (column.DATA_TYPE === 'datetime') {
        data_type = 'Date';
      }
      else if (column.DATA_TYPE === 'int') {
        data_type = 'number';
      }
      else if (column.DATA_TYPE === 'json') {
        data_type = '{ [key: string]: any }';
      }
      if (!foreignKey) {
        typeArr.push({ name: column_name, type: data_type });
      } else {
        typeArr.push({ name: column_name, type: data_type });
        froeignTypeArr.push({ name: `_${ column_name }`, type: data_type });
      }
    }
    typeArr.push({ name: "tenant_id", type: "string" });
    typeArr.push({ name: "create_usr_id", type: "string" });
    typeArr.push({ name: "create_time", type: "Date" });
    typeArr.push({ name: "update_usr_id", type: "string" });
    typeArr.push({ name: "update_time", type: "Date" });
    typeArr.push({ name: "is_deleted", type: "number" });
    typeArr.push({ name: "delete_time", type: "Date" });
    typeArr = typeArr.concat(froeignTypeArr);
    let typeStr = "{\r\n";
    for (let i = 0; i < typeArr.length; i++) {
      const item = typeArr[i];
      typeStr += `      ${ item.name }: ${ item.type },\r\n`;
    }
    typeStr += "    }";
    */#><#
    if (cache) {
    #>
    
    const cacheKey1 = `dao.sql.${ table }`;
    const cacheKey2 = JSON.stringify({ sql, args });<#
    }
    #>
    
    let result = await context.query<<#=tableUp#>Model>(sql, args<#
    if (cache) {
    #>, { cacheKey1, cacheKey2 }<#
    }
    #>);<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const many2many = column.many2many;
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #>
    await setModelIds(result, [ { table: "<#=foreignTable#>", fld: "<#=column_name#>", lbl: "<#=foreignKey.lbl#>" } ]);<#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #><#
      } else if (!foreignKey) {
    #><#
      } else {
    #><#
      }
    #><#
    }
    #>
    for (let i = 0; i < result.length; i++) {
      const model = result[i];<#
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        // if (column.ignoreCodegen) continue;
        const column_name = column.COLUMN_NAME;
        if (column_name === "id") continue;
        let data_type = column.DATA_TYPE;
        let column_type = column.COLUMN_TYPE;
        let column_comment = column.COLUMN_COMMENT || "";
        let selectList = [ ];
        let selectStr = column_comment.substring(column_comment.indexOf("["), column_comment.lastIndexOf("]")+1).trim();
        if (selectStr) {
          selectList = eval(`(${ selectStr })`);
        }
        if (column_comment.indexOf("[") !== -1) {
          column_comment = column_comment.substring(0, column_comment.indexOf("["));
        }
        const foreignKey = column.foreignKey;
        const foreignTable = foreignKey && foreignKey.table;
        const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
        const many2many = column.many2many;
        const isPassword = column.isPassword;
      #><#
        if (foreignKey && foreignKey.type === "json") {
      #><#
        } else if (isPassword) {
      #>
      // <#=column_comment#>
      model.<#=column_name#> = "";<#
        } else if (selectList.length > 0) {
      #>
      // <#=column_comment#>
      let _<#=column_name#> = "";
      <#
      for (let i = 0; i < selectList.length; i++) {
        const item = selectList[i];
        let value = item.value;
        let label = item.label;
        if (typeof(value) === "string") {
          value = `"${ value }"`;
        } else if (typeof(value) === "number") {
          value = value.toString();
        }
      #><#=i>0?" else ":""#>if (model.<#=column_name#> === <#=value#>) {
        _<#=column_name#> = "<#=label#>";
      }<#
      }
      #> else {
        _<#=column_name#> = String(model.<#=column_name#>);
      }
      model._<#=column_name#> = _<#=column_name#>;<#
        } else {
      #><#
        }
      #><#
      }
      #>
    }
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { search, result });
    if (afterEvent?.isReturn) return <typeof result>afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据条件查找第一条数据
   * @param {<#=tableUp#>Search} [search]
   * @return {Promise<<#=tableUp#>Model>} 
   * @memberof <#=tableUp#>Dao
   */
  async findOne(
    search?: <#=tableUp#>Search,
  ): Promise<<#=tableUp#>Model> {
    const t = this;
    const pageModel: PageModel = {
      pgOffset: 0,
      pgSize: 1,
    };
    const [ model ] = await t.findAll(search, pageModel);
    return model;
  }
  
  /**
   * 根据id查找数据
   * @param {string} id
   * @return {Promise<<#=tableUp#>Model>}
   * @memberof <#=tableUp#>Dao
   */
  async findById(
    id: string,
  ): Promise<<#=tableUp#>Model> {
    const t = this;
    if (!id) return;
    const model = await t.findOne({ id });
    return model;
  }
  
  /**
   * 根据搜索条件判断数据是否存在
   * @param {<#=tableUp#>Search} [search]
   * @return {Promise<boolean>} 
   * @memberof <#=tableUp#>Dao
   */
  async exist(
    search?: <#=tableUp#>Search,
  ): Promise<boolean> {
    const t = this;
    const model = await t.findOne(search);
    const exist = !!model;
    return exist;
  }
  
  /**
   * 根据id判断数据是否存在
   * @param {string} id
   * @memberof <#=tableUp#>Dao
   */
  async existById(
    id: string,
  ): Promise<boolean> {
    const t = this;
    const table = "<#=table#>";
    const method = "existById";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { id });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    if (!id) {
      return false;
    }
    
    const context = useContext();
    let sql = `
      select 1 e from <#=table#> where id = ? limit 1
    `;
    let args = [ id ];<#
    if (cache) {
    #>
    
    const cacheKey1 = `dao.sql.${ table }`;
    const cacheKey2 = JSON.stringify({ sql, args });<#
    }
    #>
    
    let model = await context.queryOne<{
      e: number,
    }>(sql, args<#
    if (cache) {
    #>, { cacheKey1, cacheKey2 }<#
    }
    #>);
    let result = model?.e === 1;
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { id, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 创建数据
   * @param {<#=tableUp#>Model} model
   * @return {Promise<ResultSetHeader>} 
   * @memberof <#=tableUp#>Dao
   */
  async create(
    model: <#=tableUp#>Model,
  ): Promise<ResultSetHeader> {
    const t = this;
    if (!model) {
      return;
    }
    const table = "<#=table#>";
    const method = "create";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { model });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const context = useContext();
    const args = [ ];
    let sql = `
      insert into <#=table#>(
        id
        ,create_time
    `;<#
    if (hasTenant_id) {
    #>
    if (context.tenant_id) {
      sql += `,tenant_id`;
    }<#
    }
    #>
    if (context.getUsr_id() !== undefined) {
      sql += `,create_usr_id`;
    }<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const many2many = column.many2many;
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#>`;
    }<#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #><#
      } else if (!foreignKey) {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#>`;
    }<#
      } else {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#>`;
    }<#
      }
    #><#
    }
    #>
    sql += `) values(?,?`;
    args.push(model.id);
    args.push(context.getReqDate());<#
    if (hasTenant_id) {
    #>
    if (context.tenant_id) {
      sql += ",?";
      args.push(context.tenant_id);
    }<#
    }
    #>
    if (context.getUsr_id() !== undefined) {
      sql += `,?`;
      args.push(context.getUsr_id());
    }<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,?`;
      args.push(model.<#=column_name#>);
    }<#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #><#
      } else if (!foreignKey) {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,?`;
      args.push(model.<#=column_name#>);
    }<#
      } else {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,?`;
      args.push(model.<#=column_name#>);
    }<#
      }
    #><#
    }
    #>
    sql += `)`;<#
    if (cache) {
    #>
    
    await t.delCache();<#
    }
    #>
    
    let result = await context.execute(sql, args);<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const many2many = column.many2many;
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #><#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #>
    // <#=column_comment#>
    await many2manyUpdate(model, "<#=column_name#>", { table: "<#=many2many.table#>", column1: "<#=many2many.column1#>", column2: "<#=many2many.column2#>" });<#
      } else if (!foreignKey) {
    #><#
      } else {
    #><#
      }
    #><#
    }
    #>
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { model, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }<#
  if (cache) {
  #>
  
  /**
   * 删除缓存
   * @memberof MenuDao
   */
  async delCache() {
    const table = "<#=table#>";
    const method = "delCache";
    const context = useContext();
    const cacheKey1 = `dao.sql.${ table }`;
    await context.delCache(cacheKey1);
    const foreignTables: string[] = [<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      const foreignKey = column.foreignKey;
      let data_type = column.DATA_TYPE;
      if (!foreignKey) continue;
      const foreignTable = foreignKey.table;
      const foreignTableUp = foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const many2many = column.many2many;
    #><#
      if (foreignKey && foreignKey.type === "many2many") {
    #>
      "<#=many2many.table#>",
      "<#=foreignTable#>",<#
      } else if (foreignKey && !foreignKey.multiple) {
    #>
      "<#=foreignTable#>",<#
      }
    #><#
    }
    #>
    ];
    for (let k = 0; k < foreignTables.length; k++) {
      const foreignTable = foreignTables[k];
      if (foreignTable === table) continue;
      const cacheKey1 = `dao.sql.${ foreignTable }`;
      await context.delCache(cacheKey1);
    }
  }<#
  }
  #>
  
  /**
   * 根据id修改数据
   * @param {string} id
   * @param {<#=tableUp#>Model} model
   * @return {Promise<ResultSetHeader>}
   * @memberof <#=tableUp#>Dao
   */
  async updateById(
    id: string,
    model: <#=tableUp#>Model,
  ): Promise<ResultSetHeader> {
    const t = this;
    
    const table = "<#=table#>";
    const method = "updateById";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { id, model });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    if (!id || !model) {
      return;
    }
    const context = useContext();
    const args = [ ];
    let sql = `
      update <#=table#> set update_time = ?
    `;
    args.push(context.getReqDate());
    if (context.getUsr_id() !== undefined) {
      sql += `,update_usr_id = ?`;
      args.push(context.getUsr_id());
    }<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#> = ?`;
      args.push(model.<#=column_name#>);
    }<#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #><#
      } else if (!foreignKey) {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#> = ?`;
      args.push(model.<#=column_name#>);
    }<#
      } else {
    #>
    if (model.<#=column_name#> !== undefined) {
      sql += `,<#=column_name#> = ?`;
      args.push(model.<#=column_name#>);
    }<#
      }
    #><#
    }
    #>
    sql += ` where id = ? limit 1`;
    args.push(id);<#
    if (cache) {
    #>
    
    await t.delCache();<#
    }
    #>
    
    let result = await context.execute(sql, args);<#
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // if (column.ignoreCodegen) continue;
      const column_name = column.COLUMN_NAME;
      if (column_name === "id") continue;
      let data_type = column.DATA_TYPE;
      let column_type = column.COLUMN_TYPE;
      let column_comment = column.COLUMN_COMMENT || "";
      if (column_comment.indexOf("[") !== -1) {
        column_comment = column_comment.substring(0, column_comment.indexOf("["));
      }
      const foreignKey = column.foreignKey;
      const foreignTable = foreignKey && foreignKey.table;
      const foreignTableUp = foreignTable && foreignTable.substring(0, 1).toUpperCase()+foreignTable.substring(1);
      const many2many = column.many2many;
    #><#
      if (foreignKey && foreignKey.type === "json") {
    #><#
      } else if (foreignKey && foreignKey.type === "many2many") {
    #>
    // <#=column_comment#>
    await many2manyUpdate(model, "<#=column_name#>", { table: "<#=many2many.table#>", column1: "<#=many2many.column1#>", column2: "<#=many2many.column2#>" });<#
      } else if (!foreignKey) {
    #><#
      } else {
    #><#
      }
    #><#
    }
    #>
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { id, model, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据id删除数据
   * @param {string} id
   * @return {Promise<number>}
   * @memberof <#=tableUp#>Dao
   */
  async deleteByIds(
    ids: string[],
  ): Promise<number> {
    const t = this;
    
    const table = "<#=table#>";
    const method = "deleteByIds";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { ids });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    if (!ids || !ids.length) {
      return 0;
    }
    
    const context = useContext();
    
    let num = 0;
    let sql = `
      update <#=table#> set is_deleted = 1,delete_time = ? where id = ? limit 1
    `;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const args = [ context.getReqDate(), id ];
      const result = await context.execute(sql, args);
      num += result.affectedRows;
    }<#
    if (cache) {
    #>
    await t.delCache();<#
    }
    #>
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { ids, num });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return num;
  }
  
  
  /**
   * 根据id列表还原数据
   * @param {string[]} ids
   * @return {Promise<number>}
   * @memberof <#=tableUp#>Dao
   */
  async revertByIds(
    ids: string[],
  ): Promise<number> {
    const t = this;
    
    const table = "<#=table#>";
    const method = "create";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { ids });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    if (!ids || !ids.length) {
      return 0;
    }
    
    const context = useContext();
    
    let num = 0;
    let sql = `
      update <#=table#> set is_deleted = 0 where id = ? limit 1
    `;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const args = [ id ];
      const result = await context.execute(sql, args);
      num += result.affectedRows;
    }<#
    if (cache) {
    #>
    await t.delCache();<#
    }
    #>
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { ids, num });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return num;
  }<#
  if (hasOrderBy) {
  #>
    
  /**
   * 查找order_by字段的最大值
   * @param {Context} context
   * @return {*}  {Promise<number>}
   * @memberof <#=tableUp#>Dao
   */
  async findLastOrderBy(): Promise<number> {
    const t = this;
    
    const table = "<#=table#>";
    const method = "findLastOrderBy";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`dao.before.sql.${ method }.${ table }`, { });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const context = useContext();
    let sql = `
      select
        t.order_by order_by
      from <#=table#> t
    `;
    const whereQuery = [ ];
    let args = [ ];<#
    if (hasTenant_id) {
    #>
    whereQuery.push("t.tenant_id = ?");
    args.push(context.tenant_id);<#
    }
    #>
    if (whereQuery.length > 0) {
      sql += " where " + whereQuery.join(" and ");
    }
    sql += `
      order by
        t.order_by desc
      limit 1
    `;
    
    let model = await context.queryOne<{
      order_by: number,
    }>(sql, args);
    let result = model?.order_by || 1;
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`dao.after.sql.${ method }.${ table }`, { result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }<#
  }
  #>
  
}
