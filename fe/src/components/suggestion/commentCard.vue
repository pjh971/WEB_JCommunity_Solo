<template>
  <v-layout wrap row>
    <div class="pa-2">
      <v-card min-width="300" dark color="lime darken-4">
        <v-card-title>
          <v-avatar class="mr-3" size="28" color="grey darken-3">
            <v-img class="elevation-6" src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-avatar>
          <span class="body-1 mr-3">{{comment._user.name}}</span>
          <span class="caption font-weight-light mt-1">{{createdAt}}</span>
          <div class="flex-grow-1"></div>
          <v-menu left transition="scale-transition">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">more_vert</v-icon>
            </template>
            <v-list>
              <v-list-item>
                <v-btn small class="float-right ma-2" tile outlined color="error" @click="delComment">
                  <v-icon left>clear</v-icon>삭제
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <span class="bold">{{comment.context}}</span>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</template>
<script>
export default {
  props: [ 'comment', 'createdAt' ],
  methods: {
    delComment () {
      this.$axios.delete(`resources/comments/${this.comment._id}`)
        .then((r) => {
          if (!r.data.success) throw new Error(r.data.msg)
          this.$store.commit('pop', { msg: '댓글 삭제완료', color: 'success' })
          this.$emit('del')
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    }
  }
}
</script>
