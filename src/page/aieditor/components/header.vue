<template>
    <div class="header">
        <el-input
            v-model="articleTitle"
            show-word-limit
            placeholder="请输入文章标题"
            maxlength="120"
            size="large"
            :suffix-icon="EditPen"
        >
        </el-input>
        <el-button class="drafts"> 草稿箱 </el-button>
        <el-button class="release" @click="releaseHandle"> 发布 </el-button>
        <div class="w-[50px]">
            <el-avatar :size="40">
                <el-icon><UserFilled /></el-icon>
            </el-avatar>
        </div>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const props = defineProps(['content'])
const emit = defineEmits(['releaseHandle'])

const articleTitle = ref()
const releaseHandle = () => {
    console.log(props.content)
    if (!articleTitle.value) {
        ElMessage('请输入标题')
    } else {
        emit('releaseHandle', articleTitle.value)
    }
}
</script>
<style scoped lang="less">
.header {
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: white;
    border-radius: 4px;
    .drafts {
        margin: 0 10px;
    }
    .release {
        margin-right: 20px;
    }
}
</style>
