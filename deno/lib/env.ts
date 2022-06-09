import { configAsync, DotenvConfig } from "dotenv";

declare global {
  interface Window {
    process: {
      env: {
        NODE_ENV: string;
      };
    };
  }
}

let envKey = "dev";

function initEnv() {
  for (let i = 0; i < Deno.args.length; i++) {
    const item = Deno.args[i];
    if (item.startsWith("-e=") || item.startsWith("--env=")) {
      const envKeyTmp = item.replace(/^-e=/, "").replace(/^--env=/, "");
      if (envKeyTmp) {
        envKey = envKeyTmp;
      }
    }
  }
  if (envKey === "dev") {
    envKey = "development";
  } else if (envKey === "prod") {
    envKey = "production";
  }
  
  window.process = window.process || { };
  window.process.env = window.process.env || { };
  if (envKey === "development") {
    window.process.env.NODE_ENV = "development";
  } else {
    window.process.env.NODE_ENV = "production";
  }
}
initEnv();

let parsedEnv: DotenvConfig;

async function parseEnv() {
  const cwd = Deno.cwd();
  if (envKey === "development") {
    parsedEnv = await configAsync({
      export: false,
      path: `${ cwd }/.env.dev`,
    });
  } else if (envKey === "production") {
    parsedEnv = await configAsync({
      export: false,
      path: `${ cwd }/.env.prod`,
    });
  } else if (!envKey) {
    parsedEnv = await configAsync({
      export: false,
      path: `${ cwd }/.env.${ envKey }`,
    });
  }
}

/**
 * 获取环境变量
 * @export
 * @param {string} key
 * @return {Promise<string>} 
 */
export async function getEnv(key: string): Promise<string> {
  const val = Deno.env.get(key);
  if (val) {
    return val;
  }
  if (!parsedEnv) {
    await parseEnv();
  }
  return parsedEnv[key];
}

/**
 * 设置环境变量
 * @param {string} key
 * @param {string} val
 */
export function setEnv(key: string, val: string) {
  Deno.env.set(key, val)
}
