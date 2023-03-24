<template>
  <v-card elevation="0">
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-btn color="primary" class="ma-1" @click="modal_add_product = true"
        ><v-icon left>mdi-plus</v-icon> New Product</v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="calories"
        class="elevation-1 pt-4"
        :search="search"
        :footer-props="{
          'items-per-page-options': [25, 50, -1],
        }"
        :items-per-page="25"
      >
        <template v-slot:top>
          <v-text-field
            outlined
            dense
            v-model="search"
            placeholder="Search product"
            class="mx-4 mt-2"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </template>
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
          <v-chip color="primary" v-if="item.status == 'active'">
            <v-icon left> mdi-check-circle </v-icon>
            Published
          </v-chip>
          <v-btn
            v-else
            color="primary"
            text
            tile
            class="text-body-2 rounded-lg text-capitalize"
          >
            <v-icon color="primary" left>mdi-circle-outline</v-icon>
            <span>Draft</span>
          </v-btn>
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
              <template v-for="(f, i) in features">
                <v-list-item
                  v-if="f.to"
                  :key="`features__${i}`"
                  :to="f.to"
                  nuxt
                >
                  <v-list-item-icon class="my-2 mr-3">
                    <v-icon>{{ f.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{ f.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-else
                  :key="`features__${i}`"
                  :class="`${f.color}--text`"
                >
                  <v-list-item-icon class="my-2 mr-3">
                    <v-icon :color="f.color">{{ f.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{ f.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
          <v-btn
            color="deep-purple lighten-2 text-capitalize"
            outlined
            small
            @click="$router.push(`/products/${item.id}/edit`)"
          >
            Edit
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog
      v-model="modal_add_product"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> New Product </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 mt-4>
              <v-text-field
                v-model="product.title"
                label="Name"
                outlined
                :disabled="disabled_form"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="product.description"
                outlined
                name="input-7-4"
                label="Description"
                :disabled="disabled_form"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="types"
                v-model="product.type"
                label="Product type"
                item-value="type"
                outlined
                :disabled="disabled_form"
              >
                <template v-slot:selection="{ item }">
                  {{ item.name }}
                </template>
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
              </v-select>
            </v-flex>
            <v-flex xs12 sm6 class="d-flex justify-center">
              <v-checkbox
                label="Active"
                v-model="product.status"
                :value="false"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <v-file-input
                v-model="product.image"
                show-size
                label="File input"
                truncate-length="30"
                :disabled="disabled_form"
              ></v-file-input>
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
  name: 'Products',
  layout: 'account',
  data() {
    return {
      modal_add_product: false,
      disabled_form: false,
      search: '',
      types: [
        {
          type: 'test',
          name: 'Qbank (test)',
        },
        {
          type: 'lesson',
          name: 'Video lesson',
        },
      ],
      product: {
        title: '',
        description: '',
        type: '',
        status: '',
        image: null,
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'title',
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'type',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: true,
          value: 'status',
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      features: [
        {
          title: 'View Product',
          icon: 'mdi-view-array-outline',
          to: '#',
          color: 'primary',
        },
        {
          title: 'View Sales page',
          icon: 'mdi-briefcase-eye',
          to: '#',
          color: 'primary',
        },
        {
          title: 'Export subscribers',
          icon: 'mdi-database-export',
          to: '#',
          color: 'primary',
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          to: '',
          color: 'red',
        },
      ],
    }
  },

  computed: {
    products() {
      return this.$store.state.products.products
    },
  },

  beforeMount() {
    this.$store.dispatch('products/getAllProducts')
  },

  methods: {
    cancelProduct() {
      this.modal_add_product = false
      this.product = {
        title: '',
        description: '',
        type: '',
        status: '',
        image: null,
      }
    },
    createProduct() {
      this.disabled_form = true
      const formdata = new FormData()
      for (let key of Object.keys(this.product)) {
        if (key == 'status') {
          formdata.append(key, this.product[key] ? 'active' : 'inactive')
        } else {
          if (this.product[key]) formdata.append(key, this.product[key])
        }
      }

      this.$store.dispatch('products/createProduct', {
        data: formdata,
        isCompleted: (res) => {
          if (res?.success) {
            this.$toast.success(res.success?.message)
            this.$store.dispatch('products/getAllProducts')
            this.modal_add_product = false
          } else {
            this.$toast.error(res?.error?.message)
          }
          this.disabled_form = false
        },
      })
    },
  },
}
</script>
<style lang="scss">
.product__card {
  height: 100%;
}
</style>
