import './App.css'
import Navbar from './shared/components/Navigation/Navbar';
import DSAProblems from './problems/pages/AllProblems';
import AuthPage from './users/pages/AuthPage';
import ProblemPage from './problems/pages/ProblemPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<DSAProblems />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/problem/:problemId" element={<ProblemPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
