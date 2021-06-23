<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            suffix-icon="el-icon-view"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setSupport, getSupport, setCookie, getCookie } from "@/utils/support";
export default {
  data() {
    return {
      loginForm: { username: "gxh", password: "123456" },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请选择密码", trigger: "change" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.loginForm.username = getCookie("username");
    // this.loginForm.password = getCookie("password");
    // if (
    //   this.loginForm.username === undefined ||
    //   this.loginForm.username == null ||
    //   this.loginForm.username === ""
    // ) {
    //   this.loginForm.username = "gxh";
    // }
    // if (
    //   this.loginForm.password === undefined ||
    //   this.loginForm.password == null
    // ) {
    //   this.loginForm.password = "";
    // }
  },

  methods: {
    //重置按钮表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate( async(valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "admin/login",
          this.loginForm
        );
        //this.$http.post('admin/login',this.loginForm).then(res => {res});
        // this.$store
        //   .dispatch("admin/login", this.loginForm)
        //   .then((res) => {
        //     // this.loading = false;
        //     setCookie("username", this.loginForm.username, 15);
        //     setCookie("password", this.loginForm.password, 15);
        //     this.$router.push({ path: "/home" });
        //   })
        //   .catch(() => {
        //     // this.loading = false;
        //   });
        console.log(res);
        if (res.code != 200) {
          this.$message.error("登录失败");
        }

        this.$message.success("登录成功");
        //存储token
        window.sessionStorage.setItem("token", "Bearer " + res.data.token);
        //页面跳转
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

