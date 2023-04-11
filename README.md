# 사용법 (server 디렉토리에서)

(0) 공통 (각각의 directory에서 명령어 사용하기)

1. 필요한 모듈 다운 받기
   <pre><code> npm install </code></pre>
   <pre><code> npm update </code></pre>
   <pre><code> npm upgrade </code></pre>
2. FINDVIBE directory에 upload_images 폴더 추가

(1) front-end (client directory에서 명령어 사용)

1. dev모드 -> 개발 상황 보기
<pre><code> npm start </code></pre>

2. build파일 만들기 -> 서버에서 사용함
<pre><code> npm run build </code></pre>

- 추가할 점 있으면 추가해주세요

(2) back-end (server directory에서 명령어 사용)

1. front build하기
<pre><code> yarn build </code></pre>

2. back-end 서버 켜기 (사용 포트 : 5000)
<pre><code> yarn server </code></pre>

3. 로컬 mysql 설치는 sql 폴더의 README참고
