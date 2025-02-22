import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { useState } from "react";
import { SocketProvider } from "./contexts/SocketContext";
import ChatPage from "./components/ChatPage";

interface UsernameRequiredProps {
  username: string;
  children: React.ReactNode;
}

const RequireUsername = ({ username, children }: UsernameRequiredProps) => {
  if (!username || username === "") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [username, setUsername] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage setUsername={setUsername} />} />
        <Route path="/chat" element={
          <RequireUsername username={username}>
            {
              username && username.length>0 && <SocketProvider>
                <ChatPage username={username} />
              </SocketProvider>
            }
          </RequireUsername>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;