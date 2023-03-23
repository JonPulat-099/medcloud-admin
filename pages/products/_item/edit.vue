<template>
  <v-card elevation="0" class="product__edit">
    <v-card-title primary-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-spacer></v-spacer>
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
            <v-list-item v-if="f.to" :key="`features__${i}`" :to="f.to" nuxt>
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
        color="deep-purple lighten-2"
        outlined
        small
        class="mx-3 text-capitalize"
        >Done</v-btn
      >
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple lighten-2"
            v-bind="attrs"
            v-on="on"
            small
            class="text-capitalize"
          >
            Publish
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template>
            <v-list-item>
              <v-list-item-title>Publish</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Draft</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <v-tabs>
        <v-tab>Product Items</v-tab>
        <v-tab @click="$router.push(`/products/${$route.params.item}/details/edit`)">Details</v-tab>
      </v-tabs>

      <div v-if="product_items.length" class="actions__list">
        <v-btn
          class="text-capitalize"
          color="primary"
          text
          @click="modal_create_productItem = true"
        >
          <v-icon left class="grey lighten-1 rounded-lg">mdi-plus</v-icon>
          New product item
        </v-btn>
      </div>

      <v-data-table
        v-if="product_items.length"
        :headers="headers"
        :items="product_items"
        sort-by="calories"
        class="elevation-1"
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
            placeholder="Search product item"
            class="mx-4"
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
            @click="$router.push(`/products/${product_info.id}/${item.id}/`)"
          >
            Edit
          </v-btn>
        </template></v-data-table
      >
      <div v-else class="actions__list d-flex flex-column align-center py-8">
        <h3 class="text-h6 black--text">Your product items will appear here</h3>
        <h4 class="text-subtitle-1 mb-5">
          This is where you'll create and manage your product items
        </h4>
        <v-btn
          class="text-capitalize"
          color="primaru"
          text
          @click="modal_create_productItem = true"
        >
          <v-icon left class="grey lighten-1 rounded-lg">mdi-plus</v-icon>
          New product item
        </v-btn>
      </div>
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
        <v-card-title primary-title> New Product Item </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 mt-4>
              <v-text-field
                v-model="product.title"
                label="Title"
                outlined
                dense
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
          <v-btn color="primary" @click="cancelProduct" :loading="disabled_form"
            >Cancel</v-btn
          >
          <v-btn color="primary" @click="createProduct" :loading="disabled_form"
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
      search: '',
      product: {
        title: '',
        status: '',
      },
      disabled_form: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'title',
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
    product_items() {
      return this.$store.state.products.product_items ?? []
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
          text: this.product_info?.title || 'Product item',
          disabled: true,
          href: '/products/' + this.product_info?.id || '1',
        },
        {
          text: 'Edit',
          disabled: true,
          href: '',
        },
      ]
    },
  },
  beforeMount() {
    const params = this.$route.params
    if (params?.item) {
      this.$store.dispatch('products/getProductByID', params.item)
    }
  },
  methods: {
    cancelProduct() {
      this.modal_create_productItem = false
      this.product.title = this.product.status = ''
    },
    createProduct() {
      this.disabled_form = true
      const payload = {
        title: this.product.title,
        status: this.product.status ? 'active' : 'inactive',
        product_id: this.$route.params.item,
      }
      this.$store.dispatch('products/createProductItem', {
        data: payload,
        isCompleted: (res) => {
          if (res?.success) {
            this.$toast.success(res.success?.message)
            this.modal_create_productItem = false
            this.$store.dispatch(
              'products/getProductByID',
              this.$route.params.item
            )
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
.product__edit {
  .actions__list {
    padding: 10px 20px;
    border: 1px solid #d5d7d9;
    margin: 15px 0;
    border-radius: 10px;
  }
}
</style>
