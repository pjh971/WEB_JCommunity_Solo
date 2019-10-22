<template>
  <v-app :dark="siteDark" id="inspire" style="
    background: #EEEEEE">
    <v-navigation-drawer
      v-model="drawer"
      src="@/assets/wide_background.jpg"
      :mini-variant.sync="mini"
      :dark="siteDark"
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              중대숲
            </v-list-item-title>
            <v-list-item-subtitle>
              military community
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-avatar>
            <v-img src="@/assets/army.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content v-if="!mini">
            <v-list-item-title>{{$store.state.user.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item :to="home.to" v-model="home.act">
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.act"
          :prepend-icon="item.icon"
          color=""
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :prepend-icon="subItem.icon"
            :to="subItem.to"
            color=""
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="grey lighten-3 elevation-0"
    >
      <v-app-bar-nav-icon @click.stop="max"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">
        <v-icon left>{{siteIcon}}</v-icon>
        {{siteTitle}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.token" class="ma-2" @click="$router.push('/sign')" outlined tile color="dark">
        <v-icon left>input</v-icon> login
      </v-btn>
      <v-btn v-else class="ma-2" @click="signOut" tile outlined color="dark">
        <v-icon left>open_in_new</v-icon> logout
      </v-btn>
    </v-app-bar>

    <v-content app>
      <router-view />
      <v-btn absolute dark fab bottom right color="green darken-4" @click="mdUp">
        <v-icon>mail</v-icon>
      </v-btn>
    </v-content>

    <v-footer color="grey lighten-3">jay</v-footer>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">마음의 편지</span>
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
          <small>마음의 편지는 익명으로 전달되나, 부적절한 내용작성 시에 유저정보를 조회할 수 있습니다.</small>
          <br>
          <small>또한 수정이 불가하니, 신중히 작성하시기 바랍니다.</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="postLetter">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
       v-model="$store.state.sb.act"
       :color="$store.state.sb.color"
     >
       {{ $store.state.sb.msg }}
       <v-btn
         @click="$store.commit('pop', { act: false })"
         color="blue-grey"
       >
         닫기
       </v-btn>
     </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    mini: false,
    siteIcon: 'home',
    siteTitle: '',
    siteCopyright: '@2019 Jay_kim',
    siteDark: true,
    dialog: false,
    form: {
      title: '',
      context: ''
    },
    home: {
      icon: 'home',
      title: '홈',
      to: {
        path: '/'
      }
    },
    items: [
      {
        icon: 'sports_handball',
        title: 'Life',
        subItems: [
          {
            icon: 'notifications',
            title: '공지사항',
            to: {
              path: '/notice'
            }
          },
          {
            icon: 'chat',
            title: '건의사항',
            to: {
              path: '/suggestion'
            }
          },
          {
            icon: 'my_location',
            title: 'GPS 기반 보고체계',
            to: {
              path: '/map'
            }
          }
        ]
      },
      {
        icon: 'account_box',
        title: 'Operate',
        subItems: [
          {
            icon: 'email',
            title: '마음의 편지함',
            to: {
              path: '/letter'
            }
          },
          {
            icon: 'directions_bus',
            title: '중대원 복귀현황',
            to: {
              path: '/comeback'
            }
          }
        ]
      },
      {
        icon: 'settings',
        title: 'Manage',
        subItems: [
          {
            icon: 'face',
            title: '사용자관리',
            to: {
              path: '/user'
            }
          },
          {
            icon: 'info',
            title: '부대관리',
            to: {
              path: '/company'
            }
          },
          {
            icon: 'bookmarks',
            title: '페이지관리',
            to: {
              path: '/page'
            }
          }
        ]
      }
    ]
  }),
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/')
    },
    max () {
      this.mini = false
      this.drawer = !(this.drawer)
    },
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.form.title = ''
      this.form.context = ''
    },
    postLetter () {
      this.dialog = false
      axios.post('resources/letters', this.form)
        .then((r) => {
          this.$store.commit('pop', { msg: '마음의 편지 작성완료', color: 'success' })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
