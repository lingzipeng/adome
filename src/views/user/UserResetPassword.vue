<script setup>
import { ref } from "vue";
import { RePasswordService } from "@/api/user.js";
import { ElMessage } from "element-plus";

const userInfo = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: "",
});

//修改密码
const updatePassword = async () => {
  let result = await RePasswordService(userInfo.value);
  ElMessage.success(result.msg ? result.msg : "修改成功");
};
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" label-width="100px" size="large">
          <el-form-item label="旧密码">
            <el-input
              v-model="userInfo.old_pwd"
              type="password"
              placeholder="旧密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="nickname">
            <el-input
              v-model="userInfo.new_pwd"
              type="password"
              placeholder="请输入修改后的密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="email">
            <el-input
              v-model="userInfo.re_pwd"
              type="rePassword"
              placeholder="请再次确认"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword()"
              >提交修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
