import {
  getAuthModel,
} from "/lib/auth/auth.dao.ts";

import {
  useContext,
} from "/lib/context.ts";

import { getEnv } from "/lib/env.ts";

const reg = /\{([\s\S]*?)\}/gm;

export async function n(
  routePath: string | null,
  code: string,
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) {
  const authModel = await getAuthModel();
  let langCode = authModel?.lang;
  if (!langCode) {
    const context = useContext();
    langCode = context.lang;
  }
  return await nLang(langCode, routePath, code, ...args);
}

export function initN(
  routePath: string | null,
) {
  // deno-lint-ignore no-explicit-any
  return function(code: string, ...args: any[]) {
    return n(routePath, code, ...args);
  };
}

export async function ns(
  code: string,
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) {
  const authModel = await getAuthModel();
  let langCode = authModel?.lang;
  if (!langCode) {
    const context = useContext();
    langCode = context.lang;
  }
  return await nLang(langCode, null, code, ...args);
}

export async function nLang(
  langCode: string,
  routePath: string | null,
  code: string,
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) {
  const server_i18n_enable = await getEnv("server_i18n_enable");
  if (server_i18n_enable === "false") {
    if (args.length === 1 && typeof args[0] === "object") {
      const obj = args[0];
      let i18nLbl = code;
      i18nLbl = i18nLbl.replace(reg, (str) => {
        const str2 = str.substring(1, str.length-1);
        return obj[str2] ?? str;
      });
      return i18nLbl;
    } else if (args.length > 0) {
      let i18nLbl = code;
      i18nLbl = i18nLbl.replace(reg, (str) => {
        const str2 = str.substring(1, str.length-1);
        const num = Number(str2);
        if (isNaN(num)) {
          return str;
        }
        return args[num] ?? str;
      });
      return i18nLbl;
    }
    return code;
  }
  
  const {
    findOne: findOneLang,
  } = await import("/gen/base/lang/lang.dao.ts");
  const {
    findOne: findOneI18n,
  } = await import("/gen/base/i18n/i18n.dao.ts");
  const {
    findOne: findOneMenu,
  } = await import("/gen/base/menu/menu.dao.ts");
  
  let i18nLbl = code;
  const langModel = await findOneLang({
    code: langCode,
    is_enabled: [ 1 ],
  });
  let menu_id: MenuId | undefined;
  if (routePath != null) {
    const menuModel = await findOneMenu({
      route_path: routePath,
      is_enabled: [ 1 ],
    });
    menu_id = menuModel?.id;
  }
  if (langModel) {
    let i18nModel: I18nModel | undefined
    if (menu_id) {
      i18nModel = await findOneI18n({
        lang_id: [ langModel.id ],
        menu_id: [ menu_id ],
        code,
      });
      if (!i18nModel) {
        i18nModel = await findOneI18n({
          lang_id: [ langModel.id ],
          menu_id_is_null: true,
          code,
        });
      }
    } else {
      i18nModel = await findOneI18n({
        lang_id: [ langModel.id ],
        menu_id_is_null: true,
        code,
      });
    }
    if (i18nModel) {
      i18nLbl = i18nModel.lbl;
    }
  }
  if (args.length === 1 && typeof args[0] === "object") {
    const obj = args[0];
    i18nLbl = i18nLbl.replace(reg, (str) => {
      const str2 = str.substring(1, str.length-1);
      return obj[str2] ?? str;
    });
  } else if (args.length > 0) {
    i18nLbl = i18nLbl.replace(reg, (str) => {
      const str2 = str.substring(1, str.length-1);
      const num = Number(str2);
      if (isNaN(num)) {
        return str;
      }
      return args[num] ?? str;
    });
  }
  return i18nLbl;
}
