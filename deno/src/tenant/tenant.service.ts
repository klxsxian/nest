import * as tenantDao from "/src/tenant/tenant.dao.ts";

export async function getLoginTenants(
  host: string,
): Promise<{ id: string, lbl: string }[]> {
  const result = await tenantDao.getLoginTenants(host);
  return result;
}
