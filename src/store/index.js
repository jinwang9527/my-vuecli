import Vuex from 'vuex'
import Vue from "vue";
import user from './user'
import app from './app'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
});

export default store
