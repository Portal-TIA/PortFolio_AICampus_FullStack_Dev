package com.cx.web.entity;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


//--------------------------------------------------------------------------------
// 스프링의 원본데이터 (Board Entity) 를 안전하게 보호하고 리액트가 원하는 모양대로 DTO 만들기 
//--------------------------------------------------------------------------------
@Entity
@Data
@Table(name="Board")
public class Board {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO) 
	private int idx;
	
	@Column(nullable = false)
	private String title;
	
	@Column(columnDefinition = "TEXT", nullable = false) // 본문은 길어질 수 있으니 TEXT 타입으로 지정
	private String content;
	
	@Column(nullable = false)
	private String writer;
	
	@Column(nullable = false)
	private Date indate;
	
	public void setIndate(Date indate) {
		this.indate = indate;
	}
	//@Column(length = 500)
	private String image; //이미지 파일 이름 + 확장자
}


