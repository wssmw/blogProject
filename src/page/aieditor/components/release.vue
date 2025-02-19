<template>
    <div class="release">
        <el-form label-width="100" label-position="right" size="default">
            <el-form-item label="分类：" required>
                <div>
                    <template v-for="item in categoryList" :key="item.value">
                        <el-check-tag
                            :checked="formData.category.includes(item.value)"
                            class="mx-1"
                            @change="tagChangeHandle(item.value)"
                        >
                            {{ item.lable }}
                        </el-check-tag>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="文章封面：">
                <el-upload class="upload-demo" drag :auto-upload="false" :on-change="fileChangeHandle">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text"> 把文件拖到此处或 <em>点击上传文件</em> </div>
                    <template #tip>
                        <div class="el-upload__tip"> 上传大小不超过5MB 格式为png/jpg/jpeg的文件 </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="添加标签：" required>
                <el-select v-model="formData.tags" multiple placeholder="请选择标签">
                    <template v-for="item in tagsList" :key="item.value">
                        <el-option :value="item.value">{{ item.label }}</el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要：" required>
                <el-input v-model="formData.summary" type="textarea"> </el-input>
            </el-form-item>
            <el-form-item label="文章类型：" required>
                <el-radio-group v-model="formData.type">
                    <el-radio value="1" size="small">原创</el-radio>
                    <el-radio value="2" size="small">转载</el-radio>
                    <el-radio value="3" size="small">翻译</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="w-full text-right">
                <el-button @click="releaseSubmitHandle">发布</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { createArticleRequest } from '../../../api/module/articles'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getTagListRequest } from '../../../api/module/tags'

const prop = defineProps({
    data: {
        type: Object,
    },
})
const router = useRouter()
const tagsList = ref()

const categoryList = [
    {
        lable: '后端',
        value: '1',
    },
    {
        lable: '前端',
        value: '2',
    },
]

const formData = reactive({
    category: '', //分类
    tags: [], //标签
    summary: '', //文章摘要
    type: '1', //文章类型
})

const tagChangeHandle = e => {
    formData.category = e
}

const fileChangeHandle = e => {
    console.log(e)
}

onMounted(async () => {
    const { data } = await getTagListRequest()
    tagsList.value = data.map(item => {
        return {
            label: item.name,
            value: item.id,
        }
    })
})
const releaseSubmitHandle = async () => {
    let params = {
        title: prop.data.title,
        content: prop.data.html,
        tags: formData.tags,
        summary: formData.summary,
        category: formData.category,
    }
    console.log(params)
    const result = await createArticleRequest(params)
    let { success, message } = result
    if (success) {
        ElMessage.success(message)
        router.replace('/')
    } else {
        ElMessage.error(message)
    }
}
</script>
<style scoped lang="less"></style>
