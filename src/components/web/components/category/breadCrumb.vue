<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item v-for="(item, i) in categoryCrumb" v-if="categoryCrumb.length">{{item.nav_text}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<style></style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['categoryCrumb'])
    }
  }
</script>