# mysql 설치 : ubuntu (linux) 기준

1. mysql 설치

- sudo apt-get install mysql-server

- sudo mysql_secure_installation
- 패스워드설정: y
- 보안 강도 : 0 (Low)
- password : findvibe1
- 다시입력 : findvibe1
- 비밀번호 적합성검사 : y, 나머지는 다 n 입력하면 됨.

* 만약 비밀번호 입력이 안되면 따라하기
  - 새 터미널 열기
  - sudo mysql
  - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'findvibe1';
  - (findvibe1 말고 본인이 다른 비밀번호 넣어도 됨)
  - exit
  - 다시 sudo mysql_secure_installation
  - n 광클

2. mysql서비스 설치 : sudo service mysql start

3. 설치 됐는지 확인 : sudo service mysql status (잘 나오면 성공)

---

데이터 베이스 초기 설정

sql 폴더로 이동 후 순서대로 1줄씩 치기

# root 사용자로 mysql접속

mysql -u root -p
psword : findvibe1
(본인이 다른 비밀번호 넣었으면 그거임)

# findvibe_user 사용자 생성 + 권한 부여 ( 선택 )

- CREATE USER 'findvibe_user'@'localhost' IDENTIFIED BY 'findvibe1';
- GRANT ALL PRIVILEGES ON *.* TO 'findvibe_user'@'localhost';
- FLUSH PRIVILEGES;
- exit;

# 생성한 사용자로 접속(선택)

mysql -u findvibe_user -p
psword : findvibe1

# nodejs에서 mysql접근하기 위해서 비밀번호 플러그인 변경 ( 생성한 사용자로 접속할 때, 안하면 오류 생김 )

- ALTER USER 'findvibe_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'findvibe1';

# db 생성

- CREATE DATABASE findvibe_db;

# 사용 db 변경

- use findvobe_db;

# sql파일 적용 ( user_info table 생성 )

- SOURCE user_info.sql;

# mongo DB 설치 :  ubuntu (linux) 기준 -> 설치 안할거면 server/main.js의 session 확인
<pre><code> sudo apt update </code></pre>
<pre><code> wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo add-apt-repository 'deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse' </code></pre>
 <pre><code> sudo apt install mongodb-org </code></pre>

# mongoDB 시작, 재부팅, 중지
<pre><code> sudo systemctl start mongod </code></pre>
<pre><code> sudo systemctl enable mongod </code></pre>
<pre><code> sudo systemctl status mongod </code></pre>

# mongoDB 접속
<pre><code> mongosh </code></pre>

# DB 생성하기
<pre><code> use findvibe_session_db </code></pre>
