<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="上级名称">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/categories", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/categories/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParent() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParent();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>