<template>
    <div>
        个人信息
        <el-button @click="test">测试</el-button>
    </div>
</template>
<style></style>
<script>
    import Vue from 'vue';
    export default{
        data(){
            return {};
        },
        methods:{
            test(){
                let data={
                    videos_img:{},
                    videos_files:{},
                    videos:{}
                };
                data.videos.v_id=row.v_id;
                data.videos_files.vf_id=row.videosFiles.vf_id;
                data.videos_img.img_id=row.videosFiles.img_id;
                data.videos_img.img_name=row.videosImg.img_name;
                data.videos_files.vf_key=row.videosFiles.vf_key;
                this.$store.dispatch('postData',{
                    url:this.APIConfig.delVideoRecord,
                    key:'videoDetail',
                    body:data
                });
            }
        }
    }
</script>