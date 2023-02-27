<template>
  <v-card class="questions__section">
    <v-card-title primary-title> Create question </v-card-title>
    <v-card-text>
      <Editor v-model="question" />
      <v-divider class="my-4"></v-divider>
      <h4 class="mb-8">Variants</h4>
      <div>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-checkbox v-model="correct" label="A"></v-checkbox>
          </v-flex>
          <v-flex xs11>
            <v-text-field label="Variant Label" outlined></v-text-field>
            <v-text-field label="Variant Text" outlined></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-checkbox v-model="correct" label="B"></v-checkbox>
          </v-flex>
          <v-flex xs11>
            <v-text-field label="Variant Label" outlined></v-text-field>
            <v-text-field label="Variant Text" outlined></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-checkbox v-model="correct" label="C"></v-checkbox>
          </v-flex>
          <v-flex xs11>
            <v-text-field label="Variant Label" outlined></v-text-field>
            <v-text-field label="Variant Text" outlined></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-checkbox v-model="correct" label="D"></v-checkbox>
          </v-flex>
          <v-flex xs11>
            <v-text-field label="Variant Label" outlined></v-text-field>
            <v-text-field label="Variant Text" outlined></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Questions',
  layout: 'account',
  components: {
    Editor: () => import('@/components/TextEditor'),
  },
  data() {
    return {
      question: '',
      correct: false,
    }
  },
}
</script>
<style lang="scss" src="@/assets/questions.scss"></style>
