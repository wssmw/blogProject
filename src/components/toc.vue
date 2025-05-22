<template>
    <div class="toc_content">
        <div class="title"> 目录 </div>
        <el-divider></el-divider>
        <el-scrollbar ref="tocScrollbar" height="300px">
            <li
                v-for="item in tocItems"
                :key="item.id"
                :class="['toc-item', { active: item.id === activeSection }, `offset-${item.level}`]"
                @click.prevent="scrollToSection(item.id)"
            >
                <a :href="`#${item.id}`">{{ item.text }}</a>
            </li>
        </el-scrollbar>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { appStore } from '../store/module/app'
import { debounce } from 'lodash-es'
const store = appStore()
const aieContentRef = ref(document.querySelector('.md-editor-preview'))
console.log(aieContentRef, 'aieContentRef')
console.log(document.querySelector('.md-editor-preview'), '这里执行')
const tocItems = ref([])
const activeSection = ref('')
const headings = ref([])
const allowScrollUpdate = ref(true)
const tocScrollbar = ref(null)
const generateTOC = () => {
    console.log('这里执行', aieContentRef.value)
    if (aieContentRef.value) {
        headings.value = aieContentRef.value.querySelectorAll('h1, h2, h3, h4, h5')
        activeSection.value = headings.value[0]?.id || ''
        let arr = []
        let previousLevel = 0 // 记录上一个标题的 level
        headings.value.forEach(heading => {
            // 获取当前标题的层级
            const currentLevel = parseInt(heading.tagName.substring(1))
            // 计算当前标题的 level
            if (currentLevel > previousLevel) {
                // 如果当前层级比上一个高，level 增加 1
                arr.push({
                    id: heading.id,
                    text: heading.textContent,
                    level: arr.length === 0 ? 0 : arr[arr.length - 1].level + 1,
                })
            } else if (currentLevel < previousLevel) {
                // 如果当前层级比上一个低，level 减少到当前层级减 1
                arr.push({
                    id: heading.id,
                    text: heading.textContent,
                    level: currentLevel - 1,
                })
            } else {
                // 如果当前层级与上一个相同，level 保持不变
                arr.push({
                    id: heading.id,
                    text: heading.textContent,
                    level: arr.length === 0 ? 0 : arr[arr.length - 1].level,
                })
            }

            // 更新上一个标题的层级
            previousLevel = currentLevel
        })
        tocItems.value = arr
        console.log(tocItems.value, 'tocItems')
    }
}
// 监听滚动，高亮当前章节
const handleScroll = debounce(() => {
    if (!allowScrollUpdate.value) return // 如果不允许更新，直接返回

    let currentSection = ''
    headings.value.forEach(heading => {
        const rect = heading.getBoundingClientRect()
        if ((store.windowScrollY < 400 && rect.top <= 60) || (store.windowScrollY > 400 && rect.top <= 20)) {
            currentSection = heading.id
        }
    })

    activeSection.value = currentSection
}, 20)

nextTick(() => {
    console.log(activeSection.value, 'activeSection')
})

watch(activeSection, async () => {
    await nextTick()
    const activeToc = document.querySelector('.toc-item.active')
    const scrollbarWrap = tocScrollbar.value?.wrapRef // el-scrollbar 的滚动容器

    if (activeToc && scrollbarWrap) {
        const container = scrollbarWrap
        const containerHeight = container.clientHeight
        const itemOffsetTop = activeToc.offsetTop
        const itemHeight = activeToc.offsetHeight

        // 让高亮项尽量居中
        let scrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2

        // 边界处理
        if (scrollTop < 0) scrollTop = 0
        const maxScroll = container.scrollHeight - containerHeight
        if (scrollTop > maxScroll) scrollTop = maxScroll

        container.scrollTo({
            top: scrollTop,
            behavior: 'smooth',
        })
    }
})

// 添加滚动处理函数
const scrollToSection = id => {
    const element = document.getElementById(id)
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offset = elementPosition > 400 ? 0 : 60

        // 禁止滚动更新
        allowScrollUpdate.value = false
        // 设置当前活动章节
        activeSection.value = id

        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
        })

        // 等待滚动动画完成后恢复滚动更新
        setTimeout(() => {
            allowScrollUpdate.value = true
        }, 1000) // 假设滚动动画持续 1 秒
    }
}

onMounted(() => {
    setTimeout(() => {
        generateTOC()
    }, 0)
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped lang="less">
.toc_content {
    .title {
        font-size: 16px;
    }
    .toc-item {
        padding: 10px;
        &:hover {
            color: #1171ee;
        }
    }
    .active {
        color: #1171ee;
    }
    .offset-1 {
        margin-left: 10px;
    }
    .offset-2 {
        margin-left: 20px;
    }
    .offset-3 {
        margin-left: 30px;
    }
    .offset-4 {
        margin-left: 40px;
    }
    .offset-5 {
        margin-left: 50px;
    }
    .offset-6 {
        margin-left: 60px;
    }
}
</style>
