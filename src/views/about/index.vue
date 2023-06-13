<template>
    <div>
        <van-tabs v-model:active="active" border>
            <van-tab title="公司简介">
                <div class="pt10">
                    <div class="about-title">
                        <span>东新盛（上海）展览有限公司</span>
                        <p>East Shinsen（Shanghai）Exhibition Co.,Itd</p>
                    </div>
                    <div v-html="exhibitionInfo.des" style="line-height: 2;"></div>
                    <div v-for="(item, index) in imgList" :key="index" style="margin-top: 10px;">
                        <img :src="baseUrl + item.url" alt="">
                    </div>
                </div>
            </van-tab>
            <van-tab title="企业文化">
                <div class="pt10" v-html="companyInfoObj.des"></div>
            </van-tab>
            <van-tab title="组织架构">
                <div class="pt10" v-html="departObj.des"></div>
            </van-tab>
            <van-tab title="联系我们">
                <div class="pt10 car">
                    <div class="title">{{exhibitionInfo.name}}</div>
                    <p><span class="label">电话：</span><span class="text">{{exhibitionInfo.mobile}}</span></p>
                    <p><span class="label">手机：</span><span class="text">13916723040（Wendy） <br /> 13671987051（Tommy）</span></p>
                    <p><span class="label">邮箱：</span><span class="text">{{exhibitionInfo.email}}</span></p>
                    <p><span class="label">邮编：</span><span class="text">201619</span></p>
                    <p><span class="label">地址：</span><span class="text">{{exhibitionInfo.address}}</span></p>
                    <Amap />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import Amap from '@/components/Amap'
import { mapState } from 'vuex'
import { companyInfo, depart } from '@/apis/common'
export default {
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        Amap
    },
    data() {
        return {
            baseUrl: process.env.NODE_ENV === 'development' ? 'https://expoes.com.cn' : '',
            active: 0,
            companyInfoObj: {},
            departObj: {}
        }
    },
    computed: {
        ...mapState(['exhibitionInfo']),
        imgList() {
            const { img_list } = this.exhibitionInfo
            const imgs = img_list ? JSON.parse(img_list) : []
            return imgs
        }
    },
    created() {
        this.companyInfo()
        this.depart()
    },
    methods: {
        async companyInfo() {
            const params = {}
            const { code, data } = await companyInfo(params)
            if(code === 0) {
                this.companyInfoObj = data || {}
            }
        },
        async depart() {
            const params = {}
            const { code, data } = await depart(params)
            if(code === 0) {
                this.departObj = data || {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.pt10{
    padding: 20px 10px 0;
}
.about-title{
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    span{
        font-size: 20px;
        font-weight: bold;
        position: relative;
        background: #fff;
    }
    p{
        margin: 0;
    }
}
.title{
    font-size: 20px;
    font-weight: bold;
    padding: 10px 0;
    text-align: center;
}
.car p{
    display: flex;
    .label{
        width: 60px;
        text-align: right;
    }
    .text{
        flex: 1;
        line-height: 1.6;
    }
}
</style>