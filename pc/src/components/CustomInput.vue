<template>
<div
  v-if="readonly !== true"
  un-flex="~"
  un-items-center
  un-w="full"
  class="custom_input"
>
  <el-input
    ref="inputRef"
    :type="props.type"
    v-bind="$attrs"
    v-model="modelValue"
    class="flex-[1_0_0] overflow-hidden"
    :clearable="!props.disabled"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    @change="onChange"
    @clear="onClear"
  >
    <template
      v-for="(item, key, index) in $slots"
      :key="index"
      #[key]
    >
      <slot :name="key"></slot>
    </template>
  </el-input>
  <slot name="myAppend"></slot>
</div>
<template
  v-else
>
  <div
    un-w="full"
    un-whitespace-nowrap
    un-flex="~"
    un-justify="start"
    un-items="center"
    class="custom_input_readonly"
    :class="{
      'custom_input_readonly_border': props.isReadonlyBorder,
      'custom_input_readonly_no_border': !props.isReadonlyBorder
    }"
  >
    <div
      un-flex="~ [1_0_0]"
      un-overflow-hidden
      un-p="x-2.5 y-1.25"
      un-box-border
      un-w="full"
      un-min="h-7.5"
      un-break-words
      un-whitespace-pre-wrap
      class="custom_input_readonly_content"
      :class="{
        'custom_input_placeholder': shouldShowPlaceholder
      }"
      :style="{
        height: textareaHeight != null ? textareaHeight + 'px' : undefined,
      }"
      v-bind="$attrs"
    >
      <template
        v-if="!(modelValue ?? '')"
      >
        {{ props.readonlyPlaceholder ?? "" }}
      </template>
      <template
        v-else
      >
        {{ modelValue ?? "" }}
      </template>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "update:modelValue", value?: any): void,
  (e: "change", value?: any): void,
  (e: "clear"): void,
}>();

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    type?: string;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    readonlyPlaceholder?: string;
    isReadonlyBorder?: boolean;
  }>(),
  {
    modelValue: undefined,
    type: "text",
    disabled: undefined,
    readonly: undefined,
    placeholder: undefined,
    readonlyPlaceholder: undefined,
    isReadonlyBorder: true,
  },
);

const t = getCurrentInstance()!.proxy!;

let modelValue = $ref(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    modelValue = props.modelValue;
  },
);

watch(
  () => modelValue,
  () => {
    emit("update:modelValue", modelValue);
  },
);

let shouldShowPlaceholder = $computed<boolean>(() => {
  return modelValue == null || modelValue === "";
});

let inputRef = $ref<InstanceType<typeof ElInput>>();
let textareaHeight = $shallowRef<number>();

useResizeObserver($$(inputRef) as any, (entries) => {
  if (props.type !== "textarea") {
    return;
  }
  const [ entry ] = entries;
  const { height } = entry.contentRect;
  textareaHeight = height - 2;
});

function onChange() {
  emit("update:modelValue", modelValue);
  emit("change", modelValue);
}

function onClear() {
  modelValue = "";
  emit("update:modelValue", modelValue);
  emit("clear");
}

function focus() {
  inputRef?.focus();
}

defineExpose({
  inputRef: $$(inputRef),
  focus,
});
</script>

<style lang="scss" scoped>
.custom_input_readonly_border {
  @apply b-1 b-solid b-[var(--el-border-color)] rounded;
}
.custom_input_readonly_no_border {
  .custom_input_readonly_content {
    @apply p-y-1.5;
  }
}
</style>
