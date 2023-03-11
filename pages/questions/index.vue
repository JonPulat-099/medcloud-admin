<template>
  <v-card elevation="0">
    <v-card-title primary-title>
      Questions
      <v-spacer></v-spacer>
      <v-btn color="success" @click="$router.push('/questions/add')">Add Question</v-btn>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap justify-space-between class="ma-0">
        <v-flex xs12 sm5 class="my-2">
          <v-combobox
            v-model="course"
            label="Courses"
            :items="courses"
            item-text="name"
            dense
            outlined
            hide-details
            :disabled="disabled_form"
          ></v-combobox>
        </v-flex>
        <v-flex xs12 sm5 class="my-2">
          <v-combobox
            v-model="lesson"
            label="Lessons"
            :items="lessons"
            item-text="name"
            dense
            outlined
            hide-details
            :disabled="disabled_form"
          ></v-combobox>
        </v-flex>

        <v-flex xs12 class="my-5">
          
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Question list",
  layout: 'account',
  data() {
    return {
      course: null,
      lesson: null,
      disabled_form: false
    }
  },
  computed: {
    courses() {
      return this.$store.state.courses.all_courses
    },
    lessons() {
      return this.$store.state.lessons.all_lessons
    },
    questions() {
      return this.$store.state.questions.list
    }
  },
  watch: {
    course(val) {
      if(val) {
        this.disabled_form = true
        this.$store.dispatch("lessons/getAllLessons")
        this.$store.dispatch("questions/getQuestionByCourse", {
          id: val.id,
          isCompleted: res => {
            console.log(res);
            if (res?.success && res?.success?.data) {
              this.$store.commit("questions/setQuestions", res.success.data)
            }
            this.disabled_form = false
          }
        })
      }
    },
    lesson(val) {
      if (val) {
        this.disabled_form = true
        this.$store.dispatch("questions/getQuestionByLesson", {
          id: val.id,
          isCompleted: res => {
            console.log(res);
            if (res?.success && res?.success?.data) {
              this.$store.commit("questions/setQuestions", res.success.data)
            }
            this.disabled_form = false
          }
        })
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("courses/getAllCourses")
  },
  methods: {
    // getQuestions()
  },
}
</script>
<style lang="">
  
</style>