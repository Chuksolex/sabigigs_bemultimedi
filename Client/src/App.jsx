import React from "react";
import  ReactDOM from "react-dom";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import MyGigs from "./pages/myGigs/MyGigs";
import Gig from "./pages/gig/Gig";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Orders from "./pages/orders/Orders";
import Add from "./pages/add/Add";
import "./App.scss";
import Gigs from "./pages/gigs/Gigs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Seller from "./pages/becomeSeller/SellerSwitchPage";
import DigitalStoreGallery from "./pages/digitalstoregallery/digitalStoreGallery";
import Blog from "./pages/blog/Blog";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import SellerSwitchPage from "./pages/becomeSeller/SellerSwitchPage";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import CheckInbox from "./pages/checkInbox/CheckInbox";
//import UpdateGig from "./pages/updateGig/UpdateGig";




function App() {

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
            <QueryClientProvider client={queryClient}>
               <Navbar/>
               <Outlet/>
               <Footer/>    
            </QueryClientProvider>

           </div>

    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
      
      {path: "/",
      element: <Home/>
    },
      {
        path: "/myGigs",
        element: <MyGigs />
      },
      {
        path: "/gig/:id",
        element: <Gig />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/message/:id",
        element: <Message />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/gigs",
        element: <Gigs />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sellerswitchpage",
        element: <SellerSwitchPage />
      },
      {
        path: "/digitalresources",
        element: <DigitalStoreGallery />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      // {
      //   path: "/updategig",
      //   element: <UpdateGig />
      // },
      {
        path: "/verify-email",
        element: <VerifyEmail />
      },
      {
        path: "/checkinbox",
        element: <CheckInbox />
      },
    ]
  },
    
  
  ]);

  

  
  

  return (
    <div>
       <RouterProvider router={router} />

 
    </div>
  )
}

export default App
