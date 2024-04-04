import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './components/Home/Home';
import Details from './components/Signup/Details';
import UploadPic from './components/Signup/UploadPic';
import PostDetail from './components/PostDetail'; // Import the PostDetail component

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/details" element={<ProtectedRoute><Details /></ProtectedRoute>} />
              <Route path="/UploadPic" element={<ProtectedRoute><UploadPic /></ProtectedRoute>} />
              {/* Add the route for post detail */}
              <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
