/**
 * Index.js
 */
export const actions = {
  // nuxtServerInit() is executed during site build.
  async nuxtServerInit({ commit }, context) {
    const content = []
    const comments = await context.$content('comment').fetch()
    comments.forEach((comment) => {
      comment.type = 'comment'
      content.push(comment)
    })
    const crews = await context.$content('crews').fetch()
    crews.forEach((crew) => {
      crew.type = 'crew'
      content.push(crew)
    })
    const lifelines = await context.$content('lifelines').fetch()
    lifelines.forEach((lifeline) => {
      lifeline.type = 'lifeline'
      content.push(lifeline)
    })
    const posts = await context.$content('post').fetch()
    posts.forEach((post) => {
      post.type = 'post'
      content.push(post)
    })
    const shares = await context.$content('share').fetch()
    shares.forEach((share) => {
      share.type = 'share'
      content.push(share)
    })
    commit('content/addContent', content)

    /**
     * Put PEOPLE in their separate store
     */
    const people = await context.$content('person').fetch()
    commit('people/addPeople', people)
    /**
     * Put ADS in their separate store
     */
    const ads = await context.$content('ad').fetch()
    ads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    commit('ads/addAds', ads)
  },
}
