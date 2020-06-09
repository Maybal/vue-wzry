<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="icon" label="图片">
          <template slot-scope="scope">
              <img :src="scope.row.icon" alt="" style="height:3rem;display:block;">
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否删除当前的"${row.name}"`, "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          await this.$http.delete(`rest/items/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>