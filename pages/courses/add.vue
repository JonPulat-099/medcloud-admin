<template lang="">
  <v-card>
    <v-card-title primary-title class="mb-5">
      <v-btn color="success" class="ma-0 pa-0" @click.prevent="$router.push('/courses')">
        <v-icon>mdi-back</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
      Add Course
    </v-card-title>
    <v-card-text>
      <v-layout row wrap justify-space-between ma-0>
        <v-flex xs12 sm5>
          <v-select
            v-model="product"
            :items="products"
            item-text="title"
            item-value="id"
            label="Product"
            :disabled="disabled_form"
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12 sm5>
          <v-select
            v-model="product_item"
            :items="product_items"
            item-value="id"
            item-text="title"
            label="Product item"
            :disabled="!product || disabled_form"
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="name"
            label="Name"
            placeholder="Course name"
            :disabled="disabled_form"
            outlined
          ></v-text-field>
        </v-flex>
        <v-btn color="success" @click="createCourse">create</v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'CourseAdd',
  layout: 'account',
  data() {
    return {
      product: '',
      product_item: '',
      disabled_form: false,
      name: '',
      deadline: '2023-05-05 00:00:00',
    }
  },
  computed: {
    products() {
      return this.$store.state.products.products
    },
    product_items() {
      return this.$store.state.products.product_items
    },
  },
  watch: {
    product(val) {
      if (val) {
        this.$store.dispatch('products/getProductByID', val)
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    createCourse() {
      this.disabled_form = true
      try {
        const payload = {
          data: {
            product_id: this.product,
            item_id: this.product_item,
            name: this.name,
            deadline: this.deadline,
          },
          isCompleted: (res) => {
            console.log(res)
            if (res?.success) {
                this.$toast.success(res.success.message)
                this.$router.push("/courses")
            }
            this.disabled_form = false
          },
        }

        this.$store.dispatch('courses/createCourse', payload)
      } catch (e) {
        this.disabled_form = false
        console.error(e)
      }
    },
  },
}
</script>
<style lang=""></style>
