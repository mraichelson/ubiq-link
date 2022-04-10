<template>
  <div class="w-full h-screen relative">
    <template v-if="item">
      <transition name="card-swap">
        <card-crew
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-if="item.type === 'crew'"
          :content="item"
        />
        <card-lifeline
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-else-if="item.type === 'lifeline'"
          :content="item"
        />
        <card-post
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-else-if="item.type === 'post'"
          :content="item"
        />
        <card-comment
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-else-if="item.type === 'comment'"
          :content="item"
        />
        <card-share
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-else-if="item.type === 'share'"
          :content="item"
        />
        <card-ad
          class="w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          v-else
        />
      </transition>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  head() {
    return {
      title: 'UBIQ | Your feed',
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
  computed: {
    ...mapState('content', ['content']),
    item() {
      return this.contentHack[this.currentItem]
    },
  },
  mounted() {
    this.content.forEach((item, index) => {
      this.contentHack.push(item)
      if (index % this.betweenAds === 0) {
        this.contentHack.push({ type: 'ad' })
      }
    })
    const cycle = setInterval(this.cycleCards, this.cardDuration)
  },
  data() {
    return {
      currentItem: 0,
      betweenAds: 3,
      cardDuration: 10000,
      contentHack: [],
    }
  },
  methods: {
    cycleCards() {
      let nextItem = this.currentItem + 1
      if (nextItem >= this.contentHack.length) {
        nextItem = 0
      }
      this.currentItem = nextItem
    },
  },
}
</script>

<style lang="postcss">
.card-swap-enter-active,
.card-swap-leave-active {
  @apply transition-all duration-500;
  @apply opacity-100 mt-0 rotate-0;
}
.card-swap-enter {
  @apply opacity-0 -mt-12 -rotate-2;
}
.card-swap-leave-to {
  @apply opacity-0 mt-12 rotate-2;
}
</style>
