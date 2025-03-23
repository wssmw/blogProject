<template>
    <div class="toolbox-container">
        <!-- 左侧菜单 -->
        <div class="menu-sidebar">
            <el-menu ref="menuRef" :default-active="activeSection" class="menu-vertical" @select="scrollToSection">
                <el-menu-item v-for="item in tools" :key="item.key" :index="item.key">
                    <img v-if="item.iconUrl" v-lazy="item.iconUrl" class="menu-icon" />
                    <span>{{ item.category }}</span>
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
                        :key="item.id + item.title"
                        class="dropdown-item"
                        @mousedown="handleItemClick(item.id, searchText)"
                    >
                        <div class="item-title">{{ item.title }}</div>
                        <div class="item-category">{{ item.category }}</div>
                        <div class="item-content">{{ item.content.slice(0, 50) }}...</div>
                    </div>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="content-wrapper">
                <el-card
                    v-for="item in tools"
                    :key="item.key"
                    :id="item.key"
                    ref="sections"
                    class="content-section"
                    shadow="hover"
                >
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.category }}</span>
                        </div>
                    </template>
                    <div class="card-content">
                        <el-card v-for="secItem in item.items" :key="secItem.key" shadow="hover" class="card-item">
                            <template #header>
                                <div class="card-item-header">
                                    <img v-lazy="secItem.iconUrl" class="item-icon" />
                                    <span>{{ secItem.name }}</span>
                                </div>
                            </template>
                            <p class="text item">{{ secItem.description }}</p>
                        </el-card>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchText = ref('')
const activeSection = ref('section1')
const sections = ref([])
const contentContainerRef = ref(null)
const showDropdown = ref(false)
const matchedItems = ref([])
const menuRef = ref(null) // 添加菜单引用

const tools = [
    {
        key: 'design-tools',
        category: '设计工具',
        iconUrl: 'https://img.icons8.com/color/48/000000/design--v1.png', // 设计工具分类图标
        items: [
            {
                key: 'canva',
                name: 'Canva',
                description: '一个简单易用的图形设计工具，适合创建社交媒体图像、演示文稿、海报等。',
                iconUrl: 'https://www.canva.com/favicon.ico',
                website: 'https://www.canva.com/',
            },
            {
                key: 'figma',
                name: 'Figma',
                description: '一款强大的在线设计工具，支持团队协作，适合UI/UX设计。',
                iconUrl: 'https://static.figma.com/app/icon/1/favicon.png',
                website: 'https://www.figma.com/',
            },
        ],
    },
    {
        key: 'dev-tools',
        category: '开发工具',
        iconUrl: 'https://img.icons8.com/color/48/000000/code.png', // 开发工具分类图标
        items: [
            {
                key: 'github',
                name: 'GitHub',
                description: '全球最大的代码托管平台，支持版本控制和协作开发。',
                iconUrl: 'https://github.com/favicon.ico',
                website: 'https://github.com/',
            },
            {
                key: 'codepen',
                name: 'CodePen',
                description: '一个在线代码编辑器，适合前端开发者快速测试和分享代码片段。',
                iconUrl: 'https://codepen.io/favicon.ico',
                website: 'https://codepen.io/',
            },
        ],
    },
    {
        key: 'productivity-tools',
        category: '生产力工具',
        iconUrl: 'https://img.icons8.com/color/48/000000/todo-list.png', // 生产力工具分类图标
        items: [
            {
                key: 'notion',
                name: 'Notion',
                description: '一款集笔记、任务管理、数据库于一体的生产力工具。',
                iconUrl: 'https://www.notion.so/favicon.ico',
                website: 'https://www.notion.so/',
            },
            {
                key: 'trello',
                name: 'Trello',
                description: '一个看板式的任务管理工具，适合团队协作和项目管理。',
                iconUrl: 'https://trello.com/favicon.ico',
                website: 'https://trello.com/',
            },
        ],
    },
    {
        key: 'image-tools',
        category: '图像处理',
        iconUrl: 'https://img.icons8.com/color/48/000000/image.png', // 图像处理分类图标
        items: [
            {
                key: 'unsplash',
                name: 'Unsplash',
                description: '提供高质量免费图片的图库网站，适合用于设计和博客。',
                iconUrl: 'https://unsplash.com/favicon.ico',
                website: 'https://unsplash.com/',
            },
            {
                key: 'remove-bg',
                name: 'Remove.bg',
                description: '一个在线工具，可以快速去除图片背景。',
                iconUrl: 'https://www.remove.bg/favicon.ico',
                website: 'https://www.remove.bg/',
            },
        ],
    },
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
                // 滚动左侧菜单到可视区域
                nextTick(() => {
                    // 使用 menuRef 来获取当前激活的菜单项
                    const activeMenuItem = menuRef.value.$el.querySelector('.el-menu-item.is-active')
                    console.log(activeMenuItem, 'activeMenuItem')
                    if (activeMenuItem) {
                        // 使用 menu-sidebar 作为滚动容器
                        const menuContainer = document.querySelector('.menu-sidebar')
                        const itemTop = activeMenuItem.offsetTop
                        const containerScrollTop = menuContainer.scrollTop
                        const containerHeight = menuContainer.clientHeight

                        // 判断是否需要滚动
                        if (itemTop < containerScrollTop || itemTop > containerScrollTop + containerHeight) {
                            menuContainer.scrollTo({
                                top: itemTop - containerHeight / 2,
                                behavior: 'smooth',
                            })
                        }
                    }
                })
            }
        })
    },
    {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
    },
)

onMounted(() => {
    // 等待 DOM 更新完成
    nextTick(() => {
        sections.value.forEach(section => {
            if (section) {
                const cardElement = section.$el
                if (cardElement) {
                    observer.observe(cardElement)
                }
            }
        })
    })
})

onUnmounted(() => {
    sections.value.forEach(section => {
        if (section) {
            const cardElement = section.$el
            if (cardElement) {
                observer.unobserve(cardElement)
            }
        }
    })
})

// 处理输入
const handleSearchInput = () => {
    // 清除之前的高亮
    const descriptions = document.querySelectorAll('.text.item')
    descriptions.forEach(desc => {
        desc.innerHTML = desc.textContent
    })

    const searchValue = searchText.value.toLowerCase().trim()
    if (!searchValue) {
        matchedItems.value = []
        showDropdown.value = false
        return
    }

    // 搜索匹配项
    matchedItems.value = tools.reduce((acc, category) => {
        const matchedTools = category.items
            .filter(
                tool =>
                    tool.name.toLowerCase().includes(searchValue) ||
                    tool.description.toLowerCase().includes(searchValue),
            )
            .map(tool => ({
                id: category.key, // 用于滚动定位
                title: tool.name,
                content: tool.description,
                category: category.category,
            }))
        return [...acc, ...matchedTools]
    }, [])

    showDropdown.value = true
}

// 处理选项点击
const handleItemClick = (id, searchText) => {
    scrollToSection(id)
    showDropdown.value = false

    // 高亮匹配的文字
    nextTick(() => {
        const card = document.getElementById(id)
        if (card) {
            const text = searchText.toLowerCase()
            const descriptions = card.querySelectorAll('.text.item')

            descriptions.forEach(desc => {
                const content = desc.textContent
                if (content.toLowerCase().includes(text)) {
                    const regex = new RegExp(`(${text})`, 'gi')
                    desc.innerHTML = content.replace(regex, '<span class="highlight">$1</span>')
                }
            })
        }
    })
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
        overflow-y: auto;
        .menu-vertical {
            height: 100%;
            border-right: none;
            .el-menu-item {
                padding: 10px 20px;
                .menu-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }
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

                    .item-category {
                        font-size: 12px;
                        color: #409eff;
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
            padding: 20px;
            .content-section {
                scroll-margin-top: 80px;
                margin-bottom: 20px;
                .section-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    padding-top: 20px;
                }

                .section-content {
                    line-height: 1.6;
                }
                .card-content {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .card-item {
                        margin: 20px;
                        width: 20%;
                        cursor: pointer;
                        .card-item-header {
                            display: flex;
                            align-items: center;
                            .item-icon {
                                width: 20px;
                                height: 20px;
                                margin-right: 10px;
                            }
                            span {
                                font-size: 14px;
                                font-weight: 600;
                            }
                        }
                        .text {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
        }
    }
}
::v-deep .highlight {
    color: red !important;
    padding: 0 2px;
    border-radius: 2px;
}
@media screen and (max-width: 768px) {
    .toolbox-container {
        .menu-sidebar {
            width: 64px;
        }
    }
}

img {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &.loaded {
        opacity: 1;
    }
}

.menu-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.item-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>
