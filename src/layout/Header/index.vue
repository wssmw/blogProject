<template>
    <div class="header max-w-[1440px] h-15 flex justify-between">
        <div class="flex text-base items-center">
            <div class="flex items-center cursor-pointer" @click="backToHome">
                <img class="w-8 h-8" src="@/assets/svg/bird-duotone.svg" alt="" />
                <span class="mx-5">栖息地</span>
            </div>
            <el-menu class="el-menu-popper-demo w-[600px] flex-1" router mode="horizontal">
                <el-menu-item index="2" route="famousSquare">名言广场</el-menu-item>
                <el-menu-item index="3" route="toolbox">
                    <img class="w-5 h-5" src="@/assets/svg/工具箱.svg" alt="" />
                    工具箱
                </el-menu-item>
                <el-menu-item index="4" route="label">
                    <img class="w-5 h-5" src="@/assets/svg/标签.svg" alt="" />
                    标签
                </el-menu-item>
                <el-sub-menu index="6">
                    <template #title>
                        <img class="w-5 h-5" src="@/assets/svg/关于.svg" alt="" />
                        关于
                    </template>
                    <el-menu-item index="6-1" route="about">关于本网站</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="7">
                    <template #title> 友人帐 </template>
                    <el-menu-item index="7-1" route="friendChain">友链</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="flex items-center justify-around">
            <div class="w-[280px]">
                <el-input class="h-10" placeholder="探索栖息地">
                    <template #suffix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
            </div>
            <el-dropdown class="ml-4 min-w-[141px]" size="large" split-button type="primary">
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
                <el-popover v-else placement="bottom-end" :width="300" trigger="click">
                    <template #reference>
                        <el-avatar class="cursor-pointer">
                            <img style="width: 30px; height: 30px" :src="userInfo.avatar_url" alt="头像" />
                        </el-avatar>
                    </template>
                    <div class="p-2 flex flex-col items-center bg-white rounded-md relative">
                        <div class="flex justify-start w-full items-center">
                            <el-avatar :size="40">
                                <el-icon><UserFilled /></el-icon>
                            </el-avatar>
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
                                <div class="w-2/4 flex justify-center my-2 py-1 rounded hover:bg-slate-100">
                                    <img class="w-5 h-5 mr-2" src="@/assets/svg/关于.svg" alt="" />
                                    {{ item.title }}
                                </div>
                            </template>
                        </div>
                        <el-divider class="divider"></el-divider>
                        <div class="w-full flex justify-between font-semibold">
                            <span>我的设置</span>
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

const router = useRouter()
const store = appStore()
const emit = defineEmits(['login'])

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

const backToHome = () => {
    console.log(router)
    router.push('/')
}
const jumpToEditor = () => {
    router.push('/editor')
}

const loginHandle = () => {
    emit('login')
}

const logOutHandle = () => {
    console.log('这里执行')
    console.log(store)
    store.userInfoChange({})
    store.tokenChange('')
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
