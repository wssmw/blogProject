<script setup>
import { ref } from 'vue'
const props = defineProps({
    content: {
        type: String,
    },
})
const emit = defineEmits(['confirmHandle'])

const showDialog = ref(false)

const open = () => {
    showDialog.value = true
}

const confirmHandle = () => {
    emit('confirmHandle')
    showDialog.value = false
}

defineExpose({ open })
</script>
<template>
    <el-dialog v-model="showDialog" title="操作提示" width="400">
        <div class="flex items-center">
            <el-icon size="25" color="#e6a23c"><InfoFilled /></el-icon>
            <span class="ml-3">
                {{ content }}
            </span>
        </div>
        <div class="w-full text-right">
            <el-button @click="confirmHandle">确认</el-button>
        </div>
    </el-dialog>
</template>
<style lang="less" scoped></style>
