export const state = () => ({
  all_values: [],
})

export const getters = {
  getAllLabels: (state) =>
    state.all_values?.map((x) => {
      delete x.infos
      return x
    }),
  getContentByLabel: (state) => (label_id) =>
    state.all_values?.find((x) => x.id == label_id),
}

export const mutations = {
  setAllValues(state, values) {
    state.all_values = values
  },
}
/**
 * "data": [
            {
                "id": 1,
                "text": "Serum",
                "status": "active",
                "created_at": "2023-03-21T19:14:06.000000Z",
                "updated_at": "2023-03-21T19:14:06.000000Z",
                "infos": [
                    {
                        "id": 1,
                        "label_id": "1",
                        "key": "Amylase",
                        "value": "25-125 U/L",
                        "status": "active"
                    }
                ]
            }
        ]

 */
export const actions = {
  async getAllValues({ commit }) {
    await this.$axios
      .$get('/api/lab/all')
      .then((res) => {
        if (res?.success && res?.success?.data) {
          commit('setAllValues', res.success.data)
        }
      })
      .catch((err) => {
        // do nothing
      })
  },
}
