<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthorization()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传海报">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthorization()"
              :show-file-list="false"
              :on-success="res=>{$set(model,'banner',res.url)}"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="marginTop:0.6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="marginTop:0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="marginTop:0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="marginTop:0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息">
          <el-button type="button" size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col style="padding:0.5rem;" :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthorization()"
                  :show-file-list="false"
                  :on-success="res=>{$set(item,'icon',res.url)}"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="number" v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="number" v-model="item.consume"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档">
          <el-button type="button" size="small" @click="model.partners.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col style="padding:0.5rem;" :md="12" v-for="(item,i) in model.partners" :key="i">
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for="hero in heroes"
                  :key="hero._id"
                  :value="hero._id"
                  :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="被谁克制">
          <el-button type="button" size="small" @click="model.restraint.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col style="padding:0.5rem;" :md="12" v-for="(item,i) in model.restraint" :key="i">
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for="hero in heroes"
                  :key="hero._id"
                  :value="hero._id"
                  :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.restraint.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="克制谁">
          <el-button type="button" size="small" @click="model.berestrained.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col style="padding:0.5rem;" :md="12" v-for="(item,i) in model.berestrained" :key="i">
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for="hero in heroes"
                  :key="hero._id"
                  :value="hero._id"
                  :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.berestrained.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      categories: [],
      items: [],
      heroes:[],
      model: {
        name: "",
        avatar: "",
        title: "",
        categories: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        items1: [],
        items2: [],
        skills: [],
        partners:[],
        restraint:[],
        berestrained:[]
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/heroes/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchParent() {
      const res = await this.$http.get("rest/heroes");
      this.parents = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchParent();
    this.fetchHeroes()
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>