<template>
  <div>
    <div v-if="data.length">
      <template v-for="item in data" :key="item.id">
        <div class="cursor-pointer flex justify-between items-center w-full h-[100px] border-b border-solid">
          <div class="flex flex-1 flex-col justify-between h-[78px] overflow-hidden">
            <div class="text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">{{ item.title }}</div>
            <div class="text-ellipsis overflow-hidden whitespace-nowrap">{{ item.description }}</div>
            <div class="flex justify-between">
              <div class="flex items-center">
                <div class="max-w-[132px] text-nowrap text-ellipsis overflow-hidden mr-1">{{ item.author }}</div>
                <el-divider direction="vertical"></el-divider>
                <div class="mx-2">查看{{ item.viewTimes }}</div>
                <div class="mx-2">评论{{ item.commentTimes }}</div>
                <div class="mx-2">赞{{ item.likeTimes }}</div>
              </div>
              <div class="flex">
                <template v-for="(secItem,secIndex) in item.groupingName.length>3?item.groupingName.slice(0,3):item.groupingName" :key="secItem">
                  <el-tag class="mx-1" :type="tagType[secIndex]">{{ secItem }}</el-tag>
                </template>
              </div>
            </div>
          </div>
          <div class="w-[108px] h-[78px] ml-4" v-if="item.picture">
          <img class="w-[108px] h-[72px]" :src="item.picture" alt="" />
        </div>
      </div>
      </template>
    </div>
    <el-skeleton v-else :rows="5" animated />
  </div>
</template>
<script setup>
import { ref } from 'vue';

let data = ref([])
let tagType = ref(['primary','success','warning'])
setTimeout(()=>{
  data.value = [
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description:
      '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    picture:
      'https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7268c845f16d49dc9cae266e741aa8bd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR55qEdXNlcm5hbWU=:q75.awebp?rk3s=f64ab15b&x-expires=1730290888&x-signature=QOFM8s3e0kcvsajOxzwge7BU078%3D',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描222222222222222222222222超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试222222222222述', // 描述
    author: 'wss',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
  {
    id: 'wss_1',
    title: '我是一个标题', //标题
    content: '我是主要内容', // 内容
    description: '我是主要内容描述', // 描述
    author: 'wss',
    picture:
      'https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7268c845f16d49dc9cae266e741aa8bd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR55qEdXNlcm5hbWU=:q75.awebp?rk3s=f64ab15b&x-expires=1730290888&x-signature=QOFM8s3e0kcvsajOxzwge7BU078%3D',
    commentTimes: '2', //评论
    likeTimes: '1', // 赞的数量
    groupingName: ['前端', '后端'], // 分类
    viewTimes: '3', //查看数量
  },
]
},1000)
</script>
<style scoped lang="less"></style>
