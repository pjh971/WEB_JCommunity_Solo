<template>
  <v-container fill-height dark fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row v-if="$store.state.token">
      <v-flex xs12 class="pb-2">
        <v-card
          dark
          class="mx-auto"
        >
          <v-parallax
              dark
              src="@/assets/wide_background.jpg"
              height="250"
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
          title="출타자 현황"
          number="22"
          tIcon="visibility"
          tIconColor="info"
          bIcon="trending_down"
          bIconColor="error"
          bText="2 감소"
        ></small-card>
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
          title="전체 게시물"
          number="405"
          tIcon="view_module"
          tIconColor="warning"
          bIcon="trending_up"
          bIconColor="success"
          bText="256 증가"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm12 lg4 class="pb-2">
        <board-card
          title="공지사항"
          header="최신순"
          :items="noticeByDay"
          tBarLeftIcon="notifications"
          tBarColor="green darken-4"
          tBarRightIcon="more_horiz"
          tBarRightIconUrl="notice"
          itemUrl="notice"
          chipColor="warning"
          chipMsg="NEW"
        ></board-card>
      </v-flex>
      <v-flex xs12 sm12 lg8 class="pb-2">
        <board-card
          title="건의사항"
          header="좋아요순"
          :items="sugByLike"
          tBarLeftIcon="chat"
          tBarColor="green darken-4"
          tBarRightIcon="more_horiz"
          tBarRightIconUrl="suggestion"
          itemUrl="suggestion"
          chipColor="error"
          chipMsg="HOT"
        ></board-card>
      </v-flex>
      <v-flex xs12>
        <v-card dark class="mx-auto">
          <v-img dark src="@/assets/banner2.png" max-height="200">
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center v-else>
      <v-flex xs12 sm8>
        <v-parallax src="@/assets/wide_background.jpg">
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <h1 class="display-4 font-weight-light mb-8 ml-n11"><v-icon size="96" left color="yellow accent-4">warning</v-icon><span color="red">경고(Warning)</span></h1>
              <h4 class="display-1 font-weight-thin font-italic">이 지역은 군 시설임으로 허가되지 않은 인원의 </h4>
              <h4 class="display-1 font-weight-thin font-italic mb-6">무단 출입 및 사진촬영을 금함</h4>
              <h4 class="display-1 font-weight-thin font-italic">Photographing and Trespassing of</h4>
              <h4 class="display-1 font-weight-thin font-italic mb-10">this facility(equipment) is prohibited</h4>
              <v-btn x-large dark outlined color="white" class="mt-4" @click="$router.push('/sign')">login and Authenticate</v-btn>
            </v-col>
          </v-row>
        </v-parallax>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import smallCard from '@/components/dashboard/smallCard'
import boardCard from '@/components/dashboard/boardCard'
export default {
  components: {
    smallCard,
    boardCard
  },
  data () {
    return {
      sugByLike: [],
      noticeByDay: []
    }
  },
  mounted () {
    this.getSuggestions()
    this.getNotices()
  },
  methods: {
    getSuggestions () {
      axios.get('resources/suggestions/listByLike')
        .then(r => {
          this.sugByLike = r.data.ds
          console.log(r.data.ds)
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    getNotices () {
      axios.get('resources/notices/listByDay')
        .then(r => {
          this.noticeByDay = r.data.ds
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>
