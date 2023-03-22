<template>
  <v-card>
    <v-card-title primary-title>
      Lab values
      <v-spacer></v-spacer>
      <v-btn v-if="tab == 0" color="success" @click="modal_edit_label = true"
        >Add Label</v-btn
      >
      <v-btn v-else color="success" @click="saveContent">Save Contents</v-btn>
    </v-card-title>
    <v-card-text>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in tabs" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table
            :headers="label_headers"
            :items="all_label_list"
            sort-by="calories"
            class="elevation-1"
            :loading="form_disabled"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                outlined
                :color="item.status == 'active' ? 'green' : 'red'"
                >{{ item.status }}</v-chip
              ></template
            >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editLabel(item)" v-bind="attrs" v-on="on">
                    <v-icon medium>
                      {{
                        item.status == 'active'
                          ? 'mdi-file'
                          : 'mdi-file-check-outline'
                      }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{
                  item.status == 'active'
                    ? 'Transfer to draft'
                    : 'Transfer to active'
                }}</span>
              </v-tooltip>
            </template></v-data-table
          >
        </v-tab-item>
        <v-tab-item>
          <div class="py-5">
            <v-combobox
              v-model="selected_label"
              label="Label"
              :items="all_label_list"
              item-text="text"
              dense
              outlined
              hide-details
              :auto-select-first="true"
            ></v-combobox>
            <v-divider class="py-4" light></v-divider>
            <c-keditor :initial_data="all_values" v-model="values"></c-keditor>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-dialog
      v-model="modal_edit_label"
      scrollable
      persistent
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Add Label
          <v-spacer></v-spacer>
          <v-btn color="red" icon @click="closeAddLabelModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-2">
          <v-text-field
            label="Label"
            v-model="edit_label.text"
            outlined
            dense
            clearable
            :disabled="form_disabled"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="labelAction" :loading="form_disabled"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  name: 'LabValues',
  layout: 'account',
  components: {
    'c-keditor': () => import('@/components/Ckeditor.vue'),
  },
  data() {
    return {
      modal_edit_label: false,
      form_disabled: false,
      tabs: ['Labels', 'Contents'],
      tab: '',
      label_headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'text',
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      edit_label: {
        text: '',
      },
      selected_label: null,
      values: '',
    }
  },
  computed: {
    all_label_list() {
      return this.$store.getters['lab__values/getAllLabels']
    },
    all_values() {
      if (this.selected_label?.id) {
        const infos = this.$store.getters['lab__values/getContentByLabel'](
          this.selected_label.id
        )
        const value =
          infos[0]?.value ??
          `<figure class=\"table\"><table><tbody><tr><td>${this.selected_label.text}</td><td>Reference range</td><td>SI Reference Interval</td></tr><tr><td>Alanine aminotransferase (ALT)</td><td>10-40 U/L</td><td>10-40 U/L</td></tr><tr><td colspan=\"3\">Cholesterol</td></tr><tr><td colspan=\"3\">Total</td></tr><tr><td><p style=\"margin-left:40px;\">Normal</p></td><td>&lt;200 mg/dL</td><td>&lt;5.2 mmol/L</td></tr><tr><td><p style=\"margin-left:40px;\">High</p></td><td>&gt;240mg/dL</td><td>&gt;6.2 mmol/L</td></tr><tr><td>Aspartate aminotransferase (AST)</td><td>12-38 U/L</td><td>12-38 U/L</td></tr></tbody></table></figure>`
        console.log(1, value)
        return value
      }
    },
  },

  async fetch({ store }) {
    await store.dispatch('lab__values/getAllValues')
  },

  methods: {
    editLabel(label) {
      this.form_disabled = true
      if (label.status === 'inactive') {
        // set Label Active
        this.$axios
          .$put(`/api/lab/label/activate/${label.id}`)
          .then((res) => {
            if (res?.success) {
              this.$toast.success(res.success?.message)
              this.$store.dispatch('lab__values/getAllValues')
            } else {
              this.$toast.error(res?.error?.message)
            }
            this.form_disabled = false
          })
          .catch((err) => {
            this.form_disabled = false
            // do nothing
          })
      } else {
        this.setLabelInactive(label)
      }
    },
    setLabelInactive(label) {
      this.$axios
        .$delete(`/api/lab/label/delete/${label.id}`)
        .then((res) => {
          if (res?.success) {
            this.$toast.success(res.success?.message)
            this.$store.dispatch('lab__values/getAllValues')
          } else {
            this.$toast.error(res?.error?.message)
          }
          this.form_disabled = false
        })
        .catch((err) => {
          this.form_disabled = false
          // do nothing
        })
    },
    labelAction() {
      if (this.edit_label?.text) {
        this.form_disabled = true
        this.$axios
          .$post('/api/lab/label/create', {
            text: this.edit_label.text,
          })
          .then((res) => {
            if (res?.success) {
              this.$toast.success(res.success.message)
              this.$store.dispatch('lab__values/getAllValues')
              this.edit_label.text = ''
            } else {
              this.$toast.error(res.error.message)
            }
            this.form_disabled = false
          })
          .catch((err) => {
            this.form_disabled = false
          })
      }
    },
    closeAddLabelModal() {
      this.modal_edit_label = false
      this.edit_label.text = ''
    },
    saveContent() {
      this.$axios
        .$post('/api/lab/info/create', {
          label_id: this.selected_label.id,
          key: 'key',
          value: this.values,
        })
        .then((res) => {
          if (res?.success) {
            this.$toast.success(res.success.message)
          } else {
            this.$toast.error(res.error.message)
          }
        })
        .catch((err) => {
          // do nothing
        })
    },
  },
}
</script>
<style lang=""></style>
