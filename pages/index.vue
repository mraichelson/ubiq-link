<template>
  <div class="bg-gradient-to-br from-slate-50 to-slate-200">
    <ubiq-header />
    <div class="max-w-[600px] mx-auto space-y-4 py-4">
      <template v-for="(item, index) in sortedContent">
        <card-crew v-if="item.type === 'crew'" :content="item" />
        <card-lifeline v-else-if="item.type === 'lifeline'" :content="item" />
        <card-post v-else-if="item.type === 'post'" :content="item" />
        <card-comment v-else-if="item.type === 'comment'" :content="item" />
        <card-share v-else :content="item" />
        <template v-if="index % 3 == 0">
          <card-ad />
        </template>
      </template>
    </div>
    <global-footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    sortedContent() {
      // const tmpContent = this.content
      // return tmpContent.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      return this.content
    },
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
  },
}
</script>
