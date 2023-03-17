function deleteAllCookies() {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

export default function ({ $axios, app, redirect, store }) {
  $axios.onRequest((config) => {
    config.headers.common['Content-Type'] = 'application/json'
    config.headers.common['Accept'] = 'application/json'
  })
  $axios.onError(async (error) => {
    const response = error?.response
    console.log(2, response)
    if (response?.status === 400) {
      if (response?.data?.error) {
        const { message } = response?.data?.error
        app.$toast.error(message)
      } else if (response?.data?.errors) {
        const errors = response.data.errors
        for (const error in errors) {
          app.$toast.error(errors[error]?.message)
        }
      }

      // console.log(response?.data?.error)
    } else if (response?.status === 401) {
      console.log(3)
      store.state.auth.loggedIn = false
      deleteAllCookies()
      redirect('/login')
    } else if (response?.status === 500) {
      app.$toast.error('Server Error 🛑')
    }
  })
  $axios.onResponse((response) => {})
}
