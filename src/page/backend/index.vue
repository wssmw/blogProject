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
                        <el-button>关注</el-button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getTagListRequest } from '../../api/module/tags'
const tagsList = ref([])
onMounted(async () => {
    const result = await getTagListRequest()
    console.log(result, 'result')
    tagsList.value = result.data.tags
})
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
        border: 1px solid #e2e2e5;
        display: flex;
        align-items: center;
        margin: 0 20px;
        background-color: white;
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
