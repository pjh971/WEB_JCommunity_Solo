<template>
  <v-container dark fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row v-if="$store.state.token">
      <v-flex xs12 class="pb-2">
        <v-card
          dark
          class="mx-auto"
        >
          <v-parallax
              dark
              src="@/assets/wide_background.jpg"
              height="200"
            >
              <v-row
                align="center"
                justify="center"
              >
                <v-col class="text-center" cols="12">
                  <h1 class="display-1 font-weight-thin mb-4">Dashboard</h1>
                  <h4 class="subheading">{{$store.state.user.company}}</h4>
                </v-col>
              </v-row>
            </v-parallax>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="최근 건의사항"
          number="10"
          tIcon="list"
          tIconColor="success"
          bIcon="update"
          bIconColor="primary"
          bText="3시간 전"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 중대원"
          number="98"
          tIcon="person"
          tIconColor="primary"
          bIcon="group"
          bIconColor="success"
          bText="2명 접속중"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 조회수"
          number="431"
          tIcon="visibility"
          tIconColor="info"
          bIcon="trending_down"
          bIconColor="error"
          bText="43 감소"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 게시물"
          number="334234"
          tIcon="view_module"
          tIconColor="warning"
          bIcon="trending_up"
          bIconColor="success"
          bText="256 증가"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 class="pb-2">
        <board-card
          title="공지사항"
          tBarLeftIcon="notifications"
          tBarColor="green darken-4"
          tBarRightIcon="more_horiz"
        ></board-card>
      </v-flex>
      <v-flex xs12 sm6 class="pb-2">
        <board-card
          title="건의사항"
          tBarLeftIcon="chat"
          tBarColor="green darken-4"
          tBarRightIcon="more_horiz"
        ></board-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8>
            <v-parallax
              dark
              src="@/assets/wide_background.jpg"
            >
              <v-row
                align="center"
                justify="center"
              >
                <v-col class="text-center">
                  <h1 class="display-1 font-weight-thin mb-4">Cannot Access</h1>
                  <h4 class="subheading">중대숲은 로그인 이후에 사용이 가능합니다.</h4>
                  <v-btn large dark color="green darken-4" class="mt-4" @click="$router.push('/sign')">login</v-btn>
                </v-col>
              </v-row>
            </v-parallax>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<script>
import smallCard from '@/components/dashboard/smallCard'
import boardCard from '@/components/dashboard/boardCard'
export default {
  components: {
    smallCard,
    boardCard
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
