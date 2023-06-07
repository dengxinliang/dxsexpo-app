import { createStore } from "vuex";

export default createStore({
    state: {
        exhibitionInfo: {}
    },
    mutations: {
        getExhibitionInfo(state, value) {
            state.exhibitionInfo = value
        }
    }
})