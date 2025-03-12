<template>
    <el-dialog class="dialog" v-model="showDialog" :title="dialogTitle" width="400" @close="dialogCloseHandle">
        <div class="login" v-if="showContent === 1">
            <el-input class="input" v-model="userInfo.userName" placeholder="请输入账号"></el-input>
            <el-input type="password" class="input" v-model="userInfo.passWord" placeholder="请输入密码"></el-input>
            <el-button class="login" @click="loginHandle">登录</el-button>
            <div class="box">
                <el-button link> 忘记密码 </el-button>
                <el-button link @click="goResetHandle">
                    前往注册<el-icon><ArrowRight /></el-icon>
                </el-button>
            </div>
            <el-divider></el-divider>
            <div class="other_login">
                <span>第三方登录</span>
                <img class="img" src="@/assets/svg/gitee.svg" @click="giteeLogin" />
            </div>
        </div>
        <div class="register" v-else-if="showContent === 2">
            <el-input class="input" v-model="userInfo.userName" placeholder="请输入账号"></el-input>
            <el-input type="password" class="input" v-model="userInfo.passWord" placeholder="请输入密码"></el-input>
            <el-button class="login" @click="registerHandle">注册</el-button>
            <div class="box">
                <el-button link @click="returnLoginHandle">
                    返回登录 <el-icon><ArrowRight /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="forget" v-else> </div>
    </el-dialog>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { loginRequest, registerRequest } from '../../api/module/login'
import { appStore } from '../../store/module/app'
const store = appStore()

const dialogTitle = ref('登录')
const showContent = ref(1) // 登录,注册,忘记密码 分别对应1,2,3

let showDialog = computed(() => store.showLoginModal)

const giteeLogin = () => {
    window.location.href = `http://localhost:1234/login/gitee`
}

const userInfo = reactive({
    userName: '',
    passWord: '',
})

const dialogCloseHandle = () => {
    store.showLoginModalChange(false)
}

const resetHandle = () => {
    userInfo.passWord = ''
    userInfo.userName = ''
}

const loginHandle = async () => {
    // 非空校验
    if (!userInfo.passWord || !userInfo.passWord) {
        ElMessage.warning('账号密码不能为空')
    }
    // 调用接口
    let params = {
        username: userInfo.userName,
        password: userInfo.passWord,
    }
    let res = await loginRequest(params)
    console.log(res, 'test')
    if (res.success) {
        let { data } = res
        let { token, userInfo } = data
        store.tokenChange(token)
        store.userInfoChange(userInfo)
        ElMessage.success('登录成功~')
        store.showLoginModalChange(false)
    } else {
        ElMessage.error(res.message)
    }
}
// 去注册页面
const goResetHandle = () => {
    showContent.value = 2
    resetHandle()
}
// 注册
const registerHandle = async () => {
    // 非空校验
    if (!userInfo.passWord || !userInfo.passWord) {
        ElMessage.warning('账号密码不能为空')
    }
    // 调用接口
    let params = {
        username: userInfo.userName,
        password: userInfo.passWord,
    }
    console.log(params)
    let res = await registerRequest(params)
    console.log(res, 'test')
    if (res.success) {
        ElMessage.success('创建成功,请登录~')
        showContent.value = 1
    } else {
        ElMessage.error(res.message)
    }
}
// 回登录页面
const returnLoginHandle = () => {
    showContent.value = 1
    resetHandle()
}
</script>
<style scoped lang="less">
.dialog {
    .login,
    .register,
    .forget {
        .input {
            margin: 10px 0;
        }
        .login {
            margin: 10px 0;
            width: 100%;
        }
        .box {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        .img {
            width: 24px;
            height: 24px;
        }
        .other_login {
            display: flex;
            img {
                margin: 0 10px;
                cursor: pointer;
            }
        }
    }
    .register {
        .box {
            justify-content: end;
        }
    }
}
</style>
