import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const destinations = [
  { name: "제주도, 대한민국", posts: "2.4k", trend: "+15%" },
  { name: "교토, 일본", posts: "1.8k", trend: "+8%" },
  { name: "발리, 인도네시아", posts: "3.2k", trend: "+22%" },
  { name: "파리, 프랑스", posts: "5.6k", trend: "+5%" },
  { name: "치앙마이, 태국", posts: "1.2k", trend: "+12%" },
]

export function TrendingDestinations() {
  return (
    <Card className="border-none shadow-sm bg-muted/30">
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          지금 뜨는 여행지
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-4">
        {destinations.map((dest, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer">
            <div className="flex flex-col">
              <span className="text-sm font-medium group-hover:text-primary transition-colors">{dest.name}</span>
              <span className="text-xs text-muted-foreground">{dest.posts} posts this week</span>
            </div>
            <Badge variant="secondary" className="text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {dest.trend}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
