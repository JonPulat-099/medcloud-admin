<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
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
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: Decoupled,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {},
    }
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
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
  * {
    color: #000;
  }
}
</style>
