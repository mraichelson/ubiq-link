<template>
  <div class="bg-gradient-to-br from-slate-50 to-slate-200">
    <ubiq-header />
    <div class="max-w-[600px] mx-auto space-y-4 py-4">
      <card-lifelines />
      <card-post />
      <card-comment />
      <card-share />
      <card-ad />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
