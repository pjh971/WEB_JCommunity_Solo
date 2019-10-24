<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="grey lighten-3" class="elevation-0">
          <v-card-text>
          </v-card-text>
          <v-layout wrap row>
            <v-flex xs12 lg6 class="pa-6">
              <v-toolbar prominent class="ml-5 mb-n10" style="z-index:2" width="90%" height="80px">
                <div class="ma-4">
                  <div class="title font-weight-thin">Map<v-chip class="ml-5">{{myMarker.loc.region}}</v-chip></div>
                </div>
                <v-spacer></v-spacer>
                <div class="mt-4">
                  <div v-if="comebackInfo.currentType > 2" class="ml-3">
                    <v-btn disabled>복귀완료</v-btn>
                  </div>
                  <div v-else>
                    <v-btn dark class="elevation-1 ml-3" color="grey" @click="postComeback">
                      <span class="body-1 mr-1">보고</span>
                      <v-icon>where_to_vote</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-toolbar>
              <v-card xs12 color="grey lighten-2">
                <vue-daum-map
                  :appKey="mapInfo.appKey"
                  :center.sync="mapInfo.center"
                  :level.sync="mapInfo.level"
                  :mapTypeId="mapInfo.mapTypeId"
                  :libraries="mapInfo.libraries"
                  @load="onLoad"
                  @click="moveMarker"
                  style="width:100%;height:680px;z-index:1">
                </vue-daum-map>
              </v-card>
            </v-flex>
            <v-flex xs12 lg6 class="pa-6">
              <v-card class="elevation-0" color="grey lighten-3">
                <v-card-title class="px-6" width="100">
                  <v-text-field
                      v-model="keyWord"
                      label="현재 위치를 키워드로 검색해보세요!"
                      outlined
                      appendIcon="search"
                      dense
                  ></v-text-field>
                </v-card-title>
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
      markers: [],
      keyWord: null, // 검색 area에 바인딩될 keyword
      notComeback: true,
      comebackInfo: {}
    }
  },
  mounted () {
    this.getComeback()
  },
  watch: {
    keyWord: {
      handler() {
        this.delay()
      }
    }
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
      this.mapEl.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
      this.mapEl.infowindow.setContent('lovv')
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
      this.markers.push(marker)
      kakao.maps.event.addListener(marker, 'click', () => {
        // var content = '<div style="padding:5px;z-index:1;">' + place.place_name + '</div>'
        // this.mapEl.infowindow.setContent(content)
        this.mapEl.infowindow.open(this.map, marker)
      })
    },
    removeMarker() {
      for ( var i = 0; i < this.markers.length; i++ ) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
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
    },
    delay () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.removeMarker()
        this.searchPlace()
      }, 1000)
    }
  }
}
</script>
