<template>
    <div class="notes-container">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="left">
                <el-input v-model="editNote.title" placeholder="请输入标题" />
                <el-select v-model="editNote.weather" placeholder="天气" class="weather-select">
                    <el-option label="晴天" value="sunny" />
                    <el-option label="多云" value="cloudy" />
                    <el-option label="阴天" value="overcast" />
                    <el-option label="雨天" value="rainy" />
                    <el-option label="雪天" value="snowy" />
                </el-select>
                <el-date-picker
                    v-model="editNote.time"
                    type="datetime"
                    placeholder="选择时间"
                    format="YYYY-MM-DD HH:mm"
                    value-format="YYYY-MM-DD HH:mm"
                    class="time-picker"
                />
            </div>
            <div class="right">
                <el-button type="primary" @click="newNote">新建小记</el-button>
                <el-button type="primary" class="save-btn" @click="saveNote">保存</el-button>
                <el-button type="danger" @click="deleteNote(editNote.id)" :disabled="!editNote.id">删除</el-button>
            </div>
        </div>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 历史小记列表 -->
            <div class="notes-list">
                <div class="list-title">历史小记</div>
                <div class="list-content">
                    <div
                        v-for="note in notes"
                        :key="note.id"
                        :class="['note-item', note.id === currentId ? 'active' : '']"
                        @click="clickNote(note.id)"
                    >
                        <div class="note-title">{{ note.title || '无标题' }}</div>
                        <div class="note-time">{{ formatDate(note.time) }}</div>
                    </div>
                </div>
            </div>
            <!-- 编辑区 -->
            <MdEditor
                v-model="editNote.content"
                :toolbars="toolbars"
                placeholder="在此输入您的小记..."
                class="editor"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElButton, ElMessage, ElInput, ElSelect, ElOption, ElDatePicker } from 'element-plus'

const editNote = ref({
    id: null,
    title: '',
    content: '',
    weather: '',
    time: new Date().toISOString().slice(0, 16),
})

const toolbars = [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'previewOnly',
    'htmlPreview',
    'catalog',
    'github',
]
const currentId = ref(null)
const notes = ref([
    {
        id: 1,
        title: '小记1',
        content: '小记1内容',
        time: 1716460800000,
    },
])

const clickNote = id => {
    currentId.value = id
    const note = notes.value.find(note => note.id === id)
    editNote.value = { ...note }
}

// 监听当前小记变化，更新编辑区
// watch(
//     () => notesStore.currentNote,
//     note => {
//         editNote.value = { ...note }
//     },
//     { immediate: true },
// )

// function newNote() {
//     editNote.value = { id: null, title: '', content: '' }
//     notesStore.currentId = null
// }

// function saveNote() {
//     if (!editNote.value.content) {
//         ElMessage.warning('内容不能为空')
//         return
//     }
//     if (editNote.value.id) {
//         notesStore.updateNote({ ...editNote.value, time: Date.now() })
//         ElMessage.success('保存成功')
//     } else {
//         notesStore.addNote({ ...editNote.value, time: Date.now() })
//         ElMessage.success('新建成功')
//     }
// }

// function deleteNote(id) {
//     notesStore.deleteNote(id)
//     ElMessage.success('删除成功')
// }

function formatDate(ts) {
    if (!ts) return ''
    const d = new Date(ts)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
</script>

<style lang="less" scoped>
.notes-container {
    width: 1260px;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: auto;
    background: white;
    border-radius: 4px;
    margin-top: 20px;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        background-color: white;
        .left {
            display: flex;
            align-items: center;
            gap: 12px;

            .weather-select {
                width: 100px;
            }

            .time-picker {
                width: 180px;
            }
        }
    }

    .main-content {
        flex: 1;
        display: flex;
        overflow: hidden;

        .notes-list {
            width: 20%;
            background-color: white;
            border-right: 1px solid #e5e7eb;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;

            .list-title {
                font-weight: bold;
                margin-bottom: 1rem;
            }

            .list-content {
                flex: 1;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .note-item {
                padding: 0.75rem;
                border-radius: 0.375rem;
                cursor: pointer;
                border: 1px solid transparent;

                &:hover {
                    background-color: #f3f4f6;
                }

                &.active {
                    background-color: #eff6ff;
                    border-color: #60a5fa;
                }

                .note-title {
                    font-weight: 500;
                }

                .note-time {
                    font-size: 0.75rem;
                    color: #9ca3af;
                }
            }
        }

        .editor {
            height: 100%;
            flex: 1;
            border: 1px solid #93c5fd;
            border-radius: 0.375rem;
            background-color: white;
            min-height: 400px;
        }
    }
}
</style>
