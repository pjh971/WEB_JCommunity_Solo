# 중대숲(JCommunity)


![](https://lh3.googleusercontent.com/AiExm3VLAumnh5GPm6Hju-4K08awkcDuMy10y3aBQLjUot_WxtsqmPg7p_9MVMwkLfon2oVNb7M)

중대숲은 **중대 내 소통 플랫폼** 입니다.  

중대숲에선

- 아무에게도 들킬 염려가 없는  **마음의 편지** 
- 댓글과 좋아요를 통해 다른병사들의 피드백을 받아볼 수 있는 **건의사항**    
- 가장 핫한 건의사항과 최신 공지사항, 실시간 부대 정보를 한눈에 볼 수 있는 **대시보드**
- 병사와 당직 사관 모두가 불편했던 기존 전화방식보고에서 탈피한 **복귀보고체계**
- 지금 다른 중대원들이 어디까지 복귀했는지 확인가능한 **중대원 복귀 현황**

과 같은 정말 많은 서비스를 이용할 수 있습니다.
앞으로도 발전할 중대숲을 기대해 주세요!!

## 일반 현황
 - 2019 국방부오픈소스아카데미 공개SW 집체교육 WEB분야 산출물
 - 인원 : 교육사령부 육군상병 김장영 (API & web서버,  Vue기반 SPA)
 - 개발 기간 : '19.10.21 ~ '19.10.25

## 개발 배경

스마트폰 사용이 허가됨에 따라 중대 내 용사들의 생활에는 큰 변화가 생겼습니다. 개인마다 온라인으로 소통할 수 있는 수단이 생김으로서, 용사들간의 소통은 대부분 온라인을 기반으로 이루어지게 되었습니다.(생활관 단톡방, 분대별 단톡방 등). 하지만 중대 간부와의 소통에는 여전히 스마트폰 사용 이전의 방식이 사용되고 있습니다. 각 중대 별로 운영되고 있는 **마음의 편지함**이 대표적입니다.

![마음의편지](https://lh3.googleusercontent.com/-hcb5CURBXxEXNFvVnJNgFyLJxoNtn_TksvScE856iQVJzRp0VYgJIFEIqOI4eabue2vfB7ZV7E)

화장실 등의 비밀스런 장소에 위치하여 익명으로 하고 싶은 말을 적어 제출하는 **마음의 편지**는 시행 간 여러 단점이 존재했습니다. 편지를 작성할 때 남들에게 들키지 않도록 조심해야 한다는 점. 제출한 편지를 누군가 몰래 폐기할 수도 있다는 점, 부당한 내용의 편지를 작성한 익명의 제보자를 찾을 수 없는 경우가 발생한다는 점 등, 오프라인 소통 방식의 한계점이 곧 단점으로 작용했습니다. **중대숲**은 이러한 오프라인 소통방식의 한계점을 개선하고 **온라인 플랫폼**의 장점을 극대화하기 위해 고안되었습니다.

![대나무숲](https://lh3.googleusercontent.com/TSL-40sLpFzwJ24aeR0xo7Zeoo5T89QCZ8igegCLn2iLicRGaguIFvVkX3od0tllU5veubnjh28)

최근 대학생들 사이에서는 **대나무숲**이라는 학교 별 SNS 게시판이 유행입니다 한 전래동화에서는 `임금님 귀는 당나귀 귀!` 라는 남들에게 말 못할 이야기를 대나무숲에 외쳤던 신하의 이야기가 나옵니다. 대학생들도 전래동화처럼 마음 속 이야기를 털어 놓을 수 있는 공간이 필요했고, **OO대 대나무숲(O대숲)** 과 같은 SNS상의 공간을 만들어냈습니다. 각 중대에도 대나무숲과 같은 플랫폼이 필요하다고 생각했고, "중대"와 "대나무숲"을 결합한 "중대숲"이라는 이름을 고안하게 되었습니다.

![중대숲 메인 대시보드](https://lh3.googleusercontent.com/AE4ImXGxAUlcWoS4_Fk3PKqNgB4Xq2PkBetCF_YzX-De4LzuDfoyZ_lOvUX8GvdD8cBakV3eS5g=s1000)

이후 중대 단위의 페이지가 있다면 온라인 소통이 가능할 뿐만 아니라  중대 운영에 도움이 되는 다양한 기능을 구현할 수 있겠다는 생각을 하게 되었습니다.  각 중대와 매칭되는 모델을 설계했고, **대시보드 형태의 메인페이지**를 구상하게 되었습니다. 중대별 페이지에서는 복귀보고체계, 출타종합체계, 중대원 질병 관리 체계, 건의사항, 마음의편지, 공지사항 등의 서비스를 사용할 수 있도록 할 것입니다.

## 기대 효과
중대숲은 안정적인 서비스가 되는 시점에 **모든 장병이 사용하는 플랫폼**이 될 것입니다.

 현재 운영 중인 비슷한 서비스로는 훈련병을 대상으로 개인자력조회와 인터넷 편지기능을 제공하는 **더캠프**가 있습니다.  

중대숲의 가장 큰 강점은 **서비스의 높은 확장 가능성**에 있습니다. 

독후감 작성, 일일 오감사 작성 등 로그인 및 개인정보가 필요한 기능부터 식단 배너, 중대 갤러리, 국방 뉴스배너 등 특정 홈 화면에서 보여줄 수 있는 부분들까지 서비스에 추가할 수 있습니다. 

또한 용사들이 중대숲을 이용하며 생성된 데이터를 다양한 **병영혁신 프로젝트**에 활용할 수 있습니다.  병영혁신 프로젝트에는 눈에 띄지 않았던 병영 부조리의 해결, 병영 문화 개선, 새로운 병영 콘텐츠 제작 등의 주제가 포함될 수 있습니다. 

**수익화 모델**로는 광고배너를 배치하여 군관련 아이템 등을 홍보하는 것이 있습니다. 서비스 운영을 통해 얻은 데이터로부터 새로운 비즈니스 모델이 나올 가능성 또한 충분합니다.

## 향후 계획
 1. 프로젝트 관련
 - 프론트엔드 디자인 개선
 - 모델 개선
 - 군 관련 데이터 처리시 보안적인 측면을 고려한 기능 개선
 - 중대 정보를 관리할 수 있는 Admin 페이지 제작(현재 유저 정보의 권한으로 접근제어중)

 2. 서비스 관련
 - 기명 게시판 추가 (혹은 socket.io 이용한 중대 톡방 개설)
 - 출타종합체계 구현
 - 중대원 질병 관리 체계 구현
 - 중대 갤러리 추가
 - 중대 가이드북 추가
 - 일일 오감사 작성 탭 추가
 - 국방 뉴스 배너 대시보드에 노출
 
 등등 추진 예정
  
## 페이지 및 서비스 설명
#### 0. 인트로
![인트로](https://lh3.googleusercontent.com/hAiyVvEhSjEkNB7KVBcIQ3QsopAsldNl0i9ulVjzfGqmlLhDuAb-jDolUN5k1pmhVjcLsAp2CEQ=s1000)
인트로 페이지이다.
- 군사시설 접근금지 안내판을 차용하여 디자인되었다.
- 로그인이 되지 않아 토큰이 없다면 이 페이지가 표시된다.

#### 1. 로그인 
![로그인](https://lh3.googleusercontent.com/aWwFX2ZdEqfwuRaIf7PaazoG7PzigEabLJJQdsntn35NL8CX7sGGT-Th3m3Wfrwe1ENLxvX4-Xw=s500)
로그인 페이지이다.
- 본인의 아이디와 비밀번호를 이용하여 로그인한다. 
- 기존의 회원이 아니라면, 회원가입을 진행한다. 
- 군사 데이터와 연관이 되어 있으므로 암호 기억하기를 체크하지 않으면 서버에서 설정한 시간(default 3분) 이후에 토큰이 초기화되어 로그인이 해제된다.
- axios interceptor를 통해 항상 토큰 유효성 검사를 한다.

#### 2. 회원가입 
![회원가입](https://lh3.googleusercontent.com/kaNQK1GLOdD92tRImUuvd_ChMQ_YnSIK9zyvOyoVn3BZFXMY9_sTITipCphiZUeRCaHMFaS8Mew=s500)
회원가입 페이지이다.
- 아이디, 비밀번호, 이름,  군번, 부대 정보로 회원가입이 가능하다. 
- 부대 정보는 자동적으로 DB와 연동되며 유저정보는 부대 모델과 관계를 갖고 있기 때문에 같은 중대원들끼리만 정보가 공유된다.
- 유효성 검사를 구현해(VeeValidate사용) 데이터 노이즈를 방지한다.

#### 3. 메인 대시보드
![중대 메인 대시보드](https://lh3.googleusercontent.com/MbWC_PmyN3O_HheZEQp2jG3Wkpai89t5QeONZQY4fiIEzJ7XqF3MfUPhcaHcTwXcNaZ5e2HfvDY=s1000)
중대의 메인 대시보드이다. 
- 좌측 Navigation의 메뉴를 이용해 다양한 서비스로 접근이 가능하다. 
- 가운데 Parallex에는 부대를 소개하는 데이터가 표시되며,  4개의 카드에는 중대 관련 정보(접속중인 중대원, 출타자 현황, 최근 건의사항, 전체 게시물 등)이 실시간으로 업데이트 된다. 
- 공지사항은 최신순으로 건의사항은 좋아요 순으로 정렬이 되며 상위의 3개만 노출된다. 
- 중대와 관련한 다양한 정보들이 추가될 수 있다.
- 하단에는 광고를 게제할 수 있는 배너가 존재한다.(군 관련 광고 게제 가능)

#### 4. 마음의 편지 작성
![마음의편지 작성 다이얼로그](https://lh3.googleusercontent.com/_BjsxiIfSR9oGjcgpduLoHCgMjo7jJS2zBo7jRCKa6Uwp1hk8LF2tb7m0WAj1d1EnCRotYaL9uQ=s500)
마음의 편지 작성 다이얼로그 이다.
- 하단의 메세지 형태의 버튼을 누르면 중대숲 어디서나 마음의 편지를 작성할 수 있다.
- 수정이 불가능하므로, 부적절한 내용을 작성하지 말라는 주의 문구가 있다.

#### 5. 마음의 편지함
![마음의 편지함](https://lh3.googleusercontent.com/baHQA_oHlpAhVRTkTw4TLHBIoF1dJ9j_Q56jG7eo_wWIvZRyUq6u-aeE-zU901tu4rgUclhMv1A=s1000)
중대 마음의 편지함이다. 
- 간부만 접근 가능하다.(API에서 page권한을 확인 후 허가시에만 접근가능)
- 날짜순으로 정렬이 가능하다.

#### 6. 마음의 편지
![마음의편지](https://lh3.googleusercontent.com/FlmgsLTZgVb-86JMRkpL_eepUkY71lz7O6wEmA3EFLcPQLhqyiLHI_2YBH8_J3mx8JFJzBlqSYU=s500)
마음의 편지이다.
- 마음의 편지함 리스트에서 아이템을 클릭하면 편지를 읽을 수 있다. 
- 편지는 익명성이 보장되며 API에서 데이터를 넘겨줄 때 유저정보를 제거하여 응답한다. 혹
- 여나 부적절한 편지가 작성될 수 있으므로 DB에는 유저정보가 함께 저장되어 있다. 간부만 조회 및 삭제가 가능하다(API 미들웨어에서 권한 확인 후 호출 허용)

#### 7. 공지사항
![공지사항 리스트](https://lh3.googleusercontent.com/zWk5JlnwuLGhIT4ZsAb28LQWw7qme2KyZt6mQ286mer6YAhrpvRFGBNK5oZVVlrEmtuRz4Nq9i4=s1000)
공지사항 리스트이다.
- 공지사항을 확인할 수 있다. 
- 검색기능, 조회수와 날짜별 정렬이 가능하다. 
- 글쓰기의 경우 API로 POST요청을 보낼 때 권한을 검사하여 허용한다.(간부만 글작성 가능) 
- 각 게시물은 편지와 같은 컴포넌트로 구성되었다.

#### 8. 건의사항 리스트
![건의사항 리스트](https://lh3.googleusercontent.com/KbiLLguu8GpOY9qD7s7ap5oDN4fc6aK4lDUHd1BRiVAOFOIz6NjsSPQhDAl6xdHsbdyc2_AZC6lW=s1000)
건의사항 리스트이다. 
- 글쓴이, 조회수, 추천, 날짜 순으로 정렬이 가능하다. 
- 병사 이상의 권한이면 글을 작성할 수 있다.

#### 9. 건의사항
![건의사항](https://lh3.googleusercontent.com/qWX7PF346_67lYekqzLwQau2hj8Q6gzkvZXuU1TwNJNXPCuLa51B7_6QAks5Yu6CsS_xBNqJ_JtW=s1000)
건의사항이다. 

- 건의사항과 관련된 내용이 카드에 출력되며 좋아요를 누를 수 있다. 
- 좋아요를 한번누른 유저는 다시 누를 수 없다(LikeHistory 모델을 통해 건의사항과 유저를 담은 모델을 관리). 
- 수정의 경우는 본인만 가능하며, 삭제는 자신보다 상위권한의 유저가 삭제할 수 있다. 
- 댓글을 작성할 수 있으며, 댓글은 본인만 삭제가 가능하다.
- 댓글은 200자 제한이다.

#### 10. 복귀보고체계
![복귀보고체계](https://lh3.googleusercontent.com/Yc2dKr4IUAFMjYj2Wy_LaVbjb5eXHNNUK1BEspPvieJlhwiBkR4kNILtDG7gflYe9Ph7YPOm463C=s1000)
복귀보고체계 서비스이다. 
- 복귀 보고의 경우에는 날짜, 부대, 유저, 1보고, 2보고, 3보고, 현재 보고 타입을 담은 모델을 통해 이루어진다. 
- 각 보고는 지역(시/군/구), 세부주소, 보고 좌표(lat, lng) 으로 구성되어 있다.
- 지도를 클릭하면 마커가 표시되며  현재지역이 상단에 표시된다. (vue-daum-map을 사용해 지도 구현)
- 키워드로 장소를 검색할 수 있다.
- 1보고, 2보고, 3보고가 존재한다.
- 1보고의 경우에는 어디에서건 보고가 가능하다. 
- 2보고의 경우에는 등록된 부대의 지역(시/군/구)과 같은지역에서만 보고가 가능하며 다른 위치에서 보고하게 되면 API에서 지역을 비교한 뒤 거부된다. 
- 3보고의 경우에는 등록된 부대의 좌표와 직선거리 1Km이내에서만 가능하다. API에서 좌표끼리의 거리를 계산한 뒤 1Km보다 크다면 거부한다. 
- 각 보고를 할 때마다 우측에 복귀 정보가 표시되며, 복귀가 완료된 뒤에는 보고 버튼이 복귀완료 버튼으로 바뀌게 된다. 

#### 11. 중대원 복귀 현황
![중대원 복귀 현황](https://lh3.googleusercontent.com/iS4Y2IJHCJ6g1nfqzy1VkAqJN-bhS2rPRBBsbSiUMJ8JXsr6Is0AxH768rAdA73kZ8kmSYbL5_Ml=s1000)
중대원들의 복귀현황을 파악할 수 있다.
- 상단에 위치한 3가지 chip을 통해 오늘날짜, 복귀중인 인원, 복귀 정보가 로드된 시간을 알 수 있다.
- 현황판에서는 복귀자, 마지막 보고위치, 보고정보를 알 수 있다. 
- 복귀정보확인의 버튼그룹을 통해 몇번 보고까지 완료했는지 한눈에 확인이 가능하다.  
- 복귀정보확인의 각 버튼은 해당 보고 정보를 확인할 수 있다.
- 보고자 목록은 API에서 currentType(완료된 보고종류)에 따라 오름차순으로 정렬된다  (3보고가 완료된 보고자가 가장 아래에 위치)


- - -

# Document
## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

### 컴퓨터 환경
 - Node.js가 설치되어 있어야 합니다.
 - 인터넷 접속이 필요합니다(지도 API 사용)
  - chrome 사용권장
 - MongoDB 설치 (필수 x,  Local DB를 사용시에만 설치)

## 설치 안내 (Installation Process)
#### 1. project clone 
- ` $ git clone 주소`
- ` $ cd JCommunity`
#### 2. vue build
- `$ cd fe`
- `$ yarn` 
#### 3. node module install
- `$ cd ../be`
- `$ yarn `
#### 4. config 폴더 세팅
- JCommunity 폴더에 config 폴더를 생성
- index.js 파일을 만들고 아래의 코드를 복사 및 커스터마이징
```javascript
module.exports  = {
	dbUrl: 'mongodb+srv://anyone:jChIomXu6dNDtS0X@cluster0-ozwyu.mongodb.net/J_community',
	// db를 MongoDB Atlas서버와 연동(모든 아이피에서 접근가능)
	// dbUrl: 'mongodb://localhost:27017/JCommunity' // 로컬 DB사용시
	// admin과 company는 서버 처음 동작시 localDB에 데이터를 생성하기 위함임, 값바꿔도 상관 없음
	admin: {
		id: 'admin',
		pwd: '1q2w3e4r!',
		name: '관리자',
		number: '00-12345678',
	},
	company: {
		name: '국방부',
		phoneNumber:'02-123-4567',
		loc: {
			latlng: {
				latitude: 126.9755402997576,
				longitude: 37.52980156173816
			},
			region: '서울특별시 용산구',
			address: '서울 용산구 용산동3가 9'
		},
		explain:  '대한민국 국방부'
	},
	// 토큰 발급 및 재발급을 위한 jsonwebtoken 설정값
	jwt: {
		secretKey:  'very very secret',
		subject:  'token',
		issuer:  'xxx.com',
		algorithm:  'HS256',
		expiresIn:  60  *  3, // 기본 3분
		expiresInRemember:  60  *  60  *  24  *  6 ,// 기억하기 눌렀을 때 6일
		expiresInDiv:  3  // 토큰시간 나누는 기준
	}
}
```

## 사용법 (Getting Started)

`$ yarn start` : JCommunity 위치에서 실행하면 웹서버가 실행됩니다. 

## 파일 정보 및 목록 (File Manifest)

- ### 프론트엔드 문서  [링크](/fe/readme.md)
- ### 서버 기술 문서 [링크](/be/readme.md)


## 저작권 및 사용권 정보 (Copyright / End User License)

> @Jay_Kim

## 배포자 및 개발자의 연락처 정보 (Contact Information)

> Jay_Kim (dkel03@korea.ac.kr)

## 알려진 버그 (Known Issues)

> 추가바람

## 문제 발생에 대한 해결책 (Troubleshooting)

> 추가바람

## 크레딧 (Credit)
> ?

## 업데이트 정보 (Change Log)
- 191024 0.0.1
