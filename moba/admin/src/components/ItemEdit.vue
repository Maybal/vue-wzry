<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="上传物品">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthorization()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      model: {
          name:'',
          icon:''
      }
    };
  },
  methods: {
    afterUpload(res) {
        this.model.icon = res.url
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/items/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    async fetchParent() {
      const res = await this.$http.get("rest/items");
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParent();
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>