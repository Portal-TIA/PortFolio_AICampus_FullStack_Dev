package com.cx.web.dto;

import com.cx.web.entity.Board;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//-------------------------------------------------------------------------------
// 프론트에서 날아오는 데이터를 안전하게 받아낼 Request DTO 
// 유효성 검사 집중화 필요한 데이터만 노출(수신)"**이라는 DTO의 장점
// 사용자가 입력하는 진짜 데이터(제목, 내용, 작성자)만 담습니다. 
// 조회수나 작성일자 같은 건 서버가 알아서 해야 하니까 빼버립니다!)
// 프로젝트가 커질수록 DTO 없이 Entity를 직접 쓰다가 나중에 감당이 안 되는 경우가 훨씬 많다..
// 요청/응답이 동일하면 하나로 통일 억지로 나누지 않고 같은 구조면 하나의 DTO를 재사용
//-------------------------------------------------------------------------------
@Getter
@Setter
@NoArgsConstructor // 기본 생성자 자동 생성
public class BoardRequestDto {

// 유효성 검사 어노테이션이 없는 순수하게 데이터를 안전하게 옮겨 담는 바구니 역할
// Lombok을 사용했으니 Getter Setter 작성 생략 

	private String title;
	private String content;
	private String writer;

// DTO -> Entity 변환 메서드 비즈니스 로직이 담긴 메서드 라서 Lombok이 못읽는다.
	public Board toEntity() {
		Board board = new Board();
		board.setTitle(this.title);
		board.setContent(this.content);
		board.setWriter(this.writer);
		return board;		
	}
}