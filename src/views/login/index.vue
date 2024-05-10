<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="switch-dark">
        <el-switch v-model="layoutStore.isDark" @change="changeDark" inline-prompt active-icon="Sunny" inactive-icon="Moon" />
      </div>
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left1.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.png" alt="" />
          <div class="logo-text">Panda后台管理系统</div>
        </div>
        <el-form ref="loginFormRef" size="large" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password
              autocomplete="new-password">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button :icon="CircleClose" round size="large" @click="reset"> 重置 </el-button>
          <el-button :icon="UserFilled" :loading="loading" round size="large" type="primary" @click="login">
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { CircleClose, User, UserFilled, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
// 引入用户store仓库
import useUserStore from "@/store/modules/user";
import useLayoutStore from '@/store/modules/setting.ts';
import { useRouter, useRoute } from 'vue-router';
import { getTimeState } from '@/utils/index'
import { useDark, useToggle } from '@vueuse/core';


//switch开关的chang事件进行暗黑模式的切换
const isDark = useDark()
const changeDark = useToggle(isDark)

// 获取路由器对象
let $router = useRouter();
// 获取路由信息对象
let $route = useRoute();
let userStore = useUserStore();
let layoutStore = useLayoutStore();
const loginForm = reactive({
  username: "admin",
  password: "111111"
});
// 自定义表单校验规则
const checkUser = (rule: any, value: any, callback: any) => {
  console.log(rule);
  
  if (/^[0-9a-zA-Z]{3,10}$/.test(value)) {
    callback()
  } else {
    callback('用户名格式不正确')
  }
}
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: checkUser, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};
let loginFormRef = ref();
let loading = ref(false);
const reset = () => {
  loginFormRef.value.resetFields()
}
// 登录回调
const login = async () => {
  // 表单验证是否通过
  await loginFormRef.value.validate()
  loading.value = true;
  // 发起请求 
  userStore.userLogin(loginForm).then(res => {
    console.log(res);
    loading.value = false;
    ElNotification({
      type: 'success',
      message: '欢迎登录Panda后台管理系统！',
      title: getTimeState()
    })
    // $router.push('/')
    // 判断登录的时候,路由路径当中是否有query参数
    let redirect: any = $route.query.redirect;
    // 如果有就往query参数跳转，没有跳转到首页
    $router.push({ path: redirect || '/' });
  }).catch(err => {
    console.log(err);
    loading.value = false;
    ElNotification({
      type: 'error',
      message: err.message
    })
  });

}
</script>

<style scoped lang="scss">
.login-container {
  height: 100%;
  min-height: 550px;
  background-color: var(--login-bg-color);
  background-image: url("@/assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-size: cover;

  .login-box {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96.5%;
    height: 94%;
    padding: 0 50px;
    background-color: var(--login-bg-inner-color);
    border-radius: 10px;

    .switch-dark {
      position: absolute;
      top: 13px;
      right: 18px;
    }

    .login-left {
      width: 800px;
      margin-right: 10px;

      .login-left-img {
        width: 100%;
        height: 100%;
      }
    }

    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      background-color: var(--el-bg-color);
      border-radius: 10px;
      box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;

      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;

        .login-icon {
          width: 60px;
          height: 52px;
        }

        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 30px;
          font-weight: bold;
          color: var(--login-font-color);
          white-space: nowrap;
        }
      }

      .el-form-item {
        margin-bottom: 40px;
      }

      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        white-space: nowrap;

        .el-button {
          width: 185px;
        }
      }
    }
  }
}

@media screen and (width <=1250px) {
  .login-left {
    display: none;
  }
}

@media screen and (width <=600px) {
  .login-form {
    width: 97% !important;
  }
}
</style>
