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

## 고민했던 사항
<details>
<summary><b>마커 회전이 잘 안된다.</b></summary>
<div markdown="1">
  </br>
  
   ### @react-google-maps/api의 마커 회전이 의도 대로 작동하지 않았습니다.
  ``` tsx
<MarkerF
  position={{ lat: 0, lng: 0 }}
  icon={{
    url: cursor,
    rotation:회전각도
  }}
  />
```
이와 같은 형식으로 사용하는데 rotation을 아무리 줘도 회전하지 않았는데 이는 컴포넌트에서 icon을 url 형태로 전달하면 회전이 정상적으로 동작하지 않았습니다.

### 그러면 미리 돌아가 있는 마커를 출력하면 해결되는 거 아냐?
이를 통해 해결하기 위해 html 의 canvas를 이용해 새롭게 마커를 생성했습니다.  
```ts
interface RotateIcon {
    setRotation(deg: number): RotateIcon;
    getUrl(): string;
}

class RotateIcon {
    img: HTMLImageElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    constructor() {
        let img = new Image();
        img.src = cursor;
        this.img = img;
        let canvas = document.createElement("canvas");
        canvas.width = 45;
        canvas.height = 45;
        this.context = canvas.getContext("2d");
        this.canvas = canvas;
    }
}

RotateIcon.prototype.setRotation = function(deg: number) {
    let angle = (deg * Math.PI) / 180,
        centerX = 45 / 2,
        centerY = 45 / 2;
    this.context?.clearRect(0, 0, 45, 45);
    this.context?.save();
    this.context?.translate(centerX, centerY);
    this.context?.rotate(angle);
    this.context?.translate(-centerX, -centerY);
    this.context?.drawImage(this.img, 0, 0);
    this.context?.restore();
    return this;
};
RotateIcon.prototype.getUrl = function() {
    return this.canvas.toDataURL("image/png");
};
```

이를 통해 새롭게 생성된 마커를 MarkerF 컴포넌트의 인자로 전달해 정상적으로 마커를 회전시켰습니다.
</div>
</details>
<details>
<summary><b>모두 다 import 할 필요는 없잖아?</b></summary>
<div markdown="1">
프로젝트를 진행하다 보니 page의 종류가 늘어났습니다. 그러나 사용자는 모든 페이지를 들어가는 건 아니고 필요한 페이지만 사용할 것입니다. 그러면 모든 페이지에 대한 파일을 보낼 필요 없이 볼 부분만 lazy하게 선택적으로 전달하는게 더 좋다고 생각했습니다.

```tsx
  const SignInPage = lazy(() => import("./pages/SignInPage"));
  const SignUpPage = lazy(() => import("./pages/SignUpPage"));
  const FindLocationPage = lazy(() => import("./pages/FindLocationPage"));
  const HotPlacePage = lazy(() => import("./pages/HotPlacePage"));

...
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="/findvibe" element={<FindLocationPage />} />
```

이를 통해 라우팅 접속시에만 로딩하도록 수정했습니다.

</div>


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





