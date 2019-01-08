import Vue from 'vue';
import Vuex from 'vuex';

import favorites from './modules/favorites';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    favorites,
  },
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
