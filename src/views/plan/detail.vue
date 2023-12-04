<template>
    <div>
        <div class="info">
            <img :src="baseUrl + options.logo" alt="">
            <div>{{ options.name }}</div>
            <p><span class="label">展会时间：</span><span class="text">{{ options.exhibition_date }}</span></p>
            <p><span class="label">展会周期：</span><span class="text">{{ options.exhibition_cycle }}</span></p>
            <p><span class="label">展会地点：</span><span class="text">{{ options.address }}</span></p>
            <p><span class="label">主办方：</span><span class="text">{{ options.organizer }}</span></p>
        </div>
        <div class="rich-text">
            <div class="title">展会介绍</div>
            <div v-html="options.des"></div>
        </div>
        <div class="rich-text">
            <div class="title">展品范围</div>
            <div v-html="options.exhibition_scope"></div>
        </div>
    </div>
</template>

<script>
import { exhibitionPlanDetail } from '@/apis/exhibitionPlan'
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
    methods: {
        async devData() {
            const id = this.$route.query.id
            const params = {}
            const { code, data } = await exhibitionPlanDetail(id, params)
            if(code === 0) {
                this.options = data || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.info{
    margin-bottom: 30px;
    div{
        padding: 0 10px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        padding: 0 10px;
        margin: 6px 0;
        display: flex;
        .label{
            width: 90px;
            text-align: right;
        }
        .text{
            flex: 1;
        }
    }
}
.rich-text{
    padding: 0 10px;
    .title{
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid;
        margin: 10px 0;
        padding-bottom: 6px;
    }
}
</style>