export default function ({ $axios, app, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['Content-Type'] = 'application/json'
    config.headers.common['Accept'] = 'application/json'
  })
  $axios.onError((error) => {
    const response = error?.response
    if (response?.status === 400) {
      const { message } = response?.data?.error
      console.log(response?.data?.error)
      app.$toast.error(message)
    }
  })
  $axios.onResponse((response) => {})
}
