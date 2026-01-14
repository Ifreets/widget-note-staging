<template>
  <div class="min-h-max relative w-full animate-pulse">
    <!-- Skeleton cho textarea -->
    <div
      class="w-full min-h-16 border rounded-md bg-slate-200 flex flex-col gap-2 py-1.5 px-3"
    >
      <!-- Skeleton cho placeholder text -->
      <div class="h-4 w-3/4 bg-slate-300 rounded"></div>
      <div class="h-4 w-2/3 bg-slate-300 rounded"></div>
    </div>

    <!-- Skeleton cho avatar ở góc phải -->
    <div class="w-6 h-6 absolute top-1 right-1 rounded-md bg-slate-300"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
