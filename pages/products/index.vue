<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-btn icon v-if="show_list" @click="show_list = !show_list">
        <v-icon>mdi-view-comfy</v-icon>
      </v-btn>
      <v-btn icon v-else @click="show_list = !show_list">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      <v-btn color="success" class="ma-1" @click="modal_add_product = true"
        >Add Product</v-btn
      >
    </v-card-title>
    <v-card-text>
      <template v-if="show_list">
        <v-data-table
          :headers="headers"
          :items="products"
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
              @click="$router.push(`/products/${item.id}`)"
            >
              <v-icon>mdi-open-in-app</v-icon>
            </v-btn>
          </template></v-data-table
        >
      </template>

      <template v-else>
        <v-layout row wrap>
          <v-flex
            v-for="p in products"
            :key="`key_` + p.id"
            lg3
            md4
            sm6
            xs12
            pa-2
          >
            <v-card
              :loading="products.length == 0"
              class="mx-auto product__card"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-card-title>{{ p.title }}</v-card-title>

              <v-card-text>
                <div class="text-truncate">
                  {{ p.description }}
                </div>
                <div class="my-2">
                  Type:
                  <v-chip outlined class="pa-4">
                    <v-icon left
                      >mdi-{{
                        p.type == 'test'
                          ? 'file-document-check-outline'
                          : 'file-video-outline'
                      }}</v-icon
                    >
                    {{ p.type }}
                  </v-chip>
                </div>
                <div>
                  Status:
                  <v-chip
                    outlined
                    :color="p.status == 'active' ? 'green' : 'red'"
                    >{{ p.status }}</v-chip
                  >
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text>
                  <v-icon>mdi-text-box-edit-outline</v-icon>
                </v-btn>
                <v-btn color="deep-purple lighten-2" text>
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                <v-btn color="deep-purple lighten-2" text>
                  <v-icon>mdi-open-in-app</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
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
        <v-card-title primary-title> Add Product </v-card-title>
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
              <v-textarea
                v-model="product.description"
                outlined
                name="input-7-4"
                label="Outlined textarea"
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
      show_list: true,
      types: [
        {
          type: 'test',
          name: 'Qbank',
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
          text: 'Type',
          align: 'left',
          sortable: false,
          value: 'type',
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
        image: null
      }
    },
    createProduct() {
      this.disabled_form = true
      const formdata = new FormData()
      for (let key of Object.keys(this.product)) {
        if (key == 'status') {
          formdata.append(key, this.product[key] ? 'active' : 'inactive')
        } else {
          formdata.append(key, this.product[key])
        }
      }
      
      this.$store.dispatch('products/createProduct', {
        data: formdata,
        isCompleted: (res) => {
          if (res?.success) {
            this.$toast.success(res.success?.message)
            this.$store.dispatch('products/getAllProducts')
          } else {
            this.$$toast.error(res.error.message)
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
