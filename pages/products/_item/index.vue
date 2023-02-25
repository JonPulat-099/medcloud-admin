<template>
  <v-card>
    <v-card-title primary-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn color="success">Add Product Item</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="product_items"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:item.type="{ item }">
            <v-chip outlined class="pa-4">
              <v-icon left
                >mdi-{{
                  item.type == 'test'
                    ? 'file-document-check-outline'
                    : 'file-video-outline'
                }}</v-icon
              >
              {{ item.type }}
            </v-chip>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              outlined
              :color="item.status == 'active' ? 'green' : 'red'"
              >{{ item.status }}</v-chip
            ></template
          >

          <template v-slot:item.actions="{ item }">
            <v-btn color="deep-purple lighten-2" text>
              <v-icon>mdi-text-box-edit-outline</v-icon>
            </v-btn>
            <v-btn color="deep-purple lighten-2" text>
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="$router.push(`/products/1/${item.id}/`)"
            >
              <v-icon>mdi-open-in-app</v-icon>
            </v-btn>
          </template></v-data-table
        >
    </v-card-text>
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
          text: 'Products',
          disabled: false,
          href: '/products',
        },
        {
          text: 'Products name',
          disabled: true,
          href: '/products/test',
        },
      ],
      headers: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "id"
        },
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status"
        },
        {
          text: "Actions",
          align: "center",
          sortable: false,
          value: "actions"
        },
      ]
    }
  },
  computed: {
    product_items() {
      return this.$store.state.products.product_items
    }
  },
  beforeMount() {
    const params = this.$router.params
    this.$store.dispatch("products")
  }
}
</script>
<style lang=""></style>
