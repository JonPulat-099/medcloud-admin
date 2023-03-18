<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('closeModal')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="saveChanges"> Save </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row wrap class="ma-0 pa-5">
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          v-model="details.surname"
          label="Surname"
          outlined
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          v-model="details.name"
          label="Name"
          outlined
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          readonly
          v-model="details.email"
          label="Email"
          outlined
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          v-model="details.patronym"
          label="Patronym"
          outlined
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          v-model="details.phone"
          label="Phone"
          outlined
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="pa-2">
        <v-text-field
          v-model="details.balance"
          label="Balance"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card>
      <v-card-title primary-title>
        User Products
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="modal_add_product = true"
          >Add Product</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
      ></v-data-table>
    </v-card>
    <v-dialog
      v-model="modal_add_product"
      scrollable
      persistent
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Add Product
          <v-spacer></v-spacer>
          <v-btn color="grey" icon @click="modal_add_product = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap class="ma-0 py-2">
            <v-flex xs12 sm6 class="pa-2">
              <v-combobox
                v-model="add_product.items"
                :items="products_list"
                label="Product"
                outlined
                item-text="title"
                item-value="items"
                dense
              ></v-combobox>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-combobox
                v-model="add_product.item_id"
                :items="add_product.items.items"
                label="Product Item"
                outlined
                item-text="title"
                item-value="id"
                dense
              ></v-combobox>
            </v-flex>
            <v-flex xs12 class="pa-2">
              <v-combobox
                v-model="add_product.tariff"
                :items="tariffs"
                label="Tariff"
                outlined
                item-text="title"
                dense
              ></v-combobox>
            </v-flex>
            <v-flex v-if="add_product.tariff" xs12 class="pa-2">
              <div class="rounded-black rounded-b-circle">
                <h3>Tariff info</h3>
                <ul>
                  <li><b>Title: </b> {{ add_product.tariff.title }}</li>
                  <li><b>Period: </b> {{ add_product.tariff.period }}</li>
                  <li><b>Amount: </b> {{ add_product.tariff.amount }}</li>
                </ul>
                <p
                  v-if="
                    Number(add_product.tariff.amount) > Number(user.balance)
                  "
                  class="my-2 red--text"
                >
                  <v-icon color="red" small>mdi-close</v-icon>
                  Not enough money
                </p>
                <p v-else class="my-2 green--text">
                  <v-icon color="green" small>mdi-check</v-icon>
                  Can buy
                </p>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            :disabled="add_product.tariff.amount > user.balance"
            @click="addProduct"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      details: {},
      search: '',
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
      modal_add_product: false,
      add_product: {
        items: [],
        item_id: '',
        tariff: '',
      },
    }
  },
  computed: {
    products() {
      return this.$store.state.users.user_products
    },
    products_list() {
      return this.$store.state.products.products
    },
    tariffs() {
      return this.$store.state.products.product_item_info?.tariff ?? []
    },
  },
  watch: {
    user(val) {
      this.details = val
    },
    'add_product.item_id'(val) {
      if (val?.id) {
        this.add_product.tariff = ''
        this.$store.dispatch('products/getProductTariffs', val.id)
      }
    },
    'add_product.items'(val) {
      this.add_product.tariff = this.add_product.item_id = ''
    },
  },
  beforeMount() {
    this.$store.dispatch('users/getUserProducts', this.user.id)
  },
  mounted() {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    saveChanges() {},
    closeModal() {
      this.modal_add_product = false
      this.add_product.items = []
      this.add_product.tariff = this.add_product.item_id = ''
    },
    addProduct() {
      if (this.add_product.tariff?.id && this.user?.id) {
        const payload = {
          data: {
            user_id: String(this.user.id),
            tariff_id: String(this.add_product.tariff.id),
          },
          isCompleted: (res) => {
            if (res?.success) {
              this.$toast.success(res.success.message)
              this.closeModal()
            } else {
              this.$toast.error(res.error.message)
            }
          },
        }

        this.$store.dispatch("users/addProduct", payload)
      } else {
        this.$toast.error('Params not found')
      }
    },
  },
}
</script>

<style></style>
