<template>
  <div class="bg-gradient-to-br from-slate-50 to-slate-200">
    <ubiq-header />
    <div class="max-w-[600px] mx-auto space-y-4 p-4">
      <template v-for="(item, index) in contentHack">
        <card-crew v-if="item.type === 'crew'" :content="item" />
        <card-lifeline v-else-if="item.type === 'lifeline'" :content="item" />
        <card-post v-else-if="item.type === 'post'" :content="item" />
        <card-comment v-else-if="item.type === 'comment'" :content="item" />
        <card-share v-else-if="item.type === 'share'" :content="item" />
        <card-ad v-else />
      </template>
    </div>
    <global-footer />
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
  data() {
    return {
      currentItem: 0,
      betweenAds: 3,
      contentHack: [],
    }
  },
  computed: {
    ...mapState('content', ['content']),
  },
  mounted() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
    this.content.forEach((item, index) => {
      this.contentHack.push(item)
      if (index % this.betweenAds === 0) {
        this.contentHack.push({ type: 'ad' })
      }
    })
  },
  methods: {},
}
</script>
