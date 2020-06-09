<template>
  <div>
    <h1>{{id?'编辑':'新建'}}用户</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/users/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/users", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.$router.push("/users/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>