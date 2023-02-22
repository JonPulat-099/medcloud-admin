import Vue from 'vue'

export default () => {
  Vue.filter('prettifyDate', (val) => {
    var date = new Date(val)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let second =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`
  })
}
