<template>
    <div class="card-container">
        <div>
            <el-radio-group v-model="radio">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </div>
        <el-row :gutter="20" v-if="flag">
            <el-col :span="6" v-for="(item,i) in videoList" :key="i">
                <category-card :info="item"></category-card>
            </el-col>
        </el-row>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="pageCount"
                :current-page="1"
                @current-change="pageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    import categoryCard from './category-card.vue'
    export default{
        mounted(){
            this.$store.dispatch("loadDetail", {url:this.APIConfig.getDetail, nav:this.$route.params["nav"], key: "videoList"}).then(()=>{
                this.$store.dispatch("loadDetail", {url:this.APIConfig.getPage, key:"listPagination", nav: this.$route.params["nav"]})
            }).then(()=>{
                this.flag=true
            })
        },
        data(){
            return {
                flag:false,
                radio:"",
                courses_list:[],
            }
        },
        methods:{
            pageChange(page){
                this.$store.dispatch("loadIndex", {url:"", key:"videoList"}).then(()=>{
//                    console.log(this.videoList)
                    this.$store.dispatch("loadDetail", {url:this.APIConfig.getDetail, nav:this.$route.params["nav"], key: "videoList", page})
                })
            }
        },
        components:{
            categoryCard
        },
        computed:{
            videoList(){
                return this.$store.getters.video_list
            },
            pageCount(){
//                console.log(this.$store.getters.listPagination)
                return parseInt(this.$store.getters.listPagination)
            }
        }
    }
</script>