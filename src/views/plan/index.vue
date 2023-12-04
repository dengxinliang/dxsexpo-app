<template>
    <div class="plan">  
        <div class="sidebar">
            <van-sidebar v-model="active" @change="changeSidebar">
                <van-sidebar-item v-for="(item, index) in typeList" :key="index" :title="item.name" />
            </van-sidebar>
        </div>
        <div class="centent" v-if="isReady">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell v-for="(item, index) in rows" :key="index">
                    <div class="item">
                        <em>
                            <img :src="baseUrl + item.logo" alt="">
                        </em>
                        <div>
                            <p class="ellipsis" style="font-size: 18px; font-weight: bold; margin: 0 0 8px;">{{ item.name }}</p>
                            <p style="font-size: 14px; margin: 3px 0;">日期：{{ item.exhibition_date }}</p>
                            <p class="ellipsis" style="font-size: 14px; margin: 3px 0;">地址：{{ item.address }}</p>
                            <div class="btn">
                                <router-link :to="'/exhibition-plan-detail?id=' + item.id">详情<van-icon name="arrow" /></router-link>
                            </div>
                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import { Sidebar, SidebarItem, Sticky, List, Icon } from 'vant';
import { industryCategory, exhibitionPlan } from '@/apis/exhibitionPlan'
export default {
    components: {
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem,
        [Sticky.name]: Sticky,
        [List.name]: List,
        [Icon.name]: Icon
    },
    data() {
        return {
            baseUrl: '',
            active: 0,
            dictionary: '',
            typeList: [],
            pages: {
                pageSize: 10,
                pageNumber: 1
            },
            rows: [],
            loading: false,
            finished: false,
            isReady: false
        }
    },
    created() {
        this.devTypeData()
    },
    methods: {
        async onLoad() {
            const params = {
                ...this.pages,
                industry_category_id: this.dictionary
            }
            const { code, data } = await exhibitionPlan(params)
            if (code === 0) {
                const list = data || []
                this.rows = this.rows.concat(list)
                this.loading = false
                this.isReady = true
                this.pages.pageNumber = 2
                if(list.length < this.pages.pageSize) this.finished = true;
            }
        },
        async devTypeData() {
            const params = {}
            const { code, data } = await industryCategory(params)
            if (code === 0) {
                const rows = data || []
                this.typeList = rows
                this.dictionary = rows[this.active].id
                this.isReady = true
            }
        },
        changeSidebar(index) {
            this.dictionary = this.typeList[index].id
            this.pages.pageNumber = 1
            this.rows = []
            this.finished = false
            this.isReady = false
            this.onLoad()
        }
    }
}
</script>

<style lang="scss" scoped>
.plan{
    padding-left: 80px;
    position: relative;
    .sidebar{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1;
        height: 100%;
        background: #f7f8fa;
    }
    .item{
        padding: 10px;
        display: flex;
        box-shadow: 0 0 5px #f7f8fa;
        border-bottom: 1px solid #f7f8fa;
        em{
            width: 80px;
            margin-right: 10px;
        }
        &>div{
            width: calc(100% - 90px);
        }
        .btn{
            text-align: right;
            a{
                font-size: 14px;
            }
        }
    }
}
</style>