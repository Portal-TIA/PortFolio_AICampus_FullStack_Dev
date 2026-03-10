package com.cx.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cx.web.entity.Board;
import com.cx.web.repository.BoardRepository;
//--------------------------------------------------------------------------
// BoardController.java와 역할이 겹치는 낡은(Legacy) 코드입니다.
// /search라는 URL을 사용하고 있는데, 이 검색 기능은 이미 위의 BoardController.java의 getBoardList() 안에 완벽하게 똑같은 로직
// repository.findByTitleContaining(keyword))으로 구현되어 흡수된 상태입니다.
// 리액트 코드에서 axios.get('/posts?keyword=...') 방식으로 통신하고 있다면, 이 /search 주소는 아무도 호출하지 않는 외딴섬이 됩니다. 
// 기능이 완전히 겹치므로 삭제하셔도 무방합니다. (혹시 리액트에서 진짜로 /search 주소로 요쳥을 보내는 곳이 남아있지 않은지 한번만 확인해 주세요!)
// 이전 단계(DTO 적용) 이어서 하기: 앞서 우리가 이야기했던 BoardResponseDto.java를 만드는 작업은 바로 BoardController.java 파일에 적용하시면 됩니다. 
//  @GetMapping이나 @GetMapping("/{idx}")가 있는 부분의 리턴 타입을 DTO로 바꿔주시면 됩니다.  
//--------------------------------------------------------------------------

// 데이터 만 응답함 ~> 화면 일부분만 수정가능
@RestController
public class BoardRestController { // BoardRestController는 BoardRepository 가 필요한데 직접 안만들고 외부에서 만들어서 주는 개념
	
	private final BoardRepository repository; // 의존성 주입
 

	// new 연산자로 객체를 안만든다 	
	public BoardRestController(BoardRepository repository) {
		this.repository = repository;
	}	
	//리액트에서 파라미터 없이 (/search) 요청할 수도 있으므로 required = false 추가!
	@GetMapping("search")
	public List<Board> search(@RequestParam(value = "keyword", required = false) 
	String keyword) {
		System.out.println("React에서 넘어온 검색어: " + keyword);
		
		// keyword가 아예 안 넘어오거나(null) 공백만 있을 경우 -> 전체 리스트 응답
		if(keyword == null || keyword.trim().isEmpty()) {
			return repository.findAll();
		} else {
            // 검색어가 포함된 리스트 응답
		return repository.findByTitleContaining(keyword);
		}	
	}	
}
// --------------------------------------------------------------------------
// @RequestParam(value = "keyword", required = false) 추가되었습니다.
// 이전 : 리액트가 실수로 http://localhost:8080/search 라고만 요청하면, 스프링이 "어? 너 keyword 안 보냈잖아! 하면서 400 에러.
// 변경 후 : required = false 덕분에, keyword를 안 보내면 keyword = null로 부드럽게 넘어가고 
// 아래의 if(keyword == null) 로직을 타서 전체 게시글을 무사히 돌려주게 됩니다.
// --------------------------------------------------------------------------