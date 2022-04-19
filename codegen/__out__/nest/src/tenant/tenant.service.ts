import { ResultSetHeader } from "mysql2/promise";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { shortUuidV4 } from "../common/util/uuid";
import { readFile } from "fs/promises";
import { renderExcelWorker } from "../common/util/ejsexcel_worker";
import { renderExcel } from "ejsexcel";
import { streamToBuffer } from "../common/util/stream";
import { parseXlsx } from "xlsx-img";
import { parse as csvParse } from "fast-csv";
import { TmpfileDao } from "../common/tmpfile/tmpfile.dao";
import { ServiceException } from "../common/exceptions/service.exception";
import { PageModel } from "../common/page.model";
import { useContext } from "../common/interceptors/context.interceptor";
import { TenantModel, TenantSearch } from "./tenant.model";
import { TenantDao } from "./tenant.dao";

@Injectable()
export class TenantService {
  
  constructor(
    private readonly eventEmitter2: EventEmitter2,
    private readonly tmpfileDao: TmpfileDao,
    private readonly tenantDao: TenantDao,
  ) { }
  
  /**
   * 根据条件查找总数据数
   * @param {TenantSearch} search? 搜索条件
   * @return {Promise<number>}
   * @memberof TenantService
   */
  async findCount(
    search?: TenantSearch,
  ): Promise<number> {
    const t = this;
    const table = "tenant";
    const method = "findCount";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { search });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    let result = await t.tenantDao.findCount(search);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { search, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据条件和分页查找数据
   * @param {TenantSearch} search? 搜索条件
   * @param {PageModel} pageModel? 分页条件
   * @return {Promise<TenantModel[]>} 
   * @memberof TenantService
   */
  async findAll(
    search?: TenantSearch,
    pageModel?: PageModel,
  ): Promise<TenantModel[]> {
    const t = this;
    const table = "tenant";
    const method = "findAll";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { search });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const context = useContext();
    
    let result: TenantModel[] = await t.tenantDao.findAll(search, pageModel);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { search, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据条件查找第一条数据
   * @param {TenantSearch} search? 搜索条件
   * @return {Promise<TenantModel>} 
   * @memberof TenantService
   */
  async findOne(
    search?: TenantSearch,
  ): Promise<TenantModel> {
    const t = this;
    const data = await t.tenantDao.findOne(search);
    return data;
  }
  
  /**
   * 根据id查找数据
   * @param {string} id
   * @return {Promise<TenantModel>}
   * @memberof TenantService
   */
  async findById(
    id: string,
  ): Promise<TenantModel> {
    const t = this;
    if (!id) return;
    const data = await t.tenantDao.findById(id);
    return data;
  }
  
  /**
   * 根据搜索条件判断数据是否存在
   * @param {TenantSearch} search? 搜索条件
   * @return {Promise<boolean>}
   * @memberof TenantService
   */
  async exist(
    search?: TenantSearch,
  ): Promise<boolean> {
    const t = this;
    const data = await t.tenantDao.exist(search);
    return data;
  }
  
  /**
   * 根据id查找数据是否存在
   * @param {string} id
   * @return {Promise<boolean>}
   * @memberof TenantService
   */
  async existById(
    id: string,
  ): Promise<boolean> {
    const t = this;
    if (!id) return;
    const data = await t.tenantDao.existById(id);
    return data;
  }
  
  /**
   * 创建数据
   * @param {TenantModel} model
   * @return {Promise<string>} 
   * @memberof TenantService
   */
  async create(
    model: TenantModel,
  ): Promise<string> {
    const t = this;
    const table = "tenant";
    const method = "create";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { model });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    model.id = shortUuidV4();
    let result: ResultSetHeader = await t.tenantDao.create(model);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { model, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return model.id;
  }
  
  /**
   * 根据id修改数据
   * @param {string} id
   * @param {TenantModel} model
   * @return {Promise<string>}
   * @memberof TenantService
   */
  async updateById(
    id: string,
    model: TenantModel,
  ): Promise<string> {
    const t = this;
    const table = "tenant";
    const method = "updateById";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { model, id });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    if (!id) {
      throw "updateById id can not be empty!";
    }
    let result: ResultSetHeader = await t.tenantDao.updateById(id, model);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { model, id, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return id;
  }
  
  /**
   * 第一行作为表头, 获得文件数据
   * @param {string} id
   * @memberof TenantService
   */
  async getImportFileRows(
    id: string,
  ) {
    const t = this;
    if (!id) {
      throw "importFile id can not be empty!";
    }
    const stats = await t.tmpfileDao.statObject(id);
    if (!stats) {
      throw "文件不存在!";
    }
    let rows: { [key: string]: any }[] = [ ];
    const contentType = stats.metaData["content-type"];
    if (contentType === "text/csv") {
      const stream = await t.tmpfileDao.getObject(id);
      await new Promise((resolve, reject) => {
        stream.pipe(csvParse({ headers: true }));
        stream.on("error", reject);
        stream.on("data", (row0: { [key: string]: any }) => {
          const keys = Object.keys(row0);
          const row = { };
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            let val = row0[key];
            if (typeof val === "string") {
              val = val.trim();
            }
            if (val !== "-") {
              rows.push({ [key]: val });
            }
          }
          rows.push(row);
        });
        stream.on("end", resolve);
      });
    } else if (contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      const stream = await t.tmpfileDao.getObject(id);
      const buffer = await streamToBuffer(stream);
      let worksheets: Awaited<ReturnType<typeof parseXlsx>>;
      try {
        worksheets = await parseXlsx(buffer);
      } catch (err) {
        throw "文件格式错误, 只能导入 .xlsx 或者 .xlsm 格式的Excel文件！";
      }
      const sheet = worksheets[0];
      let data = sheet.data;
      let keys: string[] = data[0];
      for (let i = 1; i < data.length; i++) {
        const vals = data[i];
        const row = { };
        for (let k = 0; k < keys.length; k++) {
          const key = String(keys[k]).trim();
          if (!key) continue;
          let val = vals[k];
          if (typeof val === "string") {
            val = val.trim();
          }
          if (val !== "-") {
            row[key] = val;
          }
        }
        rows.push(row);
      }
    } else {
      throw "文件类型不支持, 只支持 csv 或者 Excel 格式的文件!";
    }
    return rows;
  }
  
  /**
   * 导入文件
   * @param {string} id
   * @memberof TenantService
   */
  async importFile(
    id: string,
  ) {
    const t = this;
    const table = "tenant";
    const method = "importFile";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { id });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const rows = await t.getImportFileRows(id);
    const header: { [key: string]: string } = {
      "名称": "lbl",
      "域名绑定": "host",
      "到期日": "expiration",
      "最大用户数": "max_usr_num",
      "启用": "_is_enabled",
      "菜单": "_menu_ids",
      "排序": "order_by",
      "备注": "rem",
    };
    const models: TenantModel[] = [ ];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const model: TenantModel = { };
      const lbls = Object.keys(header);
      for (let k = 0; k < lbls.length; k++) {
        const lbl = lbls[k];
        const key = header[lbl];
        if (!key) continue;
        const val = row[lbl];
        if (val != null) {
          model[key] = val;
        }
      }
      models.push(model);
    }
    
    let succNum = 0;
    let failNum = 0;
    let failErrMsgs: string[] = [ ];
    
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      const id = shortUuidV4();
      try {
        await t.tenantDao.create({ ...model, id }, { uniqueType: "update" });
        succNum++;
      } catch (err) {
        failNum++;
        failErrMsgs.push(`第 ${ i + 1 } 行: ${ err.message || err.toString() }`);
      }
    }
    
    let result = "";
    if (succNum > 0) {
      result = `导入成功 ${ succNum } 条\r\n`;
    }
    if (failNum > 0) {
      result += `导入失败 ${ failNum } 条\r\n`;
    }
    if (failErrMsgs.length > 0) {
      result += failErrMsgs.join("\r\n");
    }
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { id, result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
  /**
   * 根据id列表删除数据
   * @param {string[]} ids
   * @return {Promise<number>}
   * @memberof TenantService
   */
  async deleteByIds(
    ids: string[],
  ): Promise<number> {
    const t = this;
    const table = "tenant";
    const method = "deleteByIds";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { ids });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    let num = await t.tenantDao.deleteByIds(ids);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { ids, num });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return num;
  }
  
  /**
   * 根据id列表还原数据
   * @param {string[]} ids
   * @return {Promise<number>}
   * @memberof TenantService
   */
  async revertByIds(
    ids: string[],
  ): Promise<number> {
    const t = this;
    const table = "tenant";
    const method = "revertByIds";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { ids });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    let num = await t.tenantDao.revertByIds(ids);
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { ids, num });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return num;
  }
  
  /**
   * 导出Excel
   * @param {TenantSearch} search? 搜索条件
   * @return {Promise<String>} 临时文件id
   * @memberof <%=tableUp%>Service
   */
  async exportExcel(
    search?: TenantSearch,
  ): Promise<String> {
    const t = this;
    const table = "tenant";
    const method = "exportExcel";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { search });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    const models = await t.findAll(search);
    const buffer0 = await readFile(`${ __dirname }/tenant.xlsx`);
    let buffer: Buffer;
    if (models.length > 1000) {
      buffer = await renderExcelWorker(buffer0, { models });
    } else {
      buffer = await renderExcel(buffer0, { models });
    }
    
    let reslut = await t.tmpfileDao.upload({
      data: buffer,
      filename: "租户.xlsx",
      mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { search, buffer });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return reslut;
  }
  
  /**
   * 查找 order_by 字段的最大值
   * @return {Promise<number>}
   * @memberof TenantService
   */
  async findLastOrderBy(): Promise<number> {
    const t = this;
    const table = "tenant";
    const method = "findLastOrderBy";
    
    const [ beforeEvent ] = await t.eventEmitter2.emitAsync(`service.before.${ method }.${ table }`, { });
    if (beforeEvent?.isReturn) return beforeEvent.data;
    
    let result = await t.tenantDao.findLastOrderBy();
    
    const [ afterEvent ] = await t.eventEmitter2.emitAsync(`service.after.${ method }.${ table }`, { result });
    if (afterEvent?.isReturn) return afterEvent.data;
    
    return result;
  }
  
}
