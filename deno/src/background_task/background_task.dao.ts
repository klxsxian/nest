import { Context } from "/lib/context.ts";
import { shortUuidV4 } from "/lib/string_util.ts";
import { create, updateById } from "/gen/background_task/background_task.dao.ts";
import dayjs from "dayjs";

const timeoutObj = Symbol("timeoutObj");

//[{value: "text", label: "文本"},{value: "download", label: "下载"},{value: "inline", label: "查看"},{value: "tag", label: "标签"}]
export type BtType = "text"|"download"|"inline"|"tag";

// deno-lint-ignore no-explicit-any
async function handelResult(context: Context, data: any, id: string) {
  if (typeof data === "object" && !(data instanceof String)) {
    data = JSON.stringify(data);
  }
  const dateNow = new Date();
  const end_time = dayjs(dateNow).format("YYYY-MM-DD HH:mm:ss");
  await updateById(
    context,
    id,
    {
      state: "success",
      end_time,
      result: data,
    },
  );
}

async function handelErr(context: Context, err: Error, id: string) {
  const errMsg = err.message || err.toString();
  const dateNow = new Date();
  const end_time = dayjs(dateNow).format("YYYY-MM-DD HH:mm:ss");
  await updateById(
    context,
    id,
    {
      state: "fail",
      end_time,
      err_msg: errMsg,
    },
  );
}

export function backgroundTaskWrap(
  taskResult: { lbl: string, type?: BtType },
  // deno-lint-ignore no-explicit-any
  func: (...args: any[]) => Promise<any>,
) {
  const timeoutPrm = new Promise((resolve) => setTimeout(() => resolve(timeoutObj), 30000));
  // deno-lint-ignore no-explicit-any
  return async (...args: any[]) => {
    const context = args[0];
    const dateNow = new Date();
    const begin_time = dayjs(dateNow).format("YYYY-MM-DD HH:mm:ss");
    const result = func(...args);
    const result2 = await Promise.race([ result, timeoutPrm ]);
    if (result2 === timeoutObj) {
      taskResult = taskResult || { };
      taskResult.type = taskResult.type || "text";
      const id = shortUuidV4();
      await create(
        context,
        {
          id,
          lbl: taskResult.lbl || "",
          type: taskResult.type,
          state: "running",
          begin_time,
          end_time: undefined,
        },
      );
      (async function() {
        try {
          const data = await Promise.resolve(result);
          await handelResult(context, data, id);
        } catch (err) {
          await handelErr(context, err, id);
        }
      })();
    }
  };
}
