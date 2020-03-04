import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        INDEX: "1-1",
        nowActiveArr: [],
        usename: '',
        saveActiveArr: [],
        vkey1: false,//视频识别点击加锁
        vkey2: false,
        intellArr:[],//选择的只能识别任务
        isDiscernde:false,//是否识别完成
    },

    getters: {

    },
    mutations: {
        setUseName(state, payload) {
            state.usename = payload.val;
        },
        changeDataClass(state, payload) {
            if (state.nowActiveArr.length > 0) {
                state.nowActiveArr[payload.val].active = true;
            }
        },
        changIndex(state, payload) {
            state.INDEX = payload.val;
        },
        changArr(state, payload) { //保存侧边栏
            state.nowActiveArr = payload.val;
            state.saveActiveArr = payload.val;
            // console.log(state.nowActiveArr)
        },
        changNow(state, payload) {//标题active状态
            if (payload.val == 3 || payload.val == 4) {
                state.nowActiveArr[payload.val].children[0].active = true;
            } else {
                state.nowActiveArr[payload.val].children[payload.val+1].active = true;
            }
        },
        changVkey1(state, payload) {//视频识别 prev锁
            state.vkey1 = payload.val
        },
        changVkey2(state, payload) {//视频识别 next锁
            state.vkey2 = payload.val
        },
        changIntellArr(state, payload){
            state.intellArr = payload.val;
        },
        changeDiscern(state, payload){
            state.isDiscernde = payload.val;
        }
    },
    actions: {

    }
})