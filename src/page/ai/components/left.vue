<template>
    <el-aside class="sidebar" width="280px">
        <div class="sidebar__header">
            <div class="brand">AI 对话</div>
            <el-button type="primary" size="small" @click="createConversation()">新建对话</el-button>
        </div>
        <div class="sidebar__search">
            <el-input v-model="searchQuery" placeholder="搜索对话..." clearable :prefix-icon="Search" />
        </div>
        <el-scrollbar class="conv-scrollbar">
            <div class="conv-list">
                <div
                    v-for="conv in filteredConversations"
                    :key="conv.id"
                    :class="['conv-item', { active: conv.id === props.activeConversationId }]"
                    @click="selectConversation(conv.id)"
                >
                    <div class="conv-item__content">
                        <div class="conv-item__title" :title="conv.title">{{ conv.title || '新对话' }}</div>
                        <!-- <div class="conv-item__preview" :title="conv.lastMessage">{{
                            conv.lastMessage || '暂无消息'
                        }}</div> -->
                    </div>
                    <el-button
                        class="conv-item__delete"
                        :icon="Delete"
                        text
                        circle
                        size="small"
                        @click.stop="deleteConversation(conv.id)"
                    />
                </div>
            </div>
        </el-scrollbar>
    </el-aside>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Search, Delete } from '@element-plus/icons-vue'

const props = defineProps({
    conversations: {
        type: Array,
        required: true,
    },
    activeConversationId: {
        type: [String, Number],
        default: null,
    },
})

const emit = defineEmits(['select', 'create', 'delete'])

// 局部状态：搜索框只在左侧使用
const searchQuery = ref('')

// 局部计算属性：基于 conversations 和 searchQuery 过滤
const filteredConversations = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return props.conversations
    return props.conversations.filter(
        c => (c.title || '').toLowerCase().includes(q) || (c.lastMessage || '').toLowerCase().includes(q),
    )
})

function selectConversation(id) {
    emit('select', id)
}

function createConversation() {
    emit('create')
}

function deleteConversation(id) {
    emit('delete', id)
}
</script>
<style scoped lang="less">
.sidebar {
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
    border-right: 1px solid var(--el-border-color);
    background: var(--theme-sec-background);
    color: var(--theme-color);
}

.sidebar__header {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
}

.brand {
    font-weight: 700;
    font-size: 16px;
    flex: 1;
    color: var(--theme-color);
}

.sidebar__search {
    margin-bottom: 8px;
}

.conv-scrollbar {
    flex: 1;
    height: 0;
}

.conv-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.conv-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
}

.conv-item:hover {
    background: var(--el-fill-color-light);
}

.conv-item.active {
    background: var(--el-color-primary-light-9);
}

.conv-item__content {
    flex: 1;
    min-width: 0;
    margin-right: 8px;
}

.conv-item__title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--theme-color);
    margin-bottom: 4px;
}

.conv-item__preview {
    font-size: 12px;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--theme-color);
}

.conv-item__delete {
    opacity: 0;
    transition: opacity 0.2s;
}

.conv-item:hover .conv-item__delete {
    opacity: 1;
}
</style>
