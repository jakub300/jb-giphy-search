const state = {
  favorites: [],
};

const mutations = {
  add: ({ favorites }, gif) => {
    const addedObject = favorites.find(el => el.id === gif.id);

    if (addedObject) {
      return false;
    }

    favorites.push(gif);

    return true;
  },

  remove: ({ favorites }, id) => {
    const addedObject = favorites.find(el => el.id === id);

    if (!addedObject) {
      return false;
    }

    const indexOfAddedObject = favorites.indexOf(addedObject);
    favorites.splice(indexOfAddedObject, 1);
    return true;
  },
};

const getters = {
  byId: ({ favorites }) => {
    const obj = {};

    favorites.forEach(el => {
      obj[el.id] = el;
    });

    return obj;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
