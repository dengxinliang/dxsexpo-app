<template>
  <router-view v-if="isReady" />
</template>

<script>
import { mapMutations } from 'vuex'
import { company } from '@/apis/common'
export default {
  name: 'App',
  data() {
    return {
      isReady: false
    }
  },
  created() {
    this.devData()
  },
  methods: {
    ...mapMutations(['getExhibitionInfo']),
    async devData() {
      const params = {}
      const { code, data } = await company(params)
      if(code === 0) {
        this.getExhibitionInfo(data)
        this.isReady = true
      }
    }
  }
}
</script>

<style>
img{
  width: 100%;
  display: block;
}
.padlr10{
  padding: 0 10px;
}
.padbom20{
  padding-bottom: 20px;
}
.mart10{
  margin-top: 10px;
}
.ellipsis{
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
}
.clamp-3{
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
