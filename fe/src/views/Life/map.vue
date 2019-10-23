<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="grey">
          <v-toolbar class="elevation-0 pr-3" dark src="@/assets/wide_background.jpg">
            <div class="title">위치기반 복귀보고체계</div>
          </v-toolbar>
          <v-layout wrap row>
            <v-flex xs12 lg6 class="pa-4">
              <v-card xs12 color="grey darken-2">
                <v-subheader>map</v-subheader>
                <vue-daum-map
                  :appKey="mapInfo.appKey"
                  :center.sync="mapInfo.center"
                  :level.sync="mapInfo.level"
                  :mapTypeId="mapInfo.mapTypeId"
                  :libraries="mapInfo.libraries"
                  @load="onLoad"
                  @click="moveMarker"
                  style="width:100%;height:680px"/>
              </v-card>
            </v-flex>
            <v-flex xs12 lg6 class="pa-4">
              <v-card color="grey darken-2">
                <v-card-text v-if="!notComeback">
                  <div v-if="comebackInfo.currentType > 2" class="ml-3">
                    <v-btn disabled>복귀완료</v-btn>
                  </div>
                  <div v-else>
                    <v-btn dark class="elevation-1 ml-3" color="grey" @click="postComeback">
                      <span class="body-1 mr-1">{{comebackInfo.currentType + 1}}번째 보고 하기</span>
                      <v-icon>where_to_vote</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
                <v-card-text v-else>
                  <v-btn dark class="elevation-1 ml-3" color="grey" @click="postComeback">
                    <span class="body-1 mr-1">1번째 보고 하기</span>
                    <v-icon>where_to_vote</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-text v-if="!notComeback">
                  <v-flex xs12 class="pa-2" v-if="comebackInfo.firstLoc.region">
                    <comeback-card
                      title="First"
                      :loc="comebackInfo.firstLoc"
                    ></comeback-card>
                  </v-flex>
                  <v-flex xs12 class="pa-2" v-if="comebackInfo.secondLoc.region">
                    <comeback-card
                      title="Second"
                      :loc="comebackInfo.secondLoc"
                    ></comeback-card>
                  </v-flex>
                  <v-flex xs12 class="pa-2" v-if="comebackInfo.thirdLoc.region">
                    <comeback-card
                      title="Third"
                      :loc="comebackInfo.thirdLoc"
                    ></comeback-card>
                  </v-flex>
                </v-card-text>
                <v-card-text v-else>
                  <v-alert type="warning">아직 복귀를 시작하지 않았습니다</v-alert>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 lg6 class="pa-4">
        <v-card xs12>
          <v-subheader>복귀보고</v-subheader>
          <v-text-field
            v-model="keyWord"
            label="현재 위치를 키워드로 검색해보세요!"
            outlined
            appendIcon="search"
            class="pa-2"
            clearable
          ></v-text-field>
          <v-card-text>
            <div class="caption mb-2"><v-chip small class="mr-2">지역(시/군/구)</v-chip> {{myMarker.loc.region}}</div>
            <div class="caption"><v-chip small class="mr-2">세부 주소</v-chip> {{myMarker.loc.address}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=137a302f821492cf862c84dd692e887e"></script>
<script>
// @load="onLoad"
// @center_changed=""
// @zoom_start=""
// @zoom_changed=""
// @bounds_changed=""
// @click="moveMarker"
// @dblclick=""
// @rightclick=""
// @mousemove=""
// @dragstart=""
// @drag=""
// @dragend=""
// @idle=""
// @tilesloaded=""
// @maptypeid_changed=""
import VueDaumMap from 'vue-daum-map'
import moment from 'moment'
import axios from 'axios'
import comebackCard from '@/components/map/comebackCard'
export default {
  components: { VueDaumMap, comebackCard },
  data () {
    return {
      map: null, // 지도 객체. 지도가 로드되면 할당됨.
      mapInfo: {
        appKey: '137a302f821492cf862c84dd692e887e', // 테스트용 appkey
        center: { lat: 37.566826, lng: 126.9786567 }, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: ['services'] // 추가로 불러올 라이브러리
      },
      mapEl: {
        ps: null,
        infowindow: null,
      },
      myMarker: {
        obj: null,
        loc: {
          latlng:{
            latitude: 37.566826,
            longitude: 126.9786567
          },
          region: '기본위치',
          address: '기본위치'
        }
      },
      keyWord: null, // 검색 area에 바인딩될 keyword
      notComeback: true,
      comebackInfo: {}
    }
  },
  mounted () {
    this.getComeback()
  },
  methods: {
    // 지도가 로드 완료되면 load 이벤트 발생, 초기화 작업
    onLoad (map) {
      this.map = map
      this.initElements()
    },
    initElements () {
      // markerInit
      const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
      const imageSize = new kakao.maps.Size(40, 45)
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
      this.myMarker.obj = new kakao.maps.Marker({
        position: this.map.getCenter(),
        image: markerImage
      })
      this.myMarker.obj.setMap(this.map)
      // ps init
      this.mapEl.ps = new kakao.maps.services.Places()
      // infowindow init
      this.mapEl.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    },
    moveMarker (mouseEvent) { // 마커를 움직이는 메소드
      const latLng = mouseEvent[0].latLng
      this.myMarker.obj.setPosition(latLng)
      this.setLoc(latLng)
    },
    setLoc (latLng) { // 현재 좌표, 위치, 주소를 설정
      const geocoder = new kakao.maps.services.Geocoder()
      this.myMarker.loc.latlng.latitude = latLng.Ga
      this.myMarker.loc.latlng.longitude = latLng.Ha
      geocoder.coord2RegionCode(latLng.Ga, latLng.Ha, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          for (var i = 0; i < result.length; i++) {
            if (result[i].region_type === 'H') { // 행정동의 region_type 값은 'H' 이므로
              this.myMarker.loc.region = result[i].region_1depth_name + ' ' + result[i].region_2depth_name
            }
          }
        }
      })
      geocoder.coord2Address(latLng.Ga, latLng.Ha, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.myMarker.loc.address = result[0].address.address_name
        }
      })
    },
    searchPlace () {
      this.mapEl.ps.keywordSearch(this.keyWord, this.placesSearchCB)
    },
    placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var bounds = new kakao.maps.LatLngBounds()
        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        this.map.setBounds(bounds)
      }
    },
    displayMarker (place) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x)
      })
      kakao.maps.event.addListener(marker, 'click', () => {
        this.mapEl.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        this.mapEl.infowindow.open(this.map, marker)
      })
    },
    // API관련 메소드
    postComeback () {
      const time = moment().format('h:mm:ss a')
      let loc = this.myMarker.loc
      loc.time = time
      axios.post('resources/comebacks', loc)
        .then((r) => {
          if (!r.data.success)
            this.$store.commit('pop', { msg: r.data.msg, color: 'warning' })
          else this.$store.commit('pop', { msg: '보고완료', color: 'success' })
          this.getComeback()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getComeback () {
      axios.get('resources/comebacks/one')
        .then((r) => {
          if (!r.data.success) this.notComeback = true
          else {
            this.notComeback = false
            this.comebackInfo = r.data.d
          }
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
