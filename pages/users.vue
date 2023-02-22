<template>
  <v-card>
    <v-card-title primary-title class="flex-nowrap">
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn color="success">Add User</v-btn>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="users_headers"
                :items="user_list"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:item.fullname="{ item }">
                  {{ item.name }} {{ item.surname }}
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip
                    class="ma-1"
                    :color="item.is_confirmed == '1' ? 'green' : 'red'"
                  >
                    {{
                      item.is_confirmed == '1' ? 'Confirmed' : 'Not Confirmed'
                    }}
                    <v-icon class="ml-1">{{
                      item.is_confirmed == '1'
                        ? 'mdi-check-decagram-outline'
                        : 'mdi-close-octagon'
                    }}</v-icon>
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    :color="item.is_blocked == '0' ? 'green' : 'red'"
                  >
                    {{ item.is_blocked == '0' ? 'Not Blocked' : 'Blocked' }}
                    <v-icon class="ml-1">{{
                      item.is_blocked == '0'
                        ? 'mdi-account-check'
                        : 'mdi-account-cancel-outline'
                    }}</v-icon>
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        @click="blockUser(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon medium>
                          {{
                            item.is_blocked == '0'
                              ? 'mdi-lock'
                              : 'mdi-lock-open'
                          }}
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{
                      item.is_blocked == '0' ? 'Block user' : 'Unblock user'
                    }}</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        @click="replanishCash(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon medium> mdi-wallet-outline </v-icon>
                      </v-btn>
                    </template>
                    <span>Replenish</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        @click="editItem(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon medium> mdi-account-check </v-icon>
                      </v-btn>
                    </template>
                    <span>Confirm</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="inactive_headers"
                :items="inactive_users"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        @click="editItem(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon medium> mdi-account-check </v-icon>
                      </v-btn>
                    </template>
                    <span>Confirm</span>
                  </v-tooltip>
                </template></v-data-table
              >
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
            label="Amount"
            id="id"
            v-model="selected_user.amount"
            :disabled="disabled_form"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" :disabled="disabled_form" @click="cancelReplanish">Cancel</v-btn>
          <v-btn color="success" :disabled="disabled_form" @click="replanishUserChash()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'Users',
  layout: 'account',
  data() {
    return {
      tab: '',
      items: ['All Users', 'Inactive Users'],
      modal_replanish: false,
      disabled_form: false,
      users_headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
        },
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      inactive_headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Surname',
          align: 'center',
          sortable: false,
          value: 'surname',
        },
        {
          text: 'Patronym',
          align: 'center',
          sortable: false,
          value: 'patronym',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      selected_user: {
        id: '',
        amount: '',
      },
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
  beforeMount() {
    this.$store.dispatch('users/getUserList')
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
        }
      })
    },
  },
}
</script>
