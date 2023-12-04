<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="(item, index) in banners" :key="index">
                <img :src="baseUrl + item.img_list" @click="tapPlanDetail(item)" />
            </van-swipe-item>
        </van-swipe>
        <div>
            <Title title="关于我们" routerUrl="/about" />
            <div class="padlr10">
                <img :src="baseUrl + exhibitionImg" alt="">
                <div class="mart10" v-html="exhibitionInfo.des"></div>
            </div>
        </div>
        <div class="padbom20">
            <Title title="行业资讯" routerUrl="/news" />
            <div class="padlr10">
                <van-list
                    v-model:loading="information.loading"
                    :finished="information.finished"
                    finished-text="没有更多了"
                    @load="onLoadInformation"
                >
                    <van-cell v-for="(item, index) in information.list" :key="index">
                        <template #default>
                            <van-divider v-if="index > 0" />
                            <img :src="baseUrl + item.img_list" alt="">
                            <div class="min-title ellipsis">{{item.title}}</div>
                            <p class="clamp-3" style="margin: 0;">{{initHtml(item.des)}}</p>
                            <p class="times">{{parseTime(new Date(item.create_date))}}
                                <router-link :to="'/news-detail?id=' + item.id">查看详情
                                    <van-icon name="arrow" />
                                </router-link>
                            </p>
                        </template>
                    </van-cell>
                </van-list>
            </div>
        </div>
        <div class="padbom20">
            <Title title="展会现场" routerUrl="/exhibition-scene" />
            <div class="padlr10">
                <van-list
                    v-model:loading="exhibitionScene.loading"
                    :finished="exhibitionScene.finished"
                    finished-text="没有更多了"
                    @load="onLoadExhibitionScene"
                >
                    <van-cell v-for="(item, index) in exhibitionScene.list" :key="index">
                        <template #default>
                            <van-divider v-if="index > 0" />
                            <img :src="baseUrl + item.img_list" alt="">
                            <div class="ellipsis" style="height: 42px; line-height: 42px;">{{item.des}}</div>
                            <p style="text-align: center;">
                                <router-link :to="'/exhibition-scene-detail?id=' + item.id">查看详情
                                    <van-icon name="arrow" />
                                </router-link>
                            </p>
                        </template>
                    </van-cell>
                </van-list>
            </div>
        </div>
        <div class="padbom20">
            <Title title="参展流程" routerUrl="/exhibition-guide" />
            <div class="padlr10">
                <van-steps :active="100" direction="vertical">
                    <van-step v-for="(item, index) in dxsIcons" :key="index">
                        <template #inactive-icon>
                            <i class="iconfont" :class="item.icon" style="background: #fff; border: 1px solid #21268a; border-radius: 100%; padding: 2px;"></i>
                        </template>
                        <h6 style="font-size: 16px; margin: 0;">{{ item.title }}</h6>
                        <p style="font-size: 14px;">{{ item.des }}</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Swipe, SwipeItem, List, Divider, Icon, Step, Steps } from 'vant';
import Title from '@/components/Title'
import { parseTime } from '@/utils'
import { banner } from '@/apis/common'
import { information } from '@/apis/news'
import { exhibitionScene } from '@/apis/exhibitionScene'
import { exhibitionProcess } from '@/apis/exhibitionGuide'
export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [List.name]: List,
        [Divider.name]: Divider,
        [Icon.name]: Icon,
        [Step.name]: Step,
        [Steps.name]: Steps,
        Title
    },
    data() {
        return {
            baseUrl: '',
            banners: [],
            information: {
                finished: false,
                loading: false,
                list: []
            },
            exhibitionScene: {
                finished: false,
                loading: false,
                list: []
            },
            dxsIcons: []
        }
    },
    created() {
        this.devData()
        this.exhibitionProcess()
    },
    computed: {
        ...mapState(['exhibitionInfo']),
        exhibitionImg() {
            const { img_list } = this.exhibitionInfo
            const imgs = img_list ? JSON.parse(img_list) : img_list
            return imgs ? imgs[0].url : imgs
        }
    },
    methods: {
        parseTime,
        async devData() {
            const params = {}
            const { code, data } = await banner(params)
            if(code === 0) {
                this.banners = data || []
            }
        },
        async onLoadInformation() {
            const params = {
                pageSize: 5,
                pageNumber: 1
            }
            const { code, data } = await information(params)
            if(code === 0) {
                this.information.list = data || []
                this.information.loading = false
                this.information.finished = true
            }
        },
        async onLoadExhibitionScene() {
            const params = {
                pageSize: 6,
                pageNumber: 1
            }
            const { code, data } = await exhibitionScene(params)
            if(code === 0) {
                this.exhibitionScene.list = data || []
                this.exhibitionScene.loading = false
                this.exhibitionScene.finished = true
            }
        },
        async exhibitionProcess() {
            const params = {}
            const { code, data } = await exhibitionProcess(params)
            if(code === 0) {
                this.dxsIcons = data || []
            }
        },
        tapPlanDetail(item) {
            this.$router.push({
                path: '/exhibition-plan-detail',
                query: {
                    id: item.href
                }
            })
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
/deep/ .van-list__finished-text{
    display: none;
}
</style>