<template>
    <div class="userCollect">
        <div class="addcollect">
            <el-button @click="addColectHandle">
                <el-icon><Plus /></el-icon> 新建文件夹
            </el-button>
        </div>
        <div class="collectList" v-if="collectList.length">
            <template v-for="item in collectList" :key="item.id">
                <div class="item">
                    <div class="top">
                        <img class="img" src="@/assets/svg/24gl-folderStar.svg" alt="" />
                        <span class="name">{{ item.name }}</span>
                    </div>
                    <div class="bottom">
                        <img class="img" src="@/assets/svg/日历.svg" alt="" />
                        <span class="time">{{ transDate(item.created_at) }}</span>
                        <span class="num">{{ item.article_count }}篇文章</span>
                    </div>
                    <el-divider />
                </div>
            </template>
        </div>
        <el-empty v-else description="暂无数据" />
        <el-dialog v-model="showDialog" title="添加收藏夹" @close="dialogCloseHandle">
            <el-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                label-width="100"
                label-position="right"
                size="default"
            >
                <el-form-item label="收藏夹名称:" required prop="name">
                    <el-input v-model="formData.name" placeholder="收藏夹名称" maxlength="20" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="简介:" required prop="description">
                    <el-input
                        v-model="formData.description"
                        type="textarea"
                        placeholder="收藏夹简介"
                        show-word-limit
                        maxlength="200"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="是否公开:" required prop="isPublic">
                    <el-radio-group v-model="formData.isPublic">
                        <el-radio :value="true" size="small">是</el-radio>
                        <el-radio :value="false" size="small">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="w-full text-right">
                    <el-button @click="submitHandle">添加</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserCollectionsRequest, createCollectionsRequest } from '@/api/module/collection'
import { transDate } from '../../../utils'
import { ElMessage } from 'element-plus'

const rules = {
    name: [{ required: true, message: '请填写收藏夹名称', trigger: 'blur' }],
    description: [{ required: true, message: '请填写收藏夹描述', trigger: 'blur' }],
}

let collectList = ref([])
const route = useRoute()
const userId = ref(route.params.id)
console.log(userId.value, 'userId')
onMounted(() => {
    searchHandle()
})

const showDialog = ref(false)
const formData = ref({
    name: '',
    description: '',
    isPublic: true,
})

const searchHandle = async () => {
    const { data } = await getUserCollectionsRequest({ userId: userId.value })
    collectList.value = data.collections
    console.log(collectList.value, 'collectList')
}
const addColectHandle = () => {
    showDialog.value = true
}
const dialogCloseHandle = () => {
    showDialog.value = false
    resetData()
}
const resetData = () => {
    formData.value = {
        name: '',
        description: '',
        isPublic: true,
    }
}
const formRef = ref()
const submitHandle = async () => {
    console.log(formData.value, 'formData.value')
    await formRef.value.validate(valid => {
        if (!valid) {
            return
        }
    })

    if (!formData.value.name) {
        ElMessage.info('请填写收藏夹名称')
    }
    if (!formData.value.description) {
        ElMessage.info('请填写收藏夹简介')
    }
    const resullt = await createCollectionsRequest({
        ...formData.value,
    })
    if (resullt.success) {
        ElMessage.success(resullt.message)
        searchHandle()
    } else {
        ElMessage.error(resullt.message)
    }
    showDialog.value = false
    resetData()

    console.log(resullt, 'results')
}
</script>
<style scoped lang="less">
.userCollect {
    .addcollect {
        text-align: right;
    }
    .collectList {
        .item {
            margin-top: 10px;
            .top {
                display: flex;
                .img {
                    width: 26px;
                    height: 26px;
                }
                .name {
                    margin-left: 20px;
                    color: #2f3542;
                    font-size: 18px;
                }
            }
            .bottom {
                margin-top: 10px;
                display: flex;
                align-items: center;
                .img {
                    width: 16px;
                    height: 16px;
                }
                .time,
                .num {
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>
