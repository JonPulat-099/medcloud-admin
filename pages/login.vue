<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="phone"
                  prepend-icon="mdi-account"
                  name="phone"
                  label="Phone"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signIn">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { toExpression } from "@babel/types"

export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
    }
  },
  methods: {
    async signIn() {
      try {
        let resp = await this.$auth.loginWith('local', {
          data: {
            phone: this.phone,
            password: this.password,
          },
        })
        if (resp.status === 200) {
          const token = resp.data
          this.$auth.setUserToken(token?.access_token, token?.refresh_token)
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
