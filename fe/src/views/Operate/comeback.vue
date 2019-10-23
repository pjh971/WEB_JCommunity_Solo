<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            복귀보고체계
          </v-card-title>
          <v-card-text>
            <div>오늘 복귀인원: 12</div>
            <div>현재시간: 18:20:23</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
          <v-card>
            <v-card-title>
              보고자 현황
            </v-card-title>
            <v-card-text>
              15명
            </v-card-text>
            <v-card-text>
              {{notComebackMsg}}
              <v-flex v-for="com in comebacks" :key="com">
                <v-card>
                  <v-card-title>{{com._user.name}}</v-card-title>
                  <v-card-text>
                    {{com}}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'comeback',
  data () {
    return {
      notComebackMsg: '',
      comebacks: []
    }
  },
  mounted () {
    this.getComebacks()
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
    }
  }

}
</script>
