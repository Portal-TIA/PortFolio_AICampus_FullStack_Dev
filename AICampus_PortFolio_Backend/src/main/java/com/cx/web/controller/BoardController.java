package com.cx.web.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cx.web.dto.BoardRequestDto;
import com.cx.web.dto.BoardResponseDto;
import com.cx.web.dto.CommentRequestDto;
import com.cx.web.dto.CommentResponseDto;
import com.cx.web.entity.Board;
import com.cx.web.entity.Comment;
import com.cx.web.repository.BoardRepository;
import com.cx.web.repository.CommentRepository;
import com.cx.web.service.BoardService;

import lombok.RequiredArgsConstructor;

//------------------------------------------------------------------------------------------------------------------------
// DTO를 통한 요청/응답처리
//------------------------------------------------------------------------------------------------------------------------
// Controller 에서 클라이언트와 Http 통신을 하는데 DTO를 사용하는 경우 요청(Request)과 응답(Response)에 맞는 전용 객체를 만드는 방식입니다.
// 필요한 데이터만 노출 — 민감 정보를 응답에서 제외할 수 있습니다.
// 유효성 검사 집중화 — @Valid, @NotBlank, @Email 등을 DTO에 모아 관리합니다.
// API와 DB의 결합도 감소 — DB 스키마가 바뀌어도 DTO 변환 로직만 수정하면 됩니다.
// 문서화 및 가독성 — DTO 클래스 이름과 필드만 봐도 API 계약을 이해할 수 있습니다.
// 계층 분리 — Controller는 HTTP 통신만, Service는 비즈니스 로직만 담당하게 됩니다.
// 실무에서는 DTO 사용이 사실상 표준이며, 간단한 내부 API나 프로토타입 수준이 아닌 이상 DTO를 쓰는 것이 권장됩니다.
//------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------
// 게시판 메인 API 리액트의 모든 요청 (CRUD)를 전담하고 있는 핵심 컨트롤러
// 이 파일은 리액트의 로그인과 회원가입 요청을 전담한다. 리액트의 요청을 제일먼저 받는다.
// @RequestMapping("/posts"): 리액트 통신의 표준 방식인 RESTful API 규격(/posts)을 정확히 따르고 있습니다.
// 완벽한 CRUD 구현: @GetMapping (목록/상세), @PostMapping (글쓰기), @PatchMapping (수정), @DeleteMapping (삭제) 등 
// 검색 기능 통합: 과거에는 검색을 따로 분리했었지만, 지금은 getBoardList 메서드 안에서 
// @RequestParam(required = false) String keyword를 통해 목록 조회와 검색을 하나의 URL(/posts)로 합쳤다.
//------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------
// React (프론트) ↔️ DTO (안전한 포장지) ↔️ Controller (백엔드 창구) ↔️ Entity (DB 원본) 프론트 맞춤형
// 포장지 만들기 (BoardResponseDto.java) 먼저 백엔드 프로젝트에 BoardResponseDto 클래스를 하나 만들어줍니다.
// (보통 com.cx.web.dto 패키지를 만들어서 그 안에 넣으면 깔끔합니다.) 이 클래스의 핵심은 "프론트엔드가 쓰기 편하게 이름표(변수명)와 데이터 형태를 바꿔주는 것"
//------------------------------------------------------------------------------------------------------------------------


// 의존성 주입 방식의 통일 : BoardService와 BoardRepository를 주입받는 방식이 혼용되어 있다.
// @Autowired는 스프링에서 권장하지 않는 방식이다 

@RestController // RestController의 주용도는 Json 형태로 객체 데이터를 반환
@RequestMapping("/posts") // 리액트의 요청 주소인 /posts 와 완벽하게 일치
@RequiredArgsConstructor // final이 붙은 필드의 생성자를 자동으로 만들어줌
public class BoardController {

    private final CommentRepository commentRepository;

	private final BoardService service;
	private final BoardRepository repository;
	
	//------------------------------------------------------------------------------------------------------------------------	
	// 컨트롤러에서 데이터를 인자에 할당하는 대표적인 방법으로는 @RequestBody 와 @RequestParam 존재
	// @RequestParam HTTP 요청의 쿼리 파라미터 값을 컨트롤러 메서드의 파라미터로 바인딩 @GetMapping 어노테이션은 HTTP GET 요청을 처리하는 핸들러 메서드를 지정
	// [목록 조회] Entity 리스트 대신 DTO 리스트를 반환하도록 수정
	//------------------------------------------------------------------------------------------------------------------------
	@GetMapping
	public List<BoardResponseDto> getBoardLIst(@RequestParam(required = false) String keyword) {
		List<Board> boards;
		// 검색어 여부에 따라 Entity 리스트를 먼저 가져온다.
		if (keyword != null && !keyword.trim().isEmpty()) {
			boards = repository.findByTitleContaining(keyword);
		} else {
			boards = repository.findAll();
		}
//응답(Response) 시 Entity를 DTO로 변환하여 프론트엔드로 전환하는 로직 (stream().map())
return boards.stream().map(BoardResponseDto::new) // :: 메서드 참조 연산자 메서드/생성자를 값으로 전달 이메서드를 값으로 써라
				.collect(Collectors.toList());
	}
	// @Path Variable — URL 경로 자체에 데이터 포함	
	// [상세 조회] Entity 하나를 DTO 하나로 변환해서 반환하도록 수정
	@GetMapping("/{idx}") // 리소스 경로에 식별자를 넣어서 동적으로 URL에 정보를 담을 수 있다.
	public BoardResponseDto getBoardDetail(@PathVariable("idx") int idx) {
		Board board = repository.findById(idx); // DB에서 원본을 찾음
		// 찾은 원본을 DTO에 넣어서 리액트로 던져준다.
		return new BoardResponseDto(board);
	}	
	//------------------------------------------------------------------------------------------------------------------------
	// 만약 리액트가 검색어(keyword)를 보냈는데 검색어가 없다면? (그냥 처음 목록 페이지에 들어갔을때) 
	// findAll()은 board 테이블의 모든 행(row)을 다 가져오는 메서드입니다.
	// DB에서 여러 건의 데이터를 가져오면 하나의 객체가 아니라 여러 객체의 묶음이 필요합니다.
	// 즉 테이블의 행 1개 = Board 객체 1개, 이게 여러 개니까 List로 묶어서 반환하는 겁니다.
	// @PathVariable을 사용하면 리소스 경로에 식별자를 넣어서 동적으로 URL에 정보를 담을 수 있다.
	// URL 경로의 중괄호 { } 안쪽에 변수를 담고, 그 변수를 @PathVariable(" ")로 받아서 사용할 수 있다.
	//------------------------------------------------------------------------------------------------------------------------
	// 3. [글 작성] 리액트의 api.post('/posts', formData) 와 연결
	@PostMapping
	public String writeProcess(Board board, @RequestParam(value = "upload", required = false) MultipartFile file)
			throws IllegalStateException, IOException {
		board.setIndate(new Date());
		service.writeProcess(board, file);
		return "success"; 
	}
	//------------------------------------------------------------------------------------------------------------------------
	// 글쓰기 (post) 와 수정 (patch) 요청에서는 Board Entity를 직접 파라미터로 받고있다 (수정필요) 
	// @Request BodyHTTP(데이터 위치) 
	// [글 수정] 리액트의 api.patch(`/posts/${idx}`, updateData) 와 연결
	// Board board를 제거하고 만들어둔 DTO 클래스로 교체 (안전한 수비수 배치) 
	//------------------------------------------------------------------------------------------------------------------------
	@PatchMapping("/{idx}")
	public String editProcess(@PathVariable("idx") int idx, @RequestBody BoardRequestDto requestDto) {
		
	// 1. 수비수 (DTO)가 검사 완료된 데이터 (제목, 내용, 작성자)만 원본(Board)으로 옮겨 담는다.
		Board board = requestDto.toEntity();
	// 2. 사용자가 절대 건드리면 안되는 데이터 (번호, 날짜)는 서버에서 강제로 덮어씌운다.
		board.setIdx(idx);
		board.setIndate(new Date());
	// 3. 안전해진 원본(Board)를 DB에 저장한다. 
		repository.save(board); // 데이터베이스와 통신하는 save() 메서드는 진짜 Board 엔티티만 받아주기 때문 
		return "edited";
	}
	//------------------------------------------------------------------------------------------------------------------------
	// return "edited";
	// 백엔드가 프론트엔드에게 보내는 수정작업이 끝났다는 응답 메시지.
	// http 통신은 전화와 같다 리액트가 요청(Request)하면 스프링은 반드시 응답(Request) 해야한다. 
	// 리액트는 스프링이 던지는 문자열을 보고 다음 행동을 결정한다. 
	// "edited"는 개발자가 정한 내용이지만 리액트에서 비교하는 글자와 100% 일치해야한다.  
	//------------------------------------------------------------------------------------------------------------------------
	
	// @ParhVariable 데이터 위치 : URL경로
	// 5. [글 삭제] 리액트의 api.delete(`/posts/${idx}`) 와 연결
	@DeleteMapping("/{idx}")
	public String deleteProcess(@PathVariable("idx") int idx) {
		repository.deleteById(idx);
		return "deleted"; // 문자열 그대로 HTTPBody에 실어서 전달 HTTP 응답으로 변환되어 클라이언트한테 전달
	}
	//------------------------------------------------------------------------------------------------------------------------
	// 댓글 (Comment) 관련 API 댓글관련 @Entity 만들었다 JPA Repository 여기서 클라이언트에게 보내는 통신코드 만들자
	// 주의 : 위 코드를 넣으려면 BoardController 상단에 private final CommentRepository commentRepository; 를 추가하여 생성자 주입을 받아야 한다.
	//------------------------------------------------------------------------------------------------------------------------
	
	// 1. [댓글 쓰기] 특정 게시글 (BoardIdx) 에 새 댓글을 추가한다.
	@PostMapping("/{boardIdx}/comments")
	public String writeComment(
			@PathVariable("boardIdx") int boardIdx,
			@RequestBody CommentRequestDto dto )// 프론트에서 보낸 작성자, 내용을 받음
			{
			// 1. 부모가 될 게시글을 DB에서 찾는다. 
			Board board = repository.findById(boardIdx);
			// 만약 findByid가 Optional을 반환한다면 : repository.findById(board.Idx).orElseThrow(...))
			
			// 2. DTO 데이터를 엔티티로 옮겨 담는다.
			Comment comment = new Comment();
			comment.setWriter(dto.getWrtier());
			comment.setContent(dto.getContent());
			comment.setIndate(new Date()); // 현재 시간 강제 세팅 (수정된 Date 타입 기준)
			
			// 3. 찾은 게시글을 댓글에 연결해 준다. (N:1 관계의 핵심)
			comment.setBoard(board);
			
			// 4. DB에 저장한다. 
			commentRepository.save(comment);
			return "comment_saved"; // 리액트에게 성공했다고 알려줌
	}
//------------------------------------------------------------------------------------------------------------------------
//	[댓글 조회] 특정 게시글 (boardIdx)에 달린 모든 댓글을 가져온다. 	
// `댓글목록을 가져오는 API가 Comment 엔티티를 통째로 반환 List<Comment> 하고 있다. Comment 안에는 Board가 있고, Board 안에는 다시 Comment가 엮여있기 때문에,
//	이대로 리액트에 보내면 데이터가 핑퐁을 치며 무한 증식하다가 서버가 다운된다. (무한 재귀 에러) 그래서 CommentResponseDto를 만들었다! 
//------------------------------------------------------------------------------------------------------------------------
	@GetMapping("/{boardIdx}/comments")
	public List<CommentResponseDto> getComments(@PathVariable("boardIdx") int boardIdx) {
		List<Comment> comments = commentRepository.findByBoardIdx(boardIdx);

	// 안전한 DTO 상자로 변환해서 던져주기!
	return comments.stream()
			.map(CommentResponseDto::new)
			.collect(Collectors.toList());
	}
	// 3. [댓글 삭제] 특정 댓글 (commentIdx)를 삭제한다. 
	@DeleteMapping("/comments/{commentIdx}")
	public String deleteComment(@PathVariable("commentIdx") int commentIdx) {
		commentRepository.deleteById(commentIdx);
		return "comment_deleted";
	}
}
//------------------------------------------------------------------------------------------------------------------------
// @Controller 또는 @RestController로 선언된 클래스에서
// @RequestMapping, @GetMapping, @PostMapping 등의 애노테이션을 사용해 어떤 URL 요청을 어떤 메서드가 처리할지 매핑(라우팅)하는 역할.
// 라우팅: 요청 URL → 메서드 매핑
// 요청 파싱: Path Variable, Query Parameter, Request Body 추출
// 응답 직렬화: 반환값을 JSON 등으로 변환
// 계층 간 연결: Service 계층을 호출하고 결과를 클라이언트에 반환 [핵심 비즈니스 로직은 Service 계층에 위임하고]  
// Controller는 HTTP 요청/응답 처리에 집중하는 것이 일반적인 설계 원칙입니다.
//------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------
// [목록 조회] 리액트의 api.get('/posts') 와 연결 [수정] 
// @GetMapping에 경로를 생략하면 클래스 레벨의 @RequestMapping 경로를 그대로 상속받는다!
//------------------------------------------------------------------------------------------------------------------------ 


//------------------------------------------------------------------------------------------------------------------------ 
// Spring 어노테이션에서 경로 없이 데이터 받기
// @RequestMapping, @GetMapping, @PostMapping 등에서 경로를 생략하면 클래스 레벨의 경로 또는 **기본 경로(/)**로 매핑됩니다.
//------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------ 
// [목록 조회] 리액트가 /posts?keyword=리액트 로 요청을 보낸다.
// @RequestParam(required = false) :: 리액트가 검색어를 보낼수도 있고 안보낼 수도 있다. 필수는 아니다 
//------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------
// [트러블 슈팅]
// 주소 경로 매핑 문제발생 프론트 엔드의 AXIOS api 주소와 통신하기 위한 RESTful API 방식으로 코드 수정 
// 클린코드 : idx로 통일 Spring Controller에서 변수명을 id -> idx로 변경 Spring Controller 경로 매핑을 리액트에 일치 
//-----------------------------------------------------------------------------------------------