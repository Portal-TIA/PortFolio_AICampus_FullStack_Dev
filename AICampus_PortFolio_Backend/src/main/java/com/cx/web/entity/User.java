package com.cx.web.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

//-------------------------------------------------------------------------------
// 게시글의 주인이 될 유저 엔티티
// 기존에는 writer라는 단순한 글자로 작성자를 관리했지만 이제는 이 User 객체가 글을 소유하게 된다.
//-------------------------------------------------------------------------------
@Entity
@Getter @Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; // 유저 고유 번호
	
	// 로그인 아이디 (중복 불가)
	@Column(nullable = false, unique = true) // unique : 중복값 불가 (유일값)
	private String email;
	
	// 비밀번호
	@Column(nullable = false)
	private String password;
	
	// 게시판에 표시될 이름
	@Column(nullable = false)
	private String nickname; // 게시판에 표시될 이름 (기존의 writer 역할) 	
}
//-------------------------------------------------------------------------------
//	한명의 유저가 여러개의 글을 쓸수 있음 (1:N 관계)
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private List<Board> boards = new ArrayList<>();
//-------------------------------------------------------------------------------