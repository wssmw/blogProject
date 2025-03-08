<script setup>
import { ref } from 'vue'
import { createCollectionsRequest, updateUserCollectionsRequest } from '../api/module/collection'
const props = defineProps({})
const emit = defineEmits(['searchHandle'])
const showDialog = ref(false)
const editId = ref('')
const formData = ref({
    name: '',
    description: '',
    isPublic: true,
})
const rules = {
    name: [{ required: true, message: '请填写收藏夹名称', trigger: 'blur' }],
    description: [{ required: true, message: '请填写收藏夹描述', trigger: 'blur' }],
}
const open = (id, data) => {
    if (id) {
        editId.value = id
        formData.value = {
            name: data.name,
            description: data.description,
            isPublic: data.isPublic,
        }
    }
    showDialog.value = true
}
const dialogCloseHandle = () => {
    showDialog.value = false
    resetData()
}
const resetData = () => {
    formData.value = {
        name: '',
        description: '',
        isPublic: true,
    }
}
const formRef = ref()
const submitHandle = async () => {
    console.log(formData.value, 'formData.value')
    await formRef.value.validate(valid => {
        if (!valid) {
            return
        }
    })

    if (!formData.value.name) {
        ElMessage.info('请填写收藏夹名称')
    }
    if (!formData.value.description) {
        ElMessage.info('请填写收藏夹简介')
    }
    let result
    if (editId.value) {
        result = await updateUserCollectionsRequest({
            ...formData.value,
            collectionId: editId.value,
        })
    } else {
        result = await createCollectionsRequest({
            ...formData.value,
        })
    }
    if (result.success) {
        ElMessage.success(result.message)
        emit('searchHandle')
    } else {
        ElMessage.error(result.message)
    }
    showDialog.value = false
    resetData()

    console.log(result, 'results')
}

defineExpose({ open })
</script>
<template>
    <el-dialog v-model="showDialog" title="添加收藏夹" @close="dialogCloseHandle">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="100" label-position="right" size="default">
            <el-form-item label="收藏夹名称:" required prop="name">
                <el-input v-model="formData.name" placeholder="收藏夹名称" maxlength="20" show-word-limit> </el-input>
            </el-form-item>
            <el-form-item label="简介:" required prop="description">
                <el-input
                    v-model="formData.description"
                    type="textarea"
                    placeholder="收藏夹简介"
                    show-word-limit
                    maxlength="200"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="是否公开:" required prop="isPublic">
                <el-radio-group v-model="formData.isPublic">
                    <el-radio :value="true" size="small">是</el-radio>
                    <el-radio :value="false" size="small">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="w-full text-right">
                <el-button @click="submitHandle">{{ editId ? '修改' : '添加' }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<style lang="less" scoped></style>
