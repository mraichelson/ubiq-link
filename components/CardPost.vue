<template>
  <div
    class="rounded p-2 bg-white border border-slate-400 space-y-2 max-w-[600px]"
  >
    <div class="flex items-center gap-4 text-slate-500">
      <img
        :src="personImage"
        alt=""
        width="32"
        height="32"
        class="h-12 w-12 object-cover rounded-full border border-slate-500"
      />
      <div class="text-lg">{{ personName }}</div>
      <div v-if="personIsDead" class="text-[10px] ml-auto">
        30+ days since last login
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 inline-block ml-1 mb-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <div
      class="border-t border-b p-2 border-slate-200 -mx-2 space-y-2 text-slate-600"
    >
      <div class="text-xl">{{ title }}</div>
      <nuxt-content class="space-y-2" :document="body" />
      <div v-if="likedBy" class="text-slate-400 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 inline-block mb-0.5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
          />
        </svg>
        <span class="underline">{{ likedBy }}</span> liked this
      </div>
    </div>
    <div class="flex text-xs text-slate-500 gap-4">
      <div class="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
          />
        </svg>
        {{ upvotes }}
      </div>
      <div class="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
          />
        </svg>
        {{ downvotes }}
      </div>
      <div class="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {{ comments }}
      </div>
      <div class="text-xs text-slate-400 flex items-center gap-1 ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
        <div>{{ personLocation }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('people', ['people']),
    title() {
      return this.$props.content.title
    },
    body() {
      return this.$props.content
    },
    upvotes() {
      return this.$props.content.upvotes
    },
    downvotes() {
      return this.$props.content.downvotes
    },
    comments() {
      return this.$props.content.comments
    },
    likedBy() {
      return this.$props.content.liked_by
    },
    personName() {
      const user = this.people.filter(
        (person) => person.title === this.$props.content.author
      )
      return user[0].title
    },
    personImage() {
      const user = this.people.filter(
        (person) => person.title === this.$props.content.author
      )
      return user[0].image
    },
    personLocation() {
      const user = this.people.filter(
        (person) => person.title === this.$props.content.author
      )
      return user[0].enclave
    },
    personIsDead() {
      const user = this.people.filter(
        (person) => person.title === this.$props.content.author
      )
      return user[0].dead
    },
  },
}
</script>
