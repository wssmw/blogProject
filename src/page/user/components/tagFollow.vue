<template>
    <div class="tag_follow">
        <div v-if="followTagList.length">
            <template v-for="item in followTagList" :key="item.id">
                <div class="item">
                    <div class="left">
                        <div class="img" v-html="item.svg_icon"></div>
                        <div class="desc">
                            <div class="title">
                                {{ item.name }}
                            </div>
                            <div class="num_time">
                                <div class="num"> 关注数: {{ item.follower_count }} </div>
                                <div class="time"> 关注时间: {{ transDate(item.updated_at) }} </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <el-button @click="unFollowTagHandle(item.id)" type="success"> 取关</el-button>
                    </div>
                </div>
                <el-divider></el-divider>
            </template>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { followTagRequest, getFollowingTagsRequest } from '../../../api/module/follow'
import { useRoute } from 'vue-router'
import { transDate } from '../../../utils'
import { ElMessage } from 'element-plus'

const route = useRoute()
console.log(route, 'route')
const followTagList = ref([])
const id = ref(route.params.id)
onMounted(() => {
    requestHandle()
})
const requestHandle = async () => {
    const { data } = await getFollowingTagsRequest({ userId: id.value })
    followTagList.value = data.tags
}

const unFollowTagHandle = async id => {
    const result = await followTagRequest({ tagId: id })
    if (result.success) {
        ElMessage.success(result.message)
        requestHandle()
    } else {
        ElMessage.error(result.message)
    }
}
</script>
<style scoped lang="less">
.tag_follow {
    .item {
        padding: 20px 20px 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
            .desc {
                margin-left: 20px;
                .title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #2e3135;
                }
                .num_time {
                    margin-top: 2px;
                    display: flex;
                    color: #667182;
                    font-size: 14px;
                    .num {
                        margin-right: 10px;
                    }
                }
            }
        }
        .right {
        }
    }
}
</style>
