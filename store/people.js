export const state = () => ({
  people: [],
})
export const mutations = {
  addPeople: (state, payload) => {
    state.people = payload
  },
}
