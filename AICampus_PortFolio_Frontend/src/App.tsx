// main.tsx는 BrowserRouter만 감싸고, 실제 라우트 설정은 App.tsx에서 한다.
// 라우트 설정
import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

import BoardDetailPage from '@/pages/BoardDetailPage'
import BoardWritePage from '@/pages/BoardWritePage'
import BoardEdit from "@/pages/BoardEdit.tsx";

// 리액트 규칙 : 컴포넌트 (페이지) 는 반드시 사용자에게 보여줄 화면 JSX 즉 <div> 같은 태그들을 return 으로 뱉어야 한다.

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/help" element={<div>도움말 페이지 준비중</div>} />

            <Route path="/board/write" element={<BoardWritePage />} />

            {/*  여기서 idx라는 이름표를 달아줬기 때문에 상세페이지에서 꺼내 쓸 수 있다! */}
            <Route path="/board/:idx" element={<BoardDetailPage />} />

            {/* edit 뒤에 슬래시(/)를 추가해서 정상적인 URL(예: /board/edit/1)이 되도록 수정했습니다! */}
            <Route path="/board/edit/:idx" element={<BoardEdit />} />
        </Routes>
    )
}

export default App



