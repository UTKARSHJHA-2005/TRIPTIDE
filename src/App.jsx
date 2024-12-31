import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Createtrip from './pages/Createtrip';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './db';
import { Userstore } from './Userstore';
import View from './pages/view/[tripId]/View';
import Profile from './pages/Profile';
import Info from './pages/view/[tripId]/Info';
const auth = getAuth(app);

function App() {
  const { currentUser, isLoading, fetchUserInfo } = Userstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserInfo(user.uid);
      } else {
        await fetchUserInfo(null);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => unsubscribe();
  }, [fetchUserInfo]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (<Router>
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={currentUser ? <Createtrip /> : <Navigate to="/" />}
          />
          <Route
            path="/view/:tripId"
            element={currentUser ? <View /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={currentUser ? <Profile /> : <Navigate to="/" />}/>
        </Routes>
      </Router>)}
    </div>
  );
}

export default App;
