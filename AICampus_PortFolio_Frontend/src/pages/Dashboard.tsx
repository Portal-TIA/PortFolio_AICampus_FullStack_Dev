import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { MiniBoardList } from "@/components/mini-board-list"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, Plus, Eye } from "lucide-react"
import { LargeImageCard } from "@/components/ui/LargeImageCard"

// 리액트 쿼리 & API 함수
import { useQuery } from "@tanstack/react-query";
import { getBoardPosts } from "@/api/boardApi";

export default function Dashboard() {
  const navigate = useNavigate();

  // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState("")
  const [keyword, setKeyword] = useState("")

  //------------------------------------------------------------
  // 리액트 쿼리로 서버 데이터 가져오기
  //------------------------------------------------------------
  const { data: boardPosts, isLoading } = useQuery({
    queryKey: ['posts', keyword],
    queryFn: () => getBoardPosts(keyword),
  });

  // [디버깅 코드]
  // useEffect 컴포넌트가 렌더링 될 때마다 특정 작업을 실행하는 Hook
  useEffect(() => {
    if (boardPosts) {
      console.log("🚀 백엔드에서 받아온 데이터:", boardPosts);
    }
  }, [boardPosts]);

  // 검색 실행 (엔터)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  //---------------------------------------------------------------------------------------
  // 좌측 피드에 보여줄 개수를 2개에서 6개로 늘린다.
  //---------------------------------------------------------------------------------------
  // 데이터 분리 (slice)
  // 좌측 카드용: 최신 글 6개로 분리
  const feedPosts = boardPosts?.slice(0, 6);
  // 우측 리스트용: 7번째 글부터 나머지 전부
  const listPosts = boardPosts?.slice(6);
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur px-4">
            <div className="flex items-center gap-2 px-2 flex-1">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">홈</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>커뮤니티</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative w-64 hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                {/* e: input값이 변경될떄 React가 자동으로 넘겨주는 이벤트 객체  타입명시 : 어떤 HTML 요소에서 발생한 이벤트인가 타입 명시*/}
                <Input
                    placeholder="게시글 검색 후 엔터..."
                    className="pl-9 bg-muted/50 focus-visible:ring-primary"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
              <Button size="sm" className="gap-2" onClick={() => navigate("/board/write")}>
                <Plus className="h-4 w-4" />
                <span>새 글 쓰기</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl">
              {/* 상단 4구역 하드코딩된 인기글 배너 영역 */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
                {[
                  { title: "이번 주 베스트: 산토리니", desc: "지중해의 푸른 파라다이스", tag: "HOT", views: "12k", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=500&auto=format&fit=crop" },
                  { title: "도심 속 힐링: 호캉스", desc: "가성비 좋은 서울 호텔 TOP 5", tag: "추천", views: "8.5k", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop" },
                  { title: "나만 알고 싶은 캠핑 스팟", desc: "별이 쏟아지는 강원도 고지대", tag: "NEW", views: "3.2k", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=500&auto=format&fit=crop" },
                  { title: "일본 교토 먹방 투어", desc: "현지인들만 줄 서는 숨은 맛집", tag: "BEST", views: "15k", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500&auto=format&fit=crop" }
                ].map((item, i) => (
                    <Card key={i} className="group relative overflow-hidden border-none shadow-md h-48 cursor-pointer">
                      <div className="absolute inset-0 z-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <div className="relative z-10 h-full p-4 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-primary/90 hover:bg-primary border-none text-[10px] font-bold uppercase tracking-wider">{item.tag}</Badge>
                          <span className="text-[10px] font-medium flex items-center gap-1 opacity-90 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full">
                        <Eye className="h-3 w-3" /> {item.views}
                      </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-0.5 group-hover:text-primary-foreground transition-colors line-clamp-1">{item.title}</h3>
                          <p className="text-[11px] opacity-80 line-clamp-1">{item.desc}</p>
                        </div>
                      </div>
                    </Card>
                ))}
              </div>
              {/* 💡 핵심: 2:1 비율의 메인 콘텐츠 영역 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* 레이아웃을 2열 그리드로 변경 : 좌측 피드 영역 ( lg:col-span-2 ) soqnfmf 1열에서 2열로 바꾼다. */}
                {/* 📸 좌측 (70%): 대형 이미지 카드 피드 */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="flex items-center justify-between px-1 mb-2">
                  <h2 className="text-2xl font-bold tracking-tight">최신 여행기 피드</h2>
                    <Badge variant="outline" className="text-muted-foreground font-normal">
                      총 {feedPosts?.length || 0} 개의 추천 게시글
                    </Badge>
                  </div>
                  {/* 피드 내부를 2열 그리드로 변경 (모바일 1열, 태블릿 이상 2열*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {feedPosts?.map((post) => (
                        <LargeImageCard
                            key={post.id}
                            post={post}
                            onClick={() => navigate(`/board/${post.id}`)}/>
                    ))}
                  </div>
                </div>
                {/* 우측 (30%): 컴팩트 리스트 */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold px-1 mb-4">Quick List</h2>
                  <Card className="border shadow-sm overflow-hidden bg-card">
                    {/* 만들어둔 listPosts 데이터를 여기에 꽂아줍니다 */}
                    <MiniBoardList
                        posts={listPosts}
                        onNavigate={(id) => navigate(`/board/${id}`)}
                    />
                  </Card>
                </div>
              </div>
              {/* 메인 컨텐츠가 끝나고 푸터 배치 (그리드 밖으로 빼서 꼬이지 않게 함) */}
              <div className="mt-16 pt-8 border-t">
                <SiteFooter />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
  )
}



//-------------------------------------------------------------------------------------------------------
// 비동기 통신(Asynchronous)의 3가지 상태 처리"**입니다. 서버에서 데이터를 가져오는 데는 시간이 걸리므로, 프론트엔드는 항상 1. 로딩 중(Loading) 2. 성공(Success) 3. 실패(Error)
//  이 세 가지 상황을 모두 화면에 그려주어야 합니다. 리액트 쿼리가 이 상태들을 아주 쉽게 관리해 줍니다.
//-------------------------------------------------------------------------------------------------------


// useQuery 훅을 사용해서 게시글 데이터를 가져옵니다.

// Spring의 Entity에 맞춰놓은 인터페이스하고 다른거 post. 으로 써버린 문제 발생 이 문제를 어떻게 해결할까?

/*
가짜 데이터 시절의 post.author를 스프링 엔티티에 맞춰 **post.writer**로 변경했습니다.
post.date를 **post.indate**로 변경하고, 2026-03-01T21:19:37처럼 길게 넘어오는 날짜를 예쁘게 보여주기 위해 .substring(0, 10)을 적용했습니다.
데이터 없음(Empty State) 처리 추가
게시글이 0개일 때 테이블이 빈칸으로 남지 않고, "게시글이 없습니다. 첫 글을 작성해보세요! " 라는 친절한 안내 문구가 나오도록 보완했습니다.
    디버깅 코드 추가 (console.log)

컴포넌트 상단에 useEffect를 사용해 서버에서 받아온 데이터를 브라우저 F12(개발자 도구) Console(콘솔) 탭에 출력하도록 했습니다. 이제 데이터가 이상할 때 콘솔 창을 열어보면 원인을 바로 파악할 수 있습니다!

*/
// 콘솔 창에 Each child in a list should have a unique "key" prop. 라고 떠 있는 건 반복문(.map())에 고유 번호표를 안 붙여서 리액트가 헷갈려 하는 겁니다.

// 중복 컴포넌트 정리: 불필요하게 남아있던 Table 코드를 완전히 삭제했습니다. 화면이 훨씬 가벼워지고 렌더링 속도도 빨라집니다.
// 완벽한 데이터 분할: 좌측에는 feedPosts (최신 2개), 우측에는 listPosts (나머지 8개)가 들어가게 연결했습니다. 이제 하나의 테이블 데이터를 가져와서 두 가지 멋진 방식으로 보여주게 됩니다!
// 레이아웃 버그 수정: 푸터(SiteFooter)가 그리드 안에 갇혀서 레이아웃이 깨지던 것을 메인 영역 가장 아래쪽으로 안전하게 빼두었습니다.