<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="c in companys" :key="c._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{c.name}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text primary-text>
            <div>
              <div>부대 전화번호: {{c.phoneNumber}}</div>
            </div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn color="orange" @click="putDialog(c)">수정</v-btn>
            <v-btn color="error" @click="delCompany(c._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn absolute dark right color="green darken-4" @click="mdUp">
     <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Company Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="부대명"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="comName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="전화번호"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="comPhone"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="updateMode ? putCompany() : postCompany()">{{updateMode ? "수정" : "생성"}}</v-btn>
          <v-btn color="blue darken-1" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      companys: [],
      dialog: false,
      comName: '',
      comPhone: '',
      updateMode: false,
      putId: ''
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    getCompany () {
      this.$axios.get('manage/company')
        .then((r) => {
          this.companys = r.data.ds
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putDialog (company) {
      this.putId = company._id
      this.dialog = true
      this.comName = company.name
      this.comPhone = company.phoneNumber
      this.updateMode = true
    },
    postCompany () {
      this.dialog = false
      this.$axios.post('manage/company', {
        name: this.comName, phoneNumber: this.comPhone
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 등록완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putCompany () {
      this.dialog = false
      this.$axios.put(`manage/company/${this.putId}`, {
        name: this.comName, phoneNumber: this.comPhone
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 수정완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    delCompany (id) {
      this.$axios.delete(`manage/company/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 삭제완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.comName = ''
      this.comPhone = ''
    }
  }
}
</script>
