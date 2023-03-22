<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editor_data"
      :config="editor_config"
      @ready="onReady"
    ></ckeditor>
  </div>
</template>

<script>
let Decoupled
let CKEditor

if (process.client) {
  Decoupled = require('@ckeditor/ckeditor5-build-decoupled-document')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

export default {
  props: {
    initial_data: {
      type: String,
      default: '',
    },
  },
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: Decoupled,
      editor_data: '',
      editor_config: {},
    }
  },
  watch: {
    editor_data(val) {
      this.$emit('input', val)
    },
    initial_data(val) {
      this.editor_data = val
    }
  },
  beforeMount() {
    this.editor_data = this.initial_data
  },
  methods: {
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        )
    },
  },
}
</script>
<style lang="scss">
.ck.ck-content {
  min-height: 250px !important;
}
</style>
