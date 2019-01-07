<template>
  <div class="c-gifsList">
    <div v-for="gif in list" :key="gif.id" class="c-gifsList__element">
      <GifsListGif :gif="gif" :cornerAction="cornerAction" />
    </div>
  </div>
</template>

<script>
import GifsListGif from './GifsListGif';

export default {
  components: {
    GifsListGif,
  },

  props: {
    list: {
      type: Array,
      required: true,
    },

    cornerAction: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
.c-gifsList {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;

  @include bp(xlarge) {
    justify-content: space-between;
  }
}

.c-gifsList__element {
  display: flex;
  padding: 1rem;
  width: 100%;

  @include bp(medium) {
    width: 33.33332%;
  }

  @include bp(large) {
    width: 25%;
  }

  @include bp(xlarge) {
    width: auto;
    min-width: 25rem;
    max-width: 40rem;
  }
}
</style>
