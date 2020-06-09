<template>
  <div>
    <div class="card bg-white mt-3 px-4 py-4">
      <div class="card-header between border-b pb-3">
        <span class="iconfont" :class="`icon-${icon}`"></span>
        <div class="flex-1 fs-md px-2 fs-weight">{{title}}</div>
        <span class="iconfont icon-more"></span>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true }
  }
};
</script>

<style>
</style>