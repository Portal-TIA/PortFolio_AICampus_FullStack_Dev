import { Globe, Github, Instagram } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
                {/* 왼쪽: 저작권 정보 */}
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2026 TravelSNS. All rights reserved.
                    <span className="hidden md:inline"> | </span>
                    <br className="md:hidden" />
                    Designed by <span className="font-medium underline underline-offset-4">Guest User</span>.
                </p>

                {/* 오른쪽: 약관 및 소셜 링크 */}
                <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">이용약관</a>
                    <a href="#" className="hover:text-foreground transition-colors">개인정보처리방침</a>
                    <div className="flex items-center gap-3 ml-2 border-l pl-5">
                        <Globe className="h-4 w-4 cursor-pointer hover:text-foreground" />
                        <Github className="h-4 w-4 cursor-pointer hover:text-foreground" />
                        <Instagram className="h-4 w-4 cursor-pointer hover:text-foreground" />
                    </div>
                </div>
            </div>
        </footer>
    );
}