import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import favorites from './modules/favorites';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence();

const store = new Vuex.Store({
  modules: {
    favorites,
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production',
});

if (module.hot) {
  module.hot.accept(['./modules/favorites'], () => {
    console.log('hot vuex');

    // eslint-disable-next-line global-require
    const newFavorites = require('./modules/favorites').default;

    store.hotUpdate({
      modules: {
        favorites: newFavorites,
      },
    });
  });
}

export default store;
