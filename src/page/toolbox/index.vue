<template>
    <div class="toolbox-container">
        <!-- 左侧菜单 -->
        <div class="menu-sidebar">
            <el-menu :default-active="activeSection" class="menu-vertical" @select="scrollToSection">
                <el-menu-item v-for="item in menuItems" :key="item.id" :index="item.id">
                    <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </el-menu>
        </div>

        <!-- 右侧内容区 -->
        <div class="content-container" ref="contentContainerRef">
            <!-- 搜索框 -->
            <div class="search-box">
                <el-input
                    v-model="searchText"
                    placeholder="搜索工具..."
                    @input="handleSearchInput"
                    @blur="hideDropdownDelayed"
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
                <!-- 搜索下拉框 -->
                <div v-show="showDropdown && matchedItems.length > 0" class="search-dropdown">
                    <div
                        v-for="item in matchedItems"
                        :key="item.id"
                        class="dropdown-item"
                        @mousedown="handleItemClick(item.id)"
                    >
                        <div class="item-title">{{ item.title }}</div>
                        <div class="item-content">{{ item.content.slice(0, 50) }}...</div>
                    </div>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="content-wrapper">
                <section v-for="item in menuItems" :key="item.id" :id="item.id" ref="sections" class="content-section">
                    <h2 class="section-title">{{ item.title }}</h2>
                    <div class="section-content">
                        {{ item.content }}
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchText = ref('')
const activeSection = ref('section1')
const sections = ref([])
const contentContainerRef = ref(null)
const showDropdown = ref(false)
const matchedItems = ref([])

const menuItems = [
    {
        id: 'section1',
        title: '工具分类1',
        icon: 'Tools',
        content: '这里是工具分类1的内容...',
    },
    {
        id: 'section2',
        title: '工具分类2',
        icon: 'Setting',
        content: '这里是工具分类2的内容...',
    },
    {
        id: 'section3',
        title: '工具分类3',
        icon: 'Setting',
        content: '这里是工具分类3的内容...',
    },
    {
        id: 'section4',
        title: '工具分类4',
        icon: 'Setting',
        content: '这里是工具分类4的内容...',
    },
    {
        id: 'section5',
        title: '工具分类5',
        icon: 'Setting',
        content: '这里是工具分类5的内容...',
    },
    {
        id: 'section6',
        title: '工具分类6',
        icon: 'Setting',
        content: '这里是工具分类6的内容...',
    },
    // 添加更多工具分类...
]

// 滚动到指定区域
const scrollToSection = id => {
    const element = document.getElementById(id)
    const container = contentContainerRef.value
    if (element && container) {
        const headerOffset = 132
        const containerScrollTop = container.scrollTop
        const elementTop = element.offsetTop
        console.log(elementTop - headerOffset - 20)
        console.log(element.offsetTop)
        console.log(container)
        container.scrollTo({
            top: elementTop - headerOffset,
            behavior: 'smooth',
        })
    }
}

// 监听滚动，更新当前激活的菜单项
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id
            }
        })
    },
    {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
    },
)

onMounted(() => {
    // 初始化观察器
    sections.value.forEach(section => {
        if (section) {
            observer.observe(section)
        }
    })
})

onUnmounted(() => {
    // 清理观察器
    sections.value.forEach(section => {
        if (section) {
            observer.unobserve(section)
        }
    })
})

// 处理输入
const handleSearchInput = () => {
    const searchValue = searchText.value.toLowerCase().trim()
    if (!searchValue) {
        matchedItems.value = []
        showDropdown.value = false
        return
    }

    // 搜索匹配项
    matchedItems.value = menuItems.filter(
        item => item.title.toLowerCase().includes(searchValue) || item.content.toLowerCase().includes(searchValue),
    )
    showDropdown.value = true
}

// 处理选项点击
const handleItemClick = id => {
    scrollToSection(id)
    showDropdown.value = false
}

// 延迟隐藏下拉框（防止点击事件被打断）
const hideDropdownDelayed = () => {
    setTimeout(() => {
        showDropdown.value = false
    }, 200)
}
</script>

<style scoped lang="less">
.toolbox-container {
    display: flex;
    height: calc(100vh - 60px);
    width: 1260px;
    background-color: #fff;
    .menu-sidebar {
        width: 200px;
        height: 100%;
        border-right: 1px solid #e6e6e6;
        position: sticky;
        top: 0;

        .menu-vertical {
            height: 100%;
            border-right: none;
        }
    }

    .content-container {
        flex: 1;
        overflow-y: auto;

        .search-box {
            position: sticky;
            top: 0;
            padding: 20px;
            background-color: #fff;
            z-index: 1;
            border-bottom: 1px solid #e6e6e6;

            // 添加下拉框样式
            .search-dropdown {
                position: absolute;
                top: 100%;
                left: 20px;
                right: 20px;
                background: white;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                max-height: 300px;
                overflow-y: auto;
                z-index: 2;

                .dropdown-item {
                    padding: 10px 15px;
                    cursor: pointer;

                    &:hover {
                        background-color: #f5f7fa;
                    }

                    .item-title {
                        font-weight: bold;
                        margin-bottom: 4px;
                    }

                    .item-content {
                        font-size: 13px;
                        color: #666;
                    }
                }
            }
        }

        .content-wrapper {
            padding: 0 20px;
            .content-section {
                scroll-margin-top: 80px;
                margin-bottom: 100vh;

                .section-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    padding-top: 20px;
                }

                .section-content {
                    line-height: 1.6;
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .toolbox-container {
        .menu-sidebar {
            width: 64px;
        }
    }
}
</style>
