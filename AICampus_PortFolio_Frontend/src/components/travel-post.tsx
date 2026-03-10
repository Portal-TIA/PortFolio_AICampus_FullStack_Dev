import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react"

interface TravelPostProps {
  user: {
    name: string
    handle: string
    avatar: string
  }
  location: string
  image: string
  content: string
  likes: string
  comments: string
  tags: string[]
}

export function TravelPost({ user, location, image, content, likes, comments, tags }: TravelPostProps) {
  return (
    <Card className="mb-6 overflow-hidden border-none shadow-md">
      <CardHeader className="flex flex-row items-center space-y-0 p-4">
        <Avatar className="h-10 w-10 border-2 border-primary/10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex flex-col">
          <span className="text-sm font-semibold leading-none">{user.name}</span>
          <span className="text-xs text-muted-foreground">@{user.handle}</span>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="sr-only">Location</span>
        </Button>
      </CardHeader>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={location}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md border-none text-white">
          {location}
        </Badge>
      </div>
      <CardContent className="p-4">
        <p className="text-sm leading-relaxed mb-3">{content}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-primary hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground hover:text-red-500">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground hover:text-blue-500">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
