import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/AuthNew/LandingPage";
import ChatPage from "./components/Chat/ChatPage";
import { SocketProvider } from "./contexts/SocketContext";

interface UsernameRequiredProps {
  // username: string;
  children: React.ReactNode;
}

const RequireToken = ({ children }: UsernameRequiredProps) => {
  const token = localStorage.getItem('token')
  if (!token || token === "") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={
          <RequireToken>
            <SocketProvider>
              <ChatPage />
            </SocketProvider>
          </RequireToken>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;