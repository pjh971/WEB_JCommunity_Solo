<template>
  <v-card>
    <v-card-title><span class="body-2 font-weight-bold">{{title}}</span></v-card-title>
    <v-card-text>
      <div class="mb-2">
        <v-chip color="green darken-2" class="mr-3">지역(시/군/구)</v-chip>
        <v-chip label dark>{{loc.region}}</v-chip>
      </div>
      <div class="mb-2">
        <v-chip color="lime darken-2" class="mr-11">세부 주소</v-chip>
        <v-chip label dark>{{loc.address}}</v-chip>
      </div>
      <div>
        <v-chip color="lime darken-4" class="mr-11">보고 시각</v-chip>
        <v-chip label dark>{{loc.time}}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'title','loc' ]
}
</script>
