import { Routes, Route } from "react-router-dom";
import { AuthGuard } from "./guards/auth.guard";
import { Role } from "./models/role";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Background from "./components/Background";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddList from "./pages/AddList";


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
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/list/add-list" element={<AddList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
