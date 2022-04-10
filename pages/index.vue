<template>
  <div class="bg-gradient-to-br from-slate-50 to-slate-200">
    <ubiq-header />
    <div class="max-w-[600px] mx-auto space-y-4 py-4">
      <template v-for="(item, index) in content">
        <div>index {{ index }} is a {{ item.type }}</div>
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
    <footer
      class="text-xs text-center border-t border-slate-400 p-4 text-slate-500 bg-slate-100 leading-6"
    >
      <a
        href="http://redmarketsrpg.com"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >Red Markets</a
      >
      was written by Caleb Stokes and is published by Hebanon Games.<br />
      You can watch
      <span class="font-semibold">Red Markets: The Incidentals</span> by
      <a
        href="https://highshelfcollective.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >High Shelf Collective</a
      >
      on
      <a
        href="https://twitch.tv/highshelfcollective"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >Twitch</a
      >
      or
      <a
        href="https://www.youtube.com/playlist?list=PLW2YGZCblxbf18OhbxDjvyBMBNrTUlWOH"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >YouTube</a
      >.<br />
      Site by
      <a
        href="https://twitter.com/mraichelson"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >@MRaichelson</a
      >
      who sometimes also makes things as
      <a
        href="https://wemakewonderfulthings.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >We Make Wonderful Things, LLC</a
      >.
    </footer>
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
