<template>
  <div class="home">
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img class="w-100" src="../assets/images/01.jpeg" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/02.jpeg" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/03.jpeg" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/04.jpeg" />
        </swiper-slide>
        <div class="swiper-pagination pagination1" slot="pagination"></div>
      </swiper>
    </div>
    <div class="nav-icons bg-white mt-3">
      <div class="between1 flex-wrap text-c py-1">
        <div class="nav-item my-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="fs-sm fs-gray-1">爆料站</div>
        </div>
      </div>
      <div class="fs-sm fs-dark bg-light1 text-c py-2">
        <i class="sprite sprite-arrow"></i>
        <span class="pl-2">收起</span>
      </div>
    </div>
    <list-card icon="menu" title="新闻资讯">
      <div class="card-nav between py-2">
        <div
          class="fs-sm"
          v-for="(item,i) in newsData"
          :key="i"
          :class="{'active':active === i}"
          @click="$refs.list.swiper.slideTo(i)"
        >{{item.name}}</div>
      </div>
      <div class="card-swiper">
        <swiper :options="swiperOption" ref="list" @slide-change="()=>{active = $refs.list.swiper.realIndex}">
          <swiper-slide v-for="(item,i) in newsData" :key="i">
            <router-link tag="div" :to="`/article/${cate._id}`" class="between fs-sm py-2" v-for="(cate,i) in item.newsList" :key="i">
              <span class="fs-info">[{{cate.categoryName}}]</span>
              <span class="px-1">|</span>
              <span class="fs-black flex-1 text-ellipsis pr-2">{{cate.title}}</span>
              <span class="fs-dark fs-xs">{{cate.createdAt | date}}</span>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </list-card>

    <list-card icon="person" title="英雄分类">
      <div class="card-nav between py-2">
        <div
          class="fs-sm"
          v-for="(item,i) in heroData"
          :key="i"
          :class="{'active':active === i}"
          @click="$refs.hero.swiper.slideTo(i)"
        >{{item.name}}</div>
      </div>
      <div class="card-swiper">
        <swiper :options="{autoHeight:true}" ref="hero" @slide-change="()=>{active = $refs.hero.swiper.realIndex}">
          <swiper-slide v-for="(item,n) in heroData" :key="n">
            <div class="between1 flex-wrap hero-list">
              <router-link tag="div" :to="`/hero/${hero._id}`" class="w-20 text-c px-2 py-2" v-for="(hero,i) in item.heroList" :key="i">
                <img class="w-100" :src="hero.avatar" alt="">
                <div class="fs-xs">{{hero.name}}</div>
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </list-card>

    <list-card icon="person" title="精彩视频">
      1111
    </list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import ListCard from "../components/ListCard";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination1"
        }
      },
      active: 0,
      newsData:[],
      heroData:[]
    };
  },
  filters:{
    date(val){
      //处理日期格式
      return dayjs(val).format('MM/DD')
    }
  },
  components: {
    ListCard
  },
  methods:{
    async fetchNewsData(){
      const res = await this.$http.get('/news/list')
      this.newsData = res.data
    },
    async fetchHeroData(){
      const res = await this.$http.get('/hero/list')
      this.heroData = res.data
    }
  },
  created(){
    this.fetchNewsData()
    this.fetchHeroData()
  }
};
</script>
<style lang="scss">
.pagination1 {
  text-align: right !important;
  padding: 0.25rem 0.5rem;
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
    border-radius: 0.125rem;
    &.swiper-pagination-bullet-active {
      background: #007aff;
    }
  }
}
.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid #d4d9de;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
.between1 {
  display: flex;
  // justify-content: space-between;
}
.w-20{
  width:20%;
}
.hero-list{
  margin: 0 -0.5rem;
}
.card-nav {
  div {
    padding-bottom: 0.125rem;
    border-bottom: 0.1875rem solid transparent;
    &.active {
      border-color: #db9e3f;
      color: #db9e3f;
    }
  }
}
</style>
