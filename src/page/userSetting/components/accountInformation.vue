<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { appStore } from '../../../store/module/app'
import { validateQQ, validateWX } from '../../../utils/typeUtil'
import { updateUserInfoRequest } from '../../../api/module/user'

const store = appStore()
const userInfo = computed(() => store.userInfo)
const formRef = ref()
const formData = ref({
    bio: userInfo.value.bio,
    qq: userInfo.value.qq,
    wechat: userInfo.value.wechat,
    github: userInfo.value.github,
    website: userInfo.value.website,
    location: userInfo.value.location,
    occupation: userInfo.value.occupation,
    company: userInfo.value.company,
})

const ValidateQQ = (rule, value, callback) => {
    if (value == null || value == '') {
        callback()
    } else if (!validateQQ(value)) {
        callback(new Error('QQ号格式不正确'))
    } else {
        callback()
    }
}
const ValidateWX = (rule, value, callback) => {
    if (value == null || value == '') {
        callback()
    } else if (!validateWX(value)) {
        callback(new Error('微信号格式不正确'))
    } else {
        callback()
    }
}
const rules = {
    qq: [{ validator: ValidateQQ, trigger: 'blur' }],
    wechat: [{ validator: ValidateWX, trigger: 'blur' }],
}
const submitHandle = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            console.log(formData.value)
            const results = await updateUserInfoRequest({ ...formData.value })
            console.log(results, 'results')
            if (results.success) {
                ElMessage.success(results.message)
                store.userInfoChange(results.data.userInfo)
            } else {
                ElMessage.error(results.message)
            }
        }
    })
}
</script>
<template>
    <div class="accountInformation">
        <div class="title"> 账号资料 </div>
        <el-divider class="divider"></el-divider>
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80" label-position="right" size="default">
            <el-form-item label="个人简介:" prop="bio">
                <el-input v-model="formData.bio" type="textarea" placeholder="个人简介" maxlength="200" show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="QQ号:" prop="qq">
                <el-input v-model="formData.qq" placeholder="QQ号" maxlength="20" show-word-limit> </el-input>
            </el-form-item>
            <el-form-item label="微信号:" prop="wechat">
                <el-input v-model="formData.wechat" placeholder="微信号" maxlength="20" show-word-limit> </el-input>
            </el-form-item>
            <el-form-item label="GitHub:" prop="github">
                <el-input v-model="formData.github" placeholder="GitHub"> </el-input>
            </el-form-item>
            <el-form-item label="个人主页:" prop="website">
                <el-input v-model="formData.website" placeholder="个人主页"> </el-input>
            </el-form-item>
            <el-form-item label="所在地:" prop="location">
                <el-input v-model="formData.location" placeholder="所在地"> </el-input>
            </el-form-item>
            <el-form-item label="职业:" prop="occupation">
                <el-input v-model="formData.occupation" placeholder="职业"> </el-input>
            </el-form-item>
            <el-form-item label="公司:" prop="company">
                <el-input v-model="formData.company" placeholder="公司"> </el-input>
            </el-form-item>
        </el-form>
        <el-button @click="submitHandle">保存修改</el-button>
    </div>
</template>
<style lang="less" scoped>
.accountInformation {
    padding: 20px;
    .title {
        font-size: 22px;
        font-weight: bold;
        color: black;
    }
}
</style>
