<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="green darken-3">
            <v-toolbar-title>회원 가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                prepend-icon="person"
                v-validate="'required|min:4|max:20'"
                v-model="form.id"
                :counter="20"
                :error-messages="errors.collect('id')"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-validate="'required|min:6|max:40'"
                v-model="form.pwd"
                :counter="40"
                :error-messages="errors.collect('pwd')"
                label="비밀번호"
                data-vv-name="pwd"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                prepend-icon="face"
                v-validate="'required|min:1|max:40'"
                v-model="form.name"
                :counter="40"
                :error-messages="errors.collect('name')"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="loyalty"
                v-validate="'required|min:5|max:11'"
                v-model="form.number"
                :counter="11"
                :error-messages="errors.collect('number')"
                label="군번"
                data-vv-name="number"
                required
              ></v-text-field>
              <v-checkbox
                v-validate="'required'"
                v-model="agree"
                :error-messages="errors.collect('agree')"
                value="1"
                label="정보취급 약관에 동의합니다"
                data-vv-name="agree"
                type="checkbox"
                required
                color="primary"
              ></v-checkbox>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn dark color="secondary" @click="clear">clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="green darken-3" @click="submit">가입</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ko from 'vee-validate/dist/locale/ko'

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    form: {
      id: '',
      pwd: '',
      name: '',
      _company: '',
      number: ''
    },
    comlist: [],
    agree: null,
    dictionary: {
      messages: ko.messages,
      attributes: {
        id: '아이디 ',
        pwd: '비밀번호 ',
        name: '이름 ',
        number: '군번 ',
        agree: '약관동의'
        // custom attributes
      }
    }
  }),

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('모두 기입해주세요')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) throw new Error('서버가 거부했습니다.')
          this.$store.commit('pop', { msg: '가입 완료', color: 'success' })
          this.$router.push('/sign')
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      this.agree = null
      this.$validator.reset()
    }
  }
}
</script>
