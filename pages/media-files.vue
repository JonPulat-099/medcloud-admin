<template>
  <v-card elevation="0">
    <v-card-title primary-title class="flex-nowrap">
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn v-if="tab == 1" @click="openUploadModal('photo')"
        >Upload Image</v-btn
      >
      <v-btn v-else @click="openUploadModal('video')">Upload Video</v-btn>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table
            :headers="video_headers"
            :items="all_video"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editItem(item)" v-bind="attrs" v-on="on">
                    <v-icon medium> mdi-view-day-outline </v-icon>
                  </v-btn>
                </template>
                <span>View</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editItem(item)" v-bind="attrs" v-on="on">
                    <v-icon medium> mdi-delete-outline </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template></v-data-table
          >
        </v-tab-item>
        <v-tab-item>
          <v-data-table
            :headers="video_headers"
            :items="all_images"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editItem(item)" v-bind="attrs" v-on="on">
                    <v-icon medium> mdi-view-day-outline </v-icon>
                  </v-btn>
                </template>
                <span>View</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editItem(item)" v-bind="attrs" v-on="on">
                    <v-icon medium> mdi-delete-outline </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template></v-data-table
          >
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-dialog
      v-model="modal_upload_file"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Upload File </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="payload.title" label="Title"></v-text-field>
            <v-file-input
              v-model="payload.file"
              show-size
              label="File input"
              truncate-length="30"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cancelUpload">Cancel</v-btn>
          <v-btn color="success" @click="uploadFile">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'MediaFiles',
  layout: 'account',
  data() {
    return {
      tab: '',
      items: ['Videos', 'Images'],
      payload: {
        type: '',
        title: '',
        file: null,
      },
      modal_upload_file: false,
      video_headers: [
        {
          text: '#',
          align: 'center',
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
          text: 'Path',
          align: 'left',
          sortable: false,
          value: 'url',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    all_video() {
      return this.$store.state.media__files.all_videos
    },
    all_images() {
      return this.$store.state.media__files.all_videos
    },
  },
  beforeMount() {
    this.$store.dispatch('media__files/getAllVideos')
    this.$store.dispatch('media__files/getAllImages')
  },
  methods: {
    openUploadModal(type) {
      this.payload.type = type
      this.modal_upload_file = true
    },

    uploadFile() {
      this.$store.dispatch('media__files/uploadFiles', {
        toast: this.$toast,
        data: this.payload,
      })
    },

    cancelUpload() {
      this.modal_upload_file = false
      this.payload = {
        title: '',
        type: '',
        file: '',
      }
    },
  },
}
</script>

<style></style>
