<template>
    <div class="main_left_top bg-white rounded">
        <div class="item">关注</div>
        <div class="item">综合</div>
        <div class="item">最新</div>
    </div>
</template>
<script setup>

</script>
<style scoped lang="less">
.main_left_top {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    .item {
        width: 140px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            background: #ecf0f1;
        }
    }
}
</style>