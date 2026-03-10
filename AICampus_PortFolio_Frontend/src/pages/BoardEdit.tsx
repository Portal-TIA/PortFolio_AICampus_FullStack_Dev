import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // App.tsx에서 정한 변수명 ( :idx ) 를 useParams로 정확히 낚아챈다 // URL 파라미터
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoardPostById, updateBoardPost } from "@/api/boardApi";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BoardEdit() {
  // 1. URL 파라미터 및 이동 도구
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 각 입력창을 담당할 상태
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  // 2. [조회] 기존 데이터 불러오기 (Read)
  // BoardPost | undefined 에서 |은 유니온 타입으로 post 변수가 두가지 타입중 하나가 될수 있다는 뜻
  // 즉, post는 BoardPost 객체이거나 undefined (값이 없는 상태)
  // 쿼리가 아직 로딩 중이거나 실패했을 때는 데이터가 없으므로 undefined가 된다.
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getBoardPostById(Number(id)),
  });

  // 3. 서버에서 데이터가 도착하면 로컬 상태(Input 창)에 쏙 넣어주기
  // useEffect : 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setWriter(post.writer || "");
      setContent(post.content || "");
    }
  }, [post]);
// TypeScript는 undefined 가능성을 미리 알려줘서 런타임 에러를 방지한다.
  // 에러 가능  (post.title) post가 undefined일수 있다.
  // 안전하게 접근  (post?.title)
  // 조건부로 처리 if(post) { console.log(post.title) }


  // 4. 변경된 데이터를 서버로 전송하기 (Update)
  const updateMutation = useMutation({ // React-Query를 이용해 서버에 변경(insert, update, delete) 작업 요청 시 사용
    // 여러 개의 데이터를 한 번에 묶어서(객체로) 서버로 보냅니다.
    mutationFn: (updateData: { title: string; writer: string; content: string }) =>
        updateBoardPost(Number(id), updateData),

    onSuccess: () => {
      alert("성공적으로 수정되었습니다!");
      // 캐시 무효화 -> 목록 최신화!
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // 수정이 끝나면 방금 수정한 그 게시글의 상세 페이지로 돌아갑니다.
      navigate(`/board/${id}`);
    },
    onError: () => {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  });

  // 5. 저장 버튼을 눌렀을 때 실행될 핸들러 함수
  const handleSubmit = () => {
    // 빈칸 검사는 핸들러 안에서 수행
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    // TanStack : 이전이름 ReactQuery 데이터 가져오기, 캐싱, 동기화 및 서버 상태를 업데이트를 간편하게 해주는 라이브러리
    // 💡 변경된 제목, 작성자, 내용 mutation
    updateMutation.mutate({ title, writer, content });
  };

  // 데이터를 다 불러오기 전 화면
  if (isLoading) return <div className="p-10 text-center">기존 데이터를 불러오는 중...</div>;

  return (
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>게시글 수정</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">

            {/* 제목 입력 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium block">제목</label>
              <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
              />
            </div>

            {/* 작성자 입력 (수정 불가 처리) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium block">작성자</label>
              <Input
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                  disabled // 게시판 특성상 작성자 이름은 바꾸지 못하도록 막아둡니다.
              />
            </div>

            {/* 내용 입력 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium block">내용</label>
              <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                  className="min-h-[300px]"
              />
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2 mt-4 border-t pt-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                취소
              </Button>
              {/* 로딩 중(isPending)일 때는 버튼을 비활성화 시킵니다 */}
              <Button
                  onClick={handleSubmit}
                  disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "저장 중..." : "수정 완료"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}

// useEffect
// 처음에 페이지가 열리면 useQuery가 서버로 달려가 데이터를 가져옵니다. 그때까지 post는 비어있다.
// 서버에서 데이터가 도착해서 post 변수에 값이 들어오는 순간, 리액트가 그걸 감지
// 그래야 사용자가 수정할 수 있게 <Input> 창에 기존 글 제목이 타이핑된 채로 나타납니다.


// useMutation과 invalidateQueries의 환상적인 콤보
// 사용자가 제목을 고치고 '수정 완료'를 누르면 updateMutation.mutate()가 실행되어 서버의 DB 값을 바꿉니다.

// 이때 onSuccess 안에서 queryClient.invalidateQueries({ queryKey: ['posts'] })를 외칩니다.
// 이 한 줄의 의미는 "야! 니들이 기억하고 있는 ['posts'] 상자 안에 든 거 이제 다 쓰레기(Invalid)야!
// 다시 게시판 화면 가면 서버에서 새로 가져와!" 라는 뜻입니다.
