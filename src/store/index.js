import Vue from 'vue';
import Vuex from 'vuex';
import timeline from './modules/timeline';
import player from './modules/player';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    timeline,
    player,
  },
  strict: debug,
});
