import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';

import 'vant/lib/index.css'

// initAMapApiLoader({
//     key: '0725ea6be12d1e1cf6ac41ec215c891f',
//     plugin: [
//       'AMap.Scale', 
//       'AMap.OverView', 
//       'AMap.ToolBar', 
//       'AMap.MapType'
//     ],
//     v: '1.4.4',
//     uiVersion: '1.0.11',
//     protocol: 'http'
// });
// window._AMapSecurityConfig = {
//     securityJsCode: '712a023965d076221d4f67ac8496f75d',
// }

createApp(App).use(router).use(store).mount('#app')
