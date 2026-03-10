//--------------------------------------------------------------------------------------------------
// 게시판 CRUD 함수
// 통신소api를 이용해서 게시판과 관련된 CRUD(생성, 읽기, 수정, 삭제)
// 작업을 하는 함수들을 모아둡니다.
//--------------------------------------------------------------------------------------------------
import { api } from './axios';

// ------------------------------------------------------------------
// Spring이 쏴주는 데이터
// 게시글 데이터의 모양 (Type)  정의 Spring의 @Entity와 일치시킨 타입
// ------------------------------------------------------------------
export interface BoardPost {
    date: never;
    id: number; // idx로 통일하면 컴포넌트 속성명과 충돌우려
    title: string;
    content: string;
    writer: string;
    indate: string; // 스프링의 Date는 JSON으로 넘어올 때 string으로 변환된다.
    image?: string; // 이미지는 없을 수도 있으므로? (옵셔널) 처리 : 있어도 되고 없어도 된다!

    // UI 에서 추가로 활용하는 속성
    category?: string;
    views?: number;
    commentCount: number; // 게시글 목록에서 보여줄 댓글 수 (나중에 추가 가능)
}
// ------------------------------------------------------------------
// date: never, comments: never 삭제
// never 타입은 여기에 데이터가 절대 들어오면 안된다는 뜻
// author: ReactNode 삭제
// author 대신 이미 writer: string이 있다.
// 스프링은 문자열로 데이터를 주는데 React.ReactNode로 설정되어 있으면 타입 충돌 발생
// ------------------------------------------------------------------



// 댓글 데이터를 위한 Interface
export interface CommentResponse {
    idx: number;
    writer: string;
    content: string;
    indate: string; // 스프링에서 보내주는 날짜 데이터
}

// ------------------------------------------------------------------
// 이름이 같아도 괜찮은 이유
// 리액트 컴포넌트에서 데이터를 사용할 때 객체 이름으로 접근한다.
// BoardPost와 CommentResponse는 소속이 다르기 때문에 이름이 같아도 충돌하지 않는다.
// 오히려 이름이 다르면 나중에 코드를 짤때 더 햇갈리게 된다.
// ------------------------------------------------------------------




// ------------------------------------------------------------------
// 댓글기능을 spring Entitiy와 repository, dto로 작성했으므로
// React Api에 댓글관련 Interface 업데이트
// ------------------------------------------------------------------
//  [댓글 목록 조회 API]
export const getComments = async (boardIdx: number) => {
    // .get() 의 파라미터는 "어디로 요청을 보낼지" URL 주소이다.
    // response.status -> 200, 404, 500 등 HTTP 상태코드
    // response.data -> 서버가 실제로 보내준 데이터 (댓글목록)
    // response.headers -> Http 헤더 정보
    const response = await api.get(`/posts/${boardIdx}/comments`);
    return response.data; // 그 중 실제 데이터만 꺼내서 반환
    // data는 axios 에서 넣어준 라이브러리 이다.
};

// [댓글 작성 API]
// 첫번째 매개변수 : string 두번째 매개변수 : 객체 (인라인으로 타입 정의)
export const createComment = async (boardIdx: number, data: { writer: string, content: string }) => {
    const response = await api.post(`/posts/${boardIdx}/comments`, data);
    // URL 자체가 "어디서 가져올지"를 결정하는 주소
    // boardIdx = 1 이면  /post/1/comments 로 요청

    return response.data;
    // 데이터를 가져오는건 서버가 해당 URL을 보고 DB를 조회해서 응답으로 보내주는 것
}

// 3. [댓글 삭제 API]
export const deleteComment = async (commentIdx: number) => { // 삭제할 댓글의 고유번호(ID)를 숫자타입으로 받는다.
    const response = await api.delete(`/posts/comments/${commentIdx}`); // 미리 설정된 api 인스턴스 (axios)를 사용해 DELETE 방식으로 HTTP 요청을 보낸다.
    return response.data;
}
//---------------------------------------------------------
// api가 axios 인스턴스이기 때문에 HTTP요청
// api.get(url) 마찬가지로 HTTP 요청
// fs.readFile(url) URL 처럼 생긴 경로를 넣어도 HTTP 요청이 아닌 파일 읽기
//---------------------------------------------------------

// 2. [목록 조회] 전체 게시글을 불러오는 비동기 함수
export const getBoardPosts = async (keyword?: string): Promise<BoardPost[]> => {

    // keyword(검색어)값 있으면 주소 뒤에 '?keyword= 검색어' 를 붙여준다.
    const url = keyword ? `/posts?keyword=${keyword}` : `/posts`;

  // 실제 요청 예시: GET http://localhost:8080/api/posts?keyword=리액트
// response는 요청(Request)의 결과로 돌아오는 응답(Response)이다.
// response.data    // 실제 데이터 (게시글 목록)
// response.status  // HTTP 상태코드 (200, 404 등)
// response.headers // 응답 헤더
    const response = await api.get(url);
     return response.data;
};



// 2. [상세 조회] 수정 페이지에서 "기존 글 내용"을 불러올 때 쓸 함수
export const getBoardPostById = async (idx: number): Promise<BoardPost> => {
    // 예: GET http://localhost:8080/api/post/1
    const response = await api.get(`/posts/${idx}`);
    return response.data;
};


// [수정 요청] 수정한 내용을 서버에 덮어씌우는 (PUT/PATCH) 함수
// updateData 파라이터에는 바뀐 제목이나 내용이 들어간다.
export const updateBoardPost = async (idx: number, updateData: Partial<BoardPost>) => {

    // 예: PUT http://localhost:8080/api/post/1
    const response = await api.patch(`/posts/${idx}`, updateData);
    return response.data;
}


// [글 작성] 폼 데이터를 서버에 보내서 새 글을 생성하는 함수
// 사진이나 파일도 보낼수 있도록 일반 JSON이 아닌 FormData 형식을 사용한다.
export const createBoardPost = async (formData: FormData) => {
    // 실제로는 POST http://localhost:8087/jpa/posts로 요청이 들어간다.
    const response = await api.post(`/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // 스프링이 폼 데이터로 인식하게 해줌
    });
    return response.data;
};

//----------------------------------------------------------------------------------
// [ 삭제 기능] /post/{idx}
//----------------------------------------------------------------------------------

// 글 삭제 하는 함수
export const deleteBoardPost = async (idx: number) => {
    const response = await api.delete(`/posts/${idx}`); // 스프링의 @DeleteMapping("/{idx}")와 연결
    return response.data;
};
//----------------------------------------------------------------------------------
// <T, R, D> 는 함수 호출 시 타입을 외부에서 주입받기 위한 타입 변수다.
//----------------------------------------------------------------------------------
//
// Axios는 요청마다 데이터 구조가 다르기 때문에
//  응답 데이터 타입 | 반환 타입 | 요청 body 타입 | 을 유연하게 바꾸려고 제네릭을 사용한다.
// 외부 시스템(API 서버) 상태 변경(데이터 삭제)
// ⚡ Side Effect 발생
// 1. api.delete() :: HTTP 요청 수행
// 2. await :: Promise 결과가 올 때까지 대기
// 3. 반환된 응답 객체 (Response Object)를 변수에 저장

// 디버깅 쉬움
// 로그 확인 가능
// 중간 데이터 검사 가능

//----------------------------------------------------------------------------------
//스프링 컨트롤러와 주소 불일치: 주소는 @GetMapping("boardlist"), @GetMapping("detail") 만드셨습니다.
//그런데 리액트 코드는 /posts라는 엉뚱한 주소로 요청을 보내고 있습니다!
//----------------------------------------------------------------------------------