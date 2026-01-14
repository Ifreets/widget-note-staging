<template>
  <div
    class="body-schedule-list h-full overflow-y-auto scrollbar-thin flex flex-col gap-2"
  >
    <div
      v-for="i in 3"
      :key="i"
      class="px-3 py-2 flex flex-col gap-1 bg-slate-100 rounded-lg animate-pulse"
    >
      <!-- Skeleton cho phần header (thời gian và trạng thái) -->
      <div class="flex justify-between items-center">
        <div class="h-4 w-20 bg-slate-300 rounded"></div>
        <div class="h-4 w-16 bg-slate-300 rounded"></div>
      </div>

      <!-- Skeleton cho phần nội dung -->
      <div class="flex items-start gap-2 mt-1">
        <!-- Skeleton cho icon -->
        <div class="w-4 h-4 bg-slate-200 rounded-sm flex-shrink-0"></div>
        <!-- Skeleton cho text -->
        <div class="flex-1 flex flex-col gap-1">
          <div class="h-4 w-3/4 bg-slate-300 rounded"></div>
          <div class="h-4 w-1/2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
