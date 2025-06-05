<template>
    <div class="header max-w-[1440px] w-full h-15 flex justify-between">
        <div class="flex text-base items-center pl-3.5">
            <div class="flex w-[120px] items-center cursor-pointer" @click="backToHome">
                <img class="w-8 h-8" src="@/assets/svg/bird-duotone.svg" alt="" />
                <span class="mx-5">拾光</span>
            </div>
            <el-menu
                ref="menuRef"
                :default-active="activeMenu"
                class="el-menu-popper-demo flex-1"
                :style="resizeStyle"
                router
                mode="horizontal"
            >
                <el-menu-item index="2" route="/notes">
                    <img class="w-5 h-5" src="@/assets/svg/小记.svg" alt="" />
                    小记
                </el-menu-item>
                <el-menu-item index="3" route="/toolbox">
                    <img class="w-5 h-5" src="@/assets/svg/工具箱.svg" alt="" />
                    工具箱
                </el-menu-item>
                <el-menu-item index="4" route="/label">
                    <img class="w-5 h-5" src="@/assets/svg/标签.svg" alt="" />
                    标签
                </el-menu-item>
                <el-menu-item index="5" route="/about">关于本网站</el-menu-item>
                <el-menu-item index="6" route="/friendChain">友链</el-menu-item>
            </el-menu>
        </div>
        <div class="flex items-center justify-around">
            <div :class="store.windowInnerWidth > 1280 ? 'w-[380px]' : ''">
                <el-input class="h-10" placeholder="探索拾光">
                    <template #suffix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
            </div>
            <el-dropdown v-if="store.windowInnerWidth > 700" class="ml-4" size="large" type="primary">
                <img class="w-7 h-7" src="@/assets/svg/yly_编辑.svg" alt="" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="jumpToEditor">
                            <img class="w-5 h-5" src="@/assets/svg/用研.svg" alt="" />
                            写文章
                        </el-dropdown-item>
                        <el-dropdown-item @click="jumpToNotes">
                            <img class="w-5 h-5" src="@/assets/svg/小记.svg" alt="" />
                            小记
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="w-[40px] h-10 mx-4 flex items-center">
                <el-badge
                    :value="store.newsNumObj.total"
                    :max="99"
                    :hidden="store.newsNumObj.total === 0"
                    class="item cursor-pointer"
                    @click="gotoNewsHandle"
                >
                    <el-dropdown class="mx-2">
                        <img class="w-6 h-6" src="@/assets/svg/提示.svg" />
                        <template #dropdown>
                            <el-dropdown-menu class="w-36">
                                <el-dropdown-item @click.stop="newsHandle('comment')">
                                    <div class="flex justify-between w-full"
                                        >评论<span
                                            class="flex justify-center items-center w-5 h-5 rounded-full bg-[#f56c6c] text-white size-4"
                                            v-if="store.newsNumObj.commentNum > 0"
                                            >{{ store.newsNumObj.commentNum }}</span
                                        ></div
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item @click.stop="newsHandle('like')">
                                    <div class="flex justify-between w-full"
                                        >点赞和收藏<span
                                            class="flex justify-center items-center w-5 h-5 rounded-full bg-[#f56c6c] text-white size-4"
                                            v-if="store.newsNumObj.likeAndCollectNum > 0"
                                            >{{ store.newsNumObj.likeAndCollectNum }}</span
                                        ></div
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item @click.stop="newsHandle('follow')">
                                    <div class="flex justify-between w-full"
                                        >关注<span
                                            class="flex justify-center items-center w-5 h-5 rounded-full bg-[#f56c6c] text-white size-4"
                                            v-if="store.newsNumObj.followNum > 0"
                                            >{{ store.newsNumObj.followNum }}</span
                                        ></div
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item @click.stop="newsHandle('privateMessage')">
                                    <div>私信</div>
                                </el-dropdown-item>
                                <el-dropdown-item @click.stop="newsHandle('systemMessage')">
                                    <div>系统消息</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
                            <template v-for="item in data1" :key="item.key">
                                <div class="item" @click="clickHandle(item.type)">
                                    <div class="title">{{ item.title }}</div>
                                    <div class="num">{{ userInfo[item.key] }}</div>
                                </div>
                            </template>
                        </div>
                        <div class="flex flex-wrap">
                            <template v-for="item in data" :key="item.title">
                                <div
                                    class="w-2/4 flex justify-center cursor-pointer my-1 py-2 rounded hover:bg-slate-100"
                                    @click="clickHandle()"
                                >
                                    <!-- <img class="w-5 h-5 mr-2" src="@/assets/svg/关于.svg" alt="" /> -->
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
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { logoutRequest } from '../../api/module/login'
import { setLocalStorage, getLocalStorage } from '../../utils'

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
const data1 = ref([
    {
        title: '关注',
        key: 'following_count',
        type: 'follow',
    },
    {
        title: '收藏',
        key: 'collection_count',
        type: 'collect',
    },
    {
        title: '文章',
        key: 'article_count',
        type: 'article',
    },
    {
        title: '点赞',
        key: 'like_count',
        type: 'likes',
    },
])

const resizeStyle = computed(() => {
    return {
        width: `${store.windowInnerWidth / 2 - 160}px`,
    }
})

const menuRef = ref()
const activeMenu = ref('1')

// 添加路由监听
watch(
    () => router.currentRoute.value.path,
    newPath => {
        // 如果当前已经是首页且激活项是1，则不需要重复设置
        if (newPath === '/' && activeMenu.value === '1') {
            return
        }

        // 根据路径设置激活的菜单
        switch (newPath) {
            case '/':
                activeMenu.value = ''
                break
            case '/famousSquare':
                activeMenu.value = '2'
                break
            case '/toolbox':
                activeMenu.value = '3'
                break
            case '/label':
                activeMenu.value = '4'
                break
            case '/about':
                activeMenu.value = '5'
                break
            case '/friendChain':
                activeMenu.value = '6'
                break
        }
    },
    { immediate: true },
)

const backToHome = () => {
    router.push('/') // 后进行路由跳转
}
const jumpToEditor = () => {
    if (store.isLogin) {
        router.push('/editor')
    } else {
        ElMessage.warning('请先登录')
        store.showLoginModalChange(true)
    }
}
const jumpToNotes = () => {
    router.push('/notes')
}

const loginHandle = () => {
    store.showLoginModalChange(true)
}

const logOutHandle = () => {
    console.log('这里执行')
    console.log(store)
    store.userInfoChange({})
    store.tokenChange('')
    logoutRequest({ refreshToken: getLocalStorage('refreshToken') })
    setLocalStorage('accessToken', '')
    setLocalStorage('refreshToken', '')
    store.isLoginChange(false)
}
const popover = ref()

const clickHandle = type => {
    console.log(type, 'type')
    if (type) {
        router.push({
            path: `/user/${store.userInfo.id}`,
            query: { type },
        })
    } else {
        router.push(`/user/${store.userInfo.id}`)
    }
    popover.value.hide()
}

const editUserInfo = () => {
    router.push('/userSetting')
    popover.value.hide()
}

const gotoNewsHandle = () => {
    router.push('/news')
}

const newsHandle = type => {
    router.push({
        path: '/news',
        query: { type },
    })
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
        cursor: pointer;
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
