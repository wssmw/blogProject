<template>
    <div class="article_right" :style="headerStyle">
        <div class="author">
            <div class="top">
                <div class="avatar">
                    <img class="img" :src="userInfo.avatar_url" alt="" />
                </div>
                <div class="avatar_name">{{ userInfo.username }}</div>
            </div>
            <div class="mid">
                <div class="item">
                    <div class="num">{{ userInfo.article_count }}</div>
                    <div class="desc">文章</div>
                </div>
                <div class="item">
                    <div class="num">{{ userInfo.follower_count }}</div>
                    <div class="desc">粉丝</div>
                </div>
                <div class="item">
                    <div class="num">{{ userInfo.total_views }}</div>
                    <div class="desc">阅读</div>
                </div>
            </div>
            <div class="bot">
                <el-button class="btn" v-if="!userInfo.has_followed" @click="followUserHandle">关注</el-button>
                <el-button class="btn" type="success" v-else @click="followUserHandle">取关</el-button>
                <el-button class="btn">私信</el-button>
            </div>
        </div>
        <div class="toc" ref="tocRef">
            <Toc v-if="renderCompletedFlag"></Toc>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { getUserInfoRequest } from '../../../api/module/user'
import { followUserRequest } from '../../../api/module/follow'
import { ElMessage } from 'element-plus'
import Toc from '../../../components/toc.vue'
import { appStore } from '../../../store/module/app'

const props = defineProps({
    data: {
        type: Object,
    },
    renderCompletedFlag: {
        type: Boolean,
        default: false,
    },
})
const userInfo = ref({})

const store = appStore()
const headerStyle = computed(() => {
    if (store.windowScrollY > 400) {
        return {
            transition: 'transform .2s ease-in-out',
            transform: 'translate3d(0,-60px,0)',
        }
    } else {
        return {
            transition: 'transform .2s ease-in-out',
            transform: 'translate3d(0,0,0)',
        }
    }
})
const requestHandle = async () => {
    const result = await getUserInfoRequest(props.data.user_id)
    console.log(result, 'result')
    userInfo.value = result.data
}

const followUserHandle = async () => {
    const result = await followUserRequest({ userId: props.data.user_id })
    console.log(result, 'result')
    if (result.success) {
        ElMessage.success(result.message)
        requestHandle()
    } else {
        ElMessage.success(result.message)
    }
}
watch(
    () => props.data.user_id,
    () => {
        requestHandle()
    },
    { deep: true, immediate: true },
)
</script>
<style scoped lang="less">
.article_right {
    position: fixed;
    .author {
        padding: 20px;
        background: var(--theme-sec-background);
        border-radius: 6px;
        .top {
            display: flex;
            align-items: center;
            justify-content: start;
            .avatar {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                overflow: hidden;
                .img {
                    width: 48px;
                    height: 48px;
                }
            }
            .avatar_name {
                margin-left: 20px;
                font-size: 16px;
                font-weight: 500;
            }
        }
        .mid {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            padding: 0 30px;
            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                .num {
                    font-size: 16px;
                    font-weight: 500;
                }
                .desc {
                }
            }
        }
        .bot {
            display: flex;
            justify-content: space-around;
            .btn {
                width: 120px;
            }
        }
    }
    .toc {
        margin-top: 20px;
        padding: 20px;
        background: var(--theme-sec-background);
    }
}
</style>
