<template>
    <el-container class="article mt-5">
        <el-aside class="mx-4" width="60px">
            <ArticleLeft :data="data"></ArticleLeft>
        </el-aside>
        <div class="w-[760px] bg-white rounded-md">
            <div class="article_content">
                <h1 class="title">{{ data.title }}</h1>
                <div class="message">
                    <div class="author">
                        {{ data?.author_nickname }}
                    </div>
                    <div class="createTime">
                        {{ transDate(data.created_at, 'yyyy-MM-dd HH:mm:ss') }}
                    </div>
                    <div class="view"> 123 </div>
                    <div class="category_name"> 分类:{{ data?.category_name }} </div>
                </div>
                <AieContent :html="data.content" @renderCompleted="renderCompleted"></AieContent>
            </div>
            <comment :articleId="id"></comment>
        </div>
        <el-aside class="mx-4" width="260px">
            <ArticleRight v-if="data.user_id" :data="data" :renderCompletedFlag="renderCompletedFlag"></ArticleRight>
        </el-aside>
    </el-container>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByIdRequest } from '../../api/module/articles'
import AieContent from './components/aieContent.vue'
import comment from './components/comment.vue'
import { transDate } from '../../utils'
import ArticleLeft from './components/articleLeft.vue'
import ArticleRight from './components/articleRight.vue'

const route = useRoute()
let id = computed(() => route.params.id)

let data = ref({})
onMounted(async () => {
    console.log(id, 'id')
    const result = await getArticleByIdRequest(id.value)
    data.value = result.data
})
const renderCompletedFlag = ref(false)
const renderCompleted = () => {
    console.log('renderCompleted')
    renderCompletedFlag.value = true
}
</script>
<style scoped lang="less">
.article {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
    .article_content {
        width: 760px;
        background: white;
        border-radius: 6px;
        padding: 20px;
        .title {
            font-size: 36px;
            color: black;
            font-weight: 600;
        }
        .message {
            display: flex;
            font-size: 14px;
            margin: 16px 0;
            padding: 10px;
            background-color: #f6f7f7;
            border-radius: 4px;
            .author {
                color: black;
            }
            .createTime,
            .view,
            .category_name {
                margin: 0 10px;
            }
            .view {
            }
            .category_name {
            }
        }
    }
}
</style>
