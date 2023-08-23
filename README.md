# FindVibe - 사진 촬영 위치 예측 웹 서비스

## 프로젝트 소개 
광운대학교 참빛설계학기에 참여했던 웹 프로젝트입니다.
</br>
</br>
진행 기간 : 2023.03 ~ 2023.06

## 핵심기능
![111](https://github.com/KW-FINDVIBE/FINDVIBE/assets/84065412/67b0cddc-eff3-4647-b9cf-200d1352a7c4)
풍경 사진을 딥러닝 모델로 분석하여 사진 촬영 예상 위치정보를 제공하는 것 입니다.

## 기대효과
- 사진 촬영을 좋아하는 사람들에게 사진의 구도 정보 제공
- 과거에 찍은 사진이 어디에서 찍은 사진인지 알고 싶으나 기억 나지 않을 경우에 위치 정보 제공
- EXIF가 훼손되더라도 위치 좌표 제공 가능

## 한계점
- Google Street View Dataset 특성 상 도로, 하늘, 빌딩 등 겹치는 부분이 많아서 특징점을 추출하는 것이 어렵다.
- 사진이 찍힌 위치를 찾기 위해서 방대하고 구체적인 학습데이터가 필요하다.

## 프로젝트 자료

- [시연 영상](http://kwcommons.kw.ac.kr/contents4/KW10000001/64896357631b9/contents/media_files/mobile/ssmovie.mp4)
- [API 명세서](https://docs.google.com/spreadsheets/d/1DEYCQ8lVnwUwPz7ZZM6YwL8G-L1OYarQ5-RsWXsN6Og/edit#gid=0)
- [서버 구조](https://github.com/KW-FINDVIBE/FINDVIBE/assets/84065412/5adb4014-6c45-4460-b0d7-c126425b8ed1)
- [페이지 디자인](https://www.figma.com/file/0dwcJ9wtviXQ7Uq0y2Uems/%EC%B0%B8%EB%B9%9B%EC%84%A4%EA%B3%84?type=design&node-id=0-1&mode=design)

## 프로젝트 세팅 (clone 이후)
1. upload_images 폴더 추가 : 사용자가 전송한 사진을 저장하는 dir
2. client, server, sql 폴더의 readme.md를 참고해서 세팅

## 참여 인원 (3명)
- 이근성 : Front-End, 팀장
- 박상찬 : Back-End
- 김형석 : Deep Learning

## 사용 Skills
### Front-End
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-F7DF1E?style=for-the-badge&logo=tailwindcss&logoColor=white">
</div>

### Back-End
<div>
  <img src="https://img.shields.io/badge/Express-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Flask-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazon&logoColor=white">
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</div>

### Deep Learning

<div>
  <img src="https://img.shields.io/badge/Flask-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
</div>





