package com.cx.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cx.web.entity.Comment;

//-----------------------------------------------------------
// 댓글 Repository 만들기
//  DB에 댓글을 저장하고 꺼내올 CommentRepository 인터페이스
//-----------------------------------------------------------
public interface CommentRepository extends JpaRepository<Comment, Integer> {
	// 1번 게시글에 달린 댓글만 가져오는 메서드
	// Board의 idx를 기준으로 댓글 찾는다.
	List<Comment> findByBoardIdx(int boardIdx);
}
