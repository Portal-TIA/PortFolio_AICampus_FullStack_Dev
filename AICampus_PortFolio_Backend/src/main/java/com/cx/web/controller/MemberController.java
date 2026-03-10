package com.cx.web.controller;

//----------------------------------------------------------------------
// (현재 회원 메인 API)
// 이 파일은 리액트의 로그인과 회원가입 요청을 전담
// @RestController와 @CrossOrigin(origins = "http://localhost:5173")이 붙어있어 리액트와 통신을 허용.
// @RequestBody Member member: 리액트가 보내는 JSON 데이터를 자바 객체로 받는다.
// 더 이상 HTML 화면을 리턴하지 않고 "success" 문자열이나 회원 정보(JSON)를 리액트에 전송하는 구조로 개조.
// Controller는 클라이언트(브라우저, 앱 등)의 HTTP 요청을 가장 먼저 받아서 처리하는 진입점 역할
//----------------------------------------------------------------------

// @PostMapping("/board")        // Create 요청 수신
// @GetMapping("/board/{id}")    // Read 요청 수신
// @PutMapping("/board/{id}")    // Update 요청 수신
// @DeleteMapping("/board/{id}") // Delete 요청 수신
// MemberController = 회원 관련 URL 요청을 받아 비즈니스 로직(Service)으로 전달하는 진입 지점

//----------------------------------------------------------------------
// 왜 이름이 MemberController인가?
// Spring에서는 기능 단위(도메인 단위) 로 Controller를 나눈다.
// Controller	담당 기능
// MemberController	회원 가입, 조회, 수정
// OrderController	주문
// LoginController	인증
// AdminController	관리자 기능
//----------------------------------------------------------------------
// ## URL 완성 공식
// [서버 주소] + [@RequestMapping] + [@PostMapping 등]
// http://localhost:8080  +  /api/member  +  /join-process
//         ↓                    ↓                ↓
//      서버 주소           클래스 레벨          메서드 레벨
// http://localhost:8080/api/member/join-process  ✅
//----------------------------------------------------------------------
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cx.web.entity.Member;
import com.cx.web.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
// (Maps('/login'))" 하고 스스로 동작하게 됩니다.
// MemberController.java를 리액트(REST API) 맞춤형으로 개조해 보겠습니다.
// 여기서 아주 중요한 포인트가 하나 있습니다. 리액트(Axios)는 백엔드로 데이터를 보낼 때 기본적으로 **
// JSON 형태({"id": "user1", "password": "123"})**로 보냅니다. 
// 따라서 스프링이 이 JSON 데이터를 자바 객체(Member)로 찰떡같이 변환해서 받으려면 
// @RequestBody**라는 마법의 어노테이션이 꼭 필요합니다!
//-------------------------------------------------------------------------------------------------------------------
//@CrossOrigin 추가: 리액트(포트 5173)와 스프링(포트 8080 등)은 주소가 다르기 때문에 기본적으로 통신이 막혀 있습니다. 이걸 뚫어주는 아주 중요한 어노테이션
//-------------------------------------------------------------------------------------------------------------------

@RequiredArgsConstructor // final 필드 초기화하는 생성자 자동 생성
@RestController // @Controller를 @RestController로 변경 ( 화면 대신 데이터 리턴 )
@CrossOrigin(origins = "http://localhost:5173") // 리액트(5173 포트) 에서 오는 요청 허락해주는 필수요소. // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용해주는 매커니즘 
public class MemberController {
	
	private final MemberRepository memberRepository;
	// 리액트에서 데이터를 전송할 서버 API 주소.
	// 리액트에서 보낸 JSON 데이터를 받기 위해 @Request Body
	@PostMapping("join-process")
	public String join(@RequestBody Member member) { // 리액트가 보내는 JSON 데이터를 자바 객체로 받기 위한 필수 어노테이션
	// 아이디가 이미 존재하는지 한번 확인해주면 더 안전하다. 
		if (memberRepository.findById(member.getId()).isPresent()) {
			return "fail";
		}		
		// 시큐리티 암호화 로직 삭제, 받은 비밀번호 그대로 저장! (빠른 테스트용)
		member.setRole("ROLE_USER");
		memberRepository.save(member);
		return "success";
//-------------------------------------------------------------------------------------------------------------------
//		리액트(클라이언트)에게 "성공했어 / 실패했어" 를 알려주기 위해 단순 문자열로 결과를 반환
//		실무에선 String 대신 ResponseEntity를 주로 사용해요. Spring이 제공하는 HTTP 응답 전용 래퍼(Wrapper) 클래스
//		HTTP 응답 자체를 표현하는 클래스입니다.
		// HTTP 상태코드 + 메시지 함께 전달
//		public ResponseEntity<String> join() {
//		    return ResponseEntity.status(409).body("이미 존재하는 아이디");
//		    return ResponseEntity.ok("회원가입 성공");
//		}
//-------------------------------------------------------------------------------------------------------------------
	}
	
//		2. [로그인] 새로 추가된 로직!
		@PostMapping("/login-process")
		public ResponseEntity<?> login(@RequestBody Member member) {
			// 1) 리액트가 보낸 아이디로 DB에서 회원 찾기
			Optional<Member> findMember = memberRepository.findById(member.getId());
			
			// 2) 아이디가 아예 없거나, 비밀번호가 틀린 경우 반려
			if (findMember.isEmpty() || !findMember.get().getPassword().equals(member.getPassword())) {
				// 401 에러(Unauthorized)를 던져서 리액트가 로그인 실패를 알게 합니다.
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 틀렸습니다.");
			}
			
			// 3) 로그인 성공!
			Member loginUser = findMember.get();
			
			// 보안 처리: 리액트로 회원 정보를 넘겨주기 전에 비밀번호는 지운다.
			loginUser.setPassword(null); 
			
			// 닉네임, 권한 등이 담긴 회원 정보를 200 OK와 함께 리액트로 쏴줍니다.
			return ResponseEntity.ok(loginUser);
		}
	}
//-------------------------------------------------------------------------------------------------------------------
// @RestController 적용: 더 이상 redirect:/loginform 처럼 스프링이 화면을 강제로 이동시키지 않습니다.
// @RequestBody 추가: 리액트의 통신 방식(JSON)에 맞춰 데이터를 깔끔하게 받아옵니다.
// 리턴값 "success": 리액트는 이 응답을 받고 "아! 성공했구나! 그럼 내가(리액트가) 알아서 로그인 화면으로 넘겨준다
// 질문에서 "회원가입/로그인(MemberController)도 개조하기"라고 하셨는데, 놀랍게도 현재 코드 구조상 로그인 처리는 MemberController에 없습니다!
//-------------------------------------------------------------------------------------------------------------------
 
