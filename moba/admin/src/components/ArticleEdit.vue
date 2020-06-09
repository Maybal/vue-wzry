<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="上级名称">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情"><br />
        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"> </vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {
      type: String
    }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      categories: [],
      model: {
        title: "",
        categories: "",
        body: ""
      }
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader){
      const formData = new FormData()
      formData.append('file',file)
      const res = await this.$http.post('/upload',formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/articles/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 8rem;
  height: 8rem;
  line-height: 8rem !important;
  text-align: center;
}
.avatar {
  width: 8rem;
  height: 8rem;
  display: block;
}
</style>