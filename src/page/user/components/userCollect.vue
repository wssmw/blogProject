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
                        <div class="left">
                            <img class="img" src="@/assets/svg/24gl-folderStar.svg" alt="" />
                            <span class="name">{{ item.name }}</span>
                        </div>
                        <div class="right">
                            <el-dropdown>
                                <el-icon><MoreFilled /></el-icon>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="editHandle(item)">编辑</el-dropdown-item>
                                        <el-dropdown-item @click="deleteHandle(item)">删除 </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
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
                    <el-button @click="submitHandle">{{ editId ? '修改' : '添加' }}</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteUserCollectionsRequest, updateUserCollectionsRequest } from '../../../api/module/collection'

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
const editId = ref('')
const searchHandle = async () => {
    const { data } = await getUserCollectionsRequest({ userId: userId.value })
    collectList.value = data.collections
    console.log(collectList.value, 'collectList')
}
const addColectHandle = () => {
    editId.value = ''
    showDialog.value = true
}
const editHandle = item => {
    console.log('edit', item)
    formData.value = {
        name: item.name,
        description: item.description,
        isPublic: !!item.is_public,
    }
    editId.value = item.id
    showDialog.value = true
}
const deleteHandle = async item => {
    console.log('delete', item)
    ElMessageBox.confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: async action => {
            if (action === 'confirm') {
                const results = await deleteUserCollectionsRequest({ collectionId: item.id })
                if (results.success) {
                    ElMessage.success(results.message)
                    searchHandle()
                } else {
                    ElMessage.error(results.message)
                }
            }
        },
    })
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
    let result
    if (editId.value) {
        result = await updateUserCollectionsRequest({
            ...formData.value,
            collectionId: editId.value,
        })
    } else {
        result = await createCollectionsRequest({
            ...formData.value,
        })
    }
    if (result.success) {
        ElMessage.success(result.message)
        searchHandle()
    } else {
        ElMessage.error(result.message)
    }
    showDialog.value = false
    resetData()

    console.log(result, 'results')
}
</script>
<style scoped lang="less">
.userCollect {
    .addcollect {
        text-align: right;
        margin-bottom: 20px;
    }
    .collectList {
        .item {
            margin-top: 10px;
            .top {
                display: flex;
                justify-content: space-between;
                .left {
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
