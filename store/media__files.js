export const state = () => ({
  all_videos: [],
  all_images: [],
})

export const mutations = {
  setAllVideosList(state, list) {
    state.all_videos = list
  },

  setAllImagesList(state, list) {
    state.all_images = list
  },
}
export const actions = {
  async getAllVideos({ commit }) {
    try {
      const list = await this.$axios.$get('/api/all/videos')
      if (list?.length) {
        commit('setAllVideosList', list)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  },
  async getAllImages({ commit }) {
    try {
      const list = await this.$axios.$get('/api/all/photos')
      if (list?.length) {
        commit('setAllImagesList', list)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  },

  async uploadFiles({ commit }, payload) {
    const { toast, data, isCompleted } = payload
    const resp = await uploadFile(data, this.$axios)
    if (resp?.success) {
      toast.success('File successfully uploaded')
      isCompleted()
    }
  },
}

function uploadFile(data, axios) {
  const { type, title, file } = data
  const formdata = new FormData()
  formdata.append(type, file)
  formdata.append('title', title)

  return axios
    .$post('/api/upload/' + type, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(2, res)
    })
    .catch((err) => err)
}
