<template>
    <div class="article_left">
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
        <div class="item">
            <img class="img" src="@/assets/svg/标签.svg" alt="" />
        </div>
    </div>
</template>
<script setup></script>
<style scoped lang="less">
.article_left {
    position: fixed;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.04);
        cursor: pointer;
        .img {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
