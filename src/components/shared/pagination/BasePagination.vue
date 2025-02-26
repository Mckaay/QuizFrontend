<script setup>
import { computed } from "vue";
import IconChevronLeft from "@/components/shared/icons/IconChevronLeft.vue";
import IconChevronRight from "@/components/shared/icons/IconChevronRight.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  lastPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);
const createPaginationRange = (currentPage, lastPage) => {
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", lastPage];
  }

  if (currentPage >= lastPage - 2) {
    return [1, "...", lastPage - 2, lastPage - 1, lastPage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    lastPage,
  ];
};

const paginationItems = computed(() => {
  return createPaginationRange(props.currentPage, props.lastPage);
});

const handlePageClick = (page) => {
  if (typeof page === "number" && page >= 1 && page <= props.lastPage) {
    emit("update:currentPage", page);
  }
};
</script>

<template>
  <ul class="flex flex-row items-center gap-1">
    <li>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5"
        aria-label="Go to previous page"
        :disabled="props.currentPage === 1"
        @click="handlePageClick(props.currentPage - 1)"
      >
        <IconChevronLeft /><span>Previous</span>
      </button>
    </li>
    <li
      v-for="(item, index) in paginationItems"
      :key="index"
    >
      <button
        aria-current="page"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
        :class="{ border: item === props.currentPage }"
        :disabled="item === props.currentPage"
        @click="handlePageClick(item)"
      >
        {{ item }}
      </button>
    </li>
    <li>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pr-2.5"
        aria-label="Go to next page"
        :disabled="props.currentPage === props.lastPage"
        @click="handlePageClick(props.currentPage + 1)"
      >
        <span>Next</span><IconChevronRight />
      </button>
    </li>
  </ul>
</template>

<style scoped></style>
