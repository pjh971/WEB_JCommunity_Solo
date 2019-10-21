<template>
  <v-app :dark="siteDark" id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant.sync="mini"
      :dark="siteDark"
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content v-if="!mini">
            <v-list-item-title>사용자</v-list-item-title>
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
      :dark="siteDark"
      clipped-left
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

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      :dark = "siteDark"
      app
    >
      <span>{{siteCopyright}}</span>
    </v-footer>

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
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    mini: false,
    siteIcon: 'people',
    siteTitle: '중대숲',
    siteCopyright: '@2019 Jay_kim',
    siteDark: true,
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
    }
  }
}
</script>
