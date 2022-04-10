<template>
  <div
    class="rounded overflow-hidden bg-slate-50 text-slate-600 border border-purple-400 space-y-2 max-w-[600px]"
  >
    <img :src="image" alt="" width="600" height="300" class="aspect-[2/1]" />
    <div class="p-2 space-y-2">
      <div class="text-xl">{{ title }}</div>
      <nuxt-content class="space-y-2" :document="body" />
    </div>
    <div
      class="p-2 border-t border-purple-300 text-xs bg-purple-100 text-purple-500"
    >
      <span
        class="text-[10px] -top-[1px] relative inline-block bg-purple-400 text-purple-50 py-0 px-2 rounded-sm mr-1"
        >Ad</span
      >
      {{ advertiser }}
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      adToDisplay: 0,
    }
  },
  computed: {
    ...mapState('ads', ['ads', 'currentAd']),
    ad() {
      return this.ads[this.adToDisplay]
    },
    title() {
      return this.ad.title
    },
    body() {
      return this.ad
    },
    image() {
      return this.ad.image
    },
    advertiser() {
      return this.ad.advertiser
    },
  },
  methods: {
    ...mapMutations('ads', ['updateCurrentAd']),
  },
  mounted() {
    this.adToDisplay = this.currentAd
    this.updateCurrentAd()
  },
}
</script>
