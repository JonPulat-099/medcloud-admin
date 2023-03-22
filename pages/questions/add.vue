<template>
    <v-card class="questions__section" elevation="0">
      <v-card-title primary-title> Add question </v-card-title>
      <v-card-text>
        <v-layout row wrap ma-0>
          <v-combobox
            v-model="selected_lesson"
            label="Lesson"
            :items="lessons"
            item-text="name"
            dense
            outlined
            hide-details
          ></v-combobox>
        </v-layout>
        <v-divider class="my-4"></v-divider>
        <div>
          <h4 class="mb-3">Question</h4>
        </div>
        <c-keditor v-model="question" />
        <v-divider class="my-4"></v-divider>
        <div class="d-flex flex-wrap align-center justify-space-between mb-5">
          <h4 class="">Variants</h4>
          <div class="d-flex flex-wrap align-center">
            <v-checkbox
              label="WithLabel"
              v-model="with_label"
              hide-details
              class="ma-0"
            ></v-checkbox>
            <v-btn
              v-if="with_label"
              color="success"
              class="mx-2"
              @click="addColumns"
              >Add Column</v-btn
            >
            <v-btn v-if="with_label" color="red" @click="deleteColumn"
              >Delete Column</v-btn
            >
          </div>
        </div>
        <div>
          <v-layout row wrap ma-0 pa-0>
            <v-flex
              v-for="(a, i) in answers"
              :key="`answer_${i}`"
              xs12
              class="variant"
            >
              <div class="d-flex align-center mb-4">
                Variant:
                <v-checkbox
                  v-model="correct"
                  class="ma-0 pa-0 ml-2"
                  :label="a.variant"
                  :value="a.variant"
                  hide-details
                ></v-checkbox>
              </div>
              <v-layout row class="ma-0">
                <v-flex
                  v-for="(l, k) in a.list"
                  :key="`list_${k}`"
                  xs6
                  :class="{ border: a.list.length > 1 }"
                >
                  <div class="input__text">
                    <v-text-field
                      v-if="with_label"
                      class="mb-3"
                      label="Variant Label"
                      dense
                      outlined
                      hide-details
                      v-model="l.label"
                    ></v-text-field>
                    <v-text-field
                      label="Variant Text"
                      outlined
                      hide-details
                      dense
                      v-model="l.text"
                    ></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
              <div class="mt-4">
                <p>Choice ({{ a.variant }})</p>
                <c-keditor v-model="a.choice" />
              </div>
            </v-flex>
          </v-layout>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addQuestion">Add Question</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </template>
  <script>
  export default {
    name: 'Questions',
    layout: 'account',
    components: {
      Editor: () => import('@/components/TextEditor'),
      'c-keditor': () => import('@/components/Ckeditor.vue'),
    },
    data() {
      return {
        question: 'Question hello world',
        question_id: '',
        correct: false,
        with_label: false,
        selected_lesson: '',
        disabled_from: false,
        answers: [
          {
            variant: 'A',
            list: [
              {
                label: '',
                text: 'Variant A',
              },
            ],
            question_id: '',
            choice: '<p><strong>(Choice A) </strong>hEllo world  aaaaa lorem</p>',
            definition: 'A',
          },
          {
            variant: 'B',
            list: [
              {
                label: '',
                text: 'Variant B',
              },
            ],
            question_id: '',
            choice: '<p><strong>(Choice B) </strong>hEllo world  aaaaa lorem</p>',
            definition: 'B',
          },
          {
            variant: 'C',
            list: [
              {
                label: '',
                text: 'Variant C',
              },
            ],
            question_id: '',
            choice: '<p><strong>(Choice C) </strong>hEllo world  aaaaa lorem</p>',
            definition: 'C',
          },
          {
            variant: 'D',
            list: [
              {
                label: '',
                text: 'Variant D',
              },
            ],
            question_id: '',
            choice: '<p><strong>(Choice D) </strong>hEllo world  aaaaa lorem</p>',
            definition: 'D',
          },
        ],
      }
    },
    computed: {
      lessons() {
        return this.$store.state.lessons.all_lessons
      },
    },
    watch: {
      with_label(new_val, old_val) {
        console.log(new_val, old_val)
        if (new_val === false && old_val === true) {
          this.answers.forEach((elem) => {
            elem.list = [
              {
                ...elem.list[0],
                label: '',
              },
            ]
          })
        }
      },
    },
    beforeMount() {
      this.$store.dispatch('lessons/getAllLessons')
    },
    methods: {
      addColumns() {
        this.answers.forEach((elem) => {
          elem.list.push({
            label: '',
            text: '',
          })
        })
      },
  
      deleteColumn() {
        this.answers.forEach((elem) => {
          if (elem.list.length > 1) {
            elem.list.pop()
          }
        })
      },
  
      addQuestion() {
        try {
          // this.disabled_from = true
          const payload = {
            data: {
              product_id: String(this.selected_lesson.product_id),
              course_id: String(this.selected_lesson.course_id),
              lesson_id: String(this.selected_lesson.id),
              item_id: String(this.selected_lesson.item_id),
              text: this.question,
            },
            isCompleted: (res) => {
              if (res?.success) {
                this.$toast.success(res.success.message)
                this.question_id = res.success.id
                this.addAnswers()
              }
            },
          }
  
          this.$store.dispatch('questions/addQuestion', payload)
        } catch (error) {}
      },

      addAnswers() {
        console.log(1);
        const data = this.answers.map(x => ({
          question_id: String(this.question_id),
          label: JSON.stringify(x.list.map(y => y.label)),
          text: JSON.stringify(x.list.map(y => y.text)),
          choice: x.variant,
          definition: x.choice,
          correct: (x.variant === this.correct)
        }))

        const payload= {
          data,
          isCompleted: (res) => {
            console.log(res);
          }
        }

        this.$store.dispatch("questions/addAnswers", payload)
      }
    },
  }
  </script>
  <style lang="scss" src="@/assets/questions.scss"></style>
  