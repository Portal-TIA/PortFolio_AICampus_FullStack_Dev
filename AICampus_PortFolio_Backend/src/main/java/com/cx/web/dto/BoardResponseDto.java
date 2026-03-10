package com.cx.web.dto;

import com.cx.web.entity.Board;

import lombok.Data;

//-------------------------------------------------------------------------------------------------------------
// 프론트엔드가 쓰기 편하게 이름표(변수명)와 데이터 형태를 바꿔주는 것" 
// 스프링에 DTO 클래스 만들기 
// 스프링의 원본 데이터(Board Entity)를 안전하게 보호하고, 리액트(React)가 딱 원하는 모양대로 데이터를 포장해서 보내주는 DTO
// DTO 안에는 데이터베이스를 조작하는 복잡한 기능은 싹 빠지고, 오직 프론트엔드로 넘어갈 순수한 데이터와 새로운 이름표만 남는다
// @Getter, @Setter, @ToString, @EqualsAndHashCoded, @RequiredArgsConstructor와 @Value를 전부 합쳐놓은 종합적인 어노테이션이라고 할 수 있다.
//-------------------------------------------------------------------------------------------------------------
@Data 
public class BoardResponseDto {
	// 프론트엔드가 원하는 이름표로 세팅
	private int id; // [수정] Entity의 idx를 id로 설정
	private String title;
	private String content;
	private String author; // 리액트를 위해 writer 대신 author 
	private String indate; // Date 객체 대신 다루기 쉬운 String  
	private String image;
	
	// Entity를 재료로 받아서 DTO 요리로 완성하는 생성자
	public BoardResponseDto(Board entity) {
		this.id = entity.getIdx();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.author = entity.getWriter();
		this.image = entity.getImage();
		
		// 날짜를 프론트가 쓰기 편해게 문자열로 변환해서 넘겨줌
		// (데이터가 없을 때를 대비한 안전한 방어 코드 포함)
		this.indate = (entity.getIndate() != null) ? entity.getIndate().toString() : "";		
	}	
}