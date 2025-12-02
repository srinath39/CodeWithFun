import './App.css'
import Navbar from './shared/components/Navigation/Navbar';
import AllProblems from './problems/pages/AllProblems';
import AuthPage from './users/pages/AuthPage';
import ProblemPage from './problems/pages/ProblemPage';
import SubmissionPage from './submissions/pages/SubmissionPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './shared/components/context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<AllProblems />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/problem/:problemId" element={<ProblemPage />} />
              <Route path="/submissions/:submissionType" element={<SubmissionPage />} />
              <Route path="/submissions/:submissionType/:problemId" element={<SubmissionPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
