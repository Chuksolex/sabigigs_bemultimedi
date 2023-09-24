import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PricingTab.scss";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Pay from "../../pages/pay/Pay";
import newRequest from "../../utils/newRequest.js";
import { setSelectedGig } from "../../reducers/orderSlice";


const PricingTab = ({ item, currencyCode, currentUser }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [priceOption, setPriceOption] = useState(item.price_basic);
  const [orderDetail, setOrderDetail] = useState(item.features_basic);
  const [shortDesc, setShortDesc] = useState(item.shortDesc_basic);
  const [gigPackage, setGigPackage]= useState("Basic Package");
  //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerId= item.userId;
  const buyerId= currentUser?._id;


  const handleTab1 = () => {
    setActiveTab("tab1");
    setPriceOption(item.price_basic);
    setOrderDetail(item.features_basic);
    setPackage("Basic Package");
    setShortDesc(item.shortDesc_basic)
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
    setPriceOption(item.price_standard);
    setOrderDetail(item.features_standard);
    setPackage("Standard Package");
    setShortDesc(item.shortDesc_standard)
  };

  const handleTab3 = () => {
    setActiveTab("tab3");
    setPriceOption(item.price_premium);
    setOrderDetail(item.features_premium);
    setPackage("Premium Package");
    setShortDesc(item.shortDesc_premium)
  };
  
    const handleProceed = (e) => {
      e.preventDefault();
      const order = {
        gigId: item._id,
        gigTitle: item.title,
        gigPackage,
        currencyCode,
        cover: item.cover,
        shortDesc: shortDesc,        
        amount: priceOption,
        orderDetails: orderDetail,
        sellerEmail: item.email,
        sellerphone: item.phone,
        totalStarts: item.totalStars,
        starNumber: item.startNumber,
        discountValidThrough: item.discountValidThrough,
        discountStartDate: item.discountStartDate,
        discountOffer: item.discountOffer,
        discountType: item.discountType,
        addons:item.addons
      };
      dispatch(setSelectedGig(order));
      navigate("/gigpackage")
    };

    const handleContactSeller = async () => {
      if (!currentUser) {
        localStorage.setItem("wantedGigInfo", JSON.stringify(item));        
  
        toast.info('To send a message you need to log in first! You will be redirected to the login page in 2 secs..', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // 2 seconds
        });
  
         // Redirect after a delay
       setTimeout(() => {
          navigate("/login"); // Replace with your login page route
        }, 300); // 1 second
        
        return;
      }else {    

        try {
         
          // Create a new conversation
          const response = await newRequest.post("/conversations", {
            to: sellerId,
                         
            fromEmail: currentUser.email,
          }); 
          const newConversationId = await response.data._id; // Assuming your response contains the new conversation's ID
    
          // Redirect the user to the new conversation page
          navigate(`/message/${newConversationId}`);
        } catch (error) {
          // Handle any errors that may occur during the process
          console.error('Error initiating conversation:', error);
        }
      };
    

      }
   
     
  
 








  const FirstTab = () => {
    const orderDetails = JSON.stringify(item.features_basic);
    return (
      <div className="FirstTab">
      
          <div className="price">
            <h3>Basic:</h3>
            <h2>{currencyCode} {item.price_basic}</h2>
        </div>
        
        <p className="p">{item.shortDesc_basic}</p>
        <div className="details">
            <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{item.deliveryTime_basic} Hours.</span>
            </div>
            <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{item.revisionNumber_basic} Revisions</span>
            </div>

        </div>
        <div className="features">
          {item.features_basic.map((feature_basic) =>(
         
           <div className="item" key={feature_basic}>
              <img src="/img/greencheck.png" alt="" />
              <span className="p">{feature_basic}</span>

            </div>

          ))}
        

        </div>
        {/* Replace this with proceed as it applies to all tabs*/}
        {/* <button type="button" className="link-button" onClick={(e) => handleBuyNowClick( priceOption, orderDetail, e)}> */}
        <button type="button" className="link-button"  onClick={(e) => handleProceed(e)}>Proceed</button>

        {/* <Link className="link-button"  onClick={handleProceed()}
          to="/gigpackage"
            
        >Proceed</Link> */}
         <Link className="link-button bg-warning text-dark" 
            onClick={handleContactSeller}       
        >Contact Seller</Link>
      
        
        
        
      </div>
    )
  };  

   const SecondTab = () => {
    const orderDetails = JSON.stringify(item.features_standard);
    return (
      <div className="SecondTab">
      
        {/* Second  tab content will go here */}
        <div className="price">
            <h3>Standard:</h3>
            <h2>{currencyCode} {item.price_standard}</h2>
        </div>
        <p className="p">{item.shortDesc_standard}</p>
        <div className="details">
            <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{item.deliveryTime_standard} Hours.</span>
            </div>
            <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{item.revisionNumber_standard} Revisions</span>
            </div>

        </div>
        <div className="features">
          {item.features_standard.map((feature_standard) =>(
         
           <div className="item" key={feature_standard}>
              <img src="/img/greencheck.png" alt="" />
              <span className="p">{feature_standard}</span>

            </div>

          ))}       

        </div>
        {/* <button type="button" className="link-button" onClick={(e) => handleBuyNowClick( priceOption, orderDetail, e)}>
        Buy Now
      </button>      */}
      <button type="button" className="link-button"  onClick={(e) => handleProceed(e)}>Proceed</button>

         <Link className="link-button bg-secondayr text-dark"
          onClick={handleContactSeller}
        
        >Contact Seller</Link>
      </div>
    )
  };

  const ThirdTab = () => {
    const orderDetails = JSON.stringify(item.features_premium);
    return (
      <div className="ThirdTab"> 

        <div className="price">
            <h3>Basic:</h3>
            <h2>{currencyCode} {item.price_premium}</h2>
        </div>
        <p className="p">{item.shortDesc_premium}</p>
        <div className="details">
            <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{item.deliveryTime_premium} Hours.</span>
            </div>
            <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{item.revisionNumber_premium} Revisions</span>
            </div>

        </div>
        <div className="features">
          {item.features_premium.map((feature_premium) =>(
         
           <div className="item" key={feature_premium}>
              <img src="/img/greencheck.png" alt="" />
              <span className="p">{feature_premium}</span>

            </div>

          ))}
        

        </div>
        {/* <button type="button" className="link-button" onClick={(e) => handleBuyNowClick( priceOption, orderDetail, e)}>
        Buy Now
      </button>        */}
      <button type="button" className="link-button"  onClick={(e) => handleProceed(e)}>Proceed</button>
         <Link className="link-button bg-warning text-dark"  onClick={handleContactSeller}>Contact Seller</Link>
        
      </div>
    )
  };



 
  return (

  <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li className={activeTab === "tab1"? "active" : "" } 
          onClick={handleTab1}> Basic Package</li>
        <li className={activeTab ==="tab2"? "active": ""}
          onClick={handleTab2}>Standard Package</li>
        <li className={activeTab ==="tab3"? "active": ""}
          onClick={handleTab3}> Premium Gig</li>
      </ul>
      <div className="outlet">
        {/* content will be shown here */}
        {activeTab === "tab1" && <FirstTab />}
            {activeTab === "tab2" && <SecondTab/>}
            {activeTab === "tab3" && <ThirdTab />}
     </div>
     {error && (
        <div>
          <p>An error occurred: {error.message}</p>
        </div>
      )}
      {loading?   (<div>
          <p>Creating Order....</p>
        </div>) : ""}
  </div>
  )
}

export default PricingTab;

