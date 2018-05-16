<template>
    <div class="play-container">
        <div>
            <Player></Player>
        </div>
        <el-card class="box-card">
            <div class="play-title">
                <h2>123321</h2>
                <h4>123321</h4>
            </div>
            <div>
                <span>简介</span>
            </div>
        </el-card>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <comment-input></comment-input>
                <Comment></Comment>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-card>
                    <div>
                        推荐区
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .play-container{
        margin: 1%;
    }
</style>
<script>
  import Player from './components/player/player.vue'
  import Comment from './components/player/comment.vue'
  import CommentInput from './components/player/comment-input.vue'
  export default {
    mounted() {

    },
    data() {
      return {}
    },
    methods: {},
    components: {
      Player,
      Comment,
      CommentInput
    },
    computed: {},
  }
</script>