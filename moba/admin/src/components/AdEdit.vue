<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button type="button" size="small" @click="model.items.push({})">
        <i class="el-icon-plus"></i>添加广告位
      </el-button>
      <el-row type="flex" style="flex-wrap:wrap;">
        <el-col style="padding:0.5rem;" :md="12" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="广告名称">
            <el-input v-model="item.title"></el-input>
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
          <el-form-item label="链接地址">
            <el-input v-model="item.link"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="marginTop:1rem;">
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
      model: {
        name:'',
        items:[]
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/ads", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/ads/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>