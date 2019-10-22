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
              <v-btn small class="float-right ma-2" tile outlined color="error" @click="delSuggestion(suggestionId)">
                <v-icon left>clear</v-icon>삭제
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn small class="float-right ma-2" tile outlined color="success" @click="dialog = true">
                <v-icon left>create</v-icon>수정
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
            <v-img class="elevation-6" src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item._user}}</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-card-actions>
              <v-btn icon><v-icon v-html="like_icon" color="green darken-3"></v-icon></v-btn>
            </v-card-actions>
            <span class="subheading">{{item.likes}}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-card dense class="mt-7 mx-auto" min-width="344">
      <v-card-title>
        <v-icon class="mr-3">chat</v-icon>
        <span class="title font-weight-bold">
          댓글
          <v-chip label outlined class="subtitle-1">
            {{comments.length}}
          </v-chip>
        </span>
      </v-card-title>

      <v-divider></v-divider>

      <v-flex class="pa-3">
        <v-alert type="warning" v-if="comments.length === 0">
            아직 댓글이 없습니다
        </v-alert>
      </v-flex>
      <v-flex class="pa-3" v-for="item in comments" :key="item">
        <comment-card
          :comment="item"
          :createdAt="id2date(item._id)"
          @del="getSuggestion(suggestionId)"
        ></comment-card>
      </v-flex>

      <v-divider></v-divider>
      <v-layout wrap row class="pa-5">
        <v-flex sm10>
          <v-text-field label="댓글 작성" dense outlined counter="200" v-model="cmtForm.context"></v-text-field>
        </v-flex>
        <v-btn class="ma-2" dark large color="green darken-4" @click="postComment">작성</v-btn>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">건의사항 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="title*" v-model="form.title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="context*" v-model="form.context" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="putSuggestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import commentCard from '@/components/suggestion/commentCard'
export default {
  components: {
    commentCard
  },
  data () {
    return {
      form: {
        title: '',
        context: ''
      },
      cmtForm: {
        context: ''
      },
      item: {
        'title': 'asdf',
        '_user': '관리자',
        'context': 'asdfasdf',
        'likes': 1,
        '_id': '5dac64972d58f40cae98894d'
      },
      comments: [
        {
          'name': 'asdfasdf',
          '_id': '5dac64972d58f40cae98894d',
          'context': 'asdfasdf'
        }
      ],
      like_icon: 'favorite',
      more: 'more-vert',
      dialog: false
    }
  },
  methods: {
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>
