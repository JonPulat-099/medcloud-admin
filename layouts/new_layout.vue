<template>
  <v-app light>
    <v-app-bar clipped-left fixed app color="primary" class="desktop__navbar">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        <img src="/logo.svg" alt="" width="80px" />
      </v-toolbar-title>
      <div class="desktop__navbar--sections">
        <nuxt-link
          v-for="(s, i) in sections"
          :key="`sections__${i}`"
          :to="s.to"
          class="white--text py-3 px-5"
        >
          {{ s.title }}
        </nuxt-link>
      </div>
      <div class="desktop__navbar--right d-flex align-center">
        <v-switch v-model="$vuetify.theme.dark" inset class="mt-5" dense>
        </v-switch>
        <v-btn icon plain>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn icon plain>
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </div>
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
  data() {
    return {
      fixed: false,
      sections: [
        {
          icon: 'mdi-apps',
          title: 'Products',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'Community',
          to: '/users',
        },
        {
          icon: 'mdi-folder-play-outline',
          title: 'Audience',
          to: '/media-files',
        },
        {
          icon: 'mdi-text-box-outline',
          title: 'Email',
          to: '/products',
        },
        {
          icon: 'mdi-head-question-outline',
          title: 'Coupons',
          to: '/questions',
        },
        {
          icon: 'mdi-folder-settings-outline',
          title: 'Sales',
          to: '/courses',
        },
        {
          icon: 'mdi-database-settings-outline',
          title: 'Other',
          to: '/lessons',
        },
      ],
    }
  },

  methods: {
    logout() {},
  },
}
</script>
<style lang="scss">
.desktop__navbar {
  .v-toolbar__content {
    padding: 0 10px !important;
    display: flex;
    justify-content: space-between;
  }

  &--sections {
    display: flex;
    flex-wrap: wrap;
    height: 100% !important;

    a {
      text-decoration: none !important;
      line-height: 40px;

      &.nuxt-link-active {
        background: #475268;
      }

      &:not(.nuxt-link-active):hover {
        color: #A2D9F7 !important;
      }
    }
  }

  .theme--light.v-input--switch .v-input--switch__track {
    color: #fff !important;
  }
  .theme--dark.v-input--switch .v-input--switch__track {
    color: #475268 !important;
  }

  .theme--light.v-input--switch .v-input--switch__thumb {
    color: #475268 !important;
  }
  .theme--dark.v-input--switch .v-input--switch__thumb {
    color: #fff !important;
  }
}
</style>
