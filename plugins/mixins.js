import Vue from 'vue'

export default ({ app, store, route }, ctx, inject) => {
  Vue.mixin({
    computed: {
      formRules() {
        return {
          required: (value) => !!value || 'Required field',
        }
      },
    },
  })
}
