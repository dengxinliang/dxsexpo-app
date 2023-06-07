<template>
    <div>
        <div class="centent">
            <router-view />
        </div>
        <van-tabbar v-model="active" @change="changeTabbar">
            <van-tabbar-item name="home">首页
                <template #icon>
                    <i class="iconfont dxs-shouye"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="exhibition-plan">展览计划
                <template #icon>
                    <i class="iconfont dxs-jihua"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="exhibition-scene">展会现场
                <template #icon>
                    <i class="iconfont dxs-xianchangfuwu"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="exhibition-guide">参展指南
                <template #icon>
                    <i class="iconfont dxs-zhinanzhidao-xianxing"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="about">关于我们
                <template #icon>
                    <i class="iconfont dxs-qiye"></i>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    data() {
        return {
        }
    },
    computed: {
        active() {
            return this.$route.meta.active || 'home'
        }
    },
    methods: {
        changeTabbar(active) {
            this.active = active
            this.$router.push({
                path: '/' + active
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.centent{
    padding-bottom: 50px;
}
</style>