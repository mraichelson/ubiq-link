export const state = () => ({
  content: [],
})
export const mutations = {
  addContent: (state, payload) => {
    state.content = payload
  },
}
