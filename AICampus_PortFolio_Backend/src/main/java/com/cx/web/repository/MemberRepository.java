package com.cx.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cx.web.entity.Member;

public interface MemberRepository extends JpaRepository<Member,String> {
	// ID가 PK이므로 기본 제공되는 findById(Stirng id)를 바로 사용 가능
}