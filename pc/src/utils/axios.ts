import Axios, { type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import useUsrStore from "../store/usr";
import useIndexStore from "../store/index";
import { saveAs } from "file-saver";

// const CancelToken = Axios.CancelToken;

export const baseURL = "";

export const axios = Axios.create({
  baseURL,
  timeout: 60000,
  timeoutErrorMessage: "请求超时!",
});

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    const usrStore = useUsrStore();
    const indexStore = useIndexStore();
    const authorization: string = usrStore.authorization;
    if (authorization) {
      if (!authorization.startsWith("Bearer ")) {
        config.headers = config.headers || { };
        (config.headers as any).Authorization = `Bearer ${ authorization }`;
      } else {
        config.headers = config.headers || { };
        (config.headers as any).Authorization = authorization;
      }
    }
    const configAny = config as any;
    if (configAny.notLoading !== true) {
      indexStore.addLoading();
      if (configAny.isMutation) {
        if (indexStore.mutationLoading > 0) {
          console.error("正在执行其他修改操作");
          throw "";
          // const source = CancelToken.source();
          // config.cancelToken = source.token;
          // return config;
        }
        indexStore.mutationLoading++;
      }
    }
    return config;
  },
  (error) => {
    const indexStore = useIndexStore();
    indexStore.minusLoading();
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    const indexStore = useIndexStore();
    const usrStore = useUsrStore();
    const config = response.config;
    const configAny = config as any;
    if (configAny.notLoading !== true) {
      if (configAny.isMutation) {
        if (indexStore.mutationLoading > 0) {
          indexStore.mutationLoading--;
        }
      }
      indexStore.minusLoading();
    }
    const headers = response.headers;
    if (headers["authorization"]) {
      let authorization = headers["authorization"];
      if (authorization.startsWith("Bearer ")) {
        authorization = authorization.substring(7);
      }
      usrStore.refreshToken(authorization);
    }
    if (configAny.reqType === "graphql") {
      return response;
    }
    const data: any = response.data;
    if (data.key === "token_empty" || data.key === "refresh_token_expired") {
      indexStore.logout();
      return data;
    }
    if (data.code !== 0) {
      const errMsg = <string>data.msg;
      if (configAny.showErrMsg !== false) {
        if (errMsg) {
          ElMessage({
            offset: 0,
            type: "error",
            showClose: true,
            message: errMsg,
            duration: configAny.duration,
          });
        }
      }
      return Promise.reject(data);
    }
    return response;
  },
  (error) => {
    const indexStore = useIndexStore();
    indexStore.mutationLoading--;
    if (indexStore.mutationLoading > 0) {
      indexStore.mutationLoading--;
    }
    indexStore.minusLoading();
    let errMsg = "";
    if (error.code === "ERR_NETWORK") {
      errMsg = "网络连接失败!";
    } else if (error.code === "ECONNABORTED") {
      errMsg = "请求超时!";
    }
    if (errMsg) {
      ElMessage({
        offset: 0,
        type: "error",
        showClose: true,
        message: errMsg,
      });
    }
    return Promise.reject(error);
  },
);

/**
 * 上传文件
 * @export
 * @param {File} file 需要上传的文件
 * @param {{ [key: string]: any }} data 上传文件时需要附带的数据
 * @param {AxiosRequestConfig<FormData>} config 配置选项, type: oss 或者 tmpfile, 默认为 oss
 */
export async function uploadFile(
  file: File,
  data?: { [key: string]: any },
  config?: AxiosRequestConfig<FormData> & { type?: "oss"|"tmpfile" },
) {
  config = config || { };
  config.type = config.type || "oss";
  config.url = config.url || `${ baseURL }/api/${ config.type }/upload`;
  config.method = config.method || "post";
  const formData = new FormData();
  formData.append("file", file);
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
  }
  config.data = formData;
  const res = await axios.request<{
    code: number;
    msg: string;
    data: string;
  }>(config);
  const id = res.data.data;
  return id;
}

/**
 * 获得下载文件的url
 * @export
 * @param {({
 *     id: string;
 *     filename?: string;
 *     inline?: "0"|"1";
 *   })} model
 * @return {string}
 */
export function getDownloadUrl(
  model: {
    id: string;
    filename?: string;
    inline?: "0"|"1";
  } | string,
  type: "oss" | "tmpfile" = "tmpfile",
): string {
  const usrStore = useUsrStore();
  const authorization: string = usrStore.authorization;
  const params = new URLSearchParams();
  if (authorization) {
    params.set("authorization", authorization);
  }
  if (typeof model === "string") {
    model = { id: model };
  }
  params.set("id", model.id);
  if (model.filename) {
    params.set("filename", model.filename);
  }
  if (model.inline != null) {
    params.set("inline", model.inline);
  }
  return `${ baseURL }/api/${ type }/download/${ model.filename || "" }?${ params.toString() }`;
}

/**
 * 获得压缩后图片的url
 **/
export function getImgUrl(
  model: {
    id: string;
    authorization?: string;
    format?: "webp" | "png" | "jpeg" | "jpg";
    width?: number;
    height?: number;
    quality?: number;
    filename?: string;
    inline?: "0"|"1";
  } | string,
) {
  let authorization: string | undefined = undefined;
  if (typeof model !== "string") {
    authorization = model.authorization;
    if (!authorization) {
      const usrStore = useUsrStore();
      authorization = usrStore.authorization;
    }
  }
  const params = new URLSearchParams();
  if (typeof model === "string") {
    model = {
      id: model,
      format: "webp",
    };
  }
  params.set("id", model.id);
  if (model.filename) {
    params.set("filename", model.filename);
  }
  if (model.inline != null) {
    params.set("inline", model.inline);
  }
  if (model.format) {
    params.set("f", model.format);
  }
  if (model.width) {
    params.set("w", model.width.toString());
  }
  if (model.height) {
    params.set("h", model.height.toString());
  }
  if (model.quality) {
    params.set("q", model.quality.toString());
  }
  if (authorization) {
    params.set("authorization", authorization);
  }
  return `${ baseURL }/api/oss/img?${ params.toString() }`;
}

/**
 * 下载文件
 * @export
 * @param {({
 *     id: string;
 *     filename?: string;
 *     inline?: "0"|"1";
 *   } | string)} id
 */
export function downloadById(
  id: {
    id: string;
    filename?: string;
    remove?: "0"|"1";
    inline?: "0"|"1";
  } | string,
  type: "oss" | "tmpfile" = "tmpfile",
) {
  let model: {
    id: string,
  } = {
    id: "",
  };
  if (typeof id === "string") {
    model.id = id;
  } else {
    model = id;
  }
  if (!model || !model.id) {
    return;
  }
  const url = getDownloadUrl(model, type);
  saveAs(url);
}
