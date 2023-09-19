
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './store.js';
import { fetchAndUpdateGigsData, checkAndFetchIfExpired } from './reducers/actions.js';
import { updateGigsData } from "./reducers/gigsSlice.js";   // Import your action from the gigsSlice
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
import SingleOrder from './pages/orders/SingleOrder.jsx';
import Add from "./pages/add/Add";
import "./App.scss";
import Gigs from "./pages/gigs/Gigs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Seller from "./pages/becomeSeller/SellerSwitchPage";
import DigitalStoreGallery from "./pages/digitalstoregallery/digitalStoreGallery";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import SellerSwitchPage from "./pages/becomeSeller/SellerSwitchPage";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import CheckInbox from "./pages/checkInbox/CheckInbox";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import BlogList from "./pages/blog/BlogList";
import BlogPostDetails from "./pages/blogPostDetails/BlogPostDetails";
import BlogForm from "./pages/blogForm/BlogForm";
import newRequest from "./utils/newRequest";
import MyCart from "./pages/myCart/MyCart.jsx";
import GigPackage from "./pages/gigPackage/GigPackage";
import NotFound from './pages/notFound/NotFound.jsx';
//import UpdateGig from "./pages/updateGig/UpdateGig";




function App() {
  const dispatch = useDispatch();
 
  const gigsTimestamp = useSelector(state => state.gigsSlice.timestamp );
  console.log("timestamp at app:",gigsTimestamp);
 
  const selectedCurrency = useSelector(state => state.currencySlice.selectedCurrency); // Replace 'currency' with your actual state slice
  console.log("currency showing at app:", selectedCurrency);
  
 useEffect(() => {
    dispatch(checkAndFetchIfExpired()); // Fetch and update gigs data with expiration logic
  }, [dispatch, gigsTimestamp]); // Make sure to include dispatch as a dependency if you're using ESLint's exhaustive-deps rule

  useEffect(() => {
    // Fetch data when selected currency changes
    dispatch(fetchAndUpdateGigsData());
  
  }, [dispatch, selectedCurrency]);

// const { isLoading, error, data, refetch } = useQuery({
//   queryKey: ['gigs'],
//   queryFn: () =>
//     newRequest
//       .get(`/gigs`)
//       .then((res) => {
//         return res.data;
//       }),
// });
// console.log("data from app:", data);
// useEffect(() => {
//   // Fetch and set the gigs data in the Redux store
//   dispatch(setGigs(data));

//   // The rest of your useEffect code...
// }, []);


  //second
  const queryClient = new QueryClient();

  function fetchSessionID() {
    // Check if the sessionID already exists in localStorage
    const existingSessionID = localStorage.getItem('sessionID');
  
    if (existingSessionID) {
      // If an existing sessionID is found, you can decide whether to use it or refresh it
       // Set up a timer to refresh the session ID every 15 minutes (900000 milliseconds)
    const refreshInterval = setInterval(() => {
      fetchSessionID();
    }, 900000);

    // Clean up the timer on component unmount
    return () => {
      clearInterval(refreshInterval);
    };
  
      console.log('Session ID already exists:', existingSessionID);
    } else {
      // If there is no existing sessionID, fetch a new one from the server
      newRequest
        .get('/generatesessionid') // Assuming this is the route to generate the session ID on the server
        .then(response => {
          const sessionID = response.data.sessionID;
          localStorage.setItem('sessionID', sessionID);
        })
        .catch(error => {
          console.error('Error fetching session ID:', error);
        });
    }
  }

  
    useEffect(() => {
      fetchSessionID(); // Call fetchSessionID when the component mounts
    }, []); // The empty dependency array ensures it runs only once
  

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
        path: "/singleorder/:id",
        element: <SingleOrder />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/add/:id",
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
        element: <BlogList />
      },
      {
        path: "/blog/:id",
        element: <BlogPostDetails />
      },
      {
        path: "/create-blog/",
        element: <BlogForm />
      },
        {
        path: "/edit-blog/:id",
        element: <BlogForm />
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
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:resetToken",
        element: <ResetPassword />
      },
      {
        path: "/pay",
        element: <Pay />
      }, 
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/message",
        element: <Message />
      },
      {
        path: "/mycart",
        element: <MyCart />
      },
      {
        path: "/gigpackage",
        element: <GigPackage />
      },
      {
        path: "*",
        element: <NotFound />
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
