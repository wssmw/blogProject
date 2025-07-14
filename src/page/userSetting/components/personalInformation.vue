<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { appStore } from '../../../store/module/app'
import { validatePhone, validateEmail } from '../../../utils/typeUtil'
import { updateUserInfoRequest } from '../../../api/module/user'

const store = appStore()
const userInfo = computed(() => store.userInfo)
const showAvatarCover = ref(false)
const headers = {
    Authorization: `Bearer ${store.token}`,
}

const uploadActionUrl = `${window.location.origin}/api/users/updateUserAvatar`
const mouseEnter = () => {
    showAvatarCover.value = true
}
const mouseleave = () => {
    showAvatarCover.value = false
}
const successUploadHandle = res => {
    console.log(res, 'res')
    if (res.success) {
        store.userInfoChange({
            ...res.data.userInfo,
        })
        ElMessage.success(res.message)
    } else {
        ElMessage.error(res.message)
    }
}

const formRef = ref()
const formData = ref({
    username: store.userInfo.username,
    nickname: store.userInfo.nickname,
    email: store.userInfo.email,
    phone: store.userInfo.phone,
})
const ValidatePhone = (rule, value, callback) => {
    console.log(validatePhone(value))
    if (value == null || value == '') {
        callback()
    } else if (!validatePhone(value)) {
        callback(new Error('手机号格式不正确'))
    } else {
        callback()
    }
}
const ValidateEmail = (rule, value, callback) => {
    if (value == null || value == '') {
        callback()
    } else if (!validateEmail(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}
const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
    phone: [{ validator: ValidatePhone, trigger: 'blur' }],
    email: [{ validator: ValidateEmail, trigger: 'blur' }],
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
    <div class="personal_information">
        <div class="left">
            <div class="title"> 个人资料 </div>
            <el-divider class="divider"></el-divider>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                label-width="80"
                label-position="right"
                size="default"
            >
                <el-form-item label="用户名:" required prop="username">
                    <el-input v-model="formData.username" placeholder="用户名" maxlength="20" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称:" required prop="nickname">
                    <el-input v-model="formData.nickname" placeholder="昵称" maxlength="20" show-word-limit> </el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="formData.email" placeholder="邮箱"> </el-input>
                </el-form-item>
                <el-form-item label="手机:" prop="phone">
                    <el-input v-model="formData.phone" placeholder="手机"> </el-input>
                </el-form-item>
            </el-form>
            <el-button @click="submitHandle">保存修改</el-button>
        </div>
        <div class="right">
            <el-upload
                class="upload"
                :action="uploadActionUrl"
                :limit="1"
                :headers="headers"
                :show-file-list="false"
                :on-success="successUploadHandle"
            >
                <div class="upload_content" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                    <img class="img" :src="userInfo.avatar_url" alt="头像" />
                    <div class="cover" v-show="showAvatarCover">
                        <el-icon class="icon"><Plus /></el-icon>
                        点击修改头像
                    </div>
                    <span class="title">上传头像</span>
                    <div class="desc">
                        <p> 格式：支持JPG、PNG、JPEG </p>
                        <p> 大小：5M以内 </p>
                    </div>
                </div>
                <template #tip> </template>
            </el-upload>
        </div>
    </div>
</template>
<style lang="less" scoped>
.personal_information {
    display: flex;
    justify-content: space-between;
    .left {
        flex: 1;
        padding: 30px;
        .title {
            font-size: 22px;
            font-weight: bold;
            color: var(--theme-color);
        }
    }
    .right {
        width: 40%;
        margin-left: 20px;
        .upload {
            .upload_content {
                display: flex;
                flex-direction: column;
                align-items: center;
                .cover {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(29, 33, 41, 0.5);
                    color: var(--theme-color);
                    .icon {
                        margin-bottom: 4px;
                    }
                }
                .img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
                .title {
                    margin-top: 12px;
                    color: black;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                }
                .desc {
                    margin-top: 12px;
                }
            }
        }
    }
}
</style>
