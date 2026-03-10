package com.cx.web.dto;

import java.util.Date;

import com.cx.web.entity.Comment;

public class CommentResponseDto {
	
	private int idx;
	private String writer;
	private String content;
	private Date indate;
	
	
	// 원본 엔티티(Comment)를 DTO 상자로 옮겨담는 생성자
	public CommentResponseDto(Comment comment) {
		this.idx = comment.getIdx();
		this.writer = comment.getWriter();
		this.content = comment.getContent();
		this.indate = comment.getIndate();
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getIndate() {
		return indate;
	}
	public void setIndate(Date indate) {
		this.indate = indate;
	}
}