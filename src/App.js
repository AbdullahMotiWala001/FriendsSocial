import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Home from './components/Home'
import Post from './components/Post';
import PostForm from './components/PostForm';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="post" element={<Post />} />
        <Route path="postform" element={<PostForm />} />
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
      {/* <ProfilePage /> */}
    </div>
  );
}

export default App;
