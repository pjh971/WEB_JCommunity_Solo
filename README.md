# J_community

중대숲
### 기술 스택
- **node.js & express.js(백엔드):** 웹서버, API서버  
- **mongoDB:** NoSQL 데이터베이스  
- **vue.js(프론트엔드):** 화면구성  
- **vuetify.js(프론트엔드):** material 화면구성  

---
### 초기 setting
- node.js 설치
- mongoDB 설치 혹은 mongodb Atlas 사용
- git clone 이후 be & fe에서 yarn install
- config 파일 설정
- 웹상에서 관리자 계정으로 모든 페이지를 클릭하여 페이지 생성(페이지별 권한 설정 때문))

---
### 1일차 구현 사항

##### < 1. 회원가입, 로그인, 권한별 페이지 접근 기능 구축>
-  회원가입 및 로그인 페이지 생성
- **vee-validate** 모듈 사용으로 회원가입 유효성 검사
- 로그인시 **localStorage**에 **token**정보 저장
- 유저 관리 & 페이지 관리 페이지 생성
- **axios**를 통한 API접근
- 공용 알림메세지 사용 (**Vuex**로 전역등록, App.vue에 **snack-bar** 구현)
```javascript
// pop 사용법 (axios 응답에 대해 사용)
if(!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
// if문이 붙는 이유는 router.js에서 api가 보낸 http-errors를 처리하기 때문이다(중복 snackbar 활성화 방지)
```

- **REST ful**한 API 구축
- 미들웨어 통한 권한별 접근제어
- 회원가입시 암호화 설정(**crypto** 모듈 사용, 단방향 암호화)
- token 발급 및 갱신 로직 (**JWT**: jsonwebtoken 모듈사용)
- **moment.js** 모듈 도입(토큰 재발급시 사용)



##### config 파일 세팅 방법.

```javascript
module.exports = {
  dbUrl: 'mongodb://localhost:27017/nemv',
  admin: {
    id: String
    pwd: String
    name: '관리자',
    number: String,
    company: String
  },
  jwt: {
    secretKey: String,
    subject: 'token',
    issuer: 'xxx.com',
    algorithm: 'HS256',    
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 6 ,// 기억하기 눌렀을 때 6일
    expiresInDiv: 3 // 토큰시간 나누는 기준
  },
}
```
이런식으로 관리자 계정, 디비 연결 문자열 등을 작성해야 웹서버가 정상 구동됨.

---
### 2일차 구현 사항
##### < 1. 건의사항 기능 추가 >
- suggestion, suggestionDetail view를 생성, commentCard component화
- vuetify vue-data-table을 이용한 게시판 구현
- comment, suggestion model 정의 및 API 구현


---
### 3일차 구현 사항

---
### 4일차 구현 사항

---
### 5일차 구현 사항