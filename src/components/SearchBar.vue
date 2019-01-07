<template>
  <div class="c-searchBar">
    <div class="c-searchBar__spacer"></div>
    <div class="c-searchBar__fixed">
      <div class="c-searchBar__inner">
        <form @submit.prevent="search" class="c-searchBar__form">
          <div class="c-searchBar__inputWrapper">
            <input v-model="searchQuery" class="c-searchBar__input" />
          </div>
          <div class="c-searchBar__buttonWrapper">
            <button type="submit" class="c-searchBar__button" :disabled="isSearching">
              {{ buttonText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSearching: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return { searchQuery: '' };
  },

  methods: {
    search() {
      this.$emit('search', this.searchQuery);
    },
  },

  computed: {
    buttonText() {
      return this.isSearching ? 'Searching...' : 'Search';
    },
  },
};
</script>

<style lang="scss">
.c-searchBar__spacer,
.c-searchBar__fixed {
  height: 3rem;
}

.c-searchBar__fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $color-white;

  display: flex;
  align-items: center;
}

.c-searchBar__inner {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.c-searchBar__form {
  display: flex;
}

.c-searchBar__inputWrapper {
  flex: 1 1 auto;
  padding-right: 1rem;
}

.c-searchBar__input {
  display: block;
  width: 100%;
}

.c-searchBar__button {
  width: 9rem;
}
</style>
