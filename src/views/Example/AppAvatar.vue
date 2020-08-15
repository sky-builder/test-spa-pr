<template>
    <img v-if="showUrl" :src="showUrl" alt="头像" onerror="this.src='http://haofenshu.kss.ksyun.com/teacher/icon-face.png'">
    <svg v-else xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
        <g>
            <template v-if="type =='circle'">
                <circle :cx="size/2" :cy="size/2" :r="size/2" :fill="bg"></circle>
            </template>
            <template v-else>
                <rect x="0" y="0" :fill="bg" :width="size" :height="size"></rect>
            </template>
            <text y="50%" x="50%" :fill="color" text-anchor="middle" dominant-baseline="central"
                  :style="styles">
                {{ showName }}
            </text>
        </g>
    </svg>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 64
    },
    url: String,
    defaultUrl: {
      type: String,
      default: 'http://haofenshu.kss.ksyun.com/teacher/icon-face.png'
    },
    type: {
      type: String, // circle ,rect
      default: 'circle'
    },
    bg: {
      type: String,
      default: '#DBDCE0'
    },
    color: {
      type: String,
      default: '#FAFAFA'
    }
  },
  data() {
    return {
      src: ''
    };
  },
  computed: {
    styles() {
      const fs = Math.ceil(this.size / 2.5);
      return `font-family: Hiragino_Sans_GB_W3; font-size: ${fs}px`;
    },
    showUrl() {
      return (
        this.url ||
                this.defaultUrl ||
                'http://haofenshu.kss.ksyun.com/teacher/icon-face.png'
      );
    },
    showName() {
      return this.name ? this.name.slice(0, 1) : '-';
    }
  },
  mounted() {
    this.src = this.showUrl;
  },
  watch: {
    url: function() {
      this.src = this.showUrl;
    }
  }
};
</script>
