<template>
    <div class="user">
        <div class="left">
            <div class="user_info">
                <div class="user_info_left">
                    <img class="img" :src="userInfo.avatar_url" alt="" />
                </div>
                <div class="user_info_mid">
                    <div class="nickname">{{ userInfo.nickname }}</div>
                    <div class="career">职业</div>
                    <div class="desc">简介</div>
                </div>
                <div class="user_info_right">
                    <el-button v-if="id === userInfo.id">编辑个人资料</el-button>
                    <el-button v-else>关注Ta</el-button>
                </div>
            </div>
            <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
                <el-tab-pane label="最近" name="recently">User</el-tab-pane>
                <el-tab-pane label="文章" name="article" lazy>
                    <userArticle />
                </el-tab-pane>
                <el-tab-pane label="收藏集" name="collect" lazy>
                    <UserCollect />
                </el-tab-pane>
                <el-tab-pane label="关注" name="follow">follow</el-tab-pane>
                <el-tab-pane label="点赞" name="likes">likes</el-tab-pane>
            </el-tabs>
        </div>
        <div class="right">
            <div class="achievement">
                <div class="title">个人成就</div>
                <el-divider></el-divider>
                <div class="item">
                    <el-icon size="16"><Document /></el-icon>
                    <div class="desc">发布文章</div>
                    <div class="num">1</div>
                </div>
                <div class="item">
                    <el-icon size="16"><Document /></el-icon>
                    <div class="desc">发布文章</div>
                    <div class="num">1</div>
                </div>
                <div class="item">
                    <el-icon size="16"><Document /></el-icon>
                    <div class="desc">发布文章</div>
                    <div class="num">1</div>
                </div>
                <div class="item">
                    <el-icon size="16"><Document /></el-icon>
                    <div class="desc">发布文章</div>
                    <div class="num">1</div>
                </div>
            </div>
            <div class="follow">
                <div class="item">
                    <div class="top">关注了</div>
                    <div class="num">1</div>
                </div>
                <div class="item">
                    <div class="top">关注了</div>
                    <div class="num">1</div>
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
import { computed, ref } from 'vue'
import { appStore } from '../../store/module/app'
import userArticle from './components/userArticle.vue'
import UserCollect from './components/userCollect.vue'
import { useRoute } from 'vue-router'
const store = appStore()
const userInfo = computed(() => store.userInfo)
const route = useRoute()
const id = ref(route.params.id)
console.log(id.value)
console.log(userInfo.value.id)
const activeName = ref('recently')
</script>
<style scoped lang="less">
.user {
    width: 1280px;
    height: 2280px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
            .right {
                width: 78px;
            }
        }
    }
}
</style>
