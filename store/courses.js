export const state = () => ({
  all_courses: [],
})

export const mutations = {
  setAllCourses(state, list) {
    state.all_courses = list
  },
}

export const actions = {
  getAllCourses({ commit }) {
    this.$axios
      .$get('/api/course/all')
      .then((resp) => {
        if (resp?.length) {
          commit('setAllCourses', resp)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  setActiveStatus(_) {},
  setInactiveStatus(_, payload) {
    const { id, toast } = payload
    this.$axios
      .$put('/api/course/inactivate/' + id, {
        id,
      })
      .then((resp) => {
        if (resp?.success) {
          toast.success(resp.success.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
