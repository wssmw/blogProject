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
        <addCollect ref="addCollectRef" @searchHandle="searchHandle"></addCollect>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserCollectionsRequest, deleteUserCollectionsRequest } from '@/api/module/collection'
import { transDate } from '../../../utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import addCollect from '@/components/addCollect.vue'

let collectList = ref([])
const route = useRoute()
const userId = ref(route.params.id)
console.log(userId.value, 'userId')
onMounted(() => {
    searchHandle()
})

const searchHandle = async () => {
    const { data } = await getUserCollectionsRequest({ userId: userId.value })
    collectList.value = data.collections
    console.log(collectList.value, 'collectList')
}

const addCollectRef = ref()
const addColectHandle = () => {
    addCollectRef.value.open()
}
const editHandle = item => {
    addCollectRef.value.open(item.id, {
        name: item.name,
        description: item.description,
        isPublic: !!item.is_public,
    })
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
