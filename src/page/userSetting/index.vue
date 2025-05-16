<template>
    <div class="userSetting">
        <div class="backToUser">
            <el-button link @click="backToUser">
                <el-icon><ArrowLeft /></el-icon>返回个人主页
            </el-button>
        </div>
        <div class="content">
            <el-tabs :tab-position="'left'" class="demo-tabs">
                <el-tab-pane>
                    <template #label>
                        <div class="w-[100px]">个人信息</div>
                    </template>
                    <PersonalInformation />
                </el-tab-pane>
                <el-tab-pane label="账号资料">
                    <AccountInformation></AccountInformation>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { appStore } from '../../store/module/app'
import AccountInformation from './components/accountInformation.vue'
import PersonalInformation from './components/personalInformation.vue'
const router = useRouter()
const store = appStore()
const backToUser = () => {
    router.push(`/user/${store.userInfo.id}`)
}
</script>
<style scoped lang="less">
.userSetting {
    margin: 0 auto ;
    width: 1080px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    .backToUser {
        background-color: white;
        padding: 10px;
    }
    .content {
        margin-top: 20px;
        background-color: white;
        padding: 20px;
    }
}
</style>
