<template>
    <!-- <div v-html="htmlString" class="aie-content"></div> -->
    <MdPreview :modelValue="htmlString" />
    <!-- <MdCatalog :scrollElement="scrollElement" /> -->
</template>
<script setup>
import { computed } from 'vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'
const prop = defineProps({
    html: {
        type: String,
        default: '',
    },
})
const addIdsToHeadings = (html, tagName) => {
    let idCounter = 1
    let regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g')
    return html.replace(regex, (fullMatch, content) => {
        return `<${tagName} id="${tagName}-${idCounter++}">${content}</${tagName}>`
    })
}
const htmlString = computed(() => {
    // 使用正则表达式匹配所有的 <h1> 标签
    // 使用一个函数作为 replace 的第二个参数来动态生成新的 <h1> 标签
    let htmlString = prop.html
    for (let i = 1; i <= 5; i++) {
        htmlString = addIdsToHeadings(htmlString, `h${i}`)
    }
    console.log(htmlString)
    return htmlString
})
</script>
<style scoped lang="less"></style>
