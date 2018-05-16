<template>
    <div id="outbox">
        <el-row>
            <el-col :span="20" :offset="2">
                <el-col :span="4">
                    <div>
                        <sidebar></sidebar>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div>
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    #outbox{
        margin:50px auto;
    }
</style>
<script>
    import sidebar from './sidebar.vue'
    export default{
        mounted(){

        },
        components:{
            sidebar:sidebar
        }
    }
</script>