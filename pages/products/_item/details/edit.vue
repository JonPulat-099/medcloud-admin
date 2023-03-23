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
      <v-tabs v-model="tab">
        <v-tab @click="$router.push(`/products/${$route.params.item}/edit`)"
          >Product Items</v-tab
        >
        <v-tab>Details</v-tab>
      </v-tabs>

      <div class="actions__list">
        <h3 class="text-h6">Details</h3>
        <v-layout row wrap justify-space-between class="ma-0">
          <v-flex xs12 sm4 class="d-flex align-center mb-5">
            <legend class="text-body-1 font-weight-meduim">Name</legend>
          </v-flex>
          <v-flex xs12 sm7 class="mb-5">
            <v-text-field
              v-model="product.title"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="d-flex align-center mb-5">
            <legend class="text-body-1 font-weight-meduim">Image</legend>
          </v-flex>
          <v-flex xs12 sm7 class="mb-5">
            <v-file-input
              v-model="product.image"
              :value="product.image"
              truncate-length="15"
              outlined
              dense
              placeholder="Choose image"
              prepend-inner-icon="mdi-image-area"
              prepend-icon=""
              hide-details
            ></v-file-input>
          </v-flex>
          <v-flex xs12 sm4 class="d-flex align-center mb-5">
            <legend class="text-body-1 font-weight-meduim">Description</legend>
          </v-flex>
          <v-flex xs12 sm7 class="mb-5">
            <v-textarea
              v-model="product.description"
              outlined
              dense
              hide-details
            ></v-textarea>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ProductItemDetails',
  layout: 'account',
  data() {
    return {
      tab: 1,
      product: {
        title: '',
        description: '',
        image: '',
      },
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
    product_info() {
      const value = this.$store.state.products.product_info
      this.product = value
      return value
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
  methods: {},
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
