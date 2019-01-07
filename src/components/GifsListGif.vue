<template>
  <article class="c-gifsListGif">
    <a :href="gif.url" target="_blank" :title="gif.title" class="c-gifsListGif__link">
      <picture>
        <source v-if="previewWebp" :srcset="previewWebp.url" type="image/webp" />
        <img
          class="c-gifsListGif__image"
          :src="previewGif.url"
          :width="previewGif.width"
          :height="previewGif.height"
          :alt="gif.title"
        />
      </picture>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    gif: {
      type: Object,
      required: true,
    },

    cornerAction: {
      type: String,
      default: 'toggle',
      validator: val => ['remove', 'toggle'].includes(val),
    },
  },

  computed: {
    previewGif() {
      return this.gif.images.preview_gif;
    },

    previewWebp() {
      return this.gif.images.preview_webp;
    },
  },
};
</script>

<style lang="scss">
.c-gifsListGif {
  width: 100%;
  display: flex;
  align-items: center;
}

.c-gifsListGif__link {
  width: 100%;
}

.c-gifsListGif__image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
