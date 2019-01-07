<template>
  <div class="c-pageHome">
    <SearchBar :is-searching="isSearching" @search="search" />
    <section class="c-pageHome__section">
      <h2>Search Results</h2>
      <div v-if="info" class="c-pageHome__info">{{ info }}</div>
      <div v-else>
        <div class="c-pageHome__resultsWrapper"><GifsList :list="searchResults" /></div>
        <div v-if="hasMore" class="c-pageHome__moreWrapper">
          <button class="c-pageHome__more" :disabled="isLoadingMore" @click="loadMore">
            {{ loadMoreText }}
          </button>
        </div>
      </div>
    </section>
    <section class="c-pageHome__section">
      <h2>Favourites</h2>
      <!--  -->
    </section>
  </div>
</template>

<script>
import { search } from '@/api';
import SearchBar from '@/components/SearchBar';
import GifsList from '@/components/GifsList';

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
.c-pageHome {
  padding: 1rem;

  @include bp(medium) {
    padding: 1rem 3rem;
  }
}

.c-pageHome__section {
  margin-bottom: 2rem;
}

.c-pageHome__moreWrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
