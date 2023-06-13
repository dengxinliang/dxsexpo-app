<template>
    <div>
        <van-tabs v-model:active="active" border>
            <van-tab title="参展流程">
                <div class="pass">
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
            </van-tab>
            <van-tab title="展台搭建">
                <div class="booth">
                    <div class="title">{{ info.title }}</div>
                    <p>{{ info.tips }}</p>
                    <div v-for="(item, index) in info.list" :key="index">
                        <img :src="item" alt="">
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Step, Steps } from 'vant';
import { exhibitionProcess } from '@/apis/exhibitionGuide'
export default {
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Step.name]: Step,
        [Steps.name]: Steps
    },
    data() {
        return {
            info: {
                title: '一站式服务 全球搭建 品质为先 靓丽宣传',
                tips: '致力于全球展览展示设计规划及搭建服务，在美国、欧洲和迪拜等地拥有良好的合作伙伴，有多年的热门展会服务经验，满足国内客户的海外特装需求、品牌形象宣传。提供 展台策划+设计+运营+工程，为您提供全球一站式展台设计搭建服务。',
                list: [
                    require('@/assets/images/1.png'),
                ]
            },
            active: 0,
            dxsIcons: []
        }
    },
    created() {
        this.devData()
    },
    methods: {
        async devData() {
            const params = {}
            const { code, data } = await exhibitionProcess(params)
            if(code === 0) {
                this.dxsIcons = data || []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.pass{
    padding: 20px 10px 0;
}
.booth{
    padding: 20px 10px 0;
    .title{
        font-size: 18px;
        font-weight: bold;
        text-indent: 2em;
    }
    p{
        font-size: 16px;
        margin: 10px 0;
        line-height: 1.6;
        text-indent: 2em;
    }
}
</style>