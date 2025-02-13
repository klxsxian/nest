<template>
<div
  ref="tabs_divRef"
>
  <div
    v-for="(item, i) in tabs"
    :key="item.path"
    class="tab_div"
    :class="{ tab_active: item.active, tab_fixed: item.fixed }"
    @click="activeTab(item)"
    @dblclick="onClose(item)"
  >
    <el-dropdown
      trigger="contextmenu"
      @command="menuCommand($event, item)"
      @visible-change="visibleChange($event, i)"
      ref="dropdownRef"
    >
      <template #default>
        <div
          class="tab_label"
          :title="item.lbl"
        >
          <span
            v-if="!item?.icon"
          >
            {{ item.lbl }}
          </span>
          <div
            v-else-if="item?.icon === 'iconfont-home-fill' && !config.indexIsEmpty"
            class="tab_icon"
          >
            <el-icon
              size="20"
            >
              <i un-i="iconfont-home-fill"></i>
            </el-icon>
          </div>
        </div>
      </template>
      <template #dropdown>
        <el-dropdown-menu>
          
          <el-dropdown-item
            command="close"
          >
            关闭
          </el-dropdown-item>
          
          <el-dropdown-item
            command="closeOther"
            :disabled="tabs.length <= 1"
          >
            关闭其他
          </el-dropdown-item>
          
          <el-dropdown-item
            command="closeAll"
          >
            全部关闭
          </el-dropdown-item>
          
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div
      v-if="item.closeable !== false"
      class="tab_close_div"
    >
      <ElIconClose
        class="tab_close"
        @click.stop="onClose(item)"
      />
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import type {
  TabInf,
} from "@/store/tabs";

import type {
  SortableEvent,
} from "sortablejs";

import Sortable from "sortablejs";

import config from "@/utils/config";

const router = useRouter();
const tabsStore = useTabsStore();

const emit = defineEmits<{
  (e: "refreshActive_line"): void;
  (e: "refreshScrollVisible"): void;
}>();

const props = withDefaults(
  defineProps<{
    tabs?: TabInf[ ],
  }>(),
  {
    tabs: () => [ ],
  },
);

let tabs_divRef = $ref<HTMLDivElement>();

let tabs = $ref(toRef(props, "tabs"));

async function activeTab(tab: TabInf) {
  tabsStore.activeTab(tab);
  await router.push({
    path: tab.path,
    query: tab.query,
  });
}

async function onClose(tab: TabInf) {
  await tabsStore.removeTab(tab);
  if (tabsStore.actTab) {
    await activeTab(tabsStore.actTab);
  }
}

async function menuCommand(command: string, tab: TabInf) {
  switch (command) {
    case "close":
      await onClose(tab);
      break;
    case "closeOther":
      await tabsStore.closeOtherTabs(tab);
      break;
    case "closeAll":
      await tabsStore.closeOtherTabs();
      break;
  }
}

let dropdownRef = $ref<InstanceType<typeof ElDropdown>[]>([ ]);

function visibleChange(visible: boolean, index: number) {
  if (!visible) {
    return;
  }
  for (let i = 0; i < dropdownRef.length; i++) {
    const dropdownRefItem = dropdownRef[i];
    if (i === index) {
      continue;
    }
    dropdownRefItem.handleClose();
  }
}

function initTabsSort() {
  if (!tabs_divRef) {
    return;
  }
  Sortable.create(
    tabs_divRef,
    {
      animation: 150,
      async onEnd(event: SortableEvent) {
        let { oldIndex, newIndex } = event;
        if (oldIndex == null || newIndex == null) {
          return;
        }
        await tabsStore.moveTab(oldIndex, newIndex);
        await activeTab(tabsStore.tabs[newIndex]);
        if (oldIndex !== newIndex) {
          emit("refreshActive_line")
        }
      },
      filter(_, el?: HTMLElement) {
        if (!el) {
          return true;
        }
        if (el.classList.contains("tab_fixed")) {
          return true;
        }
        if (!el.classList.contains("tab_div")) {
          return true;
        }
        return false;
      },
    },
  );
}

onMounted(function() {
  initTabsSort();
});

useResizeObserver($$(tabs_divRef), function() {
  emit("refreshScrollVisible");
});

defineExpose({ tabs_divRef: $$(tabs_divRef) });
</script>

<style lang="scss" scoped>
.tab_div {
  display: flex;
  position: relative;
  cursor: default;
  padding-left: 6px;
  padding-right: 6px;
}
.tab_div:hover {
  transition: width 1s;
  background-color: #041c31;
  .tab_close {
    opacity: 1;
  }
}
.tab_active {
  .tab_label {
    color: var(--el-menu-active-color);
  }
  // color: #EEE;
  background-color: rgba(0,0,0,.8);
  box-shadow: inset 0px 0px 2px #34404a;
  .tab_close {
    opacity: 1;
    color: var(--el-menu-active-color);
  }
}
.tab_div.tab_active:hover {
  background-color: rgba(0,0,0,.8);
}
.tab_label {
  min-width: 80px;
  flex: 1 0 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: #FFF;
}
.tab_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
}
.tab_close_div {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 3px;
  margin-right: -2px;
  width: 13px;
  height: 13px;
}
.tab_close {
  opacity: 0;
  transition: opacity .5s,background-color .5s;
  font-size: 12px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
}
.tab_close:hover {
  color: red;
  background-color: #FFF;
}
</style>
