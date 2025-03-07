<template>
    <div class="userSetting">
        <div class="backToUser">
            <el-button link>
                <el-icon><ArrowLeft /></el-icon>返回个人主页
            </el-button>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </div>
</template>
<script setup></script>
<style scoped lang="less">
.userSetting {
    margin: auto;
    width: 1280px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    .backToUser {
        background-color: white;
        padding: 10px;
    }
}
</style>
