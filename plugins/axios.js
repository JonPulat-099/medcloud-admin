export default function ({ $axios, app, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['Content-Type'] = 'application/json'
    config.headers.common['Accept'] = 'application/json'
  })
  $axios.onError((error) => {
    const response = error?.response
    if (response?.status === 400) {
      if (response?.data?.error) {
        const { message } = response?.data?.error
        app.$toast.error(message)
      }
      if (response?.data?.errors) {
        const errors = response.data.errors
        for (const error in errors) {
          app.$toast.error(errors[error]?.message)
        }
      }

      console.log(response?.data?.error)
    }
  })
  $axios.onResponse((response) => {})
}
