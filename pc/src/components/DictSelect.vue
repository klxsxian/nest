<template>
<div
  v-if="readonly !== true"
  ref="selectDivRef"
  un-w="full"
  class="custom_select_div"
  :class="{
    custom_select_isShowModelLabel: isShowModelLabel && inited,
  }"
>
  <ElSelectV2
    ref="selectRef"
    :options="options4SelectV2"
    filterable
    collapse-tags
    collapse-tags-tooltip
    default-first-option
    :height="props.height"
    @visible-change="handleVisibleChange"
    @clear="onClear"
    un-w="full"
    v-bind="$attrs"
    :model-value="modelValueComputed"
    @update:model-value="modelValueUpdate"
    :loading="!inited"
    class="dict_select"
    :class="{
      dict_select_isShowModelLabel: isShowModelLabel && inited,
    }"
    @change="onValueChange"
    :multiple="props.multiple"
    :clearable="!props.disabled"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :placeholder="((isShowModelLabel && props.multiple) ? props.modelLabel : props.placeholder) ?? undefined"
    @keyup.enter.stop
    @keydown.ctrl.c.stop="copyModelLabel"
  >
    <template
      v-if="props.multiple && props.showSelectAll && !props.disabled && !props.readonly && options4SelectV2.length > 1"
      #header
    >
      <el-checkbox
        v-model="isSelectAll"
        :indeterminate="isIndeterminate"
        un-w="full"
        un-p="l-3"
        un-box-border
      >
        <span>
          ({{ ns("全选") }})
        </span>
      </el-checkbox>
    </template>
    <template
      v-for="(item, key, index) in $slots"
      :key="index"
      #[key]
    >
      <slot :name="key"></slot>
    </template>
  </ElSelectV2>
</div>
<template
  v-else
>
  <div
    v-if="props.multiple"
    un-flex="~ gap-1 wrap"
    un-b="1 solid [var(--el-border-color)]"
    un-p="x-2"
    un-box-border
    un-rounded
    un-w="full"
    un-min="h-8"
    un-line-height="normal"
    un-break-words
    class="dict_select_readonly"
    :class="{
      'custom_select_placeholder': shouldShowPlaceholder,
      custom_select_isShowModelLabel: isShowModelLabel,
    }"
    v-bind="$attrs"
  >
    <template
      v-if="modelLabels.length === 0"
    >
      <span
        class="dict_select_placeholder"
      >
        {{ props.readonlyPlaceholder ?? "" }}
      </span>
    </template>
    <template
      v-else
    >
      <span
        v-if="isShowModelLabel"
        class="dict_select_readonly"
      >
        {{ props.modelLabel || "" }}
      </span>
      <div
        v-else
        un-flex="~ wrap"
        un-gap="x-1 y-1"
        un-m="y-1"
      >
        <template
          v-if="readonlyCollapseTags"
        >
          <el-tag
            v-for="label in modelLabels.slice(0, props.readonlyMaxCollapseTags)"
            :key="label"
            type="info"
            :disable-transitions="true"
          >
            {{ label }}
          </el-tag>
          <el-tooltip
            v-if="modelLabels.length > props.readonlyMaxCollapseTags"
          >
            <el-tag
              type="info"
              :disable-transitions="true"
              @click="() => readonlyCollapseTags = false"
              un-cursor-pointer
            >
              {{ `+${ modelLabels.length - props.readonlyMaxCollapseTags }` }}
            </el-tag>
            <template
              #content
            >
              <div
                un-flex="~ wrap"
                un-gap="x-1 y-1"
                un-m="y-1"
              >
                <el-tag
                  v-for="label in modelLabels.slice(props.readonlyMaxCollapseTags)"
                  :key="label"
                  type="info"
                  :disable-transitions="true"
                >
                  {{ label }}
                </el-tag>
              </div>
            </template>
          </el-tooltip>
        </template>
        <template
          v-else
        >
          <el-tag
            v-for="label in modelLabels"
            :key="label"
            type="info"
            :disable-transitions="true"
          >
            {{ label }}
          </el-tag>
        </template>
      </div>
    </template>
  </div>
  <div
    v-else
    un-b="1 solid [var(--el-border-color)]"
    un-p="x-2.5 y-1"
    un-box-border
    un-rounded
    un-w="full"
    un-min="h-8"
    un-line-height="normal"
    un-break-words
    class="dict_select_readonly"
    :class="{
      'dict_select_placeholder': shouldShowPlaceholder,
      dict_select_isShowModelLabel: isShowModelLabel,
    }"
    v-bind="$attrs"
  >
    <template
      v-if="!modelLabels[0]"
  >
      <span
        class="dict_select_placeholder"
      >
        {{ props.readonlyPlaceholder ?? "" }}
      </span>
    </template>
    <template
      v-else
    >
      <span
        v-if="isShowModelLabel"
        class="dict_select_readonly"
      >
        {{ props.modelLabel || "" }}
      </span>
      <span
        v-else
        class="dict_select_readonly"
      >
        {{ modelLabels[0] || "" }}
      </span>
    </template>
  </div>
</template>
</template>

<script lang="ts" setup>
import type {
  OptionType,
} from "element-plus/es/components/select-v2/src/select.types";

import type {
  GetDict,
} from "@/typings/types";

import {
  copyText,
} from "@/utils/common";

export type DictModel = GetDict;

const t = getCurrentInstance();

const emit = defineEmits<{
  (e: "update:modelValue", value?: any): void,
  (e: "update:modelLabel", value?: string | null): void,
  (e: "change", value?: any): void,
  (e: "clear"): void,
}>();

type OptionsMap = (item: DictModel) => OptionType;

const props = withDefaults(
  defineProps<{
    code: string;
    optionsMap?: OptionsMap;
    height?: number;
    modelValue?: any;
    modelLabel?: string;
    autoWidth?: boolean;
    maxWidth?: number;
    multiple?: boolean;
    showSelectAll?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string | null;
    readonlyPlaceholder?: string;
    readonlyCollapseTags?: boolean;
    readonlyMaxCollapseTags?: number;
  }>(),
  {
    optionsMap: function(item: DictModel) {
      if ([ "number", "time", "boolean" ].includes(item.type)) {
        return {
          label: item.lbl,
          value: Number(item.val),
        };
      }
      return {
        label: item.lbl,
        value: item.val,
      };
    },
    height: 400,
    modelValue: undefined,
    modelLabel: undefined,
    autoWidth: true,
    maxWidth: 550,
    multiple: false,
    showSelectAll: true,
    disabled: undefined,
    readonly: undefined,
    placeholder: undefined,
    readonlyPlaceholder: undefined,
    readonlyCollapseTags: true,
    readonlyMaxCollapseTags: 1,
  },
);

function copyModelLabel() {
  const text = modelLabels.join(",");
  if (!text) {
    return;
  }
  copyText(text);
  ElMessage.success(`${ text } 复制成功!`);
}

let inited = $ref(false);

let modelValue = $ref(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    modelValue = props.modelValue;
  },
);

let modelLabel = $ref(props.modelLabel);

watch(
  () => props.modelLabel,
  () => {
    modelLabel = props.modelLabel;
  },
);

let readonlyCollapseTags = $ref(props.readonlyCollapseTags);

watch(
  () => props.readonlyCollapseTags,
  () => {
    readonlyCollapseTags = props.readonlyCollapseTags;
  },
);

let selectRef = $ref<InstanceType<typeof ElSelectV2>>();
let selectDivRef = $ref<HTMLDivElement>();

let isSelectAll = $computed({
  get() {
    if (!modelValue) {
      return false;
    }
    if (!Array.isArray(modelValue)) {
      return false;
    }
    if (modelValue.length === 0) {
      return false;
    }
    if (selectRef?.filteredOptions && selectRef.filteredOptions.length > 0) {
      if (modelValue.length === selectRef.filteredOptions.length) {
        return true;
      }
    }
    if (modelValue.length === options4SelectV2.length) {
      return true;
    }
    return false;
  },
  set(val: boolean) {
    if (val) {
      if (selectRef?.filteredOptions) {
        modelValue = selectRef.filteredOptions.map((item: OptionType) => item.value);
      } else {
        modelValue = options4SelectV2.map((item) => item.value);
      }
    } else {
      modelValue = [ ];
    }
    emit("update:modelValue", modelValue);
    emit("change", modelValue);
  },
});

const isIndeterminate = $computed(() => {
  if (!modelValue) {
    return false;
  }
  if (!Array.isArray(modelValue)) {
    return false;
  }
  if (modelValue.length === 0) {
    return false;
  }
  if (selectRef?.filteredOptions && selectRef.filteredOptions.length > 0) {
    if (modelValue.length === selectRef.filteredOptions.length) {
      return false;
    }
  }
  if (modelValue.length === options4SelectV2.length) {
    return false;
  }
  return true;
});

const modelValueComputed = $computed(() => {
  if (!modelLabel) {
    return modelValue;
  }
  if (!props.multiple) {
    if (modelValue == null || modelValue === "") {
      return modelLabel;
    }
    const item = options4SelectV2.find((item: OptionType) => item.value === modelValue);
    if (!item || item.label !== modelLabel) {
      return modelLabel;
    }
    return modelValue;
  } else {
    if (modelValue == null || modelValue.length === 0) {
      return modelLabel;
    }
    const labels: string[] = modelLabel.split(",")
      .filter((item: string) => item)
      .map((item) => item.trim());
    if (labels.length !== modelValue.length) {
      return modelLabel;
    }
    for (let i = 0; i < modelValue.length; i++) {
      const item = modelValue[i];
      if (item !== labels[i]) {
        return modelLabel;
      }
    }
    return modelValue;
  }
});

const isShowModelLabel = $computed(() => {
  if (modelLabel == null) {
    return false;
  }
  return modelValueComputed === modelLabel;
});

let shouldShowPlaceholder = $computed(() => {
  if (props.multiple) {
    return modelValue == null || modelValue.length === 0;
  }
  return modelValue == null || modelValue === "";
});

function modelValueUpdate(value?: string | string[] | null) {
  nextTick(() => {
    modelLabel = undefined;
  });
  modelValue = value;
  emit("update:modelValue", value);
  if (!props.multiple) {
    emit("update:modelLabel", modelLabels[0]);
  } else {
    if (Array.isArray(modelLabels)) {
      emit("update:modelLabel", modelLabels.join(","));
    } else {
      emit("update:modelLabel", "");
    }
  }
}

function onValueChange() {
  emit("update:modelValue", modelValue);
  if (!props.multiple) {
    const model = dictModels.find((item) => modelValue != null && String(props.optionsMap(item).value) == String(modelValue));
    emit("change", model);
    return;
  }
  let models: DictModel[] = [ ];
  let modelValues: string[] = [ ];
  if (Array.isArray(modelValue)) {
    modelValues = modelValue;
  } else {
    modelValues = modelValue?.split(",") || [ ];
  }
  for (const value of modelValues) {
    const model = dictModels.find((item) => value != null && String(props.optionsMap(item).value) == String(value))!;
    models.push(model);
  }
  emit("change", models);
}

let options4SelectV2 = $shallowRef<OptionType[]>([ ]);

// watch(
//   () => options4SelectV2,
//   async () => {
//     const oldModelValue = modelValue;
//     modelValue = undefined;
//     await nextTick();
//     modelValue = oldModelValue;
//   },
// );

async function refreshDropdownWidth() {
  if (!props.autoWidth) {
    return;
  }
  if (!t || !t.proxy || !t.proxy.$el) {
    return;
  }
  await nextTick();
  const selectRef = t.refs.selectRef as any;
  if (!selectRef) {
    return;
  }
  const dropdownListEl = selectRef?.$refs?.menuRef?.listRef?.windowRef;
  if (!dropdownListEl) {
    return;
  }
  dropdownListEl.style.minWidth = "unset";
  const optionItemEls = dropdownListEl.querySelectorAll(".el-select-dropdown__item");
  if (!optionItemEls || optionItemEls.length === 0) {
    return;
  }
  
  const popperWidth = parseInt(dropdownListEl.style.width);
  if (!popperWidth) {
    return;
  }
  let maxWidth = 0;
  for (let i = 0; i < optionItemEls.length; i++) {
    const item = optionItemEls[i];
    const width = item.scrollWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  }
  if (maxWidth > popperWidth) {
    dropdownListEl.style.minWidth = `${ (maxWidth + 52) }px`;
  }
}

let dictModels = $ref<DictModel[]>([ ]);

const {
  ns,
  initSysI18ns,
} = useI18n();

const modelLabels: string[] = $computed(() => {
  if (modelValue == null) {
    return [ "" ];
  }
  if (!props.multiple) {
    const model = dictModels.find((item) => modelValue != null && String(props.optionsMap(item).value) == String(modelValue));
    if (!model) {
      return [ "" ];
    }
    return [ props.optionsMap(model).label ?? "" ];
  }
  let labels: string[] = [ ];
  let modelValues = (modelValue || [ ]) as string[];
  for (const value of modelValues) {
    const model = dictModels.find((item) => value != null && String(props.optionsMap(item).value) == String(value));
    if (!model) {
      continue;
    }
    labels.push(props.optionsMap(model).label ?? "");
  }
  return labels;
});

function onClear() {
  if (!props.multiple) {
    modelValue = "";
    emit("update:modelValue", modelValue);
    emit("update:modelLabel", "");
    emit("change", modelValue);
    emit("clear");
    return;
  }
  modelValue = [ ];
  emit("update:modelValue", modelValue);
  emit("update:modelLabel", "");
  emit("change", modelValue);
  emit("clear");
}

watch(
  () => [ selectRef?.filteredOptions.length, inited ],
  async () => {
    if (!inited) {
      return;
    }
    if (!selectRef || selectRef.filteredOptions.length === 0) {
      return;
    }
    await refreshDropdownWidth();
  },
);

function handleVisibleChange(visible: boolean) {
  if (visible) {
    refreshDropdownWidth();
  }
}

async function refreshEfc() {
  const code = props.code;
  if (!code) {
    inited = false;
    dictModels = [ ];
    return;
  }
  inited = false;
  await nextTick();
  [ dictModels ] = await getDict([ code ]);
  options4SelectV2 = dictModels.map(props.optionsMap);
  inited = true;
}

async function refreshWrapperHeight() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  if (!selectDivRef) {
    return;
  }
  const phder = selectDivRef?.querySelector(".el-select__placeholder") as HTMLDivElement | null | undefined;
  if (!phder) {
    return;
  }
  const wrapper = selectDivRef?.querySelector(".el-select__wrapper") as HTMLDivElement | null | undefined;
  if (!wrapper) {
    return;
  }
  const height = phder.offsetHeight;
  if (height === 0) {
    return;
  }
  wrapper.style.transition = "none";
  wrapper.style.minHeight = `${ (height + 8) }px`;
}

watch(
  () => [
    modelValue,
    inited,
    !props.multiple,
    options4SelectV2.length > 0,
  ],
  () => {
    refreshWrapperHeight();
  },
);

watch(
  () => props.code,
  async () => {
    await refreshEfc();
  },
);

async function initFrame() {
  const codes = [
    "全选",
  ];
  await initSysI18ns(codes);
}

initFrame();
refreshEfc();

function focus() {
  selectRef?.focus();
}

function blur() {
  selectRef?.blur();
}

defineExpose({
  refresh: refreshEfc,
  focus,
  blur,
});
</script>

<style scoped lang="scss">
.custom_select_div,.custom_select_readonly {
  :deep(.el-tag) {
    height: auto;
    line-height: normal;
    padding-top: 3px;
    padding-bottom: 3px;
    box-sizing: border-box;
    .el-tag__content {
      white-space: normal;
      .el-select__tags-text {
        white-space: normal;
      }
    }
  }
}
.custom_select_placeholder {
  @apply whitespace-pre-wrap break-words text-[var(--el-text-color-secondary)];
}
.dict_select_space_normal {
  :deep(.el-select__placeholder) {
    height: auto;
    line-height: normal;
    white-space: normal;
    top: calc(50% - 2px);
  }
}
.dict_select_isShowModelLabel {
  :deep(.el-select__placeholder),.dict_select_readonly {
    color: red;
  }
}
</style>
