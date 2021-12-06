import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Post from './components/Post';
import PostForm from './components/PostForm';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="post" element={<Post />} />
        <Route path="postform" element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;
//PstForm continue