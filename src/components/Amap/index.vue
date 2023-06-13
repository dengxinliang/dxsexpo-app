<template>
    <el-amap
      :center="mapCenter"
      :zoom="zoom"
    >
        <el-amap-marker :position="mapCenter"></el-amap-marker>
    </el-amap>
</template>

<script>
export default {
    data() {
        return {
            mapCenter: [121.278576, 31.092369],
            zoom: 16
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-vue-amap{
    height: 320px;
    .amap-marker{
        width: 20px;
    }
}
</style>