<template>
  <v-card>
    <v-card-title primary-title> Create question </v-card-title>
    <v-card-text>
      <Editor />
    </v-card-text>
  </v-card>
</template>
<script>
import Editor from '@/components/TextEditor'
export default {
  name: 'Questions',
  layout: 'account',
  components: {
    Editor,
  },
}
</script>
<style lang=""></style>
