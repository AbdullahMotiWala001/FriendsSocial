import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
