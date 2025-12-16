<template>
    <div class="tags">
        <template v-for="item in tagsList" :key="item.div">
            <div class="item">
                <div class="svg" v-html="item.svg_icon"></div>
                <div class="desc">
                    <div class="top">
                        <div class="name">{{ item.name }}</div>
                        <div class="hot">
                            <img class="img" src="@/assets/svg/hot_fill.svg" alt="" />
                            <div class="num">{{ item.hot_score }}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <el-button @click="followTagHandle(item)" v-if="!item.has_followed">关注</el-button>
                        <el-button @click="followTagHandle(item)" type="success" v-else>取关</el-button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getTagListRequest } from '../../api/module/tags'
import { followTagRequest } from '../../api/module/follow'
import { useLogin } from '@/hooks/useLogin'

const tagsList = ref([])
onMounted(() => {
    requestHandle()
})
const requestHandle = async () => {
    const result = await getTagListRequest()
    tagsList.value = result.data.tags
    console.log(result, 'result')
}

// 使用登录hooks
const { withLogin } = useLogin()

const followTagHandle = async data => {
    console.log(data)
    withLogin(async () => {
        const result = await followTagRequest({ tagId: data.id })
        if (result.success) {
            requestHandle()
            ElMessage.success(result.message)
        } else {
            ElMessage.error(result.message)
        }
    })
}
</script>
<style scoped lang="less">
.tags {
    display: flex;
    margin: 20px;
    width: 1260px;
    justify-content: flex-start;
    .item {
        padding: 20px;
        border-radius: 6px;
        border: 1px solid var(--theme-border-color);
        display: flex;
        align-items: center;
        margin: 0 20px;
        background-color: var(--theme-sec-background);
        .svg {
            width: 48px;
            height: 48px;
        }
        .desc {
            margin-left: 40px;
            .top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                .name {
                    font-size: 16px;
                    font-weight: 500;
                }
                .hot {
                    display: flex;
                    align-items: center;

                    .img {
                        width: 16px;
                        height: 16px;
                        margin: 0 2px;
                    }
                }
            }
        }
    }
}
</style>
