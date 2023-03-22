<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item>
          <v-btn color="success" @click="refreshToken">RefreshToken</v-btn>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-switch v-model="$vuetify.theme.dark" inset class="mt-5" :label="$vuetify.theme.dark ? 'Dark' : 'Light'"> </v-switch>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'Users',
          to: '/users',
        },
        {
          icon: 'mdi-folder-play-outline',
          title: 'Media Files',
          to: '/media-files',
        },
        {
          icon: 'mdi-text-box-outline',
          title: 'Products',
          to: '/products',
        },
        {
          icon: 'mdi-head-question-outline',
          title: 'Questions',
          to: '/questions',
        },
        {
          icon: 'mdi-folder-settings-outline',
          title: 'Course',
          to: '/courses',
        },
        {
          icon: 'mdi-database-settings-outline',
          title: 'Lessons',
          to: '/lessons',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Lab Values',
          to: '/lab-values',
        },
      ],
      miniVariant: false,
      right: true,
      title: 'Medcloud',
    }
  },
  methods: {
    refreshToken() {
      this.$auth.refreshTokens()
    },

    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
