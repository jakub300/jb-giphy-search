<template>
  <article class="c-gifsListGif" :class="[`action-${cornerAction}`, { isFavorited }]">
    <div class="c-gifsListGif__inner">
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
      <div class="c-gifsListGif__corner">
        <button class="c-gifsListGif__cornerButton">
          <svg
            v-if="currentIcon"
            :key="currentIconName"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="currentIcon.viewBox"
            class="c-gifsListGif__cornerIcon"
          >
            <title>{{ currentIcon.title }}</title>
            <path :d="currentIcon.path"></path>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
const icons = {
  starOutline: {
    title: 'Add to favorites',
    viewBox: '0 0 576 512',
    path:
      'M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z',
  },

  starSolid: {
    title: 'Remove from favorites',
    viewBox: '0 0 576 512',
    path:
      'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z',
  },

  x: {
    title: 'Remove from favorites',
    viewBox: '0 0 352 512',
    path:
      'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z',
  },
};

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

    icons: () => icons,

    isFavorited() {
      return false;
    },

    currentIconName() {
      if (this.cornerAction === 'remove') {
        return 'x';
      }

      return this.isFavorited ? 'starSolid' : 'starOutline';
    },

    currentIcon() {
      return this.icons[this.currentIconName];
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

.c-gifsListGif__inner {
  width: 100%;
  position: relative;
}

.c-gifsListGif__link {
  display: block;
}

.c-gifsListGif__image {
  display: block;
  width: 100%;
  height: auto;
}

.c-gifsListGif__corner {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0 2rem 2rem;
}

.c-gifsListGif__cornerButton {
  @include btn-reset;
  display: block;
  cursor: pointer;
  padding: 5px;

  @media (hover: hover) {
    transition: opacity 0.2s;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  .c-gifsListGif.action-delete & {
    color: $color-black;
  }

  .c-gifsListGif.action-toggle & {
    color: $color-gold;
  }
}

.c-gifsListGif__cornerIcon {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
