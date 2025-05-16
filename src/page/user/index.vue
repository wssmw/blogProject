<template>
    <div class="user">
        <div class="left">
            <div class="user_info">
                <div class="user_info_left">
                    <img class="img" :src="userInfo?.avatar_url" alt="" />
                </div>
                <div class="user_info_mid">
                    <div class="nickname">{{ userInfo?.nickname }}</div>
                    <div class="career">职业</div>
                    <div class="desc">{{ userInfo.bio }}</div>
                </div>
                <div class="user_info_right">
                    <el-button v-if="store.userInfo?.id === userInfo.id" @click="editUserInfo">编辑个人资料</el-button>
                    <el-button v-else @click="followHandle">关注Ta</el-button>
                </div>
            </div>
            <el-tabs
                v-model="activeName"
                class="tabs"
                @tab-click="
                    () => {
                        $router.push({ query: { type: activeName } })
                    }
                "
            >
                <el-tab-pane label="最近" name="recently">User</el-tab-pane>
                <el-tab-pane label="文章" name="article" lazy>
                    <userArticle />
                </el-tab-pane>
                <el-tab-pane label="收藏集" name="collect" lazy>
                    <UserCollect />
                </el-tab-pane>
                <el-tab-pane label="关注" name="follow" lazy>
                    <el-tabs tab-position="left" style="height: 300px" class="demo-tabs">
                        <el-tab-pane label="关注用户" lazy>
                            <UserFollow></UserFollow>
                        </el-tab-pane>
                        <el-tab-pane label="关注标签" lazy>
                            <TagFollow></TagFollow>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="点赞" name="likes" lazy>
                    <el-tabs tab-position="left" style="height: 300px" class="demo-tabs">
                        <el-tab-pane label="点赞的文章" lazy>
                            <LikeArticle></LikeArticle>
                        </el-tab-pane>
                        <el-tab-pane label="点赞的评论" lazy>
                            <LikeComment></LikeComment>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="right">
            <div class="achievement">
                <div class="title">个人成就</div>
                <el-divider></el-divider>
                <div class="item">
                    <el-icon size="16" color="rgb(124, 184, 252)"><Document /></el-icon>
                    <div class="desc">发布文章</div>
                    <div class="num">{{ userInfo.article_count }}</div>
                </div>
                <div class="item">
                    <el-icon size="16" color="rgb(36, 171, 138)"><CircleCheckFilled /></el-icon>
                    <div class="desc">文章被点赞了</div>
                    <div class="num">{{ userInfo.like_count }}</div>
                </div>
                <div class="item">
                    <el-icon size="16" color="rgb(97, 183, 229)"><View /></el-icon>
                    <div class="desc">文章被阅读</div>
                    <div class="num">{{ userInfo.total_views }}</div>
                </div>
            </div>
            <div class="follow">
                <div class="item">
                    <div class="top">关注了</div>
                    <div class="num">{{ userInfo.following_count }}</div>
                </div>
                <div class="item">
                    <div class="top">关注者</div>
                    <div class="num">{{ userInfo.follower_count }}</div>
                </div>
            </div>
            <div class="createTime">
                <div class="left">加入于</div>
                <div class="right">2023-02-02</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import userArticle from './components/userArticle.vue'
import UserCollect from './components/userCollect.vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfoRequest } from '../../api/module/user'
import { appStore } from '../../store/module/app'
import UserFollow from './components/userFollow.vue'
import TagFollow from './components/tagFollow.vue'
import LikeArticle from './components/LikeArticle.vue'
import LikeComment from './components/LikeComment.vue'
import { followUserRequest } from '../../api/module/follow'
import { ElMessage } from 'element-plus'
import { useLogin } from '@/hooks/useLogin'

const store = appStore()
const route = useRoute()
const router = useRouter()

const userInfo = ref({})
const id = ref(route.params.id)
console.log(route, 'route')
console.log(id.value)
const activeName = ref(route.query.type || 'recently')

watch(
    () => route.params.id,
    () => {
        id.value = route.params.id
        getUserInfo()
    },
)
watch(
    () => route.query.type,
    () => {
        activeName.value = route.query.type
    },
)
const getUserInfo = async () => {
    const { data } = await getUserInfoRequest(id.value)
    userInfo.value = data
}
onMounted(() => {
    getUserInfo()
})

const editUserInfo = () => {
    router.push('/userSetting')
}

// 使用登录hooks
const { withLogin } = useLogin()
const followHandle = async () => {
    withLogin(async () => {
        const result = await followUserRequest({ userId: id.value })
        console.log(result, 'result')
        if (result.success) {
            ElMessage.success(result.message)
        } else {
            ElMessage.error(result.message)
        }
    })
}
</script>
<style scoped lang="less">
.user {
    width: 1260px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 20px;
    .left {
        width: 66.6%;
        margin-right: 16px;
        .user_info {
            display: flex;
            align-items: center;
            padding: 20px;
            background: white;
            border-radius: 4px;

            .user_info_left {
                width: 100px;
                .img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
            .user_info_mid {
                height: 100px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 0 20px;
                .nickname {
                    font-size: 20px;
                    font-weight: 600;
                    color: black;
                }
            }
            .user_info_right {
                height: 100px;
                display: flex;
                align-items: end;
            }
        }
        .tabs {
            margin-top: 20px;
            background: white;
            border-radius: 4px;
            padding: 20px;
        }
    }
    .right {
        width: 16.6%;
        .achievement {
            padding: 20px;
            background: white;
            border-radius: 4px;
            .title {
                font-size: 16px;
                font-weight: 600;
                color: #31445b;
            }
            .item {
                display: flex;
                align-items: center;
                margin: 10px 0;
                .desc {
                    margin: 0 10px;
                    color: #5a5e66;
                    font-size: 14px;
                }
            }
        }
        .follow {
            padding: 20px;
            margin-top: 20px;
            background: white;
            border-radius: 4px;
            display: flex;
            font-size: 16px;
            font-weight: 500;
            justify-content: space-around;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .createTime {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-size: 16px;
            font-weight: 500;
            .right {
                width: 130px;
            }
        }
    }
}
</style>
