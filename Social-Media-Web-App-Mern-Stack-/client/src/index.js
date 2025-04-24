import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/ReduxStore.js';
import { BrowserRouter, Routes, Route,createBrowserRouter,Outlet } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components copy/Home";
import Dashboard from "./components copy/Dashboard/Dashboard";
import ChatState from "./context/appState";
const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/chat",
    element: (
      <ChatState>
        <ChakraProvider>
          <App token={token} />
          <Outlet />
        </ChakraProvider>
      </ChatState>
    ),
    children: [
      {
        path: "/chat/home",
        element: <Home />,
      },
      {
        path: "/chat/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <RouterProvider  /> */}
    <Provider store={store}  >

      <BrowserRouter>
        <Routes>
          <Route path='*' element= {<App />} />
        </Routes>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
  
);


// If you want to start measuring performance in your app, pass a functionj
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
