# Cloudflare Pages + D1 Database 설정 가이드

이 프로젝트를 Cloudflare Pages와 D1 (SQLite) 데이터베이스에 연결하기 위해 다음 단계를 따라주세요.

## 1. 사전 준비 (필수)

Cloudflare 계정이 필요하며, 로컬 환경에서 Cloudflare에 로그인해야 합니다.

터미널에서 다음 명령어를 실행하여 로그인하세요:
```bash
npx wrangler login
```
브라우저가 열리면 "Allow"를 클릭하여 권한을 허용해주세요.

## 2. 의존성 설치

Cloudflare Pages Functions 개발을 위해 필요한 패키지를 설치합니다:
```bash
npm install -D wrangler @cloudflare/workers-types
```

## 3. D1 데이터베이스 생성

터미널에서 다음 명령어를 실행하여db `jtvlove-db`라는 이름의 데이터베이스를 생성합니다:
```bash
npx wrangler d1 create jtvlove-db
```

**중요:** 위 명령어를 실행하면 터미널에 다음과 같은 출력이 나옵니다:
```
✅ Successfully created DB 'jtvlove-db' in region ...
Created your new D1 database. To begin using it, add the following to your wrangler.toml file:

[[d1_databases]]
binding = "DB"
database_name = "jtvlove-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```
여기서 `database_id` 값을 복사해주세요.

## 4. 설정 파일 업데이트 (`wrangler.toml`)

프로젝트 루트에 있는 `wrangler.toml` 파일을 열고, `database_id` 부분을 위에서 복사한 ID로 교체해주세요.

```toml
[[d1_databases]]
binding = "DB"
database_name = "jtvlove-db"
database_id = "여기에_복사한_ID_입력"
```

## 5. 데이터베이스 초기화 (로컬 및 원격)

### 로컬 개발용 DB 초기화
로컬에서 개발할 때 사용할 데이터베이스를 설정합니다:
```bash
npx wrangler d1 execute jtvlove-db --local --file=./db/schema.sql
npx wrangler d1 execute jtvlove-db --local --file=./db/seed.sql
```

### 실제 배포용 DB 초기화 (선택 사항, 배포 전 실행)
실제 Cloudflare에 배포된 데이터베이스를 설정합니다:
```bash
npx wrangler d1 execute jtvlove-db --remote --file=./db/schema.sql
npx wrangler d1 execute jtvlove-db --remote --file=./db/seed.sql
```

## 6. 로컬 개발 서버 실행

이제 데이터베이스와 함께 로컬 서버를 실행하여 테스트할 수 있습니다:
```bash
npx wrangler pages dev dist
```
(주의: 먼저 `npm run build`를 실행하여 `dist` 폴더를 생성해야 할 수도 있습니다.)

브라우저에서 `http://localhost:8788/api/partners` 또는 `http://localhost:8788/api/test-db` 에 접속하여 데이터가 잘 나오는지 확인하세요.

## 7. 배포하기

모든 설정이 완료되면 다음 명령어로 배포할 수 있습니다:
```bash
npm run build
npx wrangler pages deploy dist
```
배포 시 프로젝트 이름을 물어보면 `jtvlove`라고 입력하거나 원하는 이름을 사용하세요.
