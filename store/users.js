export const state = () => ({
  user_list: [],
  inactive_users: [],
  user_products: [],
})

export const mutations = {
  setUserList(state, list) {
    state.user_list = list
  },

  setInactiveUsers(state, users) {
    state.inactive_users = users
  },

  setBlockField(state, { id, status }) {
    state.user_list = state.user_list.map((x) => {
      if (x.id == id) {
        return {
          ...x,
          is_blocked: +status,
        }
      }
      return x
    })
  },

  setUserCash(state, { id, amount }) {},

  setUserProducts(state, products) {
    state.user_products = products
  },
}

export const actions = {
  async getUserList({ commit }) {
    await this.$axios
      .$get('/api/clients/all')
      .then((result) => {
        if (result?.length) {
          commit('setUserList', result)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getInactiveUsers({ commit }, users) {
    this.$axios
      .$get('/api/user/inactive')
      .then((result) => {
        if (result?.length) {
          console.log(result)
          commit('setInactiveUsers', result)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  blockUser({ commit }, payload) {
    const { id, toast, status } = payload
    this.$axios
      .$post('/api/user/block', {
        id,
        type: String(+status),
      })
      .then((result) => {
        if (result?.success) {
          commit('setBlockField', { id, status })
          toast.success('Succesfully Blocked User')
        }
      })
      .catch((err) => {
        toast.error('SomethingError')
      })
  },

  replanishCashUser({ commit }, payload) {
    const { id, toast, amount, isCompleted } = payload
    this.$axios
      .$get('/api/replenish/balance', {
        params: {
          id,
          amount,
        },
      })
      .then((result) => {
        if (result?.success) {
          commit('setBlockField', { id, amount })
          isCompleted(result)
        }
      })
      .catch((err) => {
        toast.error('SomethingError')
      })
  },

  getUserProducts({ commit }, id) {
    this.$axios.$get('/api/client/product/get/' + id).then((res) => {
      if (res.success) {
        commit('setUserProducts', res?.success?.data ?? [])
      }
    })
  },

  addProduct({ dispatch }, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/client/product/subscribe', data)
      .then((res) => {
        isCompleted(res)
        if (res.success) {
          dispatch('getUserProducts', data.user_id)
        }
      })
      .catch((err) => {
        isCompleted(err)
      })
  },
}
