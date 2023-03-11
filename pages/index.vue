<template>
  <v-layout row wrap class="ma-0 pa-5" justify-center>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-account-circle</v-icon>
          <p class="headline">Users</p>
          <v-chip color="cyan lighten-2">3</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-text-box-outline</v-icon>
          <p class="headline">Products</p>
          <v-chip color="cyan lighten-2">21</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-folder-settings-outline</v-icon>
          <p class="headline">Subjects</p>
          <v-chip color="cyan lighten-2">203</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-database-settings-outline</v-icon>
          <p class="headline">Systems</p>
          <v-chip color="cyan lighten-2">400</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-head-question-outline</v-icon>
          <p class="headline">Questions</p>
          <v-chip color="cyan lighten-2">3561</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 pa-2>
      <v-card>
        <v-card-text class="d-flex align-center flex-column">
          <v-icon large color="blue darken-1">mdi-folder-play-outline</v-icon>
          <p class="headline">Video Lessons</p>
          <v-chip color="cyan lighten-2">60</v-chip>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'account',
}
</script>
