<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-card class="mx-auto" min-width="344">
      <v-card-title>
        <span class="title font-weight-bold">{{item.title}}</span>
        <div class="flex-grow-1"></div>
        <v-menu bottom left transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-btn small class="float-right ma-2" tile outlined color="error" @click="delNotice(noticeId)">
                <v-icon left>clear</v-icon>삭제
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text class="font-weight-light">{{id2date(item._id)}}</v-card-text>

      <v-card-text class="font-weight-bold">
        {{item.context}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" src="@/assets/army.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>중대공지</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    const noticeId = this.$route.params.noticeId
    return {
      noticeId: noticeId,
      item: {}
    }
  },
  created () {
    this.getNotice(this.noticeId)
  },
  methods: {
    getNotice (noticeId) {
      axios.get(`resources/notices/one/${noticeId}`)
        .then((r) => {
          this.item = r.data.d
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },

    delNotice (id) {
      axios.delete(`resources/notices/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '공지사항 삭제완료', color: 'success' })
          this.$router.push({
            path: '/notice'
          })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>
