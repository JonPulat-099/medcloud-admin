<template>
  <v-card>
    <v-card-title primary-title class="flex-nowrap">
      All course
      <v-spacer></v-spacer>
      <v-btn color="success">Add User</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="courses"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip class="ma-1" :color="item.status == '1' ? 'green' : 'red'">
            {{ item.status == '1' ? 'active' : 'inactive' }}
            <v-icon class="ml-1">{{
              item.status == '1'
                ? 'mdi-check-decagram-outline'
                : 'mdi-close-octagon'
            }}</v-icon>
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="changeStatus(item)" v-bind="attrs" v-on="on">
                <v-icon medium>
                  {{ item.is_blocked == '0' ? 'mdi-lock' : 'mdi-lock-open' }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{
              item.is_blocked == '0' ? 'Block user' : 'Unblock user'
            }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Add Course </v-card-title>
        <v-card-text>
          <v-text-field
            label="Amount"
            id="id"
            :disabled="disabled_form"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" :disabled="disabled_form">Cancel</v-btn>
          <v-btn color="success" :disabled="disabled_form">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'Courses',
  layout: 'account',
  data() {
    return {
      tab: '',
      items: ['All Users', 'Inactive Users'],
      disabled_form: false,
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'user_id',
        },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Deadline',
          align: 'center',
          sortable: false,
          value: 'deadline',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    courses() {
      return this.$store.state.courses.all_courses
    },
  },
  watch: {},
  beforeMount() {
    this.$store.dispatch('courses/getAllCourses')
  },
  methods: {
    changeStatus(course) {
      let status = course.status
      if (status == '1') {
        this.$store.dispatch('courses/setInactiveStatus', {
          id: course.id,
          toast: this.$toast,
        })
      }
    },
  },
}
</script>
