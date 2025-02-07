<template>
    <el-dialog v-model="showDialog" title="登录" width="500">
        <el-input placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码"></el-input>
        <el-button @click="giteeLogin">gitee登录</el-button>
    </el-dialog>
</template>
<script setup>
import wsRequest from '@/api/index.js'
const GITEE_AUTH_URL = 'https://gitee.com/oauth/authorize'
const GITEE_CLIENT_ID = '345c224984e879d914da13cd4dd4b92cdbf217722342f2bfc46db724ca7ad681'
const GITEE_REDIRECT_URI = 'http://localhost:8000'
import { ref } from 'vue';

let showDialog = ref(false)
const open = () =>{
    showDialog.value = true
}

const giteeLogin = async () =>{
    // const res = await wsRequest.post({
    //     url: '/login/gitee',
    // })
    // window.location.href = `${GITEE_AUTH_URL}?client_id=${GITEE_CLIENT_ID}&redirect_uri=${GITEE_REDIRECT_URI}&response_type=code`
    window.location.href = `http://localhost:1234/login/gitee`
}

defineExpose({
    open
})
</script>
<style scoped lang="scss">

</style>