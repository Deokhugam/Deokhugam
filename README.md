# 📌 Deokhugam - 덕후감

> 본 프로젝트는 부트캠프 백엔드 과정 수강생들이 참고용으로 활용하기 위해 구현되었습니다.

React / Next.js 기반으로 API 연동을 통해 로그인, 도서 등록, 리뷰 및 댓글 작성 등 **주요 기능**을 제공합니다.

---

## 🚀 주요 기능
- 사용자 인증: 로그인 / 회원가입
- ISBN 인식 기능을 통한 도서 등록
- 도서 및 리뷰 목록/상세 페이지 조회
- 리뷰 / 댓글 작성
- 무한 스크롤 기반 데이터 로딩
- 실시간 알림: 10초 주기 폴링으로 좋아요, 댓글, 리뷰 이벤트 표시

---

## 🛠️ 기술 스택
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **API**: Axios (인터셉터 기반 인증 처리)
- **Build & Format**: ESLint, Prettier

---

## ⚙️ 환경 변수 설정

프로젝트 실행 전 루트 경로에 `.env.local` 파일을 생성하고 아래 변수를 설정해야 합니다.

```env
# API Base URL (백엔드 서버 주소)
NEXT_PUBLIC_API_URL=http://sprint-project-1196140422.ap-northeast-2.elb.amazonaws.com/sb/deokhugam/api
```
⚠️ `NEXT_PUBLIC_` prefix가 붙은 환경 변수는 클라이언트 사이드에서 사용됩니다.

💡 현재 rewrites 설정으로 모든 환경에서 정상 작동하며, 결과물 제출 후 검수 과정에서 리버스 프록시로 처리될 예정입니다.

---

## 🖥️ 실행 방법
```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행 (http://localhost:3000)
npm run dev

# 3. 프로덕션 빌드
npm run build

# 4. 빌드 결과 실행
npm start
```

---

## 📂 프로젝트 구조
```bash
src
 ┣ api/             # Axios 인스턴스, API 호출 함수
 ┣ app/             # Next.js App Router 기반 페이지 및 레이아웃
 ┣ components/      # UI 컴포넌트
   ┣ common/        # 공통/재사용 컴포넌트
   ┗ ui/            # 도메인 단위 UI 컴포넌트
 ┣ hooks/           # 커스텀 훅
 ┣ schemas/         # TypeScript 스키마 및 타입 정의
 ┣ store/           # Zustand 상태 관리 관련
 ┗ styles/          # 외부 라이브러리 전역 스타일
```

---

## 📡 API 연동
- **Swagger 문서**: [백엔드 Swagger 링크 ↗️](http://sprint-project-1196140422.ap-northeast-2.elb.amazonaws.com/sb/deokhugam/api/swagger-ui/index.html#/)
- 모든 API 요청은 **axiosInstance 기반 ApiClient**를 통해 전송됩니다.
- 요청 시 `Deokhugam-Request-User-ID` 헤더가 자동으로 추가되며, 인증 상태에 따라 사용자 ID가 포함됩니다.
- 요청/응답 인터셉터가 적용되어, API 호출 로그와 에러 메시지가 콘솔에 출력됩니다.
### 사용 예시
```ts
import { apiClient } from "@/lib/api";

// GET 요청
const comments = await apiClient.get<Comment[]>("/reviews", {
  params: { bookId: "1234", page: 1 }
});

// POST 요청
const newReview = await apiClient.post<Review, CreateReviewPayload>("/reviews", {
  bookId: "1234",
  content: "정말 재미있는 책이었어요!"
});
```
### API 엔드포인트
```ts
export const API_ENDPOINTS = {
  USERS: {
    SIGNUP: "/api/users",
    LOGIN: "/api/users/login",
    PROFILE: (userId: string) => `/api/users/${userId}`
  },
  BOOKS: {
    LIST: "/api/books",
    DETAIL: "/api/books/{id}",
    CREATE: "/api/books",
    DELETE: "/api/books/{id}"
  },
  REVIEWS: {
    LIST: "/api/reviews",
    DETAIL: "/api/reviews/{id}",
    CREATE: "/api/reviews",
    DELETE: "/api/reviews/{id}"
  }
} as const;
```
#### 💡 참고:
- `skipInterceptor` 옵션을 사용하면 요청 인터셉터를 우회할 수 있어 상태 코드 기반 UI 처리가 필요한 경우 활용 가능합니다.
- Axios 기본 timeout은 10초로 설정되어 있습니다.

---

## 🤝 협업 컨벤션
### Git Branch Strategy
- `main`: 배포용
- `features`: 개발 통합 브랜치
- `feature/*`: 기능 단위 브랜치
### Commit Convention
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `docs`: 문서 수정
- `style`: 코드 스타일 변경 (포매팅 등)
```bash
feature/auth: 로그인 API 연동 및 상태 관리 추가
```

---

## 📝 기타
- 에러나 버그 발생 시 GitHub Issue 등록 후 공유 바랍니다.
- 코드 스타일은 ESLint + Prettier 설정을 반드시 준수해야 합니다.
