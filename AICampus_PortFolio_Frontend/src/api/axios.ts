// axios 기본 설정 파일
// 컴포넌트(Dashboard.tsx)는 화면을 예쁘게 그리는 데만 집중하고, 데이터를 가져오는 이 파일이 담당
// 나중에 서버 주소가 바뀌어도 수십 개의 컴포넌트를 뒤질 필요 없이 통신소 코드만 수정하면 됩니다.



// 전역 통신 설정: src/api/axios.ts
// 먼저 Axios의 **인스턴스(Instance)**를 만듭니다.
//  매번 axios.get('http://localhost:8080/api/posts')처럼 긴 주소를 치지 않도록, 기본 주소와 규칙을 미리 세팅해 두는 도구입니다.


// axios.create()를 쓰는 이유: 만약 게시판 API(http://api.com/posts)와 
// 유저 API(http://api.com/users)가 있을 때, 앞의 공통 주소(http://api.com)를 
// 한 번만 적기 위해서입니다.


// Promise<BoardPost[]>의 의미: "이 함수가 비동기 통신을 끝내고 나면, 
// 반드시 BoardPost 모양의 객체들이 들어있는 '배열'을 돌려줄게!"라고 시스템에 약속하는 겁니다.
//  덕분에 나중에 map 함수를 돌릴 때 오타가 나면 에디터가 미리 빨간 줄로 알려줍니다.

// 이제 총알(API 함수)과 총(React Query 세팅)이 모두 준비되었습니다!

import axios from 'axios'



    // 리액트가 스프링 서버를 찾아갈수 있도록 통신소 주소를 업데이트
export const api = axios.create({

    // 컨텍스트 패스 /jpa를 꼭 넣어줘라! : URL에서 앱을 구분하는 경로 (하나의 서버에 여러 앱이 있을떄)
    baseURL: 'http://localhost:8087/jpa',
    // 요청이 10초이상 걸리면 에러 (무한로딩 방지)
    timeout: 10000,
    // 기본적으로 데이터를 JSON 형태로 주고받는다는 선언
    headers: { 'Content-Type': 'application/json', },
});

// 지금 당장 쓸 건 아니지만, 나중에 "로그인 토큰"을 보낼 때 여기서 가로채서 몰래 넣어줍니다.
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
