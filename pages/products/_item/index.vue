<template>
  <v-card elevation="0">
    <v-card-title primary-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="modal_create_productItem = true">Add Product Item</v-btn>
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
          <v-chip outlined :color="item.status == 'active' ? 'green' : 'red'">{{
            item.status
          }}</v-chip></template
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
            @click="$router.push(`/products/${product_info.id}/${item.id}/`)"
          >
            <v-icon>mdi-open-in-app</v-icon>
          </v-btn>
        </template></v-data-table
      >
    </v-card-text>
    <v-dialog
      v-model="modal_create_productItem"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Add Product Item </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 mt-4>
              <v-text-field
                v-model="product.title"
                label="Title"
                outlined
                :disabled="disabled_form"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                label="Active"
                v-model="product.status"
                :value="false"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="cancelProduct" :loading="disabled_form"
            >Cancel</v-btn
          >
          <v-btn color="success" @click="createProduct" :loading="disabled_form"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  name: 'ProductItem',
  layout: 'account',
  data() {
    return {
      modal_create_productItem: false,
      product: {
        title: '',
        status: '',
      },
      disabled_form: false,
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
  computed: {
    product_items() {
      return this.$store.state.products.product_items
    },
    product_info() {
      return this.$store.state.products.product_info
    },
    breadcrumbs() {
      return [
        {
          text: 'Products',
          disabled: false,
          href: '/products',
        },
        {
          text: this.product_info?.title || 'test',
          disabled: true,
          href: '/products/' + this.product_info?.id || '21',
        },
      ]
    },
  },
  beforeMount() {
    const params = this.$route.params
    console.log(params)
    if (params?.item) {
      this.$store.dispatch('products/getProductByID', params.item)
    }
  },
  methods: {
    cancelProduct() {
      this.modal_create_productItem = false
      this.product.title = this.product.status = ""
    },
    createProduct() {
      this.disabled_form = true
      const payload = {
        title: this.product.title,
        status: this.product.status ? 'active' : 'inactive',
        product_id: this.$route.params.item,
      }

      this.$store.dispatch("products/createProductItem", {
        data: payload,
        isCompleted: (res) => {
          if (res?.success) {
            this.$toast.success(res.success?.message)
            this.modal_create_productItem = false
            this.$store.dispatch('products/getProductByID', params.item)
          } else {
            this.$toast.error(res?.error?.message)
          }
          this.disabled_form = false
        }
      })
    },
  },
}
</script>
<style lang=""></style>
