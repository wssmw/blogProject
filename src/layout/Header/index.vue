<template>
    <div class="header max-w-[1440px] w-full h-15 flex justify-between">
        <div class="flex text-base items-center pl-3.5">
            <div class="flex w-[120px] items-center cursor-pointer" @click="backToHome">
                <img class="w-8 h-8" src="@/assets/svg/bird-duotone.svg" alt="" />
                <span class="mx-5">拾光</span>
            </div>
            <el-menu
                class="el-menu-popper-demo flex-1"
                :style="resizeStyle"
                default-active="/"
                router
                mode="horizontal"
            >
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="famousSquare">名言广场</el-menu-item>
                <el-menu-item index="toolbox">
                    <img class="w-5 h-5" src="@/assets/svg/工具箱.svg" alt="" />
                    工具箱
                </el-menu-item>
                <el-menu-item index="label" route="">
                    <img class="w-5 h-5" src="@/assets/svg/标签.svg" alt="" />
                    标签
                </el-menu-item>
                <el-menu-item index="about">关于本网站</el-menu-item>
                <el-menu-item index="friendChain">友链</el-menu-item>
            </el-menu>
        </div>
        <div class="flex items-center justify-around">
            <div :class="store.windowInnerWidth > 1280 ? 'w-[280px]' : ''">
                <el-input class="h-10" placeholder="探索拾光">
                    <template #suffix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
            </div>
            <el-dropdown
                v-if="store.windowInnerWidth > 700"
                class="ml-4 min-w-[141px]"
                size="large"
                split-button
                type="primary"
            >
                创造者中心
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="jumpToEditor">
                            <img class="w-5 h-5" src="@/assets/svg/用研.svg" alt="" />
                            写文章
                        </el-dropdown-item>
                        <el-dropdown-item>记录文言</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="w-[40px] h-10 mx-4 flex items-center">
                <el-badge :value="12" class="item">
                    <img class="w-6 h-6" src="@/assets/svg/提示.svg" />
                </el-badge>
            </div>
            <div class="w-[50px]">
                <el-avatar :size="40" class="cursor-pointer" v-if="!store.isLogin" @click="loginHandle">
                    登录
                </el-avatar>
                <el-popover v-else placement="bottom-end" :width="300" trigger="click" ref="popover">
                    <template #reference>
                        <img
                            class="cursor-pointer rounded-full"
                            style="width: 36px; height: 36px"
                            :src="userInfo.avatar_url"
                            alt="头像"
                        />
                    </template>
                    <div class="p-2 flex flex-col items-center bg-white rounded-md relative">
                        <div class="flex justify-start w-full items-center">
                            <img
                                class="cursor-pointer rounded-full"
                                style="width: 36px; height: 36px"
                                :src="userInfo.avatar_url"
                                alt="头像"
                            />
                            <div class="ml-3 flex flex-col justify-between">
                                <div class="text-lg">{{ userInfo.name }}</div>
                                <div> 职业-{{ userInfo.career }} </div>
                            </div>
                        </div>
                        <el-divider class="divider"></el-divider>
                        <div class="bottom w-full">
                            <div class="item">
                                <div class="title"> 关注 </div>
                                <div class="num"> 1 </div>
                            </div>
                            <div class="item">
                                <div class="title"> 收藏 </div>
                                <div class="num"> 1 </div>
                            </div>
                            <div class="item">
                                <div class="title"> 文章 </div>
                                <div class="num"> 1 </div>
                            </div>
                            <div class="item">
                                <div class="title"> 名言 </div>
                                <div class="num"> 1 </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap">
                            <template v-for="item in data" :key="item.title">
                                <div
                                    class="w-2/4 flex justify-center my-2 py-1 rounded hover:bg-slate-100"
                                    @click="clickHandle"
                                >
                                    <img class="w-5 h-5 mr-2" src="@/assets/svg/关于.svg" alt="" />
                                    {{ item.title }}
                                </div>
                            </template>
                        </div>
                        <el-divider class="divider"></el-divider>
                        <div class="w-full flex justify-between font-semibold">
                            <span class="cursor-pointer" @click="editUserInfo">我的设置</span>
                            <span class="cursor-pointer" @click="logOutHandle">退出</span>
                        </div>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { appStore } from '../../store/module/app'
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = appStore()

const userInfo = computed(() => store.userInfo)

const data = ref([
    {
        title: '创作中心',
    },
    {
        title: '我的主页',
    },
    {
        title: '名言空间',
    },
    {
        title: '我的关注',
    },
    {
        title: '我的专栏',
    },
    {
        title: '我的点赞',
    },
    {
        title: '我的足迹',
    },
])

const resizeStyle = computed(() => {
    return {
        width: `${store.windowInnerWidth / 2 - 160}px`,
    }
})
const backToHome = () => {
    console.log(router)
    router.push('/')
}
const jumpToEditor = () => {
    if (store.isLogin) {
        router.push('/editor')
    } else {
        ElMessage.warning('请先登录')
        store.showLoginModalChange(true)
    }
}

const loginHandle = () => {
    store.showLoginModalChange(true)
}

const logOutHandle = () => {
    console.log('这里执行')
    console.log(store)
    store.userInfoChange({})
    store.tokenChange('')
}
const popover = ref()

const clickHandle = () => {
    console.log(store.userInfo)
    router.push(`/user/${store.userInfo.id}`)
    popover.value.hide()
}

const editUserInfo = () => {
    router.push('/userSetting')
    popover.value.hide()
}
</script>
<style scoped lang="less">
.header {
    .el-menu-popper-demo {
        border: none;
    }
}
.divider {
    margin: 10px 0 !important;
}
.bottom {
    display: flex;
    .item {
        width: 25%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
            color: #fa8739;
            font-size: 14px;
            font-weight: 500;
        }
        .title {
            font-size: 16px;
        }
    }
}
</style>
