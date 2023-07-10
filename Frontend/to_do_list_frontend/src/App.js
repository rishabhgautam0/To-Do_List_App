import { Routes, Route } from "react-router-dom";
import { AuthGuard } from "./guards/auth.guard";
import { Role } from "./models/role";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Background from "./components/Background";


function App() {
  return (
    <div>
      <Background />
      <Routes>
        <Route path="/" element={< Home />}></Route>
        <Route path="/home" element={< Home />}></Route>
        <Route
          path="/profile/*"
          element={
            <AuthGuard roles={[Role.USER, Role.ADMIN]}>
              <Profile />
            </AuthGuard>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
