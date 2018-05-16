<template>
    <el-card class="play-comment">
        <div class="comment-title">
            <span>评论</span>
            <hr>
            <div class="comment-detail">
                <div class="comment-single">
                    <el-row :gutter="20" class="comment" v-for="(item, i) in comments" :key="i">
                        <el-col :span="4">
                            <div class="comment-avatar">
                                <img src="http://ozg76yopg.bkt.clouddn.com/face.jpg?imageView2/1/w/50/h/50/format/jpg/interlace/1/q/75|imageslim" alt="">
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="comment-summary">
                                <span class="user-name">用户1</span>
                                <span class="time">时间</span>
                            </div>
                            <div class="clearfix"></div>
                            <div class="replys" v-if="item.parent !== undefined">
                                <!-- -------------------------------------------------------------------------------- -->
                                <el-row :gutter="20" :class="{ comment: true, replyLine: (item.parent.length !== 1) && ((item.parent.length - 1) !== k) }" v-for="(v, k) in item.parent" :key="k">
                                    <el-col :span="4">
                                        <div class="comment-avatar">
                                            <img src="http://ozg76yopg.bkt.clouddn.com/face.jpg?imageView2/1/w/50/h/50/format/jpg/interlace/1/q/75|imageslim" alt="">
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="comment-summary">
                                            <span class="user-name">用户3</span>
                                            <span class="time">时间</span>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="comment-content">
                                            <span>{{v.vpro_comment_content}}</span>
                                        </div>
                                        <div class="comment-support"
                                             :course_id="v.vpro_comment_course_id"
                                             :lesson_id="v.vpro_comment_lesson_id"
                                             :reply_id="v.vpro_comment_reply_id"
                                             :reply_main_id="v.vpro_comment_reply_main_id"
                                             :comment_id="v.vpro_comment_id"
                                        >
                                            <a @click="clickAgree(v)"><i class="el-icon-check"></i>({{v.agree}})</a>
                                            <a @click="clickOppose(v)"><i class="el-icon-close"></i>({{v.oppose}})</a>
                                            <el-popover
                                                    placement="left-start"
                                                    width="600"
                                                    trigger="click">
                                                <div>
                                                    <el-input
                                                            type="textarea"
                                                            :rows="2"
                                                            placeholder="欢迎对课程进行点评，具备参考价值的评论对其他人更有帮助"
                                                            v-model="reply">
                                                    </el-input>
                                                    <div style="text-align: right; margin: 5px 0 0 0">
                                                        <el-button size="mini" type="danger" :comment_id="v.vpro_comment_id" @click="replyComment">回复评论</el-button>
                                                    </div>
                                                </div>
                                                <a slot="reference"><i class="el-icon-back"></i></a>
                                            </el-popover>
                                        </div>
                                        <hr v-if="(item.parent.length !== 1) && ((item.parent.length - 1) !== k)">
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="comment-content">
                                <span>{{item.vpro_comment_content}}</span>
                            </div>
                            <div class="comment-support"
                                 :course_id="item.vpro_comment_course_id"
                                 :lesson_id="item.vpro_comment_lesson_id"
                                 :reply_id="item.vpro_comment_reply_id"
                                 :reply_main_id="item.vpro_comment_reply_main_id"
                                 :comment_id="item.vpro_comment_id"
                            >
                                <a @click="clickAgree(item)"><i class="el-icon-check"></i>({{item.agree}})</a>
                                <a @click="clickOppose(item)"><i class="el-icon-close"></i>({{item.oppose}})</a>
                                <el-popover
                                        placement="left-start"
                                        width="600"
                                        trigger="click">
                                    <div>
                                        <el-input
                                                type="textarea"
                                                :rows="2"
                                                placeholder="欢迎对课程进行点评，具备参考价值的评论对其他人更有帮助"
                                                v-model="reply">
                                        </el-input>
                                        <div style="text-align: right; margin: 5px 0 0 0">
                                            <el-button size="mini" type="danger">回复评论</el-button>
                                        </div>
                                    </div>
                                    <a slot="reference"><i class="el-icon-back"></i></a>
                                </el-popover>
                            </div>
                        </el-col>
                    </el-row>
                    <hr>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style>
    .play-container{
        margin: 1%;
    }
    .clearfix{
        clear: both
    }
    .comment-single{
        margin: 10px;
    }
    .comment{
        margin: 10px 0;
        padding: 10px 0;
    }
    .comment-title{

    }
    .comment-single .comment-avatar{
        text-align: center;
    }
    .comment-single .comment-avatar img{
        border-radius: 25px;
    }
    .comment-summary{
        text-align: center;
    }
    .comment-single .user-name{
        display: block;
        float:left;
        margin: 0 0 10px 0;
    }
    .comment-single .time{
        display: block;
        float: right;
        margin: 0 0 10px 0;
    }
    .comment-single .comment-support{
        text-align: right;
        margin: 5px 0 0 0;
    }
    .comment-single .comment-support a{
        color: #ccc;
        font-size: 14px;
        margin: 0 5px;
        text-decoration: none;
        cursor: pointer
    }
    .comment-single .comment-support a:hover{
        color: #FF4949;
    }
    .comment-single .replys{
        background-color: #F8F8F8;
        border: 1px solid #ddd;
        padding: 0 10px 0 0;
    }
    /*.comment-single .replyLine{*/
        /*border-bottom: 1px solid #ddd;*/
    /*}*/
    .comment-single .comment-content{
        color: #666;
        font-size: 16px;

    }
    .play-comment{
        overflow: auto;
        height: 1%;
    }
    .play-comment hr{
        border: none;
        margin: 10px 0;
        border-bottom: 1px #eee solid;
    }
    .el-card{
        max-height: none !important;
    }
</style>
<script>
  export default{
    mounted() {
      if (Object.keys(this.$route.query).length > 0) {
        [this.course_id, this.lesson_id] = [this.$route.query.course_id, this.$route.query.lesson_id]
        this.getComment().then(res => {
          this.getCommentSupportRate(res).then(res => {
            this.addSupportRateToComments(res.data)
          })
        })
      }
    },
    data() {
      return {
        course_id: '',
        lesson_id: '',
        reply: '',
        comments: []
      }
    },
    methods: {
      agree(comment_id) {
        this.$store.dispatch('agree', { comment_id }).then(res => {
          // 给点上+1
        })
      },
      reject(comment_id) {
        this.$store.dispatch('reject', { comment_id }).then(res => {
          // 给点上+1
        })
      },
      getCommentSupportRate(comment_ids) {
        return this.$store.dispatch('getCommentSupportRate', { comment_ids })
      },
      getComment() {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('getComment', { 'lesson_id': this.lesson_id }).then((res) => {
            this.comments = res.data.comments
            resolve(res.data.comment_ids)
          }).catch(err => {
            reject(err)
          })
        })
      },
      addSupportRateToComments(agree_oppose) {
        this.comments = this.comments.map((item, i) => {
          if(item.hasOwnProperty('parent')) {
            item.parent.map(value => {
              for(const k in agree_oppose) {
                if (value.vpro_comment_id === k) {
                  [value['agree'], value['oppose']] = agree_oppose[k]
                  return value
                }
              }
            })
          }
          [item['agree'], item['oppose']] = agree_oppose[item.vpro_comment_id]
          return item
        })
        console.log(this.comments)
      },
      replyComment(comment_reply_id=0, comment_reply_main_id=0) {
        this.$store.dispatch('reply', {
          comment_course_id: this.course_id,
          comment_lesson_id: this.lesson_id,
          comment_reply_id,
          comment_reply_main_id,
          comment_content: this.reply
        }).then(res => {
          this.$message({
            message: '回复成功',
            type: 'success'
          })
        }).catch(err => {
          this.$message.error('评论提交失败！')
        })
      },
      clickAgree(obj) {
        this.changeSupportRate(obj, 'agree')
        console.log(this.comments)
      },
      clickOppose(obj) {
        this.changeSupportRate(obj, 'oppose')
      },
      replyComment(obj) {
        console.log(obj)
      },
      changeSupportRate(v, type) {
        for (const i in this.comments) {
          if (this.comments[i].hasOwnProperty('parent')) {
            const parent = this.comments[i].parent
            for(const k in parent) {
              if (parent[k].vpro_comment_id === v.vpro_comment_id) {
                parent[k][type] += 1
                parent.splice(k, 1, parent[k])
              }
            }
          } else {
            if(this.comments[i].vpro_comment_id === v.vpro_comment_id) {
              this.comments[i][type] += 1
              this.comments.splice(i, 1, this.comments[i])
            }
          }
        }
      }
    },
    watch: {
      comments: {
        deep: true,
        handler: (to, from) => {
          console.log(from)
          console.log(to)
        }
      }
    }
  }
</script>