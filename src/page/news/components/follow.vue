<template>
    <div class="news_comment">
        <div v-if="followList.length" class="news_comment_list">
            <template v-for="item in followList" :key="item.id">
                <div class="item">
                    <div class="item_content">
                        <div class="left">
                            <img class="left_img" :src="item.fromUser.avatarUrl" alt="" />
                            <div class="right_content">
                                <div class="title">
                                    <div class="name">
                                        {{ item.fromUser.nickname }}
                                    </div>
                                    <div class="content">
                                        {{ item.content }}
                                    </div>
                                </div>
                                <div class="operate">
                                    <div class="time">{{ getTimeAgo(item.created_at) }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <el-button>关注</el-button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <el-empty v-else></el-empty>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import {
    getNotificationsRequest,
    getUnreadNotificationsRequest,
    readNotificationsRequest,
} from '../../../api/module/notification'
import { getTimeAgo } from '../../../utils'
import { appStore } from '../../../store/module/app'

const store = appStore()

const followList = ref([])
onMounted(async () => {
    console.log('comment')
    const { data } = await getNotificationsRequest({ type: ['follow_user'] })
    console.log(data)
    followList.value = data.notifications
    // 已读当前类型
    if (store.newsNumObj.followNum) {
        let result = await readNotificationsRequest({ type: ['follow_user'] })
        console.log(result, 'result')
        console.log(store.newsNumObj.likeAndCollectNum, 'result')
        if (result.success) {
            const { data } = await getUnreadNotificationsRequest()
            let { byType } = data
            byType = {
                collect_article: Number(byType.collect_article),
                comment_article: Number(byType.comment_article),
                follow_user: Number(byType.follow_user),
                like_article: Number(byType.like_article),
                like_comment: Number(byType.like_comment),
                reply_comment: Number(byType.reply_comment),
            }
            console.log(data, 'data')
            console.log(byType, 'data')
            let obj = {
                total: data.total,
                likeAndCollectNum: byType.like_article + byType.like_comment + byType.collect_article,
                commentNum: byType.reply_comment + byType.comment_article,
                followNum: byType.follow_user,
            }
            store.newsNumObjChange(obj)
        }
    }
})
</script>
<style scoped lang="less">
.news_comment {
    .news_comment_list {
        .item {
            display: flex;
            &:hover {
                background-color: #f7f8fa;
            }
            .item_content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                flex: 1;
                margin-left: 20px;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(228, 230, 235, 0.5);
                .left {
                    display: flex;
                    align-items: center;
                    .left_img {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                    }
                    .right_content {
                        flex: 1;
                        margin-left: 20px;
                        display: flex;
                        flex-direction: column;
                        .title {
                            display: flex;
                            .name {
                                font-size: 16px;
                                font-weight: 500;
                                line-height: 28px;
                                color: #252933;
                            }
                            .content {
                                margin-left: 10px;
                                font-size: 15px;
                                font-weight: 400;
                                line-height: 28px;
                            }
                        }
                        .commentContent {
                            font-size: 16px;
                            font-weight: 400;
                            margin-top: 8px;
                            color: #252933;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                        }
                        .target {
                            margin-top: 8px;
                            font-size: 16px;
                            color: #8a919f;
                            font-weight: 400;
                            line-height: 28px;
                        }
                        .operate {
                            display: flex;
                        }
                    }
                }
                .right {
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>
