export const state = () => ({
  products: [],
  product_items: [
    {
      id: 2,
      title: 'nisi porro',
      product_id: '3',
      status: 'active',
      created_at: '2023-02-21T11:55:23.000000Z',
      updated_at: '2023-02-21T11:55:23.000000Z',
    },
    {
      id: 4,
      title: 'deleniti asperiores',
      product_id: '3',
      status: 'active',
      created_at: '2023-02-21T11:55:23.000000Z',
      updated_at: '2023-02-21T11:55:23.000000Z',
    },
    {
      id: 6,
      title: 'qui enim',
      product_id: '3',
      status: 'inactive',
      created_at: '2023-02-21T11:55:23.000000Z',
      updated_at: '2023-02-21T11:55:23.000000Z',
    },
  ],
})

export const mutations = {
  setAllProducts(state, list) {
    state.products = list
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
      .catch((err) => {})
  },

  createProduct({ commit }, payload) {
    const { data, isCompleted } = payload
    this.$axios
      .$post('/api/product/create', data)
      .then((resp) => {
        isCompleted(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
