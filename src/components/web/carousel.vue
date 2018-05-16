<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide style="background-image: url(imgs/1.jpg)">I'm Slide 1</swiper-slide>
            <swiper-slide style="background-image: url(imgs/2.jpg)">I'm Slide 2</swiper-slide>
            <swiper-slide style="background-image: url(imgs/3.png)">I'm Slide 3</swiper-slide>
            <swiper-slide style="background-image: url(imgs/4.png)">I'm Slide 4</swiper-slide>
            <swiper-slide style="background-image: url(imgs/5.png)">I'm Slide 5</swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<style>
    .swiper-container{
        height:400px;
        margin:0 0 30px 0;
    }
</style>
<script>
    import Vue from 'vue'
    require('swiper/dist/css/swiper.css')
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        name:'carousel',
        data(){
            return {
                swiperOption: {
                    notNextTick: true,
                    //自动播放
                    autoplay:3000,
                    //横向滚动
                    direction : 'horizontal',
                    //滚动速度
                    speed:300,
                    //指针会变成手掌
                    grabCursor : true,
                    //人工操作后动画不停止
                    autoplayDisableOnInteraction : false,
                    //可以用滚轮控制
//                    mousewheelControl : true,
                    //为前进后退按钮设置功能
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    loop: true,
                    effect:'fade',
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
//                    autoHeight:true,
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>