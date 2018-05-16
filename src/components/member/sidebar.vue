<template>
    <div class="sidebar">
        <el-menu mode="vertical" default-active="1" class="sidebar" :router="true">
            <el-menu-item-group class="menu-title" title="视频管理">
                <el-menu-item index="pub"><i class="el-icon-message"></i>发布视频</el-menu-item>
                <el-menu-item index="vlist"><i class="el-icon-message"></i>视频列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group class="menu-title" title="个人资料">
                <el-menu-item index="info"><i class="el-icon-message"></i>个人信息</el-menu-item>
                <el-menu-item index="modify"><i class="el-icon-message"></i>密码修改</el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </div>
</template>
<style>
    .sidebar{
        background:#fff;
        /*margin:30px auto;*/
    }
    .menu-title div{
        font-size:20px;
    }
</style>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>