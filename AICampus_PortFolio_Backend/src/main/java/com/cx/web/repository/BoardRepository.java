package com.cx.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cx.web.entity.Board;
//--------------------------------------------------------------------
// JpaRepository
// 데이터베이스와의 상호작용을 간단하게 처리할 수 있도록 도와줍니다. 
// 이를 통해 복잡한 SQL 쿼리 없이도 객체 지향적으로 데이터베이스를 조작할 수 있습니다. 
// 기본적인 CRUD 작업뿐만 아니라, 사용자 정의 쿼리도 쉽게 작성할 수 있습니다.
//--------------------------------------------------------------------



//--------------------------------------------------------------------
// JpaRepository 인터페이스를 상속받은 인터페이스를 만들면 Spring Data JPA가 자동으로 해당 // 인터페이스의 구현체를 만들어서 Bean으로 등록한다. 
// 기본제공 메서드 (CRUD 연산 관련) save(), findbyId(), findAll(), count(), delete() 
//--------------------------------------------------------------------
public interface BoardRepository extends JpaRepository<Board, Integer> {
	// 여기까지하면 기본 CRUD 메서드 사용 가능하다!
	public Board findById(int idx);
	
	//select * from board where title like '%keyword%'
	//void findByTitle(String keyword); //keyword랑 똑같은 제목을 가진 게시물만 불러움

	List<Board> findByTitleContaining(String keyword);
}
 