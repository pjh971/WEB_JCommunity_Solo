<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="grey darken-2">
          <v-toolbar class="elevation-0" dark src="@/assets/wide_background.jpg">
            <span class="title">중대원 복귀 현황</span>
          </v-toolbar>
          <v-card-text>
            <div>
              <span>
                <v-chip color="info" class="mr-3" label>
                  <v-icon left>today</v-icon>
                  {{today}}
                </v-chip>
              </span>
              <span>
                <v-chip color="green" class="mr-3" label>
                  <v-icon left>people</v-icon>
                  {{comebacks.length}}명 복귀중
                </v-chip>
              </span>
              <span>
                <v-chip color="warning" class="mr-3" label>
                  <v-icon left>replay</v-icon>
                  {{timeNow}}
                </v-chip>
              </span>
            </div>
          </v-card-text>
          <v-flex xs12 class="pa-4">
            <v-card>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar></v-list-item-avatar>
                    <v-list-item-content>
                      <div><v-chip label>이름</v-chip></div>
                    </v-list-item-content>
                    <v-list-item-content>
                      <div><v-chip label>마지막 보고</v-chip></div>
                    </v-list-item-content>
                    <v-list-item-content>
                      <div><v-chip label>복귀정보확인</v-chip></div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-flex v-if="comebacks.length === 0">
                  <v-alert type="warning">아직 복귀자가 없습니다.</v-alert>
                </v-flex>
                <v-list two-line v-else v-for="(com, i) in comebacks" :key="i">
                  <comebackstat-card
                    :com="com"
                    @mapUp="mapUp"
                  >
                  </comebackstat-card>
                  <v-divider></v-divider>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="500">
      <comeback-card title="복귀정보" :loc="locSelected" close=true @close="mdDown" />
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import comebackstatCard from '@/components/map/comebackstatCard'
import comebackCard from '@/components/map/comebackCard'
export default {
  name: 'comeback',
  components: {
    comebackstatCard,
    comebackCard
  },
  data () {
    return {
      notComebackMsg: '',
      comebacks: [],
      today: '',
      timeNow: '',
      locSelected: {},
      dialog: false
    }
  },
  mounted () {
    this.getComebacks()
    this.getTime()
  },
  methods: {
    getComebacks () {
      axios.get('resources/comebacks/list')
        .then((r) => {
          if (!r.data.success) this.notComebackMsg = r.data.msg
          else {
            this.notComebackMsg = ''
            this.comebacks = r.data.ds
          }
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getTime () {
      this.today = moment().format('YYYY.MM.DD')
      this.timeNow = moment().format('hh:mm:ss a')
    },
    mapUp (loc) {
      this.locSelected = loc
      this.dialog = true
    },
    mdDown () {
      this.dialog = false
    }
  }
}
</script>
