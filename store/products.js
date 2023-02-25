export const state = () => ({
  products: [],
  product_items: [],
  product_info: {},
  product_item_tariffs: [],
})

export const mutations = {
  setAllProducts(state, list) {
    state.products = list
  },

  setProductInfo(state, info) {
    state.product_info = info
    state.product_items = info.items
  },
}

export const actions = {
  getAllProducts({ commit }) {
    this.$axios
      .$get('/api/product/all')
      .then((resp) => {
        if (Array.isArray(resp) && resp?.length) {
          commit('setAllProducts', resp)
        } else {
          console.log('SomeThing error: ', resp)
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
  },

  getProductByID({ commit }, id) {
    this.$axios
      .$get('/api/product/get/' + id)
      .then((resp) => {
        console.log(11, resp)
        if (Object.keys(resp)?.length) {
          commit('setProductInfo', resp)
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
  },

  getProductTariffs({ commit }) {
    this.$axios.$get('/')
  },

  createProduct({ commit }, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/product/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        isCompleted(resp)
      })
      .catch((err) => {
        isCompleted(err)
      })
  },

  createProductItem({ commit }, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/product/item/create', data)
      .then((resp) => {
        isCompleted(resp)
      })
      .catch((err) => {
        isCompleted(err)
      })
  },
}
