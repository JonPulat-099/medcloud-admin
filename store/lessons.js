export const state = () => ({
  all_lessons: [],
})

export const mutations = {
  setAllLessons(state, list) {
    state.all_lessons = list
  },
}

export const actions = {
  getAllLessons({ commit }) {
    this.$axios
      .$get('/api/lesson/all')
      .then((resp) => {
        if (resp?.length) {
          commit('setAllLessons', resp)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  setActiveStatus(_) {},
  setInactiveStatus(_, payload) {},
}
