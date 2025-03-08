<template>
    <div class="article_right">
        <div class="author">
            <div class="top">
                <div class="avatar">
                    <img class="img" :src="data?.cover_url" alt="" />
                </div>
                <div class="avatar_name">名字</div>
            </div>
            <div class="mid">
                <div class="item">
                    <div class="num">1</div>
                    <div class="desc">文章</div>
                </div>
                <div class="item">
                    <div class="num">1</div>
                    <div class="desc">文章</div>
                </div>
                <div class="item">
                    <div class="num">1</div>
                    <div class="desc">文章</div>
                </div>
            </div>
            <div class="bot" v-if="data?.user_id !== userInfo.id">
                <el-button class="btn">关注</el-button>
                <el-button class="btn">私信</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { appStore } from '../../../store/module/app'
import { computed } from 'vue'
const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const store = appStore()
const userInfo = computed(() => store.userInfo)
console.log(data, 'datazzz')
</script>
<style scoped lang="less">
.article_right {
    .author {
        padding: 20px;
        background: white;
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
}
</style>
