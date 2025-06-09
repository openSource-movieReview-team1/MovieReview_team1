#  영화 리뷰 백엔드 서버

이 프로젝트는 영화 리뷰 앱의 백엔드 서버로, MariaDB와 Express.js를 사용하여 리뷰 데이터를 관리합니다.

---

##  환경 구성

- 백엔드: Node.js + Express
- 데이터베이스: MariaDB (Docker 기반)
- 백엔드 서버 포트: `5001`
- MariaDB 포트: `3307`

---

##  Docker를 이용한 MariaDB 실행

1. MariaDB 컨테이너 실행 명령:

```bash
docker run -d \
  --name my-mariadb \
  -e MYSQL_ROOT_PASSWORD=mypassword \
  -e MYSQL_DATABASE=movie_review \
  -p 3307:3306 \
  -v mariadb-data:/var/lib/mysql \
  mariadb
```

> 위 명령은 로컬의 3307 포트를 컨테이너의 3306 포트와 연결하고, DB 데이터를 볼륨으로 영속화합니다.

---

##  백엔드 서버 실행 방법

1. 백엔드 디렉토리로 이동:

```bash
cd backend
```

2. 필요한 패키지 설치:

```bash
npm install
```

3. 서버 실행:

```bash
node index.js
```

> `.env` 파일을 사용하는 경우, 아래와 같이 환경변수를 설정합니다:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=mypassword
DB_NAME=movie_review
```

---

##  API 엔드포인트 요약

| 메서드 | 경로                        | 설명             |
|--------|-----------------------------|------------------|
| GET    | `/api/reviews`              | 전체 리뷰 조회    |
| GET    | `/api/reviews/movie/:id`    | 특정 영화 리뷰 조회 |
| POST   | `/api/reviews`              | 리뷰 등록        |
| PUT    | `/api/reviews/:id`          | 리뷰 수정        |
| DELETE | `/api/reviews/:id`          | 리뷰 삭제        |

---

##  DB 초기 데이터 세팅 (옵션)

DB 백업 파일을 사용해 초기 데이터를 넣을 수 있습니다:

```bash
docker cp movie_review.sql my-mariadb:/movie_review.sql
docker exec -i my-mariadb sh -c 'mysql -u root -p"mypassword" movie_review < /movie_review.sql'
```

---

##  추가 정보

- 백엔드 API는 `frontend/src/Service/ReviewService.js`에서 다음처럼 접근합니다:

```js
const BASE_URL = "http://localhost:5001/api/reviews";
```

- 프론트엔드는 React 기반으로 3000번 포트에서 실행됩니다.