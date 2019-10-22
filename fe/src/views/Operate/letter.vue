<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg12>
        <v-card>
          <v-toolbar class="elevation-0" dark src="@/assets/wide_background.jpg">
            <div class="title">마음의 편지함</div>
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="letters"
            :search="search"
            :loading="loading"
            :sort-by="['_id']"
            :sort-desc="[true]"
            class="elevation-1"
          >
            <template v-slot:item.title="{ item }">
              <div @click="rowClick(item)">{{ item.title }}</div>
            </template>
            <template v-slot:item._id="{ item }">
              <v-chip>{{ id2date(item._id) }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'letter',
  data () {
    return {
      form: {
        title: '',
        context: ''
      },
      updateMode: false,
      search: '',
      letters: [],
      headers: [
        { text: '제목', value: 'title', sortable: true },
        { text: '날짜', value: '_id', sortable: true, width: 200 }
      ],
      loading: false
    }
  },
  created () {
    this.getletters()
  },
  methods: {
    rowClick (item) {
      this.$router.push({
        path: `/letter/detail/${item._id}`
      })
    },
    getletters () {
      if (this.loading) this.loading = true
      axios.get('resources/letters/list')
        .then((r) => {
          this.letters = r.data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
          this.loading = false
        })
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>
