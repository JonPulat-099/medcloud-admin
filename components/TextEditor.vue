<template>
  <ClientOnly>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="content" :extensions="extensions" />

    <template #placeholder> Loading... </template>
  </ClientOnly>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      Image,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      History,
      Blockquote,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    content: "",
  }),
  watch: {
    content(val) {
      this.$emit("input", val)
    }
  }
}
</script>
<style lang="scss">
.tiptap-vuetify-editor {
  border: 1px solid #000;
  border-radius: 5px;
  overflow: hidden;
  .v-card {
    .v-sheet {
      box-shadow: none !important;
    }
  }
}
</style>
