<template>
  <div class="w-full h-screen relative">
    <template v-if="item" mode="out-in">
      <transition name="card-swap">
        <card-crew
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-if="item.type === 'crew'"
          :content="item"
        />
        <card-lifeline
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-else-if="item.type === 'lifeline'"
          :content="item"
        />
        <card-post
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-else-if="item.type === 'post'"
          :content="item"
        />
        <card-comment
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-else-if="item.type === 'comment'"
          :content="item"
        />
        <card-share
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-else-if="item.type === 'share'"
          :content="item"
        />
        <card-ad
          class="w-[600px] absolute left-[50%] bottom-0 translate-x-[-300px]"
          v-else
        />
      </transition>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ObsEmbed',
  head() {
    return {
      title: 'UBIQ feed OBS embed',
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
      cardDuration: 20000,
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
  @apply transition-all duration-1000;
  @apply opacity-100 scale-100;
}
.card-swap-enter {
  @apply opacity-0 scale-75;
}
.card-swap-leave-to {
  @apply opacity-0 scale-75;
}
</style>
