<template>
    <el-main class="chat">
        <div class="chat__header">
            <div class="chat__title" contenteditable="true">{{
                activeConversation?.conversation?.title || '新对话'
            }}</div>
        </div>

        <div class="chat_content">
            <el-scrollbar class="chat__messages" ref="messagesContainer" v-if="activeConversation?.messages">
                <div v-if="!activeConversation" class="empty">
                    <el-empty description="从左侧新建或选择一个对话" :image-size="100" />
                </div>
                <template v-else>
                    <div v-for="msg in activeConversation.messages" :key="msg.id" :class="['message', msg.role]">
                        <el-avatar class="message__avatar" :size="32">
                            {{ msg.role === 'user' ? '我' : 'AI' }}
                        </el-avatar>
                        <div class="bubble">
                            <div class="content">{{ msg.content }}</div>
                            <div class="meta">{{ formatTime(msg.created_at) }}</div>
                        </div>
                    </div>
                </template>
            </el-scrollbar>

            <div class="composer" v-if="activeConversation?.messages">
                <el-input
                    v-model="inputTextModel"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    placeholder="输入你的问题，按 Enter 发送，Shift+Enter 换行"
                    @keydown.enter.exact.prevent="() => maybeSend(activeConversation?.conversation?.id)"
                    @keydown.enter.ctrl.exact.prevent="() => handleSend(activeConversation?.conversation?.id)"
                    @keydown.enter.meta.exact.prevent="() => handleSend(activeConversation?.conversation?.id)"
                />
                <div class="composer__actions">
                    <el-button
                        type="primary"
                        @click="handleSend(activeConversation?.conversation?.id)"
                        :disabled="sending || !canSend"
                        :loading="sending"
                    >
                        {{ sending ? '思考中...' : '发送' }}
                    </el-button>
                </div>
            </div>
            <div v-else class="composer_create">
                <h2 class="tip">请问有什么可以帮助你的呢?</h2>
                <div class="composer" style="width: 100%; border-top: none">
                    <el-input
                        v-model="inputTextModel"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 4 }"
                        placeholder="输入你的问题，按 Enter 发送，Shift+Enter 换行"
                        @keydown.enter.exact.prevent="maybeSend"
                        @keydown.enter.ctrl.exact.prevent="handleSend"
                        @keydown.enter.meta.exact.prevent="handleSend"
                    />
                    <div class="composer__actions">
                        <el-button
                            type="primary"
                            @click="handleSend()"
                            :disabled="sending || !canSend"
                            :loading="sending"
                        >
                            {{ sending ? '思考中...' : '发送' }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-main>
</template>
<script setup>
import { computed, nextTick, onMounted, watch, ref } from 'vue'

const { activeConversation, inputText, sending, canSend } = defineProps({
    activeConversation: {
        type: Object,
        default: null,
    },
    inputText: {
        type: String,
        default: '',
    },
    sending: {
        type: Boolean,
        default: false,
    },
    canSend: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:inputText', 'titleEdit', 'clearMessages', 'send'])

// 使用计算属性来处理 v-model
const inputTextModel = computed({
    get: () => inputText,
    set: value => emit('update:inputText', value),
})

function maybeSend(e) {
    // Shift+Enter 换行
    if (e.shiftKey) {
        return
    }
    handleSend()
}

function handleSend(conversationId) {
    emit('send', conversationId)
}

// 局部状态：消息容器的引用
const messagesContainer = ref(null)

// 局部工具函数：格式化时间，只在右侧使用
function formatTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 滚动到底部
function scrollToBottom() {
    if (!messagesContainer.value) return
    const wrap = messagesContainer.value.$el?.querySelector?.('.el-scrollbar__wrap')
    if (wrap) {
        wrap.scrollTop = wrap.scrollHeight
    }
}

// 监听消息变化，自动滚动到底部
watch(
    () => activeConversation?.messages,
    () => {
        nextTick(() => scrollToBottom())
    },
    { deep: true },
)

onMounted(() => {
    nextTick(() => scrollToBottom())
})
</script>
<style scoped lang="less">
.chat {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 0;
    background: var(--theme-sec-background);
    color: var(--theme-color);
}

.chat__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--el-border-color);
}

.chat_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.chat__title {
    font-weight: 600;
    outline: none;
    color: var(--theme-color);
    flex: 1;
}

.chat__messages {
    flex: 1;
    padding: 16px;
}

.empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: flex-start;
}

.message.user {
    flex-direction: row-reverse;
}

.message__avatar {
    flex-shrink: 0;
    background: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
}

.message.user .message__avatar {
    background: var(--el-color-primary);
    color: #fff;
}

.bubble {
    max-width: 70%;
    background: var(--el-fill-color-lighter);
    border: 1px solid var(--el-border-color);
    border-radius: 12px;
    padding: 12px 14px;
    word-wrap: break-word;
    word-break: break-word;
}

.message.user .bubble {
    background: var(--el-color-primary-light-9);
    border-color: var(--el-color-primary-light-7);
}

.content {
    color: var(--theme-color);
    line-height: 1.6;
    white-space: pre-wrap;
}

.meta {
    font-size: 11px;
    opacity: 0.6;
    margin-top: 6px;
    color: var(--theme-color);
}

.composer {
    display: flex;
    gap: 10px;
    padding: 12px 16px;
    border-top: 1px solid var(--el-border-color);
}
.composer_create {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 40%;
    transform: translateY(-50%);
    .tip {
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
    }
}

.composer__actions {
    display: flex;
    align-items: flex-end;
}

@media (max-width: 720px) {
    .bubble {
        max-width: 85%;
    }
}
</style>
