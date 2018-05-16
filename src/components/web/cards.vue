<template>
    <div class="card-container" v-if="flag">
        <div v-for="(item, i) in index" :key="i" >
            <Guide :title="item.nav_text" :child="item.children" :nav_nickname="item.nav_nickname" :nav_url=" item.nav_url"></Guide>
            <Card :content="item.indexCourses"></Card>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import Guide from './guide.vue'
    import Card from './card.vue'
    import {web_routerConfig} from './../../config/RouterConfig'
    import Axios from 'axios'
    export default{
        mounted() {
            this.$store.dispatch("loadIndex",{
                url:this.APIConfig.getIndexNav,
                key: "indexNav",
                request_pattern: {nav:this.$route.params['nav']}
            }).then(()=>{
                let navArr=[]
                let {nav, courses} = this.indexNav
                for(let n of nav.children){
                    n["indexCourses"]=courses[n["nav_id"]]
                    navArr.push(n)
                }
                this.index = navArr;
//                console.table(navArr)
                this.flag = true
            })
        },
        data(){
            return {
                currentDate: new Date(),
                index:{},
                flag:false
            }
        },
        components:{
            Guide,
            Card
        },
        computed:{
            videoList(){
                return this.$store.getters.video_list
            },
            indexNav(){
                return this.$store.getters.indexNav
            },
        }
    }
</script>