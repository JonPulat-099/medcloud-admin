<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 class="justify-center">
          <v-card class="elevation-0">
            <v-toolbar dark color="primary" class="text-center elevation-0">
              <v-toolbar-title class="text-center mx-auto"
                >medcloud</v-toolbar-title
              >
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm" class="py-5">
                <p class="primary--text text-center ma-0 text-h6">
                  Phone or Email
                </p>
                <v-text-field
                  v-model="phone"
                  prepend-inner-icon="mdi-account-circle-outline"
                  placeholder="Type your phone or email"
                  type="text"
                  :rules="[formRules.required]"
                ></v-text-field>
                <p class="primary--text text-center ma-0 text-h6">Password</p>
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-inner-icon="mdi-lock-open-outline"
                  placeholder="Type your password"
                  type="password"
                  :rules="[formRules.required]"
                  @keydown.enter="signIn"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="grey ma-1" icon large v-bind="attrs" v-on="on">
                    <v-icon color="white">mdi-help</v-icon>
                  </v-btn>
                </template>
                <span>Help</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="secondary ma-1"
                    icon
                    @click="signIn"
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white" large>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </template>
                <span>Sign In</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
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
        if (this.$refs.loginForm.validate()) {
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
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
