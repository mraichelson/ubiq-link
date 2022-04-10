export const state = () => ({
  currentAd: 0,
  ads: [],
})
export const mutations = {
  addAds: (state, payload) => {
    state.ads = payload
  },
  updateCurrentAd: (state) => {
    let nextAd = state.currentAd + 1
    if (nextAd === state.ads.length) {
      nextAd = 0
    }
    state.currentAd = nextAd
  },
}
