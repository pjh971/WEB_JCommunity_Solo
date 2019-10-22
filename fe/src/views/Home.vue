<template>
  <v-container dark fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row  v-if="$store.state.token">
      <v-flex xs12 class="pb-2">
        <v-card
          class="mx-auto"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="@/assets/wide_background.jpg"
          >
            <v-card-title>로그인 상태</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div>text</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="pb-2">
        <v-card
          class="mx-auto"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="@/assets/wide_background.jpg"
          >
            <v-card-title>비로그인 상태</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div>로그인해주세요!!</div>
            <div>비로그인 상태에서는 중대숲을 이용할 수 없습니다</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
