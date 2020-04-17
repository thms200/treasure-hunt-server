# Treasue Hunt

## Contents (최종 버전에서 링크 연결 예정)

## Introduction

여행을 다녀온 후 남은 유심, 교통카드, 입장권 등을 '보물찾기' 형식으로 나눔을 실천할 수 있는 Android 어플리케이션입니다.

## Feature

* Expo-Facebook을 이용한 페이스북 소셜 로그인

* 나눔하고 싶은 물품(Treasure)을 등록
  - Google Map을 활용하여 Treasure의 위치 정보 등록
  - Camera, Gallery를 활용하여 숨긴 위치에 대한 사진 등록
  - Calendar를 활용하여 Treasure의 유효 기간을 설정 등

* 나눔받고 싶은 물품(Treasure) List를 확인할 수 있는 페이지 제공
  - Country, Category에 따라 필터링 기능 제공

* 등록된 물품(Tresure)에 대한 상세 정보 페이지 제공
  - 등록자, 유효 기간, 숨긴 위치(Map, Photo) 등

* Side Bar를 통해 유저가 등록한 물품, 가져간 물품 확인 가능
   - 자신이 등록한 물품은 상세 페이지에서 삭제 가능
   - 자신이 등록한 물품이 현재 대기 중인지 누군가 가져갔는지 확인 가능

* 로그인 하지 않은 유저는 Side Barbar에서 서비스 메뉴 확인 불가능

## Installation

### Client
```
git clone https://github.com/thms200/treasure-hunt-client.git
npm install
npm start
```
### Server
```
git clone https://github.com/thms200/treasure-hunt-server.git
npm install
npm start
```

## Skills

### Client Side

* React Native
* Expo
* Redux
* React Navigation
* Google Map

### Server Side

 * Node.js
 * Express
 * MongoDB
 * Mongo Altas
 * Mongoose
 * JSON Web Token Authentication
 * AWS S3

## Test
* Jest / Enzyme for unit-test
* Chai / Mocha / Supertest for unit-test

## Deployment

### Client
* Google Play Store (진행 중)

### Server
* Circle CI (continuous integration)
* AWS Elastic Beanstalk (EB)

## Control

### Project
* [moqups을 이용한 Wireframe 작업](https://app.moqups.com/XVR8rDTtv7/view/page/ae8fe8eb0?ui=0&fit_width=1)
* [Notion Todo를 이용한 Task Management](https://www.notion.so/23d7f29e6672407899e75027ed136480?v=c6915c23b4cb4a8799dd0fcd0e42ed76)

### Version
* Git을 통한 Version 관리

## Challenges

## Things to Do
