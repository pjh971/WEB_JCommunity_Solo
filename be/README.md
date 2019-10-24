# 중대숲 Server Document(API, WebServer)

## Model
### page
![page](https://lh3.googleusercontent.com/4tdY1gAOOQctgHzsAOuI-iBphlfVUMSH1Vf6XqJXW2oujRLEQ4qcNAIMJFl8_X2jyYJ09ibsFQQ7=s500)

page 모델

### company & user
![enter image description here](https://lh3.googleusercontent.com/vmavcVoiQVtw9E5idxls_1sRDRB2YKrp_ikRj3x5JvQAvgCEJFOVrouGcAPikRXEoIHUh93fTTU3=s1000)

company와 user 모델
- user는 company를 참조
- company의 loc 객체
```
loc: {
	latlng:{
		latitude: { type:  Number, default:  0},
		longitude: { type:  Number, default:  0},
	},
	region: { type:  String, default:  ''},
	address: { type:  String, default:  ''}
}
```
### suggestion


![enter image description here](https://lh3.googleusercontent.com/Mn_E0YJiYZCkoS5A6yTdsicO1gYbprDO4UzS0lxJyxWX5L2UqBqfokhhRk_z6TfzdtPShOFh9Vyb=s1000)
 
suggesetion 관련 모델
- comment는 댓글 모델이다
- likeHistory는 좋아요를 누른 유저와 해당 게시물을 담고있다.
- cnt 객체
```
cnt: {
	view: { type:  Number, default:  0 },
	like: { type:  Number, default:  0 }
}
```

### notice & letter

![enter image description here](https://lh3.googleusercontent.com/c_zk6OSd6LpULW953K1RSpMu4t4w5WTDmbDdluF8T4jq7Zlv33k5We1BFssnfT_Dpbka0Wc6sMTv=s1000)

notice와 letter 모델

### comeback
![enter image description here](https://lh3.googleusercontent.com/qW79vQ3JpNmyfM2KsM_tukd7CKKRCMJyMCGBNglhYp7lvxKBUgL1a2l1rqzDM8tYXMJRLd3FCerD=s500)

comeback 모델
- firstLoc 객체
```
firstLoc: {
	latlng: {
		latitude: { type:  Number, default:  0},
		longitude: { type:  Number, default:  0},
	},
	region: { type:  String, default:  ''},
	address: { type:  String, default:  ''},
	time: {type:  String, default:  ''}
}
```
- secondLoc 객체
```
secondLoc: {
	latlng: {
		latitude: { type:  Number, default:  0},
		longitude: { type:  Number, default:  0},
	},
	region: { type:  String, default:  ''},
	address: { type:  String, default:  ''},
	time: {type:  String, default:  ''}
}
```
- thirdLoc 객체
```
thirdLoc: {
	latlng: {
		latitude: { type:  Number, default:  0},
		longitude: { type:  Number, default:  0},
	},
	region: { type:  String, default:  ''},
	address: { type:  String, default:  ''},
	time: {type:  String, default:  ''}
}
```


## Middle-Ware

## API (localhost:port/api)
lv  === req.user.lv

 ### register (/register) [ lv = free ]

 회원가입 API

Method | Url | Detail
---- | ---- | ----
POST | /register | 회원가입 API. ID/PW/이름/군번/부대/을 받는다.

 ### sign (/sign) [ lv = free ]

 로그인 API 

Method | Url | Detail
---- | ---- | ----
POST | /sign/in | 로그인 API. JWT 포맷으로 인코딩된 access token과 refresh token을 발급한다. 또한 refresh token의 expire가 얼마 남지 않았다면 refresh token도 새로 만들어서 발급해주며 로그인시 로그인 횟수를 증가시킨다.

 ### manage (/manage) [ lv = 0 ]

부대, 유저, 페이지 등 민감한 정보들에 대한 CRUD 수행하는 API

   **user** (/manage/user)

Method | Url | Detail
---- | ---- | ----
GET | /manage/user | 유저 정보 리스트를 반환한다.
PUT | /manage/user/{ _id } | 유저 정보 수정 API.
DELETE | /manage/user/{ _id } | 유저 정보 삭제 API.

  **page** (/manage/page)

Method | Url | Detail
---- | ---- | ----
GET | /manage/page | 페이지 정보 배열을 반환한다.
PUT | /manage/page/{ _id } | 페이지 모델 수정 API.
DELETE | /manage/page/{ _id } | 페이지 모델 삭제 API.

 **company** (/manage/company)

Method | Url | Detail
---- | ---- | ----
GET | /manage/company | 부대 정보 리스트를 반환한다.
POST | /manage/company | 부대 등록 API. 부대이름, 부대번호를 받는다.
PUT | /manage/company/{ _id } | 부대 수정 API.
DELETE | /manage/company/{ _id } | 부대 삭제 API.

### resources (/resources)
-resource와 관련한 데이터를 처리하는 API

 **pages** (/resources/pages) [ lv free ]

Method | Url | Detail
---- | ---- | ----
POST | /resources/pages | page url을 받는다. 페이지와 유저의 권한을 비교하여 접근권한 여부를 check. 만약 페이지가 없다면 새로 생성

 **suggestions** (/resources/suggestions) [ lv > 3 ]

Method | Url | Detail
---- | ---- | ----
GET | /resources/suggestions/one/{ id } | params id에 해당하는 건의사항을 반환한다. 반환시 comment collection에서 이 건의사항에 해당하는 댓글을 포함하여 반환한다. 또한 likeHistory 모델을 조회하여 해당 유저가 해당 건의사항에 좋아요를 눌렀는지에 대한 여부도 반환한다.
GET | /resources/suggestions/list | 유저의 부대에 해당하는 건의사항 리스트를 반환한다. (이후에 서버사이드 페이지네이션 구현)
GET | /resources/suggestions/like/{ _id } | 건의사항에서 유저가 좋아요를 누르면 likeHistory 데이터를 생성하고, cnt.like를 1 증가시킨다
GET | /resources/suggestions/dislike/{ _id } | 건의사항에서 유저가 좋아요를 취소하면 likeHistory 데이터를 삭제하고, cnt.like를 1 감소시킨다
GET | /resources/suggestions/listByLike | 홈페이지에 띄울 좋아요 순으로 정렬된 건의사항 3개를 반환한다.
POST | /resources/suggestions/ | 건의사항 작성 API
PUT | /resources/suggestions/{ id } | 건의사항 수정 API(req에 담겨있는 유저정보를 확인해 본인만 수정가능)
DELETE | /resources/suggestions/{ id } | 건의사항 삭제 API(req에 담겨있는 유저정보를 확인해 높은 권한도 삭제가능)

 **comments** (/resources/comments) [ lv > 2 ]

Method | Url | Detail
---- | ---- | ----
GET | /resources/comments/{ _suggestion } | params id에 해당하는 건의사항의 댓글들을 반환한다.
DELETE | /resources/comments/{ id } | 댓글 삭제 API

**companys** (/resources/companys) [ lv  free ]

Method | Url | Detail
---- | ---- | ----
GET | /resources/companys/one | req에 담겨있는 유저정보의 company를 DB에서 찾아 반환한다.
GET | /resources/companys/list | DB에 존재하는 모든 부대정보를 반환한다(회원가입 및 유저정보 수정시에 사용).

**letters** (/resources/letters) [ lv > 3 ]

Method | Url | Detail
---- | ---- | ----
POST | /resources/letters/ | title, context를 받는다. 마음의 편지 작성 API
GET | /resources/letters/one/{ _id } | params id에 해당하는 마음의 편지를 반환한다. (lv > 2)
GET | /resources/letters/list | 유저의 부대에 해당하는 마음의 편지 리스트를 반환한다. (lv > 2)
DELETE | /resources/letters/{ _id } | 마음의 편지 삭제 API (lv > 2)

 **notices** (/resources/notices) [ lv > 3 ]

Method | Url | Detail
---- | ---- | ----
GET | /resources/suggestions/one/{ id } | params id에 해당하는 공지사항을 반환한다.
GET | /resources/suggestions/list | 유저의 부대에 해당하는 공지사항 리스트를 반환한다.
GET | /resources/suggestions/listByDay | 홈페이지에 띄울 id 순으로 정렬된 공지사항 3개를 반환한다.
POST | /resources/suggestions/ | 공지사항 작성 API(lv > 2)
PUT | /resources/suggestions/{ id } | 공지사항 수정 API(req에 담겨있는 유저정보를 확인해 본인만 수정가능)(lv > 2)
DELETE | /resources/suggestions/{ id } | 공지사항 삭제 API(req에 담겨있는 유저정보를 확인해 높은 권한도 삭제가능)(lv > 2)

**combacks** (/resources/comebacks) [ lv > 3 ]

Method | Url | Detail
---- | ---- | ----
GET | /resources/comebacks/one | 유저가 복귀보고체계에 들어왔을 때 오늘, 해당유저, 유저의부대 데이터로 조회한 comeback 결과를 리턴한다. 없으면 복귀를 시작하지 않았다는 메세지를 보낸다
GET | /resources/comebacks/list | 유저가 중대원 복귀 현황에 들어왔을 때 오늘, 유저의 부대 데이터로 조회한 모든 comeback 결과를 리턴한다. 없으면 복귀 인원이 없다는 메세지를 보낸다. 
POST | /resources/comebacks | 복귀보고체계에서 보고버튼을 누르게 되면 이 API가 호출된다. 유저가 지도에서 선택한 loc정보를 body로 받는다. 오늘, 해당유저의 comeback 정보를 찾고 없으면 comeback을 생성하여 1보고를 완료한다. 1보고는 조건이 없다. 만약 있다면 해당 comeback의  currentType 1인지 2인지를 구별하여 2보고를 진행할 것인지 3보고를 진행할 것인지를 판단한다. 2보고 시에는 받은 loc정보의 region과 유저 부대의 region이 동일한지를 판단한다. 3보고 시에는 받은 loc정보의 좌표와 유저 부대의 loc정보의 좌표의 거리를 계산하여 1km이내인지를 판단한다. 보고가 적절하지 않다면 보고 조건에 맞지않는다는 메세지를 리턴한다.