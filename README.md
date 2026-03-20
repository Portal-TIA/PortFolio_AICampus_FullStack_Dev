<h1>여행 정보관련 웹 커뮤니티서비스</h1>
<h2>팀명 : Full-Stack-Dev</h2>
<h2>🚀 기술스택 </h2>
<p><a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="42" height="42" /></a></p>


### 기획
```
주요 서비스
여행 관련 웹 커뮤니티 서비스

기대효과
여행객의 정보 찾는 편의성 상승, 사용자의 커뮤니티 효과로 인한 광고 수익 증가


고객 감동 목표
이용객 간의 소통과 개인적인 경험을 
나누는 게시판 커뮤니티 기능에 초점을 두어 고객 감동을 실현함
```


### 프론트엔드 
```
1. React
2. TypeScript
3. TailwindCSS
4. React Query
5. React Router
6. Axios


사용자 화면 (Browser)
    ↓
  [App]            → 전체 앱 구조 조립 (라우팅, 전역 상태)
    ↓
[Page Component]   → 특정 화면 구성 
    ↓
[UI Component]     → 받은 props를 화면에 렌더링 (순수 표현만 담당)
    ↓
[HTML Element]     → 실제 DOM 요소 (div, button, input ...)
    ↓
화면 출력 (Render)
```


### 프론트엔드 주요내용
```
프론트엔드 UI 설계

합성 컴포넌트 패턴
UI를 레이아웃단위로 쪼갠뒤, 컴포넌트를 조립하는 방식을 채택하여
자식 컴포넌트와 부모 컴포넌트를 구분했습니다.  

컴포넌트를 npm 패키지로 설치하는 방식이 아닌, 소스코드를 프로젝트에
직접 복사해 자유롭게 수정할 수 있는 Shadcn/UI를 사용하여 개발 시간을 단축했습니다.
- 기존 HTML은 부트스트랩 였으나 현대적인 UI및 커스텀 요소가 강화된 tailwindCSS 채택


1. DB, 백엔드, 프론트엔드 연결 및 데이터 전송 확인 
2. 쿼리 작성시 DB테이블 데이터가 게시판에 반영
3. 브라우저 페이지 이동 (라우팅)
4. 리액트 쿼리 (캐싱) (백엔드 서버 부하감소 및 프론트엔드 통신관련 코드양 감소)
5. 사이드바 버튼 누르면 세부정보 감추기, 숨기기
6. 반응형 레이아웃 : 확대시 화면 요소 변동 (TailwindCSS)
7. 다크모드
```

### 백엔드 
```
1. SpringBoot
2. JPA Hibernate
3. MySQL


Client 요청
    ↓
[Controller]  → 요청/응답 처리 (HTTP)
    ↓
[Service]     → 비즈니스 로직 (규칙, 계산, 검증)
    ↓
[Repository]  → DB 쿼리 매핑 
    ↓
[Entity]      → DB 데이터 구조 정의
  
    ↓
Database

- 기존의 Spring 코드는 타임리프 로 HTML을 반환하는 형태
- 프론트엔드 (리액트) 와 통신이 가능하도록 RESTful API 규칙에 맞춰 백엔드(스프링)을 개조
```


### 백엔드 주요내용
```

1. DTO를 통한 요청/응답처리
- Controller 에서 클라이언트와 Http 통신을 하는데 DTO를 사용하는 경우 요청(Request)과 응답(Response)에 맞는 전용 객체를 만드는 방식.


2. 계층 분리 
- Controller는 HTTP 통신만, Service는 비즈니스 로직만 담당하게 됩니다.


3. 주요 수정내용
- @RestController : Json 형태로 객체 데이터를 반환
- @RequestMapping("/posts") // 리액트의 요청 주소인 /posts 와 일치
```


### 트러블 슈팅 
```
1. 주소 경로 매핑 문제발생 
- 프론트 엔드의 AXIOS api 주소와 통신하기 위한 RESTful API 방식으로 코드 수정 
- 매핑되는 주소값을 리액트의 TypeScript Interface와 일치


2. 클린코드 
- idx로 통일 Spring Controller에서 변수명을 id -> idx로 변경 Spring Controller 경로 매핑을 리액트에 일치 
```
