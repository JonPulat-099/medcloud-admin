<template>
  <v-card elevation="0">
    <v-card-title primary-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="modal_add_tariff = true">Add Tariff</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="item_info.tariff"
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
        </template></v-data-table
      >
    </v-card-text>
    <v-dialog
      v-model="modal_add_tariff"
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
                v-model="tariff.period"
                label="Period"
                outlined
                :disabled="disabled_form"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 mt-4>
              <v-text-field
                v-model="tariff.amount"
                label="Amount"
                outlined
                :disabled="disabled_form"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                label="Active"
                v-model="tariff.status"
                :value="false"
                :disabled="disabled_form"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="cancel" :loading="disabled_form"
            >Cancel</v-btn
          >
          <v-btn color="success" @click="createTariff" :loading="disabled_form"
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
      modal_add_tariff: false,
      disabled_form: false,
      tariff: {
        period: '',
        amount: '',
        status: false,
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
    breadcrumbs() {
      return [
        {
          text: 'Products',
          disabled: false,
          href: '/products',
        },
        {
          text: 'Products name',
          disabled: false,
          href: '/products/test',
        },
        {
          text: 'Tariffs',
          disabled: true,
          href: '/products/test/tariffs',
        },
      ]
    },
    item_info() {
      return this.$store.state.products.product_item_info
    },
  },
  async beforeMount() {
    const params = this.$route.params
    this.$store.dispatch('products/getProductTariffs', params.tariff)
  },
  methods: {
    createTariff() {
      this.disabled_form = true

      const payload = {
        data: {
          item_id: this.$route.params.tariff,
          ...this.tariff,
          status: this.tariff.status ? 'active' : 'inactive',
        },
        isCompleted: (res) => {
          if (res?.success && res?.success?.message) {
            this.$toast.success(res.success.message)
          }

          this.disabled_form = false
        },
      }

      this.$store.dispatch('products/createTariff', payload)
    },

    cancel() {},
  },
}
</script>
<style lang=""></style>
