<template>
  <v-card
    class="mx-auto"
  >
    <v-toolbar
      elevation-0
      dark
      src="@/assets/wide_background.jpg"
      :color="tBarColor"
    >
      <v-icon class="mr-3">{{tBarLeftIcon}}</v-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="$router.push(tBarRightIconUrl)">{{tBarRightIcon}}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <v-subheader>{{header}}</v-subheader>
      <template v-for="(item, index) in items" >
        <v-list-item :key="index" @click="$router.push(`/${itemUrl}/detail/${item._id}`)">
          <v-chip v-if="index == 0" label :color="chipColor" dark class="mr-3">{{chipMsg}}</v-chip>
          <v-chip v-else label color="grey" dark class="mr-3">{{index}}</v-chip>
          <v-list-item-avatar class="mr-2">
            <v-img src="@/assets/army.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-if="title == '건의사항'" v-html="item._user.name"></v-list-item-subtitle>
            <v-list-item-subtitle v-else>중대공지</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'tBarRightIcon', 'tBarColor', 'tBarLeftIcon', 'tBarRightIconUrl', 'itemUrl', 'chipColor', 'chipMsg', 'header', 'items']
}
</script>
