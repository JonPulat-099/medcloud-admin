<template>
  <v-card>
    <v-card-title primary-title class="flex-nowrap">
      All Lessons
      <v-spacer></v-spacer>
      <v-btn color="success" @click="modal_add_lesson = true">Add Lesson</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="lessons"
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
      v-model="modal_add_lesson"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Add Lesson </v-card-title>
        <v-card-text class="py-2">
          <v-combobox
            v-model="course_id"
            :items="courses"
            item-value="id"
            item-text="name"
            dense
            outlined
            label="Course"
          ></v-combobox>
          <v-text-field
            v-model="lesson_name"
            label="Name"
            outlined
            dense
            :disabled="disabled_form"
          ></v-text-field>
          <div class="d-flex align-center flex-wrap">
            <v-checkbox label="Status: " v-model="lesson_status" class="mr-2"></v-checkbox>
            <v-chip :color="lesson_status ? 'green' : 'red'">{{  lesson_status ? 'Active' : 'Inactive'  }}</v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            :disabled="disabled_form"
            @click="modal_add_lesson = false"
            >Cancel</v-btn
          >
          <v-btn color="success" :disabled="disabled_form" @click="createLesson"
            >Create</v-btn
          >
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
      disabled_form: false,
      modal_add_lesson: false,
      lesson_name: '',
      course_id: '',
      lesson_status: false,
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
    lessons() {
      return this.$store.state.lessons.all_lessons
    },
    courses() {
      return this.$store.state.courses.all_courses
    },
  },
  watch: {},
  beforeMount() {
    this.$store.dispatch('lessons/getAllLessons')
  },
  mounted() {
    this.$store.dispatch('courses/getAllCourses')
  },
  methods: {
    changeStatus(course) {},
    createLesson() {
      this.disabled_form = true
      try {
        const payload = {
          data: {
            course_id: this.course_id.id,
            name: this.lesson_name,
            status: this.lesson_status ? 'active' : 'inactive'
          },
          isCompleted: (res) => {
            console.log(res)
            if (res?.success) {
              this.$toast.success(res.success.message)
              this.modal_add_lesson = false
            }
            this.disabled_form = false
          },
        }

        this.$store.dispatch('lessons/createLesson', payload)
      } catch (e) {
        this.disabled_form = false
        console.error(e)
      }
    },
  },
}
</script>
