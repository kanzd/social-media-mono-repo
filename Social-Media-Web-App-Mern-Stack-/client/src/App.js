import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import { Routes, Route, Navigate,Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ChatHome from "./components copy/Home";
import Dashboard from "./components copy/Dashboard/Dashboard";
import ChatState from "./context/appState";
import { ChakraProvider } from "@chakra-ui/react";
import ChatApp from './ChatApp'
import Navbar from './components copy/Navbar/Navbar'; // Adjust the path if necessary

const token = localStorage.getItem("token");
function App() {

  const user = useSelector((state) => state.authReducer.authData);

  return (
    <ChatState>
      <ChakraProvider>
    <div className="App">
      <Toaster />
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>


      <Routes>
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />
        <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth />} />
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />} />
        <Route path='/chat' element={user ?(
        <>
        
          <ChatApp token={token} />
          {/* <Outlet /> */}
          </>
 
   ) : <Navigate to='../auth' />} />
        <Route path='/chat/home' element={user ?<>
        <Navbar />
        <ChatHome /></> : <Navigate to='../auth' />} />
        <Route path='/chat/dashboard' element={user ? <> <Navbar /><Dashboard /></> : <Navigate to='../auth' />} />
        
      </Routes>
     
    </div>
    </ChakraProvider>
    </ChatState>
  );
}

export default App;
