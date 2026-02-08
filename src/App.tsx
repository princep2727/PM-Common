import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import {
  Dashboard,
  News,
  Tasks,
  Quiz,
  Progress,
  Career,
  Resources,
  Timer,
  Notes,
  Login,
  Admin,
  Community,
  Interview,
  About
} from './pages';

import { usePageTracking } from './hooks/useAnalytics';

function App() {
  usePageTracking();
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="news" element={<News />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="progress" element={<Progress />} />
              <Route path="career" element={<Career />} />
              <Route path="resources" element={<Resources />} />
              <Route path="community" element={<Community />} />
              <Route path="interview" element={<Interview />} />
              <Route path="about" element={<About />} />
              <Route path="timer" element={<Timer />} />
              <Route path="notes" element={<Notes />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
