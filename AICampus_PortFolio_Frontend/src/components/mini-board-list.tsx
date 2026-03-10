
// 1. 필요한 도구와 타입을 가져옵니다.
import type {BoardPost} from "@/api/boardApi"; //
//
import { Calendar, User } from "lucide-react";

// 2. 컴포넌트가 받을 '재료(Props)'를 정의합니다.
interface MiniBoardListProps {
    posts: BoardPost[] | undefined;
    onNavigate: (id: number) => void; //
}

export function MiniBoardList({ posts, onNavigate }: MiniBoardListProps) {
    return (
        <div className="flex flex-col w-full">
            {posts?.map((post) => (
                <div
                    key={post.id} //
                    className="p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-all group"
                    onClick={() => onNavigate(post.id)} //
                >
                    {/* 제목: line-clamp-1로 길면 생략 처리 */}
                    <p className="text-sm font-semibold line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </p>

                    {/* 하단 정보: 작성자와 날짜 */}
                    <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.writer || "익명"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.indate?.substring(5, 10) || "00-00"}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* 게시글이 없을 때의 처리 */}
            {(!posts || posts.length === 0) && (
                <div className="p-8 text-center text-xs text-muted-foreground">
                    게시글이 없습니다.
                </div>
            )}
        </div>
    );
}