use spring_db;

-- 게시글(board) 테이블의 idx를 참조하는 comment 테이블

-- 데이터 베이스의 참조 무결성 규칙때문에 발생하는 문제 : board 테이블(부모)와 tbl_comment 테이블(자식)이 외래키 board_idx로 끈끈하게 연결되어 있다.
-- 부모 게시글을 지우려고 하는데 그 글에 달린 댓글 (자식) 이 부모를 붙잡고 있는 상황

-- 1. 자식인 댓글 테이블을 미리 비운다.
delete from tbl_comment;
-- 2. 부모인 게시글 테이블을 비운다. 
delete from board;

-- 1. 댓글 테이블 생성
CREATE TABLE spring_db.comment (
idx INT AUTO_INCREMENT PRIMARY KEY,	
board_idx INT NOT NULL, -- 어떤 게시글의 댓글인지 알려주는 연결고리 // NOT NULL 빈칸 허용안함 인데 자동번호 생성 설정이 되어있지 않아서 문제 발생
content TEXT NOT NULL,	-- 댓글 내용	
writer varchar(50) not null,	-- 댓글 작성자
indate DATETIME DEFAULT NOW(), -- 작성일
constraint fk_board foreign key (board_idx) references spring_db.board(idx) on delete cascade
);

-- 테스트 데이터 삽입 (1번 게시글에 댓글 달기)
insert into spring_db.comment (board_idx, content, writer) values
(1, '우와, 드디어 연동 성공하셨군요! 축하드립니다.', '리액트열공'),
(1, '풀스택 개발자 가즈아~!', '스프링고수'),
(2, '도쿄 맛집 정보 정말 유익해요! 저장해둡니다.', '빵순이');




-- 엔티티를 수정하면서 이름이 다른 두개의 댓글 테이블 comment와 tbl_comment가 생긴 문제
-- 실제로 에러를 내고 있는 comment 테이블이 여전히 데이터가 남아있어서 부모(board)를 놓아주고 있지 않은 상황
-- DB입장에서는 엔티티와 테이블의 이름이 다르니 별개의 테이블로 인식했다!
-- 에러 메시지 CONSTRAINT FK.... 부분이 comment 테이블이 board 테이블을 붙잡고 있다는 증거!

-- 외래키 체크 강제 해제후 삭제 (참조 무결성 규칙을 잠시 끄고 강제로 밀어버리는 방법)

-- 1. 외래키 체크 잠시 끄기 (자식이 있든 말든 상관 안 하겠다!)
SET FOREIGN_KEY_CHECKS = 0;

-- 2. 모든 게시글 데이터 삭제
DELETE FROM board;idx

-- 3. 모든 댓글 데이터 삭제 (이름이 다른 두 테이블 모두 비웁니다)
DELETE FROM tbl_comment;
DELETE FROM comment;

-- 4. 외래키 체크 다시 켜기 (중요! 다시 켜야 DB가 안전해집니다)
SET FOREIGN_KEY_CHECKS = 1;


-- NOT NULL 빈칸 허용안함 인데 자동번호 생성 (AUTO_INCREMENT 되어있지 않아서 문제 발생
-- -> 테이블의 idx 컬럼에 "자동으로 번호 매기는 속성" 추가한다.
-- board 테이블의 idx 컬럼에 AUTO_INCREMENT 속성 추가한다.
ALTER TABLE spring_db.board MODIFY idx INT AUTO_INCREMENT;

-- ================================================================================

-- 1. 외래키 제약 조건을 잠시 삭제합니다. (에러 메시지에 나온 이름을 써야 합니다)
ALTER TABLE spring_db.comment DROP FOREIGN KEY FK340e5kvl012bk5mupdl1ucv9k;

-- 2. 이제 드디어 idx에 AUTO_INCREMENT(자동 번호 생성)를 넣을 수 있습니다!
ALTER TABLE spring_db.board MODIFY idx INT AUTO_INCREMENT;

-- 3. 다시 자식(댓글)과 부모(게시글)의 연결고리를 복구합니다.
ALTER TABLE spring_db.comment 
ADD CONSTRAINT FKs4ltx3yjfc38pocpcl6tq4n 
FOREIGN KEY (board_idx) REFERENCES board(idx) ON DELETE CASCADE;



-- ================================================================================
-- 하이버네이트가 자동으로 만든 난수 이름 대신 우리가 직접 FK_BOARD_COMMENT_NEW 이름 지정
-- ================================================================================

-- 1. 외래키 체크를 잠시 꺼서 걸림돌을 치웁니다.
SET FOREIGN_KEY_CHECKS = 0;

-- 2. board 테이블의 idx를 AUTO_INCREMENT로 확실히 바꿉니다.
ALTER TABLE spring_db.board MODIFY idx INT AUTO_INCREMENT;

-- 3. 혹시 모를 이름 충돌을 피하기 위해 새로운 이름으로 외래키를 다시 연결합니다.
-- (기존에 어떤 이름의 FK가 있든 상관없이 새로 하나를 더 안전하게 만드는 방식입니다.)
ALTER TABLE spring_db.comment 
ADD CONSTRAINT FK_BOARD_COMMENT_NEW 
FOREIGN KEY (board_idx) REFERENCES board(idx) ON DELETE CASCADE;

-- 4. 외래키 체크를 다시 켭니다.
SET FOREIGN_KEY_CHECKS = 1;
-- ================================================================================

-- ================================================================================



