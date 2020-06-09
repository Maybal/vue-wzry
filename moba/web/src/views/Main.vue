<template>
  <div class="main">
    <div class="topbar bg-dark between px-4 py-1">
      <div class="img"></div>
      <div class="px-2 flex-1">
        <div class="fs-white fs-sm">王者荣耀</div>
        <div class="fs-gray-1 fs-xxs">团队成就更多</div>
      </div>
      <div class="download"></div>
    </div>
    <div class="nav bg-primary py-2">
      <div class="around nav-wrap fs-white fs-sm">
        <router-link tag="div" to="/home">首页</router-link>
        <router-link tag="div" to="/strategy">攻略中心</router-link>
        <router-link tag="div" to="/match">赛事中心</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
  .img {
    width:1.875rem;
    height: 1.875rem;
    background: url(../assets/index.png) no-repeat;
    background-size: 23.4375rem;
    background-position: 0 72.588%;
  }
  .download{
    width: 3.75rem;
    height: 1.5rem;
    background: url(../assets/index.png) no-repeat;
    background-size: 23.4375rem;
    background-position: 18.73% 71.694%;
  }
}
.nav-wrap{
  div{
    padding-bottom: 0.25rem;
    border-bottom: 0.1875rem solid transparent;
    &.router-link-active{
      border-bottom-color: #fff;
    }
  }
}
</style>
