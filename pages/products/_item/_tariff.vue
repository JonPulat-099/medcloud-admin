<template>
  <v-card>
    <v-card-title primary-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn color="success">Add Tariff</v-btn>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: 'ProductItem',
  layout: 'account',
  data() {
    return {
        breadcrumbs: [
            {
                text: "Products",
                disabled: false,
                href: "/products"
            },
            {
                text: "Products name",
                disabled: false,
                href: "/products/test"
            },
            {
                text: "Tariffs",
                disabled: true,
                href: "/products/test/tariffs"
            },
        ]
    }
  },
}
</script>
<style lang=""></style>
