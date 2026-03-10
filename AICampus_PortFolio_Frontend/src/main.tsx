// 리액트 쿼리는 앱 전체에서 데이터를 공유하고 캐싱해야 하므로, 앱의 가장 바깥쪽(최상단) 파일인 main.tsx (또는 index.tsx)에 설정해야 합니다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react' // 자식 컴포넌트에 부가적 검사 경고
import { createRoot } from 'react-dom/client'
// 라우터 설정
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'


// 리액트 쿼리 클라이언트 인스턴스 생성 (데이터를 보관할 중앙 저장소 역할)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1,
    },
  },
})


// main.tsx는 BrowserRouter만 감싸고, 실제 라우트 설정은 App.tsx에서 한다.
// 아래에 있는 어떤 컴포넌트(Dashboard, BoardEdit 등)에서든 useQuery라는 훅을 통해 queryClient(중앙 저장소)에 접속할 수 있게 됩니다.
// 강제로 dark 클래스 추가
document.documentElement.classList.add('dark')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 3. Proveder로 앱 전체를 감싸서 어디서든 캐시 저장소에 접근. */}
    <QueryClientProvider client={queryClient}>
   <BrowserRouter>
    <App />
    
{/* 4. 개발자 도구 장착 */}
  <ReactQueryDevtools initialIsOpen={false} />
   </BrowserRouter> 
    </QueryClientProvider>
  </StrictMode>,
)