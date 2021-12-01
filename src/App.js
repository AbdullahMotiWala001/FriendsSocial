import './App.css';
import {
  Routes,
  Route
}  from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
    </div>
  );
}

export default App;
