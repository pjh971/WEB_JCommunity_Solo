<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg12>
        <v-card>
          <v-toolbar class="elevation-0 pr-3" dark src="@/assets/wide_background.jpg">
            <div class="title condensed light">건의사항</div>
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
            :items="articles"
            :search="search"
            :loading="loading"
            :sort-by="['_id']"
            :sort-desc="[true]"
            class="elevation-1"
          >
            <template v-slot:item.title="{ item }">
              <div @click="rowClick(item)">{{ item.title }}</div>
            </template>
            <template v-slot:item.cnt.view="{ item }">
              <v-chip dark label>{{ item.cnt.view }}</v-chip>
            </template>
            <template v-slot:item.cnt.like="{ item }">
              <v-chip dark label>{{ item.cnt.like }}</v-chip>
            </template>
            <template v-slot:item._id="{ item }">
              <v-chip dark label>{{ id2date(item._id) }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
        <div class="text-right">
          <v-btn class="mt-3" color="secondary" dark @click="mdUp">글쓰기</v-btn>
        </div>
      </v-flex>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">건의사항 작성</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="제목" v-model="form.title" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea label="내용" v-model="form.context" required></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>부적절한 내용은 처벌의 대상이 될 수 있습니다.</small>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="postSuggestion">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'suggestion',
  data () {
    return {
      dialog: false,
      form: {
        title: '',
        context: ''
      },
      updateMode: false,
      search: '',
      articles: [],
      headers: [
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: '_user.name', width: 150, sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true, width: 100 },
        { text: '추천', value: 'cnt.like', sortable: true, width: 100 },
        { text: '날짜', value: '_id', sortable: true, width: 300, class: 'hidden-sm-and-down' }
      ],
      loading: false
    }
  },
  created () {
    this.getSuggestions()
  },
  methods: {
    rowClick (item) {
      this.$router.push({
        path: `/suggestion/detail/${item._id}`
      })
    },
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.form.title = ''
      this.form.context = ''
    },
    getSuggestions () {
      if (this.loading) return
      this.loading = true
      axios.get('resources/suggestions/list')
        .then(({ data }) => {
          this.articles = data.ds
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
    },
    postSuggestion () {
      this.dialog = false
      axios.post('resources/suggestions', this.form)
        .then((r) => {
          this.$store.commit('pop', { msg: '건의사항 등록완료', color: 'success' })
          this.getSuggestions()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
