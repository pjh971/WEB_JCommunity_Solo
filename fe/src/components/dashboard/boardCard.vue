<template>
  <v-card
    class="mx-auto"
  >
    <v-toolbar
      dark
      src="@/assets/wide_background.jpg"
      :color="tBarColor"
    >
      <v-icon class="mr-3">{{tBarLeftIcon}}</v-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>{{tBarRightIcon}}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img src="@/assets/army.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'tBarRightIcon', 'tBarColor', 'tBarLeftIcon'],
  data: () => ({
    items: [
      { header: 'Today' },
      {
        title: '전투휴무를 늘려주십시오',
        subtitle: '도유승'
      },
      { divider: true, inset: true },
      {
        title: '근무태만 인원 징계 관련',
        subtitle: '김장영'
      },
      { divider: true, inset: true },
      {
        title: 'Oui oui',
        subtitle: '송승하'
      }
    ]
  })
}
</script>
