<template>
  <keep-alive>
    <v-card elevation="0">
      <v-card-title primary-title class="flex-nowrap">
        <!-- <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs> -->
        Audience
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined class="text-capitalize">
          <v-icon left>mdi-database-export</v-icon>
          Export All</v-btn
        >
        <v-btn color="primary" class="ma-2 text-capitalize"
          ><v-icon left>mdi-plus</v-icon> Add person</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="users_headers"
          :items="user_list"
          sort-by="calories"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:top>
            <v-row justify-space-between align-center class="ma-0 pa-4">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    class="text-capitalize d-block"
                    height="40"
                  >
                    <v-icon left>mdi-filter-variant</v-icon>
                    Filter
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-icon class="my-2 mr-3">
                      <v-icon>mdi-clock-time-three-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Last active</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon class="my-2 mr-3">
                      <v-icon>mdi-account-lock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Inactive</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-text-field
                outlined
                dense
                v-model="search"
                placeholder="Search product"
                class="mx-4"
                prepend-inner-icon="mdi-magnify"
                hide-details
              ></v-text-field>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                offset-y
                height="40"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    class="text-capitalize"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  >
                    <v-icon left>mdi-sort</v-icon>
                    Last active
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-icon class="my-2 mr-3">
                      <v-radio value="true" selected></v-radio>
                    </v-list-item-icon>
                    <v-list-item-title>Last active</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon class="my-2 mr-3">
                      <v-radio value="true" selected></v-radio>
                    </v-list-item-icon>
                    <v-list-item-title>Inactive</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </template>
          <template v-slot:item.fullname="{ item }">
            {{ item.name }} {{ item.surname }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              class="ma-1"
              :outlined="item.is_confirmed == '0'"
              :color="item.is_confirmed == '1' ? 'primary' : 'red'"
            >
              <v-icon left>{{
                item.is_confirmed == '1'
                  ? 'mdi-check-decagram-outline'
                  : 'mdi-close-octagon'
              }}</v-icon>
              {{ item.is_confirmed == '1' ? 'Confirmed' : 'Not Confirmed' }}
            </v-chip>

            <v-chip
              class="ma-1"
              :outlined="item.is_blocked == '0'"
              :color="item.is_blocked == '0' ? 'primary' : 'red'"
            >
              {{ item.is_blocked == '0' ? 'Not Blocked' : 'Blocked' }}
              <v-icon right>{{
                item.is_blocked == '0'
                  ? 'mdi-account-check'
                  : 'mdi-account-cancel-outline'
              }}</v-icon>
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu bottom left offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="deep-purple lighten-2"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  icon
                  small
                  class="rounded-lg"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="blockUser(item)">
                  <v-list-item-icon class="my-2 mr-3">
                    <v-icon medium>
                      {{
                        item.is_blocked == '0' ? 'mdi-lock' : 'mdi-lock-open'
                      }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{
                    item.is_blocked == '0' ? 'Block user' : 'Unblock user'
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="replanishCash(item)">
                  <v-list-item-icon class="my-2 mr-3">
                    <v-icon medium> mdi-wallet-outline </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>Replanish</v-list-item-title>
                </v-list-item>
                <v-list-item @click="editItem(item)">
                  <v-list-item-icon class="my-2 mr-3">
                    <v-icon medium> mdi-account-check </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>Confirm user</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              color="deep-purple lighten-2 text-capitalize"
              outlined
              small
              @click="changeUserDetails(item)"
            >
              Edit
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="modal_replanish"
        scrollable
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title> Replanish </v-card-title>
          <v-card-text>
            <v-text-field
            class="py-2"
              label="Amount"
              outlined
              dense
              id="id"
              v-model="selected_user.amount"
              :disabled="disabled_form"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              :disabled="disabled_form"
              @click="cancelReplanish"
              >Cancel</v-btn
            >
            <v-btn
              color="primary"
              :disabled="disabled_form"
              @click="replanishUserChash()"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="modal_user_details"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <user-details
          :user="user_details"
          @closeModal=";(modal_user_details = false), (user_details = {})"
        ></user-details>
      </v-dialog>
    </v-card>
  </keep-alive>
</template>

<script>
export default {
  name: 'Users',
  layout: 'account',
  components: {
    UserDetails: () =>
      import(/* webpackPrefetch: true */ '@/components/UserDetails.vue'),
  },
  data() {
    return {
      tab: '',
      items: ['All Users', 'Inactive Users'],
      modal_replanish: false,
      disabled_form: false,
      modal_user_details: false,
      search: '',
      users_headers: [
        {
          text: 'Fullname',
          align: 'center',
          sortable: false,
          value: 'fullname',
        },
        {
          text: 'Email',
          align: 'center',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Phone',
          align: 'center',
          sortable: false,
          value: 'phone',
        },
        {
          text: 'Balance',
          align: 'center',
          sortable: false,
          value: 'balance',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
        },
        { text: '', value: 'actions', sortable: false },
      ],
      selected_user: {
        id: '',
        amount: '',
      },
      user_details: {},
    }
  },
  computed: {
    inactive_users() {
      return this.$store.state.users.inactive_users
    },
    user_list() {
      return this.$store.state.users.user_list
    },
  },
  watch: {
    tab(val) {
      if (val == 1) {
        this.$store.dispatch('users/getInactiveUsers')
      } else {
        this.$store.dispatch('users/getUserList')
      }
    },
  },
  async fetch({ store }) {
    await store.dispatch('users/getUserList')
  },
  mounted() {
    const query = this.$route.query
    if (query.user) {
      this.user_details = this.user_list?.find((x) => x.id == query.user)

      if (this.user_details && Object.keys(this.user_details)?.length)
        this.modal_user_details = true
    }
  },
  methods: {
    async editItem(user) {
      try {
        if (user.id) {
          const activate = await this.$axios.$get(
            '/api/user/activate/' + user.id
          )
          console.log(active)
          if (activate.success) {
            this.$store.dispatch('users/getInactiveUsers')
            this.$store.dispatch('users/getUserList')
          } else if (activate?.error?.message) {
            this.$toast.error(activate.error.message)
          } else {
            this.$toast.error('Something went wrong')
          }
        }
      } catch (error) {}
    },

    blockUser(item) {
      const payload = {
        id: item.id,
        status: !Boolean(+item.is_blocked),
        toast: this.$toast,
      }
      this.$store.dispatch('users/blockUser', payload)
    },

    replanishCash(user) {
      this.selected_user.id = user.id
      this.modal_replanish = true
    },

    cancelReplanish() {
      this.selected_user.id = ''
      this.selected_user.amount = ''
      this.modal_replanish = false
    },

    replanishUserChash() {
      this.disabled_form = true
      this.$store.dispatch('users/replanishCashUser', {
        ...this.selected_user,
        toast: this.$toast,
        isCompleted: (res) => {
          if (res.success) {
            this.$toast.success(res.success.message)
            this.disabled_form = false
            this.cancelReplanish()
            this.$store.dispatch('users/getUserList')
          }
        },
      })
    },
    changeUserDetails(user) {
      this.modal_user_details = true
      this.user_details = user
      this.$router.replace({ query: { user: user.id } })
    },
  },
}
</script>
