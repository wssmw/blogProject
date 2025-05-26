<template>
    <div class="notes-container">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="left">
                <el-input class="title-input" v-model="editNote.title" clearable placeholder="请输入标题" />
                <el-select class="weather-select" v-model="editNote.weather" placeholder="天气">
                    <template #prefix>
                        <img
                            v-if="editNote.weather"
                            style="width: 20px; height: 20px; margin-right: 8px"
                            :src="weatherList.find(item => item.value === editNote.weather)?.icon"
                            :alt="weatherList.find(item => item.value === editNote.weather)?.name"
                        />
                    </template>
                    <el-option v-for="item in weatherList" :key="item.name" :label="item.name" :value="item.value">
                        <div class="flex items-center gap-2">
                            <img style="width: 20px; height: 20px" :src="item.icon" :alt="item.name" />
                            <span class="weather-text">{{ item.name }}</span>
                        </div>
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="editNote.note_time"
                    type="date"
                    placeholder="选择时间"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    class="time-picker"
                />
            </div>
            <div class="right">
                <el-button type="primary" @click="newNote">新建小记</el-button>
                <el-button type="primary" @click="queryNoteList">刷新</el-button>
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
                            <span>{{ transDate(note.note_time, 'yyyy-MM-dd') }}</span>
                            <span>{{ getWeek(note.note_time) }}</span>
                        </div>
                        <div class="note-title">{{ note.title || '无标题' }}</div>
                    </div>
                    <!-- 加载提示 -->
                    <div v-if="loading" class="loading">加载中...</div>
                    <div v-if="noMoreData" class="no-more">没有更多数据了</div>
                    <div ref="observerTarget" class="observer-target"></div>
                </div>
            </div>
            <!-- 编辑区 -->
            <MdEditor v-model="editNote.content" placeholder="在此输入您的小记..." class="editor" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElButton, ElMessage, ElInput, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { transDate, getWeek } from '@/utils'
import { addNoteRequest, getNoteListRequest, deleteNoteRequest, updateNoteRequest } from '@/api/module/notes'

// 导入天气图标
import sunnyIcon from '@/assets/svg/晴天.svg'
import cloudyIcon from '@/assets/svg/多云.svg'
import rainyIcon from '@/assets/svg/雨天.svg'
import snowyIcon from '@/assets/svg/阵雪.svg'

const editNote = ref({})

const weatherList = ref([
    {
        name: '晴天',
        value: '1',
        icon: sunnyIcon,
    },
    {
        name: '多云',
        value: '2',
        icon: cloudyIcon,
    },
    {
        name: '雨天',
        value: '3',
        icon: rainyIcon,
    },
    {
        name: '雪天',
        value: '4',
        icon: snowyIcon,
    },
])
const currentId = ref(null)

const notes = ref([])

// 常量定义
const PAGE_SIZE = 10
const OBSERVER_OPTIONS = {
    root: null,
    rootMargin: '200px', // 增加触发区域
    threshold: 0.1,
}

let observer
let debounceTimer = null // 用于防抖的timer
const page = ref(1)
const observerTarget = ref()
const loading = ref(false)
const noMoreData = ref(false)

onMounted(() => {
    // 初始化加载第一页
    // queryNoteList()

    // 设置观察者
    observer = new IntersectionObserver(entries => {
        const target = entries[0]
        console.log('Intersection:', target.isIntersecting, 'Loading:', loading.value, 'NoMore:', noMoreData.value)
        if (target.isIntersecting && !loading.value && !noMoreData.value) {
            clearTimeout(debounceTimer) // 清除之前的定时器
            debounceTimer = setTimeout(() => {
                queryNoteList()
            }, 200)
        }
    }, OBSERVER_OPTIONS)

    // 确保DOM更新后再观察
    if (observerTarget.value) {
        observer.observe(observerTarget.value)
    }
})
onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
    clearTimeout(debounceTimer) // 清理定时器
})

// 重置列表
const resetList = () => {
    page.value = 1
    notes.value = []
    noMoreData.value = false
    queryNoteList()
}

const queryNoteList = () => {
    if (loading.value || noMoreData.value) return

    loading.value = true
    getNoteListRequest({
        page: page.value,
        pageSize: PAGE_SIZE,
    })
        .then(res => {
            const { total, notes: newNotes } = res.data

            // 处理新数据
            const processedNotes = newNotes.map(item => ({
                ...item,
                note_time: transDate(item.note_time, 'yyyy-MM-dd'),
                weatherIcon: weatherList.value.find(weather => weather.value === item.weather)?.icon,
            }))

            // 追加新数据
            if (page.value === 1) {
                notes.value = processedNotes
                if (processedNotes.length > 0) {
                    currentId.value = processedNotes[0].id
                    editNote.value = { ...processedNotes[0] }
                }
            } else {
                notes.value = [...notes.value, ...processedNotes]
            }

            // 更新分页状态
            page.value++
            loading.value = false

            // 判断是否还有更多数据
            if (notes.value.length >= total) {
                noMoreData.value = true
            }
        })
        .catch(() => {
            loading.value = false
        })
}

const clickNote = id => {
    currentId.value = id
    const note = notes.value.find(note => note.id === id)
    editNote.value = { ...note }
}

// 监听当前小记变化，更新编辑区

const newNote = () => {
    editNote.value = {
        title: '',
        content: '',
        weather: '',
        note_time: new Date().toISOString().slice(0, 10),
    }
    currentId.value = null
}

const saveNote = () => {
    if (!editNote.value.content) {
        ElMessage.warning('内容不能为空')
        return
    }
    if (!editNote.value.weather) {
        ElMessage.warning('天气不能为空')
        return
    }
    if (!editNote.value.note_time) {
        ElMessage.warning('时间不能为空')
        return
    }
    if (!editNote.value.title) {
        ElMessage.warning('标题不能为空')
        return
    }

    if (editNote.value.id) {
        updateNoteRequest(editNote.value).then(res => {
            if (res.code === 200) {
                ElMessage.success('保存成功')
                resetList()
            } else {
                ElMessage.error('保存失败')
            }
        })
    } else {
        addNoteRequest(editNote.value).then(res => {
            if (res.code === 200) {
                ElMessage.success('新建成功')
                resetList()
            } else {
                ElMessage.error('新建失败')
            }
        })
    }
}

const deleteNote = id => {
    deleteNoteRequest(id).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功')
            resetList()
        } else {
            ElMessage.error('删除失败')
        }
    })
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
                width: 120px;
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
                padding-bottom: 20px;

                .observer-target {
                    height: 20px;
                    width: 100%;
                    margin-top: 10px;
                }

                .loading,
                .no-more {
                    text-align: center;
                    padding: 10px;
                    color: #909399;
                    font-size: 14px;
                }
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
