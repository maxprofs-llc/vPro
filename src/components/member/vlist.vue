<template>
    <div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <div class="player">
                <videoPlayer ref="videoPlayer"
                             :options="playerOptions"
                ></videoPlayer>
            </div>
        </el-dialog>
        <el-table
                :data="this.$store.state.video.videoList"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="视频名称">
                            <span><a href="#">{{ props.row.video_title }}</a></span>
                        </el-form-item>
                        <el-form-item label="视频ID">
                            <span>{{ props.row.video_id }}</span>
                        </el-form-item>
                        <el-form-item label="视频简介">
                            <span>{{ props.row.video_desc }}</span>
                        </el-form-item>
                        <el-form-item label="视频分类">
                            <span>{{ props.row.video_class }}</span>
                        </el-form-item>
                        <el-form-item label="视频上传人">
                            <span>{{ props.row.video_author }}</span>
                        </el-form-item>
                        <el-form-item label="视频价格">
                            <span>{{ props.row.video_price }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.video_desc }}</span>
                        </el-form-item>
                        <el-form-item label="视频预览">
                            <el-button type="text" @click="openVideo(props.$index,props.row)">打开视频</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="视频 ID"
                    prop="video_id">
            </el-table-column>
            <el-table-column
                    label="视频名称"
                    prop="video_title">
            </el-table-column>
            <el-table-column
                    label="视频简介"
                    prop="video_desc">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

<script>
    import {videoPlayer} from 'vue-video-player';
    export default {
        mounted(){
            this.$store.dispatch('loadVideo',{url:this.APIConfig.getVideoList,key:'videoList'});
        },
        data() {
            return {
                dialogVisible: false,
                playerOptions: {
                    // component options
                    start: 0,
                    playsinline: false,
                    // videojs options
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [],
                    poster: "",
                    height:243,
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                row.isEdit=1;
                if(row.video_tag!='' && typeof row.video_tag!='object'){
                    row.video_tag=row.video_tag.split(',');
                }
                this.$store.dispatch('transferEdit',row);
            },
            handleDelete(index, row) {
                let data={
                    videos_img:{},
                    videos_files:{},
                    videos:{}
                };
                data.videos.v_id=row.v_id;
                data.videos_files.vf_id=row.videosFiles.vf_id;
                data.videos_img.img_id=row.videosImg.img_id;
                data.videos_img.img_name=row.videosImg.img_name;
                data.videos_files.vf_key=row.videosFiles.vf_key;
                this.$store.dispatch('postData',{
                    url:this.APIConfig.delVideoRecord,
                    key:'videoDetail',
                    body:data
                });
            },
            openVideo(index,row){
                this.playerOptions.poster=row.video_cover_address;
                this.playerOptions.sources.push({
                    type:'video/mp4',
                    src:'http://omxvb7tjv.bkt.clouddn.com/'+row.videosFiles.video_file_key
                });
                this.dialogVisible=true;
            }
        },
        components:{
            videoPlayer
        }
    }
</script>