<template>
    <div class="title" :style="{textAlign: textAlign}">{{ title }}
        <router-link :to="routerUrl">{{ btnName }}
            <van-icon name="arrow" />
        </router-link>
    </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        textAlign: {
            type: String,
            default: 'left'
        },
        btnName: {
            type: String,
            default: '更多'
        },
        routerUrl: {
            type: String,
            default: ''
        }
    },
    components: {
        [Icon.name]: Icon
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 18px;
    color: #21268a;
    font-weight: bold;
    padding: 0 10px 4px;
    border-bottom: 1px solid rgba(33, 38, 138, .2);
    position: relative;
    margin: 10px 0 6px;
    box-shadow: 0 2px 4px -4px rgba(33, 38, 138, .06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
        font-size: 14px;
        font-weight: 100;
    }
}
</style>