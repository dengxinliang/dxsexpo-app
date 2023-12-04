<template>
    <div>
        <div class="item-title">{{ options.des }}</div>
        <div v-for="(item, index) in imgList" :key="index">
            <img :src="baseUrl + item.url" alt="">
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script>
import { exhibitionSceneDetail } from '@/apis/exhibitionScene'
export default {
    data() {
        return {
            baseUrl: '',
            options: {}
        }
    },
    created() {
        this.devData()
    },
    computed: {
        imgList() {
            if(!this.options.site_photos) return [];
            return JSON.parse(this.options.site_photos)
        }
    },
    methods: {
        async devData() {
            const id = this.$route.query.id
            const params = {}
            const { code, data } = await exhibitionSceneDetail(id, params)
            if(code === 0) {
                this.options = data || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.item-title{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 20px 10px;
}
p{
    margin-top: 10px;
    padding: 0 10px 10px;
}
</style>