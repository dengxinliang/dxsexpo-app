<template>
    <div class="news-detail">
        <div class="title">{{options.title}}</div>
        <div class="tips">
            <span><van-icon name="eye-o" />{{options.views || 0}}</span>
            <span>来源：{{ options.origin }}</span>
            <span>{{parseTime(new Date(options.create_date), '{y}-{m}-{d}')}}</span>
        </div>
        <van-divider />
        <div v-html="options.des"></div>
    </div>
</template>

<script>
import { Divider, Icon } from 'vant';
import { parseTime } from '@/utils'
import { informationDetail } from '@/apis/news'
export default {
    components: {
        [Divider.name]: Divider,
        [Icon.name]: Icon
    },
    data() {
        return {
            options: {}
        }
    },
    created() {
        this.devData()
    },
    methods: {
        parseTime,
        async devData() {
            const id = this.$route.query.id
            const params = {}
            const { code, data } = await informationDetail(id, params)
            if(code === 0) {
                this.options = data || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.news-detail{
    padding: 20px 10px;
    .title{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    .tips{
        text-align: center;
        font-size: 14px;
        color: rgba(43, 43, 43, .6);
        margin: 16px 0;
        span{
            margin: 0 16px;
            i{
                margin-right: 8px;
            }
        }
    }
}
</style>