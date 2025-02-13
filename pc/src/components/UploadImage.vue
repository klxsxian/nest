<template>
<div
  v-bind="$attrs"
  un-w="full"
  un-flex="~ [1_0_0] row wrap"
  un-gap="2"
  un-m="l-1px"
  :style="{
    'min-height': `${ (props.itemHeight + 4) }px`,
  }"
  ref="uploadImageRef"
>
  <div
    v-for="(item, i) in thumbList"
    :key="item"
    un-relative
    class="upload_image_item"
  >
    <div
      @click="onView(i)"
      un-cursor-pointer
      un-rounded
      un-b="1 solid transparent hover:gray-700 hover:dark:gray-300"
      un-p="0.25"
      un-box-border
      un-text="0"
    >
      <el-image
        :src="item"
        un-rounded
        :style="{
          height: `${ props.itemHeight }px`,
        }"
        un-min="w-10"
        un-max="w-50"
        un-object-cover
        un-pointer-events-none
        un-select-none
      >
        <template #placeholder>
          <div
            un-w="full"
            un-h="full"
            un-flex="~ [1_0_0] col"
            un-overflow-hidden
            un-justify-center
            un-items-center
          >
            <el-icon
              color="gray"
            >
              <ElIconLoading />
            </el-icon>
          </div>
        </template>
        <template #error>
          <div
            un-w="full"
            un-h="full"
            un-flex="~ [1_0_0] col"
            un-overflow-hidden
            un-justify-center
            un-items-center
          >
            
            <el-icon
              v-if="loading"
              color="gray"
            >
              <ElIconLoading />
            </el-icon>
            
            <el-icon
              v-else
              color="gray"
              :size="28"
            >
              <ElIconPicture />
            </el-icon>
            
          </div>
        </template>
      </el-image>
    </div>
    <div
      v-if="!props.readonly"
      un-absolute
      un-right="-2"
      un-top="-2"
      un-flex="~"
      un-justify-center
      un-items-center
      un-bg="transparent hover:red"
      un-text="red hover:white"
      un-rounded="full"
      un-p="0.5"
      un-box-border
      un-cursor-pointer
      @click.stop="onDelete(i)"
    >
      <el-icon
        :size="16"
      >
        <ElIconClose />
      </el-icon>
    </div>
  </div>
  <div
    v-if="inited && !props.readonly && thumbList.length < props.maxSize"
    :style="{
      height: `${ props.itemHeight }px`,
      width: `${ props.itemHeight }px`,
    }"
    un-p="0.75"
    un-box-border
  >
    <div
      un-b="1 dotted gray-300 hover:[var(--el-color-primary)]"
      un-flex="~"
      un-justify-center
      un-items-center
      un-cursor-pointer
      un-rounded
      un-h="full"
      un-w="full"
      @click="uploadClk"
    >
      <el-icon
        color="gray"
        :size="28"
      >
        <ElIconPlus />
      </el-icon>
    </div>
  </div>
</div>
<input
  type="file"
  :accept="accept"
  @change="onInput"
  style="display: none;"
  ref="fileRef"
/>
<Teleport to="body">
  <el-image-viewer
    v-if="urlList.length > 0 && showImageViewer"
    hide-on-click-modal
    :url-list="urlList"
    :initial-index="nowIndex"
    @close="showImageViewer = false"
  ></el-image-viewer>
</Teleport>
</template>

<script lang="ts" setup>
import Sortable from "sortablejs";

import type {
  SortableEvent,
} from "sortablejs";

import {
  checkImageMaxSize,
} from "@/utils/image_util";

const {
  nsAsync,
} = useI18n();

import type {
  InputMaybe,
} from "#/types";

const emit = defineEmits<
  (e: "update:modelValue", value?: string | null) => void
>();

const props = withDefaults(
  defineProps<{
    modelValue: InputMaybe<string>;
    maxFileSize?: number;
    maxSize?: number;
    accept?: string;
    readonly?: boolean;
    compress?: boolean;
    maxImageWidth?: number;
    maxImageHeight?: number;
    itemHeight?: number;
    inited?: boolean;
  }>(),
  {
    modelValue: undefined,
    maxFileSize: 1024 * 1024 * 50,
    maxSize: 1,
    accept: "image/webp,image/png,image/jpeg,image/svg+xml",
    readonly: false,
    compress: true,
    maxImageWidth: 1920,
    maxImageHeight: 1080,
    itemHeight: 100,
    inited: false,
  },
);

let modelValue = $ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  if (modelValue !== newVal) {
    modelValue = newVal;
    nowIndex = 0;
  }
});

let nowIndex = $ref(0);

let urlList = $computed(() => {
  if (!modelValue) {
    return [ ];
  }
  const ids = modelValue.split(",").filter((x) => x);
  return ids.map((id) => {
    const url = getDownloadUrl({
      id,
      inline: "1",
    }, "oss");
    return url;
  });
});


let thumbList = $computed(() => {
  if (!modelValue) {
    return [ ];
  }
  const ids = modelValue.split(",").filter((x) => x);
  return ids.map((id) => {
    const url = getImgUrl({
      id,
      height: props.itemHeight,
    });
    return url;
  });
});

let fileRef = $ref<HTMLInputElement>();

let loading = $ref(false);

async function onInput() {
  if (!fileRef) {
    return;
  }
  let idArr: string[] = [ ];
  if (modelValue) {
    idArr = modelValue.split(",").filter((x) => x);
  }
  if (props.maxSize > 1) {
    if (idArr.length >= props.maxSize) {
      fileRef.value = "";
      ElMessage.error(await nsAsync("最多只能上传 {0} 张图片", props.maxSize));
      return;
    }
  }
  let file = fileRef?.files?.[0];
  fileRef.value = "";
  if (!file) {
    return;
  }
  if (file.size > props.maxFileSize) {
    ElMessage.error(await nsAsync("文件大小不能超过 {0}M", props.maxFileSize / 1024 / 1024));
    return;
  }
  
  file = await checkImageMaxSize(
    file,
    {
      compress: props.compress,
      maxImageWidth: props.maxImageWidth,
      maxImageHeight: props.maxImageHeight,
    },
  );
  
  let id = undefined;
  loading = true;
  try {
    id = await uploadFile(file);
  } finally {
    loading = false;
  }
  if (!id) {
    return;
  }
  if (props.maxSize === 1) {
    idArr = [ id ];
    modelValue = id;
    nowIndex = 0;
  } else {
    idArr.push(id);
    modelValue = idArr.join(",");
    nowIndex = idArr.length - 1;
  }
  emit("update:modelValue", modelValue);
}

// 点击上传图片
async function uploadClk() {
  if (!fileRef) {
    return;
  }
  let idArr: string[] = [ ];
  if (modelValue) {
    idArr = modelValue.split(",").filter((x) => x);
  }
  if (props.maxSize > 1) {
    if (idArr.length >= props.maxSize) {
      fileRef.value = "";
      ElMessage.error(await nsAsync("最多只能上传 {0} 张图片", props.maxSize));
      return;
    }
  }
  fileRef.click();
}

// 删除图片
async function onDelete(
  nowIndex: number,
) {
  try {
    await ElMessageBox.confirm(await nsAsync("确定删除当前图片吗？"));
  } catch (err) {
    return;
  }
  let idArr: string[] = [ ];
  if (modelValue) {
    idArr = modelValue.split(",").filter((x) => x).filter((_, i) => i !== nowIndex);
  }
  modelValue = idArr.join(",");
  if (nowIndex >= idArr.length) {
    nowIndex = idArr.length - 1;
  } else if (nowIndex > 0) {
    nowIndex--;
  }
  // ElMessage.success("删除成功!");
  emit("update:modelValue", modelValue);
}

let showImageViewer = $ref(false);

function onView(i?: number) {
  if (i !== undefined) {
    nowIndex = i;
  }
  showImageViewer = !showImageViewer;
}

let uploadImageRef = $ref<HTMLDivElement>();

watch(
  () => props.inited,
  async () => {
    if (!props.inited) {
      return;
    }
    if (!uploadImageRef) {
      return;
    }
    Sortable.create(
      uploadImageRef,
      {
        animation: 150,
        draggable: ".upload_image_item",
        onEnd: function (event: SortableEvent) {
          let { oldIndex, newIndex } = event;
          if (oldIndex == null || newIndex == null) {
            return;
          }
          modelValue = modelValue || "";
          const ids = modelValue.split(",").filter((x) => x);
          const id = ids.splice(oldIndex, 1)[0];
          ids.splice(newIndex, 0, id);
          modelValue = ids.join(",");
          emit("update:modelValue", modelValue);
        },
        filter: function(_, el) {
          if (!el) {
            return true;
          }
          return !el.classList.contains("upload_image_item");
        },
        preventOnFilter: false,
      },
    );
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
