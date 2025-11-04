import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostPage from "./pages/HostPage";
import StudentPage from "./pages/StudentPage";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostPage />} />
        <Route path="/session/:unique_id" element={<StudentPage />} />
      </Routes>
        <Toaster />
    </Router>
  );
}

export default App;