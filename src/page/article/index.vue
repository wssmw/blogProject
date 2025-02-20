<template>
    <div class="article">
        <div class="article_content">
            <h1 class="title">{{ data?.title }}</h1>
            <div class="message">
                <div class="author">
                    {{ data?.author_nickname }}
                </div>
                <div class="createTime">
                    {{ transDate(data?.created_at, 'yyyy-MM-dd HH:mm:ss') }}
                </div>
                <div class="view"> 123 </div>
                <div class="category_name"> 分类:{{ data?.category_name }} </div>
            </div>
            <AieContent :html="data?.content"></AieContent>
        </div>
        <comment></comment>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByIdRequest } from '../../api/module/articles'
import AieContent from './components/aieContent.vue'
import comment from './components/comment.vue'
import { transDate } from '../../utils'

const route = useRoute()
let id = computed(() => route.params.id)

let data = ref()
onMounted(async () => {
    console.log(id, 'id')
    const result = await getArticleByIdRequest(id.value)
    console.log(result, 'result')
    data.value = result.data
})
</script>
<style scoped lang="less">
.article {
    width: 760px;
    .article_content {
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
