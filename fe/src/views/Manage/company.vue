<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="c in companys" :key="c._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{c.name}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text primary-text>
            <div>
              <div>부대 전화번호: {{c.phoneNumber}}</div>
              <div>부대 설명: {{c.explain}}</div>
              <div>부대 지역: {{c.loc.region}}</div>
              <div>부대 위치: {{c.loc.address}}</div>
            </div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn color="orange" @click="putDialog(c)">수정</v-btn>
            <v-btn color="error" @click="delCompany(c._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn absolute dark right color="green darken-4" @click="mdUp">
     <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Company Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="부대명"
                  persistent-hint
                  required
                  v-model="comName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="전화번호"
                  persistent-hint
                  required
                  v-model="comPhone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="부대설명"
                  persistent-hint
                  required
                  v-model="comExplain"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card v-if="!updateMode">
                  <v-subheader>부대 위치 설정</v-subheader>
                  <vue-daum-map
                  :appKey="mapInfo.appKey"
                  :center.sync="mapInfo.center"
                  :level.sync="mapInfo.level"
                  :mapTypeId="mapInfo.mapTypeId"
                  :libraries="mapInfo.libraries"
                  @load="onLoad"
                  @click="moveMarker"
                  style="width:100%;height:500px"/>
                  <v-card-text>
                    <div>지역: {{myMarker.loc.region}}</div>
                    <div>위치: {{myMarker.loc.address}}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="updateMode ? putCompany() : postCompany()">{{updateMode ? "수정" : "생성"}}</v-btn>
          <v-btn color="blue darken-1" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=137a302f821492cf862c84dd692e887e"></script>
<script>
import VueDaumMap from 'vue-daum-map'
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
      // 페이지 관련
      companys: [],
      dialog: false,
      comName: '',
      comPhone: '',
      comExplain: '',
      updateMode: false,
      putId: ''
    }
  },
  mounted () {
    this.getCompany()
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
    // API 관련
    getCompany () {
      this.$axios.get('manage/company')
        .then((r) => {
          this.companys = r.data.ds
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putDialog (company) {
      this.putId = company._id
      this.dialog = true
      this.comName = company.name
      this.comPhone = company.phoneNumber
      this.comExplain = company.explain
      this.updateMode = true
    },
    postCompany () {
      this.dialog = false
      this.$axios.post('manage/company', {
        name: this.comName, phoneNumber: this.comPhone, loc: this.myMarker.loc, explain: this.comExplain
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 등록완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putCompany () {
      this.dialog = false
      this.$axios.put(`manage/company/${this.putId}`, {
        name: this.comName, phoneNumber: this.comPhone, explain: this.comExplain
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 수정완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    delCompany (id) {
      this.$axios.delete(`manage/company/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '부대 삭제완료', color: 'success' })
          this.getCompany()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    mdUp () {
      this.dialog = true
      this.updateMode = false
      this.comName = ''
      this.comPhone = ''
      this.comExplain = ''
    }
  }
}
</script>
