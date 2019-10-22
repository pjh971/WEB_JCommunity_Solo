### Model

---
### API Document(/api)
##### register
- POST /register : 회원가입 API. ID/PW/이름/군번/부대/을 받는다.

##### sign
- POST /sign/in : 로그인 API. JWT 포맷으로 인코딩된 access token과 refresh token을 발급한다. 또한 refresh token의 expire가 얼마 남지 않았다면 refresh token도 새로 만들어서 발급해주며 로그인시 로그인 횟수를 증가시킨다.

##### manage(lv = 0만 사용가능)
1. user 
- GET /manage/user : 유저 정보 리스트를 반환한다.
- PUT /manage/user/{ _id } : 유저 정보 수정 API.
- DELETE /manage/user/{ _id } : 유저 정보 삭제 API.
2. page
- GET /manage/page : 페이지 정보 배열을 반환한다.
- PUT /manage/page/{ _id } : 페이지 수정 API.
- DELETE /manage/page/{ _id } : 페이지 삭제 API.

##### resources
1. pages
- POST /resources/pages : page url을 받는다. 페이지와 유저의 권한을 비교하여 접근권한 여부를 check. 만약 페이지가 없다면 새로 생성
2. suggestions
- GET /resources/suggestions/one/{ id } : params id에 해당하는 건의사항을 반환한다. 반환시 comment collection에서 이 건의사항에 해당하는 댓글을 포함하여 반환한다.
- GET /resources/suggestions/list : 유저의 부대에 해당하는 건의사항 리스트를 반환한다. (이후에 서버사이드 페이지네이션 구현)
- POST /resources/suggestions/ : 건의사항 작성 API
- PUT /resources/suggestions/{ id }  : 건의사항 수정 API(req에 담겨있는 유저정보를 확인해 본인만 수정가능)
- DELETE /resources/suggestions/{ id }  : 건의사항 삭제 API(req에 담겨있는 유저정보를 확인해 높은 권한도 삭제가능)
3. comments
- GET /resources/comments/{ _suggestion }  : params id에 해당하는 건의사항의 댓글들을 반환한다.
- DELETE /resources/comments/{ id }  : 댓글 삭제 API
