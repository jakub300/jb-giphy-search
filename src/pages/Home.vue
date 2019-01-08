<template>
  <div class="c-pageHome">
    <SearchBar :is-searching="isSearching" @search="search" />
    <section class="c-pageHome__section c-pageHome__results">
      <h2 class="c-pageHome__heading">Search Results</h2>
      <div v-if="info" class="c-pageHome__info">{{ info }}</div>
      <div v-else>
        <div class="c-pageHome__listWrapper"><GifsList :list="searchResults" /></div>
        <div v-if="hasMore" class="c-pageHome__moreWrapper">
          <button class="c-pageHome__more" :disabled="isLoadingMore" @click="loadMore">
            {{ loadMoreText }}
          </button>
        </div>
      </div>
    </section>
    <section class="c-pageHome__section c-pageHome__favorites">
      <h2 class="c-pageHome__heading">Favorites</h2>
      <div v-if="favorites.length === 0" class="c-pageHome__info">Nothing here yet.</div>
      <div v-else>
        <div class="c-pageHome__listWrapper">
          <GifsList :list="favorites" corner-action="remove" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { search } from '@/api';
import SearchBar from '@/components/SearchBar';
import GifsList from '@/components/GifsList';
import { mapState } from 'vuex';

export default {
  components: {
    SearchBar,
    GifsList,
  },

  data() {
    return {
      isSearching: false,
      searchResults: [],
      activeQuery: '',
      hasMore: false,
      searchError: '',
      searchCount: 0,
      isLoadingMore: false,
    };
  },

  computed: {
    ...mapState('favorites', ['favorites']),

    info() {
      const { error, searchResults, searchCount } = this;

      if (error) {
        return `Error when downloading: ${error}`;
      }

      if (!searchCount) {
        return 'Use search bar above to search for GIFs';
      }

      if (searchResults.length === 0) {
        return 'Sorry, nothing found';
      }

      return '';
    },

    loadMoreText() {
      return this.isLoadingMore ? 'Loading...' : 'Load More';
    },
  },

  methods: {
    search(query) {
      if (this.isSearching) {
        return;
      }

      if (!query) {
        this.searchResults = [];
        return;
      }

      this.isSearching = true;
      this.activeQuery = query;
      this.searchError = '';

      search({ q: query })
        .then(({ data: { data, pagination } }) => {
          this.searchCount += 1;
          this.searchResults = data;
          this.hasMore = pagination.total_count > pagination.count + pagination.offset;
        })
        .finally(() => {
          this.isSearching = false;
        });
    },

    loadMore() {
      const { activeQuery, searchResults } = this;

      this.isLoadingMore = true;
      search({ q: activeQuery, offset: searchResults.length })
        .then(({ data: { data, pagination } }) => {
          if (!this.activeQuery === activeQuery) {
            return;
          }

          this.searchResults.push(...data);
          this.hasMore = pagination.total_count > pagination.count + pagination.offset;
        })
        .finally(() => {
          this.isLoadingMore = false;
        });
    },
  },
};
</script>

<style lang="scss">
.c-pageHome__section {
  padding: 1rem;

  @include bp(medium) {
    padding: 1rem 3rem;
  }
}

.c-pageHome__results {
  padding-bottom: calc(35vh + 1rem);
}

.c-pageHome__heading {
  margin-bottom: 1rem;
}

.c-pageHome__moreWrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.c-pageHome__favorites {
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: auto;
  width: 100%;
  max-height: 35vh;
  border-top: 1px solid $color-black;

  background-color: $color-white;
}
</style>
