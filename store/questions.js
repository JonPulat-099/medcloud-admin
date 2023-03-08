export const state = () => ({})

export const mutations = {}

export const actions = {
  addQuestion(_, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/question/create', data)
      .then((res) => {
        isCompleted(res)
      })
      .catch((err) => {
        isCompleted(err)
      })
  },
}
