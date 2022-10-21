# KYOL팀 프로젝트

# 주제 : 슈팅게임 사이트

## 주제 선정 및 요구사항 분석 (10.06 ~ 07)

<br>
<br>

### [요구사항 리스트]

1. 사용자 회원가입 및 로그인 기능
2. 게임 기능
3. 랭킹 기능
4. 상점 기능
5. 마이페이지 기능
6. 배경음악 기능
   <br>
   <br>

### [요구사항 분석]

1. 회원가입 및 로그인 기능

- 사용자 회원가입 기능
- password는 특정 규칙을 부여하여 암호화.
- email, nickname은 unique 조건.

2. 사용자 로그인 기능

- Validation 방식은 Token.

3. 게임 기능

- 게임 시작 전, 내가 보유한 우주선들 중에 하나 선택. 선택하면, 그 우주선에 해당하는 function 호출.
- 게임 실행
  (1) display 설정(사이즈, 배경이미지)
  (2) image rendering cycle(사용자 우주선, enemy, bullet, Meteor)
  (3) control(사용자 우주선, enemy, bullet) - fixed movement, reactive movement, hit box 
  (4) background music, reactive sound effect
  (5) condition(score, gold, game leveling)
  (6) game over가 되면 restart 버튼 생성 (최종 score /지급 gold/ re-start)

4. 랭킹 기능

- weekly ranking, Top ranking 게시
  (1) Top ranking : Scoredata DB에서 점수 기반으로 상위 10명 점수 / 명예의 전당(1~3등) 별도 게시
  (2) Weekly ranking : Scoredata DB에서 시간 기반(일주일)으로 상위 10명 점수
- 사용자들이 게임 끝날 때마다 랭킹 update

5. 상점 기능

- 우주선 쇼핑 리스트 게시 : 우주선 리스트(사진, 가격), 사용자의 현재 cash, 구매불가한 경우 filter 
- filter 1순위 : 이미 보유하고 있는가, 2순위 : 해당 우주선을 구매할 gold를 보유하고 있는가
- 구매버튼 누르면 구매가 성사되면 "보유중" 으로 표시. 서버에서는 차감된 gold 로 DB 업데이트.
- 보유 우주선 리스트 업데이트

6. 마이페이지 기능

- 마이페이지 들어가기 전 password 검사 페이지
- 게시 항목 : 프로필, 회원탈퇴 버튼
- 프로필 : 사용자의 현재 우주선 img, nickname, 내가 구매한 우주선 list, nickname 수정 기능, password 수정 기능
- nickname 수정 시 unique 조건
- password 수정 시 new password 두 번 입력하고 일치하면 update 가능.
- 회원탈퇴 기능 : User model deletedAt, Spaceship model에서 삭제

7. 배경음악 기능

- main 페이지
- (게임 관련 배경음악은 2번 참고)
  <br>
  <br>

### [작업 리스트]

1. 프론트엔드

- main 페이지 설계 및 개발
- 사용자 회원가입 페이지 설계 및 개발
- 게임 페이지 설계 및 개발
- 상점 페이지 설계 및 개발
- 마이페이지 설계 및 개발

2. 백엔드

- 사용자 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- 게임 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- score 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- 상점, 구매 관련 기능을 위한 데이터 모델링/API 설계 및 개발
  <br>
  <br>

< 추가 아이디어 >

- 카카오톡 로그인, 구글 로그인
- 공지사항, Q&A 게시판
- 게스트(로그인X)로 플레이하기(체험용)
- 게임에 기능 추가 (ex. 특정 stage부터 enemy의 공격도 가능하게)
- 랭킹 페이지에서 역대랭킹, 주간랭킹에 대한 reward
  <br>
  <br>

## Home, 로그인, 회원가입 기능 (22.10.11)

- App.vue, eslintrc.js, .env, components/NavBar.vue
- 기본설정 및 셋팅

## Home, 로그인, 회원가입 기능2 + routers (22.10.12)

- Gameview.vue 
- Signin.vue, Signup.Vue, github, MypageView.vue, HomeView.vue
- 화면 구현, axios, request, response 

## Game 기능, router 기능 (22.10.13)

- Signin.vue, Signup.Vue, github, MypageView.vue (로그인 로그아웃)
- components/NavBar.vue ()
- routes/game.js 
- routes/mypage.js
- GameView.vue, components/gamedata/GameScreen.vue
- HomeView.vue
- shopView.vue

## router 기능들 구체적으로 빌드업, assets 추가시작 (22.10.14)

- Gameview.vue 
- HomeView.vue
- MypageView.vue (CSS 수정)
- shopView.vue (상점기능 open, Modal)
- assets/images

## router 기능들 구체적으로 빌드업, assets 추가 (22.10.15)
빌드업 (22.10.16)

- GameView.vue
- MypageView.vue (회원정보 수정 삭제)
- shopView.vue 
- RankingView.vue

## router 기능들 구체적으로 빌드업2 + 에러수정 (22.10.16)
- Gameview.vue 
- MypageView.vue
- shopView.vue
- RankingView.vue

## 유효성검사기능 추가 및 수정 + 에러수정 (22.10.17)

- Gameview.vue, GameScreen.vue (기본적인 게임에서 필요한 기능 구현 마무리 + 버그수정 + axios update 기능)
- NavBar.vue (코드수정)
- SignupView.vue (유효성검사 기능)
- Signin.vue, Signup.Vue (로그인 실패 후속처리)
- ShopView.vue (구매기능)

## Game 기능 추가개발 + 에러수정 및 버그수정 + UI 개선 (22.10.18)

- Gameview.vue, GameScreen.vue (이미지 추가및 랜더링추가, 버그수정)
- ShopView.vue, HomeView.vue (연동)
- Signup.vue (수정)
- Ranking (탈퇴한 회원정보 핸들링)
- Store 기능 추가
- Signin.vue, Signup.Vue (변수 핸들링 변경, 버그수정)
- Signin.vue, Signup.Vue (토큰 체크추가)
- GearView.vue (기능 추가 및 버그수정)

## 각 페이지 기능 개선 및 에러수정 + store 기능 개선 + NotFound 페이지생성 (22.10.19)

- Gameview.vue, GameScreen.vue
- ShopView.vue
- HomeView.vue 
- RankingView.vue
- MypageView.vue
- SigninView.vue
- SignupView.vue
- store/index.js
- NotFound.vue

## 각 페이지 기능 개선 및 에러수정  (22.10.20)

- Gameview.vue, GameScreen.vue
- ShopView.vue
- HomeView.vue 
- RankingView.vue
- MypageView.vue
- SigninView.vue
- SignupView.vue

## (22.10.19)
- 

## (22.10.20)
-
