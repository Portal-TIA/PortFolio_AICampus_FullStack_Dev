package com.cx.web.entity;

import java.time.temporal.Temporal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
//-------------------------------------------------------------------------------------------------------------
/*	1. 백엔드 (DB & DTO) 
 * 댓글 테이블을 만들고, 게시글과 연결하기 (1:N) 관계
 *  2. 백엔드 (API) : 댓글 저장, 조회, 삭제 컨트롤러 만들기   
 *  3. 프론트엔드 (React) 상세 페이지에 댓글 목록 띄우고 입력창 연결하기
 * */
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "tbl_comment") 
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx; // 댓글 고유 번호 
	
	private String writer; // 댓글 작성자
	
	@Column(columnDefinition = "TEXT") // 댓글 내용이 길어질 수 있으므로 설정
	private String Content; // 댓글 내용
	
	private Date indate; // 댓글 작성일
	
	// 핵심: 이 댓글이 속한 게시글을 가리킨다.	
	// @ManyToOne : 1:N, N:1 관계를 설정하는 어노테이션
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_idx") // DB 테이블에 board_idx 라는 기둥(FK) 이 생긴다. 
	private Board board;
	
	// 저장전 자동으로 날짜를 넣어주는 메서드
	@PrePersist
	protected void onCreate() {
		indate = new Date();
	}	
}
//--------------------------------------------------------------------------------------------------------------------------------
// 게시글과 댓글의 관계(N:1) 
// Comment : 댓글 기능 담당 엔티티
// JPA 매핑: @Table(name = "tbl_comment") 설정으로 실제 DB 테이블 이름은 tbl_comment로 생성되므로, 자바 클래스 이름인 Comment와 충돌할 걱정없다.
// 관계 설정: @ManyToOne으로 Board 엔티티 연결.
//--------------------------------------------------------------------------------------------------------------------------------