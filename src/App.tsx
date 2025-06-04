import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentLayout from './components/layouts/StudentLayout';
import AdminLayout from './components/layouts/AdminLayout';
import WordLearning from './pages/student/WordLearning';
import OnlineTest from './pages/student/OnlineTest';
import WordBattle from './pages/student/WordBattle';
import Leaderboard from './pages/student/Leaderboard';
import WordManagement from './pages/admin/WordManagement';

// 创建主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* 公共路由 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 学生路由 */}
            <Route path="/student" element={<StudentLayout />}>
              <Route path="learn" element={<WordLearning />} />
              <Route path="test" element={<OnlineTest />} />
              <Route path="battle" element={<WordBattle />} />
              <Route path="rank" element={<Leaderboard />} />
            </Route>

            {/* 管理员路由 */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="words" element={<WordManagement />} />
              <Route path="classes" element={<div>班级管理</div>} />
              <Route path="statistics" element={<div>数据统计</div>} />
            </Route>

            {/* 默认路由 */}
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
