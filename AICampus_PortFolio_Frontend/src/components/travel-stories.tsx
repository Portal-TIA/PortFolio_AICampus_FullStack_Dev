import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stories = [
  { idx: 1, name: "민수", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", active: true },
  { idx: 2, name: "지수", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", active: true },
  { idx: 3, name: "유진", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", active: true },
  { idx: 4, name: "준호", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", active: false },
  { idx: 5, name: "소영", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", active: false },
  { idx: 6, name: "태오", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", active: false },
]

export function TravelStories() {
  return (
    <div className="flex items-center gap-4 py-4 overflow-x-auto no-scrollbar">
      <div className="flex flex-col items-center gap-1 min-w-[70px]">
        <div className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <span className="text-2xl text-muted-foreground">+</span>
        </div>
        <span className="text-[10px] font-medium">나의 스토리</span>
      </div>
      {stories.map((story) => (
        <div key={story.idx} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer group">
          <div className={`h-16 w-16 rounded-full p-[2px] ${story.active ? 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600' : 'bg-muted'}`}>
            <div className="h-full w-full rounded-full border-2 border-background overflow-hidden bg-background">
              <Avatar className="h-full w-full">
                <AvatarImage src={story.avatar} alt={story.name} />
                <AvatarFallback>{story.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-[10px] font-medium group-hover:text-primary transition-colors">{story.name}</span>
        </div>
      ))}
    </div>
  )
}
