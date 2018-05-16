<template>
    <div>
        <Carousel></Carousel>
        <Cards></Cards>
        <!--<input type="text" v-model="testValue" />-->
        <!--<test :testvalue="testValue"></test>-->
    </div>
</template>
<style>
</style>
<script>
    import Carousel from './carousel.vue';
    import Cards from './cards.vue';
    import test from './test.vue';
    export default{
        data(){
            return {
                testValue:'',
            }
        },
        components:{
            Carousel,
            Cards,
            test
        }
    }
</script>