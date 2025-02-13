// deno-lint-ignore-file ban-unused-ignore
import Decimal from "decimal.js";
import {
  log,
} from "/lib/context.ts";

type SupportTypeElement =
  | string
  | Date
  | number
  | boolean
  | null
  | undefined
  // deno-lint-ignore ban-types
  | {};
// Array
type SupportType = SupportTypeElement | SupportTypeElement[];

const reg = /('[^'\\]*(?:\\.[^'\\]*)*')|("[^"\\]*(?:\\.[^"\\]*)*")|(\?\?)|(\?)/g;

export function replaceParams(
  sql: string,
  params?: null | SupportType[],
  opt?: {
    debug?: boolean;
  },
): string {
  if (!params || params.length === 0) {
    if (opt?.debug === true) {
      log(sql.trim());
    }
    return sql;
  }
  let paramIndex = 0;
  sql = sql.replace(
    reg,
    (str) => {
      if (paramIndex >= params.length) return str;
      // ignore
      if (/".*"/g.test(str) || /'.*'/g.test(str)) {
        return str;
      }
      // identifier
      if (str === '??') {
        const val = params[paramIndex++];
        if (val instanceof Array) {
          return `(${val
            .map((item) => replaceParams('??', [item]))
            .join(',')})`;
        } else if (val === '*') {
          return val;
        } else if (typeof val === 'string' && val.includes('.')) {
          // a.b => `a`.`b`
          const _arr = val.split('.');
          return replaceParams(_arr.map(() => '??').join('.'), _arr);
        } else if (
          typeof val === 'string' &&
          (val.includes(' as ') || val.includes(' AS '))
        ) {
          // a as b => `a` AS `b`
          const newVal = val.replace(' as ', ' AS ');
          const _arr = newVal.split(' AS ');
          return replaceParams(_arr.map(() => '??').join(' AS '), _arr);
        } else {
          return ['`', val, '`'].join('');
        }
      }
      // value
      const val = params[paramIndex++];
      if (val === null) return 'NULL';
      switch (typeof val) {
        case 'object':
          if (val instanceof Date) return `"${formatDate(val)}"`;
          if (val instanceof Array) {
            if (val.length === 0) {
              return "('')";
            }
            return `(${val
              .map((item) => replaceParams('?', [item]))
              .join(',')})`;
          }
          if (val instanceof Decimal) {
            return val.toString();
          }
          throw new Error(
            `Unsupported argument type in your sql query: ${
              // deno-lint-ignore ban-types
              (val as object).constructor.name
            }`
          );
        case 'string':
          return `"${escapeString(val)}"`;
        case 'undefined':
          return 'NULL';
        case 'number':
        case 'boolean':
        default:
          return `${val}`;
      }
    }
  );
  if (opt?.debug === true) {
    log(sql.trim());
  }
  return sql;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const days = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  // Date does not support microseconds precision, so we only keep the milliseconds part.
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function escapeString(str: string) {
  return str.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}
