<template>
    <div class="article_left">
        <el-badge
            :value="likeCount"
            class="item"
            :offset="[-5, 5]"
            :color="hasLiked ? '#1e80ff' : '#c2c8d1'"
            :hidden="!likeCount"
        >
            <img v-if="hasLiked" @click="likeHandle" class="img" src="@/assets/svg/点赞_1.svg" alt="" />
            <img v-else @click="likeHandle" class="img" src="@/assets/svg/点赞.svg" alt="" />
        </el-badge>
        <el-badge
            :value="data?.comment_count"
            class="item"
            :offset="[-5, 5]"
            color="#c2c8d1"
            :hidden="!data?.comment_count"
        >
            <el-icon size="20"><ChatDotRound /></el-icon>
        </el-badge>
        <el-badge
            :value="12"
            class="item"
            :offset="[-5, 5]"
            :color="data?.has_liked ? '#1e80ff' : '#c2c8d1'"
            :hidden="!data?.comment_count"
        >
            <el-icon v-if="!hasCollecte" size="20" @click="collecteHandle"><Star /></el-icon>
            <el-icon v-else color="#ffb800" size="20" @click="collecteHandle"><StarFilled /></el-icon>
        </el-badge>
        <div class="item">
            <el-icon size="20"><Share /></el-icon>
        </div>
        <div class="item">
            <el-icon size="20"><WarnTriangleFilled /></el-icon>
        </div>
    </div>

    <!-- 登录弹窗组件 -->
    <el-dialog
        class="dialog"
        v-model="showCollect"
        title="收藏夹"
        width="400px"
        :show-close="true"
        @close="closeColectDialog"
    >
        <div v-if="!collections.length"> 您还未创建文件夹！ </div>
        <div v-else>
            <el-checkbox-group class="checkboxGroup" v-model="checkCollect" :max="1">
                <template v-for="item in collections">
                    <el-checkbox class="w-full my-1" :value="item.id" border>
                        <div class="flex items-center">
                            {{ item.name }}
                            <span v-if="!item.is_public" class="ml-1">
                                <img class="img inline w-[20px]" src="@/assets/svg/点赞_1.svg" alt="" />
                            </span>
                        </div>
                    </el-checkbox>
                </template>
            </el-checkbox-group>
        </div>
        <template #footer>
            <div class="dialog-footer flex justify-between">
                <el-button @click="addColectHandle">
                    <el-icon><Plus /></el-icon> 新建文件夹
                </el-button>
                <el-button type="primary" @click="submitCollect"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
    <addCollect ref="addCollectRef" @searchHandle="searchHandle"></addCollect>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { likeArticleRequest } from '../../../api/module/likes'
import { ElMessage } from 'element-plus'
import { useLogin } from '@/hooks/useLogin'
import { getUserCollectionsRequest, addArticleCollectionsRequest } from '@/api/module/collection.js'
import { appStore } from '../../../store/module/app'
import addCollect from '@/components/addCollect.vue'
const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const store = appStore()
const userId = computed(() => store.userInfo.id)
const localData = ref({ ...data })
const likeCount = computed(() => localData.value.like_count)
const hasLiked = computed(() => !!localData.value.has_liked)
const hasCollecte = computed(() => !!localData.value.has_collected)
console.log(hasCollecte, 'hasCollecte')
// 使用登录hooks
const { withLogin } = useLogin()

const likeHandle = async () => {
    withLogin(async () => {
        const result = await likeArticleRequest({ articleId: data.id })
        if (result.success) {
            ElMessage.success(result.message)
            localData.value = {
                ...localData.value,
                has_liked: !localData.value.has_liked,
                like_count: localData.value.like_count + (localData.value.has_liked ? -1 : 1),
            }
        }
    })
}

const showCollect = ref(false)
const collections = ref([])
const checkCollect = ref([])
const collecteHandle = () => {
    withLogin(async () => {
        searchHandle()
    })
}
const searchHandle = async () => {
    const { data } = await getUserCollectionsRequest({ userId: userId.value })
    collections.value = data.collections
    showCollect.value = true
}
const addCollectRef = ref()
const addColectHandle = () => {
    addCollectRef.value.open()
}
const closeColectDialog = () => {
    checkCollect.value = []
}
const submitCollect = async () => {
    console.log('checkCollect', checkCollect.value)
    const result = await addArticleCollectionsRequest({
        collectionId: checkCollect.value[0],
        articleId: data.id,
    })
    if (result.success) {
        ElMessage.success(result.message)
        showCollect.value = false
        checkCollect.value = []
    } else {
        ElMessage.error(result.message)
    }
}

// 监听父组件数据变化
watch(
    () => data,
    newData => {
        localData.value = { ...newData }
    },
    { deep: true },
)
</script>
<style scoped lang="less">
.article_left {
    position: fixed;
    margin-top: 40px;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.04);
        cursor: pointer;
        .img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
