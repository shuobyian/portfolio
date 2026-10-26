import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | 프론트엔드 개발자",
    template: "%s | Portfolio",
  },
  description: "프론트엔드 개발자 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 모바일 탭 바 밑으로 Tab 포커스가 숨지 않게, 포커스를 따라 스크롤할 때 아래 탭 바만큼을 가려진 곳으로 친다
    <html lang="ko" suppressHydrationWarning className="scroll-pb-24 md:scroll-pb-0">
      <head>
        {/* 한글 본문용 Pretendard — 사용한 글자 범위만 내려받는 dynamic subset */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {/* 모바일에서는 화면 아래 떠 있는 탭 바(높이 64px + 띄운 12px)에 푸터가 가리지 않게 여백을 둔다 */}
          <div className="flex min-h-screen flex-col pb-24 md:pb-0">
            <Nav />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
