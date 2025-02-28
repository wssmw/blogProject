<template>
    <div class="about">
        <el-scrollbar height="400px">
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
        <h1>关于我们</h1>
        <div class="intro-section">
            <h2>博客简介</h2>
            <p>本博客创建于2020年，初衷是分享技术知识和生活感悟，目标是建立一个开放、互动、有价值的社区。</p>
            <p>博客的主题涵盖技术教程、生活感悟、书评、影评等，帮助读者快速找到他们感兴趣的内容。</p>
        </div>
        <div class="author-section">
            <h2>作者介绍</h2>
            <p>博客由一群热爱技术和写作的开发者共同维护，我们的专业领域包括前端开发、后端开发、数据科学等。</p>
            <p
                >您可以通过以下社交媒体链接与我们互动：<a href="https://twitter.com/example">Twitter</a>,
                <a href="https://linkedin.com/in/example">LinkedIn</a>。</p
            >
        </div>
        <div class="mission-section">
            <h2>博客使命</h2>
            <p>我们的使命是通过优质内容教育、启发和娱乐读者，解决他们在技术和生活中遇到的问题。</p>
        </div>
        <div class="categories-section">
            <h2>内容分类</h2>
            <p>博客的主要内容分类包括：技术教程、生活感悟、书评、影评等。</p>
        </div>
        <div class="feedback-section">
            <h2>读者反馈</h2>
            <p>我们非常重视读者的反馈和建议，您可以通过<a href="/contact">联系我们</a>页面提交您的意见。</p>
        </div>
        <div class="community-section">
            <h2>加入社区</h2>
            <p>邀请您加入我们的社区，通过邮件订阅或关注我们的社交媒体账号，获取最新文章和参与讨论。</p>
        </div>
        <div class="partners-section">
            <h2>合作伙伴</h2>
            <p>我们与多家技术公司和教育机构合作，提供高质量的内容和资源。</p>
        </div>
        <div class="privacy-section">
            <h2>隐私政策</h2>
            <p
                >请阅读我们的<a href="/privacy">隐私政策</a>和<a href="/terms">使用条款</a
                >，了解我们如何处理用户数据。</p
            >
        </div>
        <div class="contact-section">
            <h2>联系方式</h2>
            <p>如有商务合作或其他咨询，请通过<a href="mailto:contact@example.com">contact@example.com</a>联系我们。</p>
        </div>
        <div class="history-section">
            <h2>博客历史</h2>
            <p>博客自2020年创建以来，已经发布了超过500篇文章，吸引了来自全球的读者。</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCommitMessageGitee } from '../../api/module/login'
import { transDate } from '../../utils'

const commitList = ref([])
onMounted(async () => {
    const { data } = await getCommitMessageGitee()
    commitList.value = data.commits
})
</script>

<style scoped lang="less">
.timeline {
    margin-top: 20px;
    .commit-card {
        background-color: #fff;
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

.about {
    padding: 20px;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.about h1 {
    color: #333;
}

.about h2 {
    color: #444;
    margin-top: 30px;
}

.about p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
}

.intro-section,
.author-section,
.mission-section,
.categories-section,
.feedback-section,
.community-section,
.partners-section,
.privacy-section,
.contact-section,
.history-section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
