<template>
    <div class="toolbox">
        <ul class="menu">
            <li
                class="menu-item"
                v-for="item in menuItems"
                :key="item.id"
                :class="{ active: activeSection === item.id }"
            >
                <a :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
                    {{ item.text }}
                </a>
            </li>
        </ul>
        <div class="content">
            <div class="search">
                <el-input style="position: fixed"></el-input>
            </div>
            <div class="content_inner">
                <section v-for="item in menuItems" :key="item.id" :id="item.id" ref="sections">
                    <h2>{{ item.text }}</h2>
                    <p>{{ item.content }}</p>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const menuItems = [
    { id: 'section1', text: 'Section 1', content: 'Content for section 1...' },
    { id: 'section2', text: 'Section 2', content: 'Content for section 2...' },
    { id: 'section3', text: 'Section 3', content: 'Content for section 3...' },
]
const activeSection = ref(menuItems[0].id) // 默认高亮第一个菜单项
const sections = ref([]) // 用于存储内容区域的 DOM 元素

// 监听滚动，更新高亮菜单项
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id
            }
        })
    },
    {
        rootMargin: '0px',
        threshold: 0.5, // 当内容区域进入视口 50% 时触发
    },
)

// 初始化 IntersectionObserver
onMounted(() => {
    sections.value.forEach(section => {
        observer.observe(section)
    })
})

// 清理 IntersectionObserver
onUnmounted(() => {
    sections.value.forEach(section => {
        observer.unobserve(section)
    })
})

// 点击菜单项时滚动到对应内容区域
const scrollToSection = id => {
    const section = document.getElementById(id)
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>
<style scoped lang="less">
.toolbox {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    display: flex;
    .menu {
        width: 200px;
        position: sticky;
        top: 0px;
        height: calc(100vh - 60px);
        overflow-y: auto;
        .menu-item {
            margin: 10px 0;
            a {
                text-decoration: none;
                color: #333;
            }
        }
    }

    .content {
        flex: 1;
        padding: 20px;
        .content_inner {
            margin-top: 40px;
        }
    }

    section {
        margin-bottom: 100vh;
    }
}
</style>
