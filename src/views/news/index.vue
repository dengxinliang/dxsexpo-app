<template>
    <div>
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in rows" :key="index">
                <template #default>
                    <van-divider v-if="index > 0" />
                    <img :src="baseUrl + item.img_list" alt="">
                    <div style="padding: 0 10px;">
                        <div class="min-title ellipsis">{{item.title}}</div>
                        <p class="clamp-3" style="margin: 0;">{{initHtml(item.des)}}</p>
                        <p class="times">{{parseTime(new Date(item.create_date))}}
                            <router-link :to="'/news-detail?id=' + item.id">查看详情
                                <van-icon name="arrow" />
                            </router-link>
                        </p>
                    </div>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { List, Divider } from 'vant';
import { parseTime } from '@/utils'
import { information } from '@/apis/news'
export default {
    components: {
        [List.name]: List,
        [Divider.name]: Divider
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
        parseTime,
        async onLoad() {
            const params = {
                ...this.pages
            }
            const { code, data } = await information(params)
            if(code === 0) {
                const list = data || []
                this.rows = this.rows.concat(list)
                this.loading = false
                this.pages.pageNumber = 2
                if(list.length < this.pages.pageSize) this.finished = true;
            }
        },
        initHtml(content) {
            if(!content) return '';
            const div = document.createElement('div')
            div.innerHTML = content
            return div.innerText
        }
    }
}
</script>

<style lang="scss" scoped>
a{
    font-size: 14px;
}
.min-title{
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
.times{
    color: rgba(51, 51, 51, .6);
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>