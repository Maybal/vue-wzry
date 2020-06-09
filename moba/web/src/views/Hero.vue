<template>
  <div class="hero">
    <div class="topbar bg-black between px-4 py-2">
      <div class="img"></div>
      <div class="px-2 fs-white fs-sm">王者荣耀</div>
      <div class="fs-white flex-1 fs-sm">攻略站</div>
      <div class="fs-white">更多英雄 &gt;</div>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info fs-white">
        <div class="info-wrap"></div>
        <div class="info-wrap">
          <div class="title px-3 fs-xxs">{{model.title}}</div>
          <h3 class="name px-3 py-1">{{model.name}}</h3>
          <div class="cates px-3 fs-xxs">{{model.categories | mapCates}}</div>
          <div class="scores px-3 d-flex">
            <div class="d-flex ai-center">
              <span class="fs-sm fs-light">难度</span>
              <span class="score-num bg-brown">{{model.scores.difficult}}</span>
              <span class="fs-sm fs-light">技能</span>
              <span class="score-num bg-darkblue">{{model.scores.skills}}</span>
              <span class="fs-sm fs-light">攻击</span>
              <span class="score-num bg-darkred">{{model.scores.attack}}</span>
              <span class="fs-sm fs-light">生存</span>
              <span class="score-num bg-darkbrown">{{model.scores.survive}}</span>
            </div>
            <span class="flex-1 fs-sm fs-light">皮肤:7 &gt;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="d-flex jc-around ai-center fs-md pt-3 pb-2 hero-detail border-b">
        <div class="active">英雄初识</div>
        <div>进阶攻略</div>
      </div>
      <div>
        <swiper>
          <swiper-slide>
            <div class="bg-light">
              <div class="bg-white pb-1 px-2">
                <div class="d-flex ai-center py-2">
                  <div class="flex-1 d-flex jc-center ai-center btn">
                    <i class="iconfont icon-menu mr-2 fs-lg fs-primary"></i>
                    <span class="fs-sm">英雄介绍视频</span>
                  </div>
                  <div class="flex-1 ml-2 d-flex jc-center ai-center btn">
                    <i class="iconfont icon-menu mr-2 fs-lg fs-primary"></i>
                    <span class="fs-sm">一图识英雄</span>
                  </div>
                </div>
                <div class="d-flex jc-around ai-center mt-4">
                  <img
                    class="skills"
                    :src="item.icon"
                    alt
                    @click="current = i"
                    :class="{'active':current === i}"
                    v-for="(item,i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex ai-center py-2 mt-3">
                    <h4 class="mr-2">{{currentSkill.name}}</h4>
                    <div>
                      <span class="pr-1">(</span>
                      <span>冷却值:{{currentSkill.delay}}</span>
                      <span class="pl-2">消耗:{{currentSkill.consume}}</span>
                      <span class="pl-1">)</span>
                    </div>
                  </div>
                  <div class="py-2 fs-sm fs-dark border-b">
                    <p style="line-height:1.5rem;margin:0;">{{currentSkill.description}}</p>
                  </div>
                  <div class="py-2 fs-sm fs-gray">
                    <p style="line-height:1.5rem;margin:0;">小提示：{{currentSkill.tips}}</p>
                  </div>
                </div>
                <div class="mt-2">
                  <div class="d-flex ai-center">
                    <i class="iconfont icon-menu fs-md"></i>
                    <h4 class="ml-2">出装推荐</h4>
                  </div>
                  <div>
                    <div class="pt-2 fs-md">顺风出装</div>
                    <div class="d-flex jc-between ai-center mt-3 border-b pb-2">
                      <div class="text-c" v-for="item in model.items1" :key="item._id">
                        <img class="shunfeng" :src="item.icon" alt />
                        <div class="fs-xs fs-dark">{{item.name}}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="pt-2 fs-md">逆风出装</div>
                    <div class="d-flex jc-between ai-center mt-3">
                      <div class="text-c" v-for="item in model.items2" :key="item._id">
                        <img class="shunfeng" :src="item.icon" alt />
                        <div class="fs-xs fs-dark">{{item.name}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-2 bg-white px-2 py-2">
                <div class="d-flex ai-center">
                  <i class="iconfont icon-menu fs-md"></i>
                  <h4 class="ml-2">使用技巧</h4>
                </div>
                <div class="pt-2 fs-sm fs-dark">
                  <p>{{model.usageTips}}</p>
                </div>
              </div>

              <div class="mt-2 bg-white px-2 py-2">
                <div class="d-flex ai-center">
                  <i class="iconfont icon-menu fs-md"></i>
                  <h4 class="ml-2">对抗技巧</h4>
                </div>
                <div class="pt-2 fs-sm fs-dark">
                  <p>{{model.battleTips}}</p>
                </div>
              </div>

              <div class="mt-2 bg-white px-2 py-2">
                <div class="d-flex ai-center">
                  <i class="iconfont icon-menu fs-md"></i>
                  <h4 class="ml-2">团战思路</h4>
                </div>
                <div class="pt-2 fs-sm fs-dark">
                  <p>{{model.teamTips}}</p>
                </div>
              </div>
              <div class="mt-2 bg-white px-2 py-2">
                <div class="d-flex ai-center">
                  <i class="iconfont icon-menu fs-md"></i>
                  <h4 class="ml-2">英雄关系</h4>
                </div>
                <div class="border-b">
                  <p class="pt-2 pb-1">最佳搭档</p>
                  <div
                    class="d-flex py-2"
                    style="align-items:flex-start;"
                    v-for="item in model.partners"
                    :key="item._id"
                  >
                    <img style="width:3.125rem;height:3.125rem;" :src="item.hero.avatar" alt />
                    <p class="flex-1 ml-2 fs-sm fs-dark">{{item.description}}</p>
                  </div>
                </div>
                <div class="border-b">
                  <p class="pt-2 pb-1">被谁克制</p>
                  <div
                    class="d-flex py-2"
                    style="align-items:flex-start;"
                    v-for="item in model.restraint"
                    :key="item._id"
                  >
                    <img style="width:3.125rem;height:3.125rem;" :src="item.hero.avatar" alt />
                    <p class="flex-1 ml-2 fs-sm fs-dark">{{item.description}}</p>
                  </div>
                </div>
                <div class>
                  <p class="pt-2 pb-1">克制谁</p>
                  <div
                    class="d-flex py-2"
                    style="align-items:flex-start;"
                    v-for="item in model.berestrained"
                    :key="item._id"
                  >
                    <img style="width:3.125rem;height:3.125rem;" :src="item.hero.avatar" alt />
                    <p class="flex-1 ml-2 fs-sm fs-dark">{{item.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide></swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      current: 0,
      model: {
        categories: [],
        scores: {},
        skills: []
      }
    };
  },
  filters: {
    mapCates(val) {
      return val.map(v => v.name).join("/");
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.current];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
  .img {
    width: 1.875rem;
    height: 1.875rem;
    background: url(../assets/index.png) no-repeat;
    background-size: 23.4375rem;
    background-position: 0 72.588%;
  }
}
.top {
  height: 50vw;
  background: rgba(0, 0, 0, 0.15) no-repeat;
  background-position: top center;
  background-size: auto 100%;
  .info {
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .info-wrap {
      height: 50%;
    }
  }
}
.hero-detail {
  div {
    padding-bottom: 0.125rem;
    border-bottom: 0.125rem solid transparent;
    &.active {
      color: #db9e3f;
      border-bottom-color: #db9e3f;
    }
  }
}
.btn {
  padding: 0.25rem 0;
  background: #fcfcfc;
  border: 1px solid #eceef0;
  border-radius: 0.25rem;
}
.skills {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  border: 0.125rem solid transparent;
  &.active {
    border-color: #db9e3f;
  }
}
.shunfeng {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
}
.scores {
  span{
    display: inline-block;
    text-align: right;
  }
  .score-num {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    line-height: 1rem;
    display: inline-block;
    text-align: center;
    margin: 0 0.25rem;
    font-size: 0.75rem;
    color: #fff;
    border: 1px solid rgb(155, 155, 155);
  }
}
.bg-brown{
  background: #805300;
}
.bg-darkblue{
  background: #1f3696;
}
.bg-darkred{
  background: #791a16;
}
.bg-darkbrown{
  background: #33332c;
}
</style>
