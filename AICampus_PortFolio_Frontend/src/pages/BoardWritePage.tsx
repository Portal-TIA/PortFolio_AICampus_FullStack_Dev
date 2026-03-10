import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBoardPost } from "../api/boardApi"; // [글 작성] 폼 데이터를 서버에 보내서 새 글을 생성하는 함수

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function BoardWritePage() {
const navigate = useNavigate();


  // 1. 사용자가 입력한 값을 기억할 공간 (State)
  const [category, setCategory] = useState("일반");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState(""); // 백엔드 필수값이라 추가했습니다!
  const [content, setContent] = useState("");

  // 2. 등록 버튼 클릭 시 실행될 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 새로고침 방지

    // 빈 칸 검사
    if (!title || !writer || !content) {
      alert("제목, 작성자, 내용을 모두 입력해주세요!");
      return;
    }

    try {
      // 3. 백엔드로 보낼 데이터를 FormData(보따리)에 담기
      const formData = new FormData();
      formData.append("writer", writer);
      formData.append("content", content);
      formData.append("title", title);
      // (참고: category는 현재 스프링 DB에 없어서 일단 뺐습니다. 나중에 DB에 컬럼을 추가하면 여기도 append 해주세요!)

      // 4. API 호출 (스프링으로 전송!)
      const response = await createBoardPost(formData);

      if (response === "success") {
        alert("게시글이 성공적으로 등록되었습니다! 🎉");
        navigate("/board"); // 성공 시 게시판 목록으로 이동 (라우터 주소에 맞게 '/board' 또는 '/boardlist'로 수정하세요)
      }
    } catch (error) {
      console.error("글쓰기 에러:", error);
      alert("글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">글쓰기</h1>
      </div>

      {/* 폼에 onSubmit 이벤트 달아주기 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* 카테고리 */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">분류</Label>
          {/* onValueChange 로 선택값 상태 업데이트 */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="w-40">
              <SelectValue placeholder="분류 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="일반">일반</SelectItem>
              <SelectItem value="질문">질문</SelectItem>
              <SelectItem value="공유">공유</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 작성자 (새로 추가됨!) */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="writer">작성자</Label>
          <Input
            id="writer"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
          />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="min-h-80 resize-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/board">취소</Link>
          </Button>
          <Button type="submit">등록</Button> 
        </div>

      </form>
    </div>
  );
}