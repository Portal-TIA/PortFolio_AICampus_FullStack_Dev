package com.cx.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // @Getter, @Setter, @ToString 등을 한번에 해결한다. //@Data 어노테이션안에 @Getter, @Setter가 이미 포함되어 있다. 
@NoArgsConstructor // 기본 생성자 생성
@Entity //jpa 엔터티로 지정
@Table(name="Member")
public class Member {
	@Id
	private String id; // 로그인 아이디를 PK로 사용 (중복 불가)
	private String password;
	private String nickname; // 추가: 게시판에 '작성자' 로 표시될 이름
	private String role; //ROLE_USER(일반사용자), ROLE_ADMIN(관리자)
	}