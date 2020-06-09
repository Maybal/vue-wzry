<template>
  <div class="about">
    <div class="px-2 border-b between py-2" v-if="model">
      <router-link tag="span" to="/home" class="iconfont icon-back fs-info fs-md fs-weight"></router-link>
      <span class="fs-info flex-1 pl-2 fs-sm text-ellipsis pr-2">{{model.title}}</span>
      <span class="fs-gray fs-xs">{{model.createdAt | date}}</span>
    </div>
    <div class="px-2 py-2" style="line-height:1.5rem;" v-html="model.body"></div>
    <div class="py-3 px-2">
      <div class="between pb-2">
        <span class="iconfont icon-progress" style="font-size:1.25rem;font-weight:bolder;"></span>
        <h6 class="fs-md pl-2 flex-1 fs-info">相关推荐</h6>
      </div>
      <router-link
       tag="div" 
       class="between"
       v-for="item in model.related"
       :key="item._id"
       :to="`/article/${item._id}`">
        <span class="fs-sm text-ellipsis pr-2 flex-1">{{item.title}}</span>
        <span class="fs-xs fs-gray">{{item.createdAt | date}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props:{
    id:{type:String,required:true}
  },
  data(){
    return{
      model:{}
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`/article/${this.id}`)
      this.model = res.data
    }
  },
  watch:{
    id(){
      this.fetch()
    }
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  created(){
    this.fetch()
  }
}
</script>
