<template>
    <div>
        <el-row>
            <el-col :spam="24">
                <el-menu default-active="/" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1" onclick="self.location='/member/'">跳转回前台</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div>
            <el-row>
                <el-col :span="20" :offset="2">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>