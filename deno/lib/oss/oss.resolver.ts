import * as ossService from "./oss.service.ts";

export async function getStatsOss(
  ids: string[],
) {
  const statInfos = [ ];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    let lbl = "";
    if (!id) {
      statInfos.push({ id, lbl });
      continue;
    }
    let stats = undefined;
    try {
      stats = await ossService.statObject(id);
    } catch (err) {
      if (err.code === "NotFound") {
        lbl = "";
      } else {
        throw err;
      }
    }
    const filename = stats?.meta?.filename;
    if (filename) {
      lbl = decodeURIComponent(filename || "");
    }
    statInfos.push({
      id,
      lbl,
      contentType: stats?.contentType,
      size: stats?.contentLength,
    });
  }
  return statInfos;
}
