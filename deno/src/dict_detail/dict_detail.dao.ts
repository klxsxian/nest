import {
  query,
  QueryArgs,
} from "/lib/context.ts";

type DictModel = {
  id: string;
  code: string;
  type: string;
  lbl: string;
  val: string;
};

/**
 * 获取 codes 对应的系统字典
 */
export async function getDict(
  codes: string[] = [ ],
) {
  const table = "dict_detail";
  
  if (codes.length === 0) {
    return [ ];
  }
  
  const args = new QueryArgs();
  const sql = /*sql*/ `
    select
      t.id,
      dict.code,
      dict.type,
      t.lbl,
      t.val
    from
      dict_detail t
    inner join dict
      on t.dict_id = dict.id
      and dict.is_deleted = 0
      and dict.is_enabled = 1
    where
      t.is_deleted = 0
      and t.is_enabled = 1
      and dict.code in ${ args.push(codes) }
    order by
      t.order_by asc
  `;
  
  const cacheKey1 = `dao.sql.${ table }`;
  const cacheKey2 = JSON.stringify({ sql, args });
  
  const rsArr = await query<DictModel>(sql, args, { cacheKey1, cacheKey2 });
  const data: DictModel[][] = [ ];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const itemArr = rsArr.filter((itemTmp) => itemTmp.code === code);
    data.push(itemArr);
  }
  return data;
}
