<#
const Table_Up = table.split("_").map(function(item) {
  return item.substring(0, 1).toUpperCase() + item.substring(1);
}).join("");
const tableUp = Table_Up.substring(0, 1).toLowerCase() + Table_Up.substring(1);
const column = columns.find((item) => item.foreignTabs?.length > 0);
const foreignTabs = column?.foreignTabs || [ ];
const foreignTabsDialogType = column?.foreignTabsDialogType || "medium";
#><template>
<CustomDialog
  ref="customDialogRef"
  :before-close="beforeClose"
  click-modal-close
>
  <div
    un-flex="~ [1_0_0] col basis-[inherit]"
    un-overflow-hidden
  >
    <div
      un-flex="~ [1_0_0] col basis-[inherit]"
      un-overflow-auto
      un-p="x-2"
      un-justify-start
      un-items-center
    >
      <el-tabs
        v-model="tabName"
        type="card"
        class="el-flex-tabs"
        un-flex="~ [1_0_0] col"
        un-w="full"
      ><#
      for (let im = 0; im < foreignTabs.length; im++) {
        const item = foreignTabs[im];
        const itemTable = item.table;
        const itemTableUp = itemTable.substring(0,1).toUpperCase() + itemTable.substring(1);
      #>
        
        <el-tab-pane
          lazy
          :label="'<#=item.label#>' + (<#=itemTable#>Total != null ? ` (${ <#=itemTable#>Total })` : '')"
          name="<#=item.label#>"
        >
          <<#=itemTableUp#>List
            :<#=item.column#>="dialogModel.id"
            :is_deleted="dialogModel.is_deleted ? '1' : '0'"
            :is-locked="dialogModel.is_deleted ? '1' : '0'"
            @add="useAllFindDebounce"
            @remove="useAllFindDebounce"
            @revert="useAllFindDebounce"
          ></<#=itemTableUp#>List>
        </el-tab-pane><#
        }
        #>
        
      </el-tabs>
    </div>
    <div
      un-p="y-2.5"
      un-box-border
      un-flex
      un-justify-center
      un-items-center
    >
      
      <el-button
        plain
        @click="onClose"
      >
        <template #icon>
          <ElIconCircleClose />
        </template>
        <span>{{ n("关闭") }}</span>
      </el-button>
      
    </div>
  </div>
</CustomDialog>
</template>

<script lang="ts" setup><#
for (let im = 0; im < foreignTabs.length; im++) {
  const item = foreignTabs[im];
  const itemTable = item.table;
  const itemTableUp = itemTable.substring(0,1).toUpperCase() + itemTable.substring(1);
#>

import <#=itemTableUp#>List from "@/views/<#=item.mod#>/<#=itemTable#>/List.vue";

import {
  findCount as findCount<#=itemTableUp#>,
} from "@/views/<#=item.mod#>/<#=itemTable#>/Api";<#
}
#>

const {
  n,
  initI18ns,
} = useI18n("/<#=mod#>/<#=table#>");

let inited = $ref(false);

let dialogAction = $ref<"list">("list");

let dialogModel = $ref<{
  id?: <#=Table_Up#>Id,
  is_deleted?: number | null,
}>({ });

let tabName = $ref("<#=foreignTabs[0]?.label || ""#>");<#
for (let im = 0; im < foreignTabs.length; im++) {
  const item = foreignTabs[im];
  const itemTable = item.table;
  const itemTableUp = itemTable.substring(0,1).toUpperCase() + itemTable.substring(1);
#>

let <#=itemTable#>Total = $ref<number>();

async function useFindCount<#=itemTableUp#>() {
  const <#=item.column#>: <#=Table_Up#>Id[] = [ dialogModel.id! ];
  <#=itemTable#>Total = await findCount<#=itemTableUp#>(
    {
      is_deleted: dialogModel.is_deleted,
      <#=item.column#>,
    },
  );
}<#
}
#>

async function useAllFindCount() {
  await Promise.all([<#
    for (let im = 0; im < foreignTabs.length; im++) {
      const item = foreignTabs[im];
      const itemTable = item.table;
      const itemTableUp = itemTable.substring(0,1).toUpperCase() + itemTable.substring(1);
    #>
    useFindCount<#=itemTableUp#>(),<#
    }
    #>
  ]);
}

let findTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

function useAllFindDebounce() {
  clearTimeout(findTimeout);
  findTimeout = setTimeout(useAllFindCount, 0);
}

type OnCloseResolveType = {
  type: "ok" | "cancel";
};

let onCloseResolve = function(_value: OnCloseResolveType) { };

let customDialogRef = $ref<InstanceType<typeof CustomDialog>>();

/** 打开对话框 */
async function showDialog(
  arg?: {
    title?: string;
    model?: {
      id?: <#=Table_Up#>Id;
      is_deleted?: number | null;
    };
    action?: typeof dialogAction;
  },
) {
  inited = false;
  const title = arg?.title || "";
  const dialogRes = customDialogRef!.showDialog<OnCloseResolveType>({
    type: "<#=foreignTabsDialogType#>",
    title,
  });
  onCloseResolve = dialogRes.onCloseResolve;
  const model = arg?.model;
  const action = arg?.action;
  dialogModel.is_deleted = model?.is_deleted;
  dialogAction = action || "list";
  if (dialogAction === "list") {
    dialogModel.id = model?.id;
    await useAllFindCount();
  }
  inited = true;
  return await dialogRes.dialogPrm;
}

/** 初始化ts中的国际化信息 */
async function initI18nsEfc() {
  const {
    initI18ns,
  } = useI18n();
  const codes: string[] = [
  ];
  await initI18ns(codes);
}
initI18nsEfc();

/** 点击取消关闭按钮 */
function onClose() {
  onCloseResolve({
    type: "cancel",
  });
}

async function beforeClose(done: (cancel: boolean) => void) {
  done(false);
  onCloseResolve({
    type: "cancel",
  });
}

defineExpose({ showDialog });
</script>
