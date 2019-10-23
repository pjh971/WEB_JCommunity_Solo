<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg6>
        <v-card>
          <v-toolbar class="elevation-0 pr-3" dark src="@/assets/wide_background.jpg">
            <div class="title">위치기반 복귀보고체계</div>
          </v-toolbar>
          <v-card-text>
            <v-subheader>map</v-subheader>
            <v-card xs12>
              <vue-daum-map
                :appKey="mapInfo.appKey"
                :center.sync="mapInfo.center"
                :level.sync="mapInfo.level"
                :mapTypeId="mapInfo.mapTypeId"
                :libraries="mapInfo.libraries"
                @load="onLoad"
                @click="moveMarker"
                style="width:100%;height:500px"/>
            </v-card>
          </v-card-text>
          <v-row class="mt-5" style="width:100%">
            <v-text-field
              v-model="keyWord"
              label="현재 위치를 키워드로 검색해보세요!"
              outlined
              clearable
              style="margin-left:30px;margin-right:20px;width:65%"
            ></v-text-field>
            <v-btn x-large outlined color="dark" @click="searchPlace"><v-icon>search</v-icon></v-btn>
          </v-row>
          <v-card-text>지역(읍면동): {{myMarker.loc.region}}</v-card-text>
          <v-card-text>세부 주소: {{myMarker.loc.address}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <v-card>
          <v-toolbar class="elevation-0 pr-3" dark src="@/assets/wide_background.jpg">
            <div class="title">복귀 보고</div>
          </v-toolbar>
          <v-card-text>
            <div>복귀는 신중히</div>
            <v-btn @click="postComeback">전송</v-btn>
          </v-card-text>
          <v-card-text>
            {{notComebackMsg}}
          </v-card-text>
          <v-card-text>
            {{comebackInfo}}
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
export default {
  components: { VueDaumMap },
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
      notComebackMsg: '',
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
          if (!r.data.success) this.notComebackMsg = r.data.msg
          else {
            this.notComebackMsg = ''
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
