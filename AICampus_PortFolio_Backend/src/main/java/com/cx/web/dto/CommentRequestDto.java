package com.cx.web.dto;

//-------------------------------------------------------------------------------------------------------------
// 백엔드 프론트엔드와 소통할 DTO 
// 프론트엔드에서 댓글 내용 Content와 작성자 writer만 쏙 뽑아서 서버로 보낼때 사용할 CommentRequestDto
// JPA가 자동으로 comment 라는 새로운 테이블을 만들어준다.
// 게시글 번호를 저장하는 board_idx 라는 외래키 기둥과 함께! 
//-------------------------------------------------------------------------------------------------------------
public class CommentRequestDto {
	private String wrtier;
	private String content;
	
	public String getWrtier() {
		return wrtier;
	}
	public void setWrtier(String wrtier) {
		this.wrtier = wrtier;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}	
}