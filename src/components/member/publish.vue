<template>
    <el-form ref="video" :model="video" label-width="80px" :rules="rules">
        <el-row :gutter="30">
            <el-col :span="12">
                <el-form-item label="视频名称" prop="video_title">
                    <el-input v-model="video.video_title" placeholder="填写视频标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--name组成方式为上传类名['文件字段名']-->
                    <el-upload
                            :action="this.APIConfig.UploadImage+'?auth_id='+this.$store.state.user.userObj.auth_id"
                            :on-preview="handlePreview"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :file-list="fileList2"
                            name="Uploader[file]"
                            list-type="picture">
                        <el-button size="small" type="primary" v-if="showButton">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内容简介" prop="video_desc">
                    <el-input type="textarea" resize="none" v-model="video.video_desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <div id="videoContainer">
                        <el-button id="selectVideo" type="primary" v-if="showUploadButton" :disabled="uploadDisabled">视频上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        <el-button v-if="showUploadProgress" @click="uploadPause()">{{pauseText}}</el-button>
                        <div class="player">
                            <videoPlayer v-if="!showUploadButton"
                                ref="videoPlayer"
                                :options="playerOptions"
                            ></videoPlayer>
                        </div>
                    </div>
                    <el-progress type="circle" :percentage="uploadPercent" class="uploadProgress" :status="uploadStatus" v-if="showUploadProgress"></el-progress>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showTags">测试tags</el-button>
                    <el-button @click="showEditor">测试editor</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="标签">
                    <InputTag :on-change="inputLabel" :tags="video.video_tag" placeholder="写下关键字按回车即可"></InputTag>
                </el-form-item>
                <el-form-item label="视频分类" prop="video_class">
                    <el-select v-model="video.video_class" placeholder="请选择分类">
                        <el-option v-for="option in this.$store.getters.getVClass" :label="option.nav_text" :value="option.nav_id" :key="option.nav_url"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否收费" prop="v_free">
                    <el-radio-group v-model="video.video_mode">
                        <el-radio class="radio" label="free">免费</el-radio>
                        <el-radio class="radio" label="pay">付费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格" prop="video_price">
                    <el-input placeholder="请输入价格" v-model="video.video_price" :disabled="showPriceText"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" size="large" @click="submitForm()" v-if="CreateOrEdit">发布视频</el-button>
                    <el-button type="danger" size="large" @click="modifyForm()" v-if="!CreateOrEdit" :disabled="isModify">修改视频</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="quill-editor-example">
                    <!-- quill-editor -->
                    <quill-editor ref="myTextEditor"
                                  v-model="content"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                    <div class="html ql-editor" v-html="content"></div>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="提示" v-model="showDetail" size="small">
            <!--<span><img  class="showImg" :src="this.$store.state.video.video_cover.url"/></span>-->
            <span><img :src="video.video_cover.url" class="showImg" /></span>
    </el-dialog>
    </el-form>
</template>
<style>
    .showImg{
        width:100%;
    }
    .vue-input-tag-wrapper .input-tag{
        background-color: #eeeeee !important;
        border-color: #fff !important;
        color: #666 !important;
    }
    .vue-input-tag-wrapper .input-tag .remove{
        color:#666 !important;
    }
    .uploadProgress{
        margin-top:30px;
    }
    .icons{
        width:50px;
        margin:0 0 0 20px;
        cursor:pointer;
    }
    .vue-input-tag-wrapper .new-tag{
        width:150px !important;
    }
    .player{
        margin:20px 0 0 0;
    }



    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
    }
    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
    .quill-editor-example{
        background-color:#fff;
    }
</style>
<script>
    import Vue from 'vue'
    import { quillEditor } from 'vue-quill-editor'
    import InputTag from 'vue-input-tag';
    import {videoPlayer} from 'vue-video-player';
    export default {
        created(){
//            console.log(this.edit_video_info)
            let url='http://omxvb7tjv.bkt.clouddn.com/';
            if(this.edit_video_info.isEdit===1){
                this.CreateOrEdit=false;
                this.video=this.functions.deepCopy(this.edit_video_info);
                this.fileList2=[
                    {
                        name:this.edit_video_info.videosImg.video_cover_key,
                        url:this.edit_video_info.videosImg.video_cover_address
                    }
                ];
                this.video.video_file_key=this.edit_video_info.videosFiles.video_file_key;
                this.video.video_cover={};
                this.video.video_cover.url=this.edit_video_info.videosImg.video_cover_address;
                this.video.video_cover.name=this.edit_video_info.videosImg.video_cover_key;
                this.video.video_cover.id=this.edit_video_info.videosImg.video_cover_id;
                this.video.video_file_url=url+this.video.video_file_key;
                this.video.video_file_id=this.edit_video_info.videosFiles.video_file_id;
                this.video.video_mode=this.video.video_price==0?'free':'pay';
                this.video.video_class=parseInt(this.video.video_class);
                this.playerOptions.poster=this.edit_video_info.videosImg.video_cover_address;
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4',
                        src: url+this.edit_video_info.videosFiles.video_file_key
                    }
                ];
                this.showUploadButton=false;
                delete this.video.videosFiles;
                delete this.video.videosImg;
                delete this.video.isEdit;
                delete this.video.video_up_time;
                //按值复制一份编辑前的数据，用于比对数据是否被修改
                this.hiddenArea=this.functions.deepCopy(this.video);
                console.log(this.video);
//                this.edit_video_info=[];
            }
        },
        mounted(){
            this.$store.dispatch('auth',this.APIConfig.auth)
            var myVue=this;
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'selectVideo',         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                 uptoken_url: myVue.APIConfig.uptoken_url,         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
                //    // do something
                //    return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了save_key，则开启，SDK在前端将不对key进行任何处理
                domain: 'vpro',     // bucket域名，下载资源时用到，必需
                container: 'videoContainer',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '500mb',             // 最大文件体积限制
                flash_swf_url: '../plupload/Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'videoContainer',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                multi_selection:false,              // 拒绝多文件上传
                //x_vars : {
                //    查看自定义变量
                //    'time' : function(up,file) {
                //        var time = (new Date()).getTime();
                // do something with 'time'
                //        return time;
                //    },
                //    'size' : function(up,file) {
                //        var size = file.size;
                // do something with 'size'
                //        return size;
                //    }
                //},
                filters: {
                    mime_types : [ //只允许上传图片和zip文件
                        {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                        { title : "Image files", extensions : "jpg,gif,png" },
                    ],
                    max_file_size : '500mb', //最大只能上传400kb的文件
                    prevent_duplicates : true //不允许选取重复文件
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前，处理相关的事情
                        myVue.showUploadProgress=true;
                        myVue.uploadDisabled=true;
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时，处理相关的事情
                        console.log(file.percent);
                        myVue.uploadPercent=file.percent;

                    },
                    'FileUploaded': function(up, file, info) {
//                        console.log(up);
//                        console.log(file);
//                        console.log(info)
                        info=eval("("+info.response+")");
                        if(file.percent===100){
                            myVue.uploadStatus='success';
                        };
                        let url='http://omxvb7tjv.bkt.clouddn.com/';
                        url=url + info.key;
                        let videoInfo={
                            type:file.type,
                            src:url
                        };
                        myVue.video.video_file_url=url;
                        //将视频信息传给video.js
                        myVue.playerOptions.sources.push(videoInfo);
                        // 每个文件上传成功后，处理相关的事情
                        // 其中info是文件上传成功后，服务端返回的json，形式如：
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 查看简单反馈
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                        myVue.video.video_file_key=info.key;
                        myVue.video.video_file_id=info.video_file_id;
                        console.log(myVue.video)
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后，处理相关的事情
                        myVue.showUploadButton=false;
                        setTimeout(()=>{myVue.showUploadProgress=false;},3000);
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在unique_names: false，save_key: false时才生效
                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            });
            this.$store.state.uploader=uploader;
            // domain为七牛空间对应的域名，选择某个空间后，可通过 空间设置->基本设置->域名设置 查看获取
            // uploader为一个plupload对象，继承了所有plupload的方法

        },
        beforeDestory(){
//            this.edit_video_info=[];
        },
        data() {
            let checkTitle=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入标题！'));
                }else{
                    callback();
                }
            };
            let checkIntr=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入视频简介！'));
                }else if(!/\w{10,200}/.test(value)){
                    callback(new Error('简介在10-200字之间！'))
                }else{
                    callback();
                }
            };
            let checkMoney=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入价格！'));
                }
                else if(!/\d{1,3}/.test(value))
                {
                    callback(new Error('必须为数字！'));
                }
                else if(value <0 || value >500){
                    callback(new Error('价格在0-500以内！'));
                }else{
                    callback();
                }
            };
            return {
                hiddenArea:{
                    video_cover:{}
                },
                video: {
                    video_title: '',
                    video_class: 2,
                    video_desc:"",
                    video_mode:'free',
                    video_price:0,
                    video_file_key:'',  //上传到七牛后的key
                    video_cover:{
                        name:'',
                        url:'',
                        id:0
                    },
                    video_tag:[],
                    video_file_url:'',
                    video_file_id:''
                },
                fileList2: [],
                showDetail:false,
                showButton:true,
                showUploadButton:true,
                showUploadProgress:false,
                uploadPercent:0,
                uploadStatus:"",
                pauseText:"暂停上传",
                uploadDisabled:false,
                icons:{
                    pauseSrc:'/icons/pause.png',
                    playSrc:'/icons/play.png',
                    stopSrc:'/icons/stop.png',
                    fullSrc:'/icons/full.png'
                },
                rules:{
                    video_title:[
                        {validator:checkTitle,trigger:'blur'}
                    ],
                    video_desc:[
                        {validator:checkIntr,trigger:'blur'}
                    ],
                    video_price:[
                        {validator:checkMoney,trigger:'blur'}
                    ]
                },
                playerOptions: {
                    // component options
                    start: 0,
                    playsinline: false,
                    // videojs options
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [],
                    //视频封面
                    poster: "",
                    height:243,
                },
                CreateOrEdit:true,
                //quill editor
                name: 'base-example',
                content: '<h2>I am Example 1</h2>',
                editorOption: {}
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleSuccess(response, file, fileList){
                console.log(response)
                console.log(file)
                console.log(fileList)
                this.video.video_cover.url=response.url;
//                this.playerOptions.poster=this.$store.state.video.video.video_cover.url;
                this.playerOptions.poster=this.video.video_cover.url;
                this.video.video_cover.name=response.name;
                this.video.video_cover.id=response.id;
                this.showButton=this.showUpload(fileList);
                console.log(this.video.video_cover)
            },
            handleRemove(file, fileList) {
                this.showButton=this.showUpload(fileList);
                let data={
                    videos_img:{}
                };
                data.videos_img.video_cover_id=this.video.video_cover.id;
                data.videos_img.video_cover_key=file.name;
                this.$store.dispatch('changeUsed',{
                    url:this.APIConfig.changeUsed,
                    body:data
                })
                this.video.video_cover={
                    id:'',
                    name:'',
                    url:''
                };
//                this.$store.dispatch('postData',{
//                    url:this.APIConfig.delVideoRecord,
//                    key:'videoDetail',
//                    body:data
//                });
            },
            handlePreview(file) {
                this.showDetail=true;
            },
            showUpload(fileList){
                return fileList.length===0?true:false;
            },
            inputLabel(){
                console.log(this.video.video_tag);
            },
            showTags(){
                alert(this.video.video_tag);
            },
            uploadPause(){
                if(this.pauseText==='暂停上传'){
                    this.$store.state.uploader.stop();
                }else{
                    this.$store.state.uploader.start();
                }
                this.pauseText=this.pauseText==='暂停上传'?'继续上传':'暂停上传';
            },
            submitForm(){
                let myVue=this;
                console.log(this.video)
                myVue.$refs["video"].validate(valid=>{
                    if(valid){
                        if(myVue.video.video_file_key==''||myVue.video.video_cover.id=='')
                        {
                            myVue.$notify.error({
                                title: '错误',
                                message: '必须上传封面图和视频文件！'
                            });
                        }else{
                            myVue.$store.dispatch('submitVideo',myVue.video);
                        }
                    }else{
                        console.log('error!');
                        alert('error');
                    }
                });
            },
            modifyForm(){
                console.log(this.video)
                let postData=null;
                let keys=Object.keys(this.video);
                keys.forEach(key=>{
                    if(!(this.video[key] instanceof Object)){
                        if(this.video[key] != this.hiddenArea[key]){
                            postData=postData||{
                                video_id:this.video.video_id,
                            };
                            postData[key]=this.video[key];
                        }
                    }else{
                        if(key=='video_cover'){
                            postData=postData||{
                                        video_id:this.video.video_id,
                                    };
                            for(var i in this.video[key]){
                                if(this.video[key][i] != this.hiddenArea[key][i]){
                                    if(postData[key]==null){
                                        postData[key]={};
                                    }
                                    postData[key][i]=this.video[key][i];
                                }
                            }
                        }else if(key=='video_tag'){
                            postData=postData||{
                                        video_id:this.video.video_id,
                                    };
                            postData[key]=[];
                            let tagsFlag=false;
                            for(var i in this.video[key]){
                                if(this.video[key][i] != this.hiddenArea[key][i]){
                                    tagsFlag=true;
                                }
                            }
                            postData[key]=this.video[key].join(',');
                        }
                    }
                });
                console.log(postData);
                if(postData!=null){
                    this.$store.dispatch('modifyVideo',postData);
                }
            },

            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                console.log('example 01: the player is readied', player)
            },
            //quill editor
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            //quill editor
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            //quill editor
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            showEditor(){
                alert(this.content)
            }
        },
        computed:{
            showPriceText(){
                if(this.video.v_mode==='free'){
                    return true;
                }
                return false;
            },
            player() {
                return this.$refs.videoPlayer.player
            },
            isModify(){
                let flag=true;
                let keys=keys||Object.keys(this.video);
                keys.forEach(key=>{
                    if(!(this.video[key] instanceof Object)){
                        if(this.video[key] != this.hiddenArea[key]){
                            flag=false;
                        }
                    }else{
                        for(var i in this.video[key]){
                            if(this.video[key][i] != this.hiddenArea[key][i]){
                                console.log(1);
                                flag=false;
                            }
                        }
                    }
                });
                return flag;
            },
            edit_video_info(){
                return this.$store.getters.edit_video_info;
            }
        },
        components:{
            InputTag,
            videoPlayer,
            quillEditor

        }
    }
</script>