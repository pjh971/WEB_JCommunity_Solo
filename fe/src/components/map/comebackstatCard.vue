<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img src="@/assets/army.png"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{com._user.name}}</v-list-item-title>
      <v-list-item-subtitle>{{com.currentType}}번째 보고 완료</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-if="com.currentType === 1">
      <v-list-item-title>{{com.firstLoc.address}}</v-list-item-title>
      <v-list-item-subtitle>{{com.firstLoc.time}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-if="com.currentType === 2">
      <v-list-item-title>{{com.secondLoc.address}}</v-list-item-title>
      <v-list-item-subtitle>{{com.secondLoc.time}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-if="com.currentType === 3">
      <v-list-item-title>{{com.thirdLoc.address}}</v-list-item-title>
      <v-list-item-subtitle>{{com.thirdLoc.time}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content>
      <v-list-item-subtitle>
        <v-btn-toggle
          tile
        >
          <v-btn @click="mapUp(1)">
            First
          </v-btn>
          <v-btn v-if="com.currentType >= 2" @click="mapUp(2)">
            Second
          </v-btn>
          <v-btn v-if="com.currentType === 3" @click="mapUp(3)">
            Third
          </v-btn>
        </v-btn-toggle>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: [ 'com' ],
  data () {
    return {
      loc: {}
    }
  },
  methods: {
    mapUp (loctype) {
      switch (loctype) {
        case 1:
          this.loc = this.com.firstLoc
          break
        case 2:
          this.loc = this.com.secondLoc
          break
        case 3:
          this.loc = this.com.thirdLoc
          break
      }
      this.$emit('mapUp', this.loc)
    }
  }
}
</script>
