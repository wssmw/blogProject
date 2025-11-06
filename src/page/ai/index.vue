<template>
    <div class="ai-page">
        <Left
            :conversations="conversations"
            :active-conversation-id="activeConversationId"
            @select="selectConversation"
            @create="createConversation"
            @delete="deleteConversation"
        />
        <Right
            :active-conversation="activeConversation"
            v-model:input-text="inputText"
            :sending="sending"
            :can-send="canSend"
            @title-edit="onTitleEdit"
            @send="handleSend"
        />
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import Left from './components/left.vue'
import Right from './components/right.vue'
import {
    createConversationRequest,
    getConversationListRequest,
    deleteConversationRequest,
    getConversationMessagesRequest,
    sendMessageRequest,
} from '../../api/module/ai'

// 共享状态：左侧列表和右侧聊天都需要这些数据
const conversations = ref([])
const activeConversationId = ref(conversations.value[0]?.id || null)
const inputText = ref('')
const sending = ref(false)

const activeConversation = ref(null)

const canSend = computed(() => inputText.value.trim().length > 0 && !sending.value)

onMounted(async () => {
    getConversationList()
})

const getConversationList = async () => {
    const res = await getConversationListRequest()
    conversations.value = res.data.conversations
    console.log(conversations)
}

async function selectConversation(id) {
    activeConversationId.value = id
    const res = await getConversationMessagesRequest({ id })
    activeConversation.value = res.data
    console.log(activeConversation)
}

function createConversation() {
    // conversations.value.unshift({
    //     title: '',
    //     id: '',
    // })
    activeConversation.value = {}
    activeConversationId.value = ''
}

async function deleteConversation(conversationId) {
    const res = await deleteConversationRequest({ conversationId })
    console.log(res)
    if (res.code === 200) {
        getConversationList()
        if (conversationId === activeConversationId.value) {
            activeConversation.value = null
            activeConversationId.value = ''
        }
    }
}

// 获取当前对话对象（从 conversations 数组中查找）
function getActiveConversation() {
    return conversations.value.find(c => c.id === activeConversationId.value) || null
}

function onTitleEdit(e) {
    const conv = getActiveConversation()
    if (!conv) return
    const text = (e.target?.innerText || '').trim()
    conv.title = text || '新对话'
}

async function handleSend(conversationId) {
    console.log(conversationId, 'conversationId')
    const text = inputText.value.trim()
    sending.value = true
    if (!text) return
    if (conversationId) {
        const res = await sendMessageRequest({ message: text, id: conversationId })
        let { assistantMessage, userMessage, id } = res.data
        let { content, created_at, role } = assistantMessage
        console.log('res', activeConversation)
        activeConversation.value.messages.push({
            content: userMessage.content,
            created_at: userMessage.created_at,
            role: userMessage.role,
            id: userMessage.id,
        })
        activeConversation.value.messages.push({
            content,
            created_at,
            role,
            id,
        })
        console.log('res', res)
        console.log('res', activeConversation)
    } else {
        const res = await createConversationRequest({ message: text })
        console.log(res)
        getConversationList()
        activeConversationId.value = res.data.conversation.id
        selectConversation(res.data.conversation.id)
    }
    inputText.value = ''
    sending.value = false
}
</script>
<style scoped lang="less">
.ai-page {
    width: 1260px;
    height: calc(100vh - 60px);
    display: flex;
    background: var(--theme-sec-background);
    color: var(--theme-color);
}
</style>
