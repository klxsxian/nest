import type {
  Query,
  Mutation,
  MutationLoginArgs,
  GetLoginTenants,
} from "#/types";

/**
 * 根据 当前网址的域名+端口 获取 租户列表
 * @export
 * @param {{ host: string }} variables
 * @param {GqlOpt} [opt]
 * @return {Promise<GetLoginTenants[]>}
 */
export async function getLoginTenants(
  variables: { domain: string },
  opt?: GqlOpt,
): Promise<GetLoginTenants[]> {
  const data: {
    getLoginTenants: Query["getLoginTenants"],
  } = await query({
    query: /* GraphQL */ `
      query($domain: String!) {
        getLoginTenants(domain: $domain) {
          id
          lbl
        }
      }
    `,
    variables,
  },opt);
  return data.getLoginTenants;
}

/**
 * 获取语言列表
 */
export async function getLoginLangs(
  opt?: GqlOpt,
) {
  const res: {
    getLoginLangs: Query["getLoginLangs"],
  } = await query({
    query: /* GraphQL */ `
      query {
        getLoginLangs {
          id
          code
          lbl
        }
      }
    `,
  }, opt);
  const data = res.getLoginLangs;
  return data;
}

export async function login(
  input: MutationLoginArgs["input"],
  opt?: GqlOpt,
) {
  const res: {
    login: Mutation["login"],
  } = await mutation({
    query: /* GraphQL */ `
      mutation($input: LoginInput!) {
        login(input: $input) {
          authorization
          org_id
        }
      }
    `,
    variables: {
      input,
    },
  }, opt);
  const data = res.login;
  return data;
}

// 清空缓存
export async function clearCache(
  variables?: { [key: string]: any; },
  opt?: GqlOpt,
): Promise<any> {
  const data = await mutation({
    query: /* GraphQL */ `
      mutation {
        clearCache
      }
    `,
    variables,
  }, opt);
  return data?.clearCache;
}
