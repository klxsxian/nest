<template>
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
      >
        
        <el-tab-pane
          lazy
          :label="'业务字典' + (dictbiz_detailTotal != null ? ` (${ dictbiz_detailTotal })` : '')"
          name="业务字典"
        >
          <Dictbiz_detailList
            :dictbiz_id="dialogModel.id"
            :is_deleted="dialogModel.is_deleted ? '1' : '0'"
            :is-locked="dialogModel.is_deleted ? '1' : '0'"
            @add="useAllFindDebounce"
            @remove="useAllFindDebounce"
            @revert="useAllFindDebounce"
          ></Dictbiz_detailList>
        </el-tab-pane>
        
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

<script lang="ts" setup>

import Dictbiz_detailList from "@/views/base/dictbiz_detail/List.vue";

import {
  findCount as findCountDictbiz_detail,
} from "@/views/base/dictbiz_detail/Api";

const {
  n,
  initI18ns,
} = useI18n("/base/dictbiz");

let inited = $ref(false);

let dialogAction = $ref<"list">("list");

let dialogModel = $ref<{
  id?: DictbizId,
  is_deleted?: number | null,
}>({ });

let tabName = $ref("业务字典");

let dictbiz_detailTotal = $ref<number>();

async function useFindCountDictbiz_detail() {
  const dictbiz_id: DictbizId[] = [ dialogModel.id! ];
  dictbiz_detailTotal = await findCountDictbiz_detail(
    {
      is_deleted: dialogModel.is_deleted,
      dictbiz_id,
    },
  );
}

async function useAllFindCount() {
  await Promise.all([
    useFindCountDictbiz_detail(),
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
      id?: DictbizId;
      is_deleted?: number | null;
    };
    action?: typeof dialogAction;
  },
) {
  inited = false;
  const title = arg?.title || "";
  const dialogRes = customDialogRef!.showDialog<OnCloseResolveType>({
    type: "medium",
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
