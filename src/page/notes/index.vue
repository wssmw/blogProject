<template>
    <div class="notes-container">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="left">
                <el-input class="title-input" v-model="editNote.title" clearable placeholder="请输入标题" />
                <el-select class="weather-select" v-model="editNote.weather" placeholder="天气">
                    <el-option v-for="item in weatherList" :key="item.name" :label="item.name" :value="item.name">
                        <div class="flex items-center gap-2">
                            <img style="width: 20px; height: 20px" :src="item.icon" :alt="item.name" />
                            <span class="weather-text">{{ item.name }}</span>
                        </div>
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="editNote.time"
                    type="date"
                    placeholder="选择时间"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
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
                <div class="list-search">
                    <el-input class="search-input" v-model="search" placeholder="搜索" clearable />
                </div>
                <div class="list-content">
                    <div
                        v-for="note in notes"
                        :key="note.id"
                        :class="['note-item', note.id === currentId ? 'active' : '']"
                        @click="clickNote(note.id)"
                    >
                        <div class="note-time">
                            <img style="width: 20px; height: 20px" :src="note.weatherIcon" :alt="note.weather.name" />
                            <span>{{ transDate(note.time, 'yyyy-MM-dd') }}</span>
                            <span>{{ getWeek(note.time) }}</span>
                        </div>
                        <div class="note-title">{{ note.title || '无标题' }}</div>
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
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElButton, ElMessage, ElInput, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { transDate, getWeek } from '@/utils'

// 导入天气图标
import sunnyIcon from '@/assets/svg/晴天.svg'
import cloudyIcon from '@/assets/svg/多云.svg'
import rainyIcon from '@/assets/svg/雨天.svg'
import snowyIcon from '@/assets/svg/阵雪.svg'

const editNote = ref({
    id: null,
    title: '',
    content: '',
    weather: '',
    time: new Date().toISOString().slice(0, 16),
})

const weatherList = ref([
    {
        name: '晴天',
        icon: sunnyIcon,
    },
    {
        name: '多云',
        icon: cloudyIcon,
    },
    {
        name: '雨天',
        icon: rainyIcon,
    },
    {
        name: '雪天',
        icon: snowyIcon,
    },
])

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
        weather: 'sunny',
        time: '2024-05-19',
        weatherIcon: sunnyIcon,
    },
    {
        id: 2,
        title: '小记2',
        content: '小记2内容',
        time: 1716460800000,
        weather: 'cloudy',
        time: '2024-05-20',
        weatherIcon: cloudyIcon,
    },
    {
        id: 3,
        title: '小记3',
        content: '小记3内容',
        time: 1716460800000,
        weather: 'overcast',
        time: '2024-05-21',
        weatherIcon: rainyIcon,
    },
    {
        id: 4,
        title: '小记4',
        content: '小记4内容',
        time: 1716460800000,
        weather: 'rainy',
        time: '2024-05-22',
        weatherIcon: snowyIcon,
    },
    {
        id: 5,
        title: '小记5',
        content: '小记5内容',
        time: 1716460800000,
        weather: 'snowy',
        time: '2024-05-23',
        weatherIcon: snowyIcon,
    },
])

const clickNote = id => {
    currentId.value = id
    const note = notes.value.find(note => note.id === id)
    editNote.value = { ...note }
}

// 监听当前小记变化，更新编辑区

const newNote = () => {
    editNote.value = { id: null, title: '', content: '' }
    currentId.value = null
}

const saveNote = () => {
    if (!editNote.value.content) {
        ElMessage.warning('内容不能为空')
        return
    }
    if (editNote.value.id) {
        notes.value = notes.value.map(note => (note.id === editNote.value.id ? editNote.value : note))
        ElMessage.success('保存成功')
    } else {
        notes.value.unshift({ ...editNote.value, time: Date.now() })
        ElMessage.success('新建成功')
    }
}

const deleteNote = id => {
    notes.value = notes.value.filter(note => note.id !== id)
    ElMessage.success('删除成功')
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
            .title-input {
                width: 200px;
            }
            .weather-select {
                width: 100px;
            }

            .time-picker {
                width: 200px;
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
            padding: 0 1.5rem;
            display: flex;
            flex-direction: column;
            .list-title {
                font-weight: bold;
                margin-bottom: 1rem;
            }
            .list-search {
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
                border: 1px solid #e2e2e5;

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
                    display: flex;
                    align-items: center;
                    font-size: 0.75rem;
                    color: #9ca3af;
                    img {
                        margin-right: 10px;
                    }
                    span {
                        margin-right: 10px;
                    }
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
