# movieReview

[백엔드 문서 보기](movie/movie-review-server/README_backend.md)

## 협업 시 준비 과정 

### 1. 리포지토리 클론
   
```
git clone <원격 저장소 주소> .
```

### 2. git flow 설치 및 초기화

```
git flow init
```

## 협업 시작 바로 전 과정 

### 1. 원격 브랜치 최신화 (필수)

패치 후 풀

```
git fetch
git pull origin develop
```

### 2.1 기능 개발 시작

커밋 메세지 이름 규칙

| 태그      | 설명                         | 타입 (예시)                      |
|-----------|------------------------------|---------------------------------|
| Feat      | 기능 추가 시 사용             | Feat: "검색기능추가"             |
| Refactor  | 코드 구조 개선                | Refactor: "영화 검색 필터링 개선" |
| Design    | 프론트엔드 디자인 개선/추가  | Design: "App.css 수정"           |
| Fix       | 커밋 후 코드 수정 시 사용    | Fix: "상하단 추가, 동적 css 개선" |
| Hotfix    | 긴급한 코드 수정 시 사용     | Hotfix: "App.css 삭제에 따른 변경"|
| Docs      | 문서 관련 작업               | Docs: "API 명세 추가"            |


- 예시:
    - `feature/user-login`
    - `bugfix/api-timeout`
    - `hotfix/login-crash`
    - `refactor/header-component`
      
```
git flow feature start <기능명>
git flow feature finish <기능명>
git push origin develop
```

### 2.2 브랜치 별 사용법

| 브랜치명   | 설명                                      |
|-----------|-------------------------------------------|
| main      | 제품을 배포하는 브랜치                    |
| develop   | 자유롭게 커밋                             |
| hotfix    | 버그가 생겼을 때 긴급 수정                |
| release   | 커밋 후 코드 고칠 때                      |
| feature   | 기능 구현이 있는 경우 develop에서 분기     |



### 3. 코드 리뷰가 필요할 때마다 feature 브랜치를 push 후 PR

```
git push origin feature/<기능명>

```

### 4. 모든 기능 개발 완료 시 
```
git checkout feature/<기능명>
git fetch origin
git merge origin/develop
# 또는
git rebase origin/develop
```
 후에 아래 명령어 입력

```
git flow feature finish <기능명>
git push origin develop

```
