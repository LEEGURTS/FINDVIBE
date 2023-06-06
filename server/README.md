# 사용법 (server)

1. 필요한 패키지 다운 받기

   - 필수 ( 패키지 다운 )
      <pre><code> npm install </code></pre>
   - 선택 ( 패키지 업데이트 )
      <pre><code> npm update </code></pre>
      <pre><code> npm upgrade </code></pre>

   또는
      <pre><code> yarn </code></pre>

2. .env를 만들고 필요한 정보 넣기

3. sql 폴더 들어가서 README 확인하고 DB 설치

4. client 수정 후 build 하기
   <pre><code> npm run build </code></pre>

   또는
   <pre><code> yarn build </code></pre>

5. server 켜기 (localhost:5000)

- test용 ( error log 보여줌 + Ctrl+c로 바로 종료 가능)
<pre><code> yarn(npm run) server_test </code></pre>

- server 켜기
<pre><code> yarn(npm run) server </code></pre>

- server 끄기
<pre><code> yarn(npm run) delete </code></pre>

-> 문제 발생 시
- server/main.js의 session 부분 확인
로컬에서 테스트 해보고 싶으면 session의 store부분을 주석처럼 바꾸기
(단, 서버가 다시 동작할 때 마다, 저장소가 초기화 되므로 계속 로그인 해야되서 걍 몽고DB 까는 걸 추천)