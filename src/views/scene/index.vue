<template>
    <div class="scene">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in rows" :key="index">
                <div class="item">
                    <img :src="baseUrl + item.img_list" alt="">
                    <p style="padding: 10px; margin: 0;">{{ item.des }}</p>
                    <div class="btn">
                        <router-link :to="'/exhibition-scene-detail?id=' + item.id">详情<van-icon name="arrow" /></router-link>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { List, Icon } from 'vant';
import { exhibitionScene } from '@/apis/exhibitionScene'
export default {
    components: {
        [List.name]: List,
        [Icon.name]: Icon
    },
    data() {
        return {
            baseUrl: process.env.NODE_ENV === 'development' ? 'https://expoes.com.cn' : '',
            rows: [],
            loading: false,
            finished: false,
            pages: {
                pageSize: 10,
                pageNumber: 1
            }
        }
    },
    methods: {
        async onLoad() {
            const params = {
                ...this.pages
            }
            const { code, data } = await exhibitionScene(params)
            if(code === 0) {
                const list = data || []
                this.rows = this.rows.concat(list)
                this.loading = false
                this.pages.pageNumber = 2
                if(list.length < this.pages.pageSize) this.finished = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.item{
    box-shadow: 0 0 5px #f7f8fa;
    border-bottom: 1px solid #f7f8fa;
    margin-bottom: 20px;
    padding-bottom: 20px;
    .btn{
        text-align: center;
        padding: 0 10px;
        a{
            font-size: 14px;
        }
    }
}
</style>