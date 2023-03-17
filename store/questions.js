export const state = () => ({
  list: [],
  questions_list: [],
})

export const mutations = {
  setQuestions(state, list) {
    state.list = list
  },
}

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

  getQuestionByCourse({ commit }, payload) {
    const { id, isCompleted } = payload
    this.$axios
      .$get('/api/course/questions/' + id)
      .then((res) => isCompleted(res))
      .catch((err) => isCompleted(err))
  },

  getQuestionByLesson({ commit }, payload) {
    const { id, isCompleted } = payload
    this.$axios
      .$get('/api/lesson/questions/' + id)
      .then((res) => isCompleted(res))
      .catch((err) => isCompleted(err))
  },

  addAnswers(_, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/answer/bulk/create', {
        answers: data
      })
      .then((res) => {
        isCompleted(res)
      })
      .catch((err) => {
        isCompleted(err)
      })
  },
}
