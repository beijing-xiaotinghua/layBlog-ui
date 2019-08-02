import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
    'newlistfirst':true,
    'newArticlelist':[],
    'taglistfirst':true,
    'taglistcon':[],
};
// 创建一个对象存储一系列
const mutations = {
    updatenewlistcon (state, newArticlelist) {
        state.newArticlelist = newArticlelist
    },
    newlistfirst (state,newlistfirst) {
        state.newlistfirst=newlistfirst
    },
    updatetaglistcon (state,taglistcon) {
        state.taglistcon=taglistcon
    },
    taglistfirst (state,taglistfirst) {
        state.taglistfirst=taglistfirst
    },
};


const store = () => new Vuex.Store({
  state,
  mutations
})

export default store;
