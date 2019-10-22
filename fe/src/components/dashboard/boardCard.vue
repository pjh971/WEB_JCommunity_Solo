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
        <v-list-item :key="index" @click="$router.push(`/suggestion/detail/${item._id}`)">
          <v-chip label color="error" dark class="mr-3">hot</v-chip>
          <v-list-item-avatar class="mr-2">
            <v-img src="@/assets/army.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item._user.name"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'tBarRightIcon', 'tBarColor', 'tBarLeftIcon', 'tBarRightIconUrl', 'header', 'items']
}
</script>
