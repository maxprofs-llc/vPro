<template>
    <el-row :gutter="0">
        <el-col :md="18" :xs="24" :sm="18" :lg="18" :xl="18">
            <video-player
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied">
            </video-player>
        </el-col>
        <el-col :md="6" :xs="24" :sm="6" :lg="6" :xl="6">
            <div class="vjs-playlist" :style="{ width: scrollSize.width + 'px', height: scrollSize.height + 'px',backgroundColor: '#333', display: 'inline-block' }"></div>
        </el-col>
    </el-row>
</template>
<style></style>
<script>
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  require('videojs-playlist/dist/videojs-playlist.js')
  require('videojs-playlist-ui/dist/videojs-playlist-ui.js')
  require("videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css")
  export default {
    created() {
      if (Object.keys(this.$route.query).length !==0 && this.$route.query.course_id !==undefined) {
        this.$store.dispatch('getLessonsList', { course_id: this.$route.query.course_id }).then((res) => {
          for( let item of res) {
            if (item.lesson_is_chapter_head === '0')
              this.source.push({
                name: item.lesson_title,
                descriptions: '',
                durations: '',
                sources: [
                  { src: 'http://ozg76yopg.bkt.clouddn.com/error', type: 'video/mp4' }
                ],
                thumbnail: false
              })
          }
          console.log(this.source)
          this.player.playlist(this.source)
          this.player.playlistUi()
        })
        if (this.$route.query.lesson_id !== undefined) {

        } else {

        }
      }
    },
    mounted() {
//      console.log(this.$route.query)
//      console.log(this.player.playlist.currentItem(1))
      this.handleResize()
      // 添加resize的方法
      window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    data() {
      return {
        videoSize: {
          width: undefined,
          height: undefined
        },
        scrollSize: {
          width: undefined,
          height: undefined
        },
        zIndex: 9999,
        playerOptions: {
          // videojs options
          height: undefined,
          muted: true,
          fluid: true,
          aspectRatio: '16:9',
          preload: 'auto',
          autoplay: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
          // 自动缩放，自适应
//           fluid: true,
        },
        source: []
//        source: [
//          {
//            name: 'Disney\'s Oceans 1',
//            description: 'Explore the depths of our planet\'s oceans. ' +
//            'Experience the stories that connect their world to ours. ' +
//            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
//            'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
//            'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
//            'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
//            'dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
//            'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
//            'proident, sunt in culpa qui officia deserunt mollit anim id est ' +
//            'laborum.',
//            duration: 45,
//            sources: [
//              { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
//              { src: 'http://vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
//            ],
//            // you can use <picture> syntax to display responsive images
//            thumbnail: [
//              {
//                srcset: 'test/example/oceans.jpg',
//                type: 'image/jpeg',
//                media: '(min-width: 400px;)'
//              },
//              {
//                src: 'test/example/oceans-low.jpg'
//              }
//            ]
//          },
//          {
//            name: 'Disney\'s Oceans 2',
//            description: 'Explore the depths of our planet\'s oceans. ' +
//            'Experience the stories that connect their world to ours. ' +
//            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
//            'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
//            'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
//            'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
//            'dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
//            'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
//            'proident, sunt in culpa qui officia deserunt mollit anim id est ' +
//            'laborum.',
//            duration: 45,
//            sources: [
//              { src: 'http://vjs.zencdn.net/v/oceans.mp4?2', type: 'video/mp4' },
//              { src: 'http://vjs.zencdn.net/v/oceans.webm?2', type: 'video/webm' },
//            ],
//            // you can use <picture> syntax to display responsive images
//            thumbnail: [
//              {
//                srcset: 'test/example/oceans.jpg',
//                type: 'image/jpeg',
//                media: '(min-width: 400px;)'
//              },
//              {
//                src: 'test/example/oceans-low.jpg'
//              }
//            ]
//          },
//          {
//            name: 'Sintel (No Thumbnail)',
//            description: 'The film follows a girl named Sintel who is searching for a baby dragon she calls Scales.',
//            sources: [
//              { src: 'http://media.w3.org/2010/05/sintel/trailer.mp4', type: 'video/mp4' },
//              { src: 'http://media.w3.org/2010/05/sintel/trailer.webm', type: 'video/webm' },
//              { src: 'http://media.w3.org/2010/05/sintel/trailer.ogv', type: 'video/ogg' }
//            ],
//            thumbnail: false
//          }, // This is a really underspecified video to demonstrate the// behavior when optional parameters are missing. You'll get better// results with more video metadata!
//          {
//            name: 'Invalid Source',
//            sources: [{
//              src: 'Invalid'
//          }]
//        }]
      }
    },
    methods: {
      handleResize() {
        const originWidth = this.$el.getBoundingClientRect().width
        if(originWidth >= '768') {
          this.videoSize.width = originWidth * 0.75
          this.scrollSize.width = originWidth * 0.25
          this.videoSize.height = this.videoSize.width * 9 / 16
          this.scrollSize.height = this.videoSize.height
        } else if (originWidth < '768'){
          this.videoSize.width = originWidth
          this.videoSize.height = this.videoSize.width * 9 / 16
          this.scrollSize.width = this.videoSize.width
          this.scrollSize.height= this.videoSize.height
        }
//        this.playerOptions.height = this.videoSize.height
      },
      // listen event
      onPlayerPlay(player) {
//         console.log('player play!', player)
      },
      onPlayerPause(player) {
//         console.log('player pause!', player)
      },
      // ...player event
      onPlayerEnded(e) {
//        console.log('player ended: ', e)
      },
      onPlayerWaiting(e) {
//        console.log('player is waiting' , e)
      },
      onPlayerPlaying(e) {
//        console.log('player is playing!', e)
      },
      onPlayerLoadeddata(e) {
//        console.log('player data loaded', e)
      },
      onPlayerTimeupdate(e) {
//        console.log('player time update!', e)
      },
      onPlayerCanplay(e) {
//        console.log('player can play. ' , e)
      },
      onPlayerCanplaythrough(e) {
//        console.log('can play through', e)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
//         console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
//        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    },
    components: {
      videoPlayer
    },
    computed: {
      player() {
        if(this.$refs.videoPlayer.player !== undefined ) return this.$refs.videoPlayer.player
      }
    },
  }
</script>