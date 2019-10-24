# 중대숲(JCommunity)


![](https://lh3.googleusercontent.com/AiExm3VLAumnh5GPm6Hju-4K08awkcDuMy10y3aBQLjUot_WxtsqmPg7p_9MVMwkLfon2oVNb7M)

중대숲은 **중대 내 소통 플랫폼** 입니다.  

스마트폰 사용허가에 따라 용사들 간의 소통은 대부분 온라인을 기반으로 이루어지게 되었습니다. 이에 현재 많은 부대에서 시행되고 있는 **마음의 편지**,  **건의사항 설문**,  **공지사항** 등의 소통방식을 온라인 서비스로 구현했습니다. 

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

하루에도 수만여명의 장병들이 휴가에 복귀하기 위해 택시를 이용하여 이동하게 되는데, 병사들에게 왕복 교통비는 출타 간에 큰 부담 중 하나이다.

이에 목적지가 같은 주변의 전우들에게 신속하게 연락하여 교통비와 출타시간 절약 및 전우들과의 훈훈한 분위기를 느낄 수 있는 주변 전우들 다모아(Damoa) 애플리케이션을 개발하였다.  

## 기대효과
 - 출타 장병들의 택시비 부담을 덜어줌으로써 부대 복지가 향상된다.
 - 출타 복귀 시간대에 택시 한대로 여러 병사가 이용함으로 택시 부족으로 인한 지연복귀를 예방할 수 있다.

## 향후 추진 계획
 - 인터넷망에 군 조직도를 둘 수는 없으므로 보안적인 측면을 고려해서 기능 개선이 필요하다.
 - 채팅방에서의 푸시 알림 추가 기능이 필요하다.
 - 부대 조직을 관리할 수 있는 관리자 페이지가 필요하다.
 - 각군 인사행정 서비스, 핀테크 또는 운송 서비스와 융합.

## 페이지구성
#### 1. 로그인 

본인의 군번과 비밀번호를 이용하여 로그인한다. 기존의 회원이 아니라면, 회원가입을 진행한다.

#### 2. 회원가입 

군번, 이름, 전화번호로 회원가입이 가능하다. 전화번호는 승인 시 타인에게 보여줄 수 있어 빠른 연락이 필요할 때 사용할 수 있다.

#### 3. 부대검색 

자신이 소속된 부대(출발 또는 도착지)를 검색한다.

#### 4. 채팅방 

같은 소속의 부대원들과 연락하여 동일한 목적지로 가는 전우들과 일정을 조율한다.

#### 5. 위치 공유방

같은 채팅방에 접속한 국군장병들의 위치를 공유하여 시간 또는 장소를 쉽게 선정할 수 있다.


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

`$ yarn start`

## 파일 정보 및 목록 (File Manifest)

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## 저작권 및 사용권 정보 (Copyright / End User License)

@Jay_Kim

## 배포자 및 개발자의 연락처 정보 (Contact Information)

- Jay_Kim (dkel03@korea.ac.kr)

## 알려진 버그 (Known Issues)


## 문제 발생에 대한 해결책 (Troubleshooting)


## 크레딧 (Credit)


## 업데이트 정보 (Change Log)
- 191024 0.0.1

# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.


# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.


# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
