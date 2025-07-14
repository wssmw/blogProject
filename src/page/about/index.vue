<template>
    <div class="about">
        <h1 class="about_title">关于本站</h1>
        <div class="title"> 本站简介 </div>
        <p>本站是一个专注于技术分享和个人成长的博客平台，旨在为用户提供高质量的技术文章和实用教程。</p>
        <el-descriptions class="descriptions" title="作者介绍" :column="2" :size="size" border>
            <el-descriptions-item label="作者姓名"> 王某人 </el-descriptions-item>
            <el-descriptions-item label="作者简介"> 暂无 </el-descriptions-item>
            <el-descriptions-item label="作者联系方式"> 暂无 </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="descriptions" title="技术栈" :column="3" :size="size" border>
            <el-descriptions-item :label="item.name" v-for="item in dependenciesList" :key="item.version">
                {{ item.version }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="title"> 开发历程 </div>
        <el-scrollbar height="600px">
            <el-timeline style="max-width: 300px" class="timeline">
                <el-timeline-item v-for="(item, index) in commitList" :key="index" :timestamp="item.timestamp">
                    <div class="commit-card">
                        <!-- 作者信息 -->
                        <div class="commit-author">
                            <!-- <img :src="item.commit.author. avatar_url" alt="作者头像" class="avatar" /> -->
                            <div class="author-info">
                                <span class="author-name">{{ item.commit.author.name }}</span>
                                <span class="commit-date">{{ transDate(item.commit.author.date) }}</span>
                            </div>
                        </div>
                        <!-- 提交信息 -->
                        <div class="commit-message">
                            {{ item.commit.message }}
                        </div>
                        <!-- 提交详情链接 -->
                        <a :href="item.html_url" target="_blank" class="commit-link"> 查看详情 </a>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </el-scrollbar>
        <el-descriptions class="descriptions" title="友情链接" :column="2" :size="size" border>
            <el-descriptions-item v-for="item in friendList" :key="item.name">
                <template #label>
                    <div class="cell-item">
                        <img v-if="item.icon" class="w-[16px] h-[16px] inline-block mr-2" :src="item.icon" alt="" />
                        {{ item.name }}
                    </div>
                </template>
                <a class="text-sky-300" :href="item.url">{{ item.url }}</a>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCommitMessageGitee } from '../../api/module/login'
import { transDate } from '../../utils'
import { dependencies, devDependencies } from '../../../package.json'
console.log(dependencies, 'dependencies')
let dependenciesList = Object.keys(Object.assign(dependencies, devDependencies)).map(key => {
    return {
        name: key,
        version: dependencies[key],
    }
})
let friendList = [
    { name: 'Node.js', url: 'https://nodejs.org/en/' },
    { name: 'Gitee', url: 'https://gitee.com', icon: 'https://gitee.com/favicon.ico' },
    { name: 'GitHub', url: 'https://github.com', icon: '' },
    { name: 'Vue 官方文档', url: 'https://vuejs.org', icon: 'https://vuejs.org/images/logo.png' },
]
const commitList = ref([])
onMounted(async () => {
    const { data } = await getCommitMessageGitee()
    commitList.value = data.commits
})
</script>

<style scoped lang="less">
.about {
    width: 848px;
    padding: 20px;
    margin: auto;
    background: var(--theme-sec-background);
    border-radius: 4px;
    margin-top: 20px;
    .about_title {
        font-size: 30px;
        font-weight: 700;
        line-height: 46px;
        color: var(--theme-color);
        text-align: center;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
        color: var(--theme-color);
        margin-top: 10px;
    }
    .descriptions {
        margin-top: 10px;
    }
    .timeline {
        margin-top: 20px;
        .commit-card {
            background: var(--theme-sec-background);
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 16px;
            margin-bottom: 16px;
            transition: box-shadow 0.3s ease;
        }

        .commit-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .commit-author {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 12px;
        }

        .author-info {
            display: flex;
            flex-direction: column;
        }

        .author-name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }

        .commit-date {
            font-size: 12px;
            color: #666;
        }

        .commit-message {
            font-size: 14px;
            color: #444;
            margin-bottom: 12px;
        }

        .commit-link {
            display: inline-block;
            font-size: 12px;
            color: #1890ff;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .commit-link:hover {
            color: #40a9ff;
        }
    }
}
</style>
