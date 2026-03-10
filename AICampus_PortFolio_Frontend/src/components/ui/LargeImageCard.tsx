import type { BoardPost } from "@/api/boardApi";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, User, Calendar } from "lucide-react";

interface LargeImageCardProps {
  post: BoardPost;
  onClick: () => void;
}

export function LargeImageCard({ post, onClick }: LargeImageCardProps) {
  // 날짜 예쁘게 자르기
  const formattedDate = post.indate ? String(post.indate).substring(0, 10) : "날짜 없음";

  // 💡 핵심 1: 글 번호(idx 또는 id)를 활용해 매번 다른 고화질 사진이 나오도록 세팅합니다.
  // (seed 뒤에 번호가 붙으면 해당 번호에 맞는 고정된 랜덤 이미지를 줍니다)
  const imageId = post.idx || post.id || Math.floor(Math.random() * 100);
  const fallbackImage = `https://picsum.photos/seed/${imageId}/800/450`;

  // 💡 핵심 2: DB 값이 아예 없거나, 'none'이라는 글자가 들어있으면 기본 이미지(fallbackImage)를 씁니다.
  const displayImage = (post.image && post.image !== "none") ? post.image : fallbackImage;

  return (
      <Card
          className="overflow-hidden group cursor-pointer border-none shadow-lg bg-card transition-all hover:shadow-primary/10 mb-8"
          onClick={onClick}
      >
        {/* 📸 이미지 영역 */}
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
              src={displayImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          />
          {/* 카테고리 뱃지 */}
          <Badge className="absolute top-4 left-4 bg-black/50 text-white backdrop-blur-md border-none text-[10px] uppercase tracking-wider">
            {post.category || "HOT 트래블"}
          </Badge>
        </div>

        {/* 📝 텍스트 영역: 제목과 작성자 등 */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h3>

          {/* 💡 핵심 3: 내용을 2줄에서 3줄(line-clamp-3)로 늘려 화면을 더 꽉 차 보이게 만듭니다. */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
            {post.content}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{post.writer || "익명"}</span>
            </span>
              <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
            </span>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            <Eye className="h-3 w-3" /> {post.views || 0}
          </span>
          </div>
        </div>
      </Card>
  );
}