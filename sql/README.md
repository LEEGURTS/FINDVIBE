mysql 설치 : 리눅스 기준

1. sudo apt-get install mysql-server

2. sudo mysql_secure_installation
2-1. password설정(순서대로입력)
- 패스워드설정: y
- 보안 강도 : 0 (Low)
- password : findvibe1
- 다시입력 : findvibe1
- 비밀번호 적합성검사 : y
나머지는 다 n 입력하면 됨.

* 만약 비밀번호 입력이 안되면 따라하기
새 터미널 열기 -> sudo mysql -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'findvibe1'; -> exit -> 다시 sudo mysql_secure_installation -> Change the password for root? -> n
나머지 다 n

3. mysql서비스 설치 : sudo service mysql start

4. 설치 됐는지 확인 : sudo service mysql status (잘 나오면 성공)

--------------------------------------------------------------------------------------------------
데이터 베이스 초기 설정

sql 폴더로 이동 후 순서대로 1줄씩 치기

# root 사용자로 mysql접속
mysql -u root -p
psword : findvibe1

# findvibe_user 사용자 생성 + 권한 부여
CREATE USER 'findvibe_user'@'localhost' IDENTIFIED BY 'findvibe1';
GRANT ALL PRIVILEGES ON *.* TO 'findvibe_user'@'localhost';
FLUSH PRIVILEGES;
exit;

# 생성한 사용자로 접속
mysql -u findvibe_user -p
psword : findvibe1

# nodejs에서 mysql접근하기 위해서 비밀번호 플러그인 변경 ( 안하면 오류 생김 )
ALTER USER 'findvibe_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'findvibe1';

# db 생성
CREATE DATABASE findvibe_db;
# 사용 db 변경
use findvobe_db;
# sql파일 적용 ( user_info table 생성 )
SOURCE user_info.sql;
