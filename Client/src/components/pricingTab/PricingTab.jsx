import React, {useState} from "react";
import "./PricingTab.scss";
import newRequest from "../../utils/newRequest.js";
import { Link } from "react-router-dom";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useParams } from "react-router-dom";
  import Pay from "../../pages/pay/Pay";

 


 const PricingTab =  ({item}) => {

  const FirstTab = () => {
    const orderDetails = JSON.stringify(item.features_basic);
    return (
      <div className="FirstTab">
      
          <div className="price">
            <h3>Basic:</h3>
            <h2>${item.price_basic}</h2>
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
        <Link className="link-button" to={`/pay?gigId=${item._id}&amount=${item.price_basic}&title=${item.title}&img=${item.cover}&buyerId=${currentUser._id}&sellerId=${item.userId}&orderDetails=${encodeURIComponent(orderDetails)}`}>
          Buy Now
        </Link>
        
        
        
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
            <h2>$ {item.price_standard}</h2>
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
        <Link className="link-button" to={`/pay?gigId=${item._id}&amount=${item.price_standard}&title=${item.title}&img=${item.cover}&buyerId=${currentUser._id}&sellerId=${item.userId}&orderDetails=${encodeURIComponent(orderDetails)}`}>
          Buy Now
        </Link>      
      </div>
    )
  };

  const ThirdTab = () => {
    const orderDetails = JSON.stringify(item.features_premium);
    return (
      <div className="ThirdTab"> 

        <div className="price">
            <h3>Basic:</h3>
            <h2>$ {item.price_premium}</h2>
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
        <Link className="link-button" to={`/pay?gigId=${item._id}&amount=${item.price_premium}&title=${item.title}&img=${item.cover}&buyerId=${currentUser._id}&sellerId=${item.userId}&orderDetails=${encodeURIComponent(orderDetails)}`}>
          Buy Now
        </Link>
        
      </div>
    )
  };



  const [activeTab, setActiveTab] = useState("tab1"); 
  const [priceOption, setPriceOption] = useState('price_basic');
  const [orderDetails, setOrderDetails] = useState(['features_basic']);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
  const {id} = useParams();
 

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
    setPriceOption('price_basic');
    setOrderDetails(['feature_basic']);

  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
    setPriceOption('price_standard');
    setOrderDetails(['feature_standard']);
   

  };
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("tab3"); 
    setPriceOption('price_premium');
    setOrderDetails(['feature_premium']);  

  };

  let price;
  if (priceOption === "price_basic") {
    price = item.price_basic;
  } else if (priceOption === "price_standard") {
    price = item.price_standard;
  } else if (priceOption === "price_premium") {
    price = item.price_premium;
  } else {
    throw new Error("Invalid price option.");
  }



 
  // const handleOrderCreate = async () => {    
  //   try {           
               
  //             const order = {                
                
  //               price: price,
  //               sellerId:item.userId,
  //               buyerId: currentUser._id,             

  //             };

  //             const response = await newRequest.post("/orders", order);

  //             if (response.status === 200) {
  //               const data = response.data;
  //               console.log(data.message);
  //               toast.success("Order created successfully.");

  //             } else {
  //               // Handle error if order creation failed
  //               const error = response.data.error;
  //               console.log(error);
  //               toast.error(error);
            
                
  //             }
           
  //        } catch (error) {
  //             // Handle error if there was an exception or network error
  //             console.error("Error creating order:", error);
  //             toast.error(error.message);
             
  //           }
   // };  
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
  </div>
  )
}

export default PricingTab;

