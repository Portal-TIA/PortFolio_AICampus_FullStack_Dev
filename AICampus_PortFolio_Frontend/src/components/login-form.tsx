import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<"div">) {
  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="login">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="login" className="flex-1">로그인</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">회원가입</TabsTrigger>
              </TabsList>

              {/* 로그인 탭 */}
              <TabsContent value="login">
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">이메일</Label>
                    {/* 💡 화면 그리는 HTML 태그는 무조건 id 사용! */}
                    <Input id="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">비밀번호</Label>
                      <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                        비밀번호 찾기
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">로그인</Button>
                </form>
              </TabsContent>

              {/* 회원가입 탭 */}
              <TabsContent value="signup">
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input id="signup-email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <Input id="signup-password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">회원가입</Button>
                </form>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
  )
}