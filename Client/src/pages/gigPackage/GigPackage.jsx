import React, { useState, useReducer, useEffect} from 'react';
import { addToCart } from '../../reducers/cartSlice';
import { Container, Row, Col, Button, Image, Card, Modal, Form, InputGroup, Tooltip, FormControl } from 'react-bootstrap';
import { Cart4, Cart3, Trash, Heart, Plus, Dash } from 'react-bootstrap-icons';
import "./GigPackage.css";
import { useSelector, useDispatch } from 'react-redux';
import * as ReactBootStrap from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const GigPackage = () => {
   
    const selectedGig = useSelector(state => state.orderSlice.selectedGig);

    const cart = useSelector(state => state.cartSlice.cart);
   console.log("Selected gig at gigpackage:", selectedGig);
   console.log("updated cart:", cart);
   const [selectedAddonIndices, setSelectedAddonIndices] = useState([]);
   const [selectedAddons, setSelectedAddons] = useState([]);
   const [totalPrice, setTotalPrice] = useState(selectedGig.price);
   const [totalAddonsPrice, setTotalAddonsPrice] = useState(0);
   const navigate = useNavigate();
   const currentUser = localStorage.getItem("currentUser");
   console.log("Current user at gigPackage:", currentUser);
   const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


console.log("selected indeces:", selectedAddonIndices);

   const dispatch = useDispatch();
    
   
  const handleAddonSelection = (index) => {
    if (selectedAddonIndices.includes(index)) {
      setSelectedAddonIndices((prevSelectedIndices) =>
        prevSelectedIndices.filter((selectedIndex) => selectedIndex !== index)
      );
    } else {
      setSelectedAddonIndices((prevSelectedIndices) => [...prevSelectedIndices, index]);
    }
  };

  useEffect(() => {
    
        const basePrice = parseFloat(selectedGig.amount); // Parse the base price as a number
        
        const addonsPrice = selectedAddonIndices.reduce((total, addonIndex) => {
          const addonPrice = parseFloat(selectedGig.addons[addonIndex].price); // Parse addon price as a number
          const selectedAddon = selectedGig.addons[addonIndex];
          setSelectedAddons(selectedAddon);
          return total + addonPrice;
        }, 0);
         console.log("addons price:", addonsPrice);
         console.log("base price:", basePrice);
        setTotalPrice((basePrice + addonsPrice).toFixed(2));
      

    
  }, [selectedAddonIndices, selectedGig]);

  const itemInCart = {
    id: selectedGig.gigId,
    gigTitle: selectedGig.gigTitle,
    gigPackage:selectedGig.gigPackage,
    currencyCode:selectedGig.currencyCode,
    cover: selectedGig.cover,
    shortDesc: selectedGig.shortDesc,        
    baseAmount: selectedGig.amount,
    orderDetails: selectedGig.orderDetails,
    sellerEmail: selectedGig.email,    
    discountValidThrough: selectedGig.discountValidThrough,
    discountStartDate: selectedGig.discountStartDate,
    discountOffer: selectedGig.discountOffer,
    discountType: selectedGig.discountType,
    buyerName: currentUser?.name,
    buyerEmail: currentUser?.email,
    sellerPhone: selectedGig.phone,
    buyerPhone: currentUser?.phone,
    selectedAddonIndices,
    selectedAddons,
    totalAddonsPrice,
    
    totalPrice,

  };

  const handleAddToCart = () => {    
   
 dispatch(addToCart(itemInCart)); // Pass the selectedk gig as an argument to addToCart action
 toast.success('Item added to cart!', {
    position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
  });
};
  
//careful here: I have to modify this handleBuyNowClick and use Proceed instead> Proceed leads to GigPackage Page
const goToCheckout = () => {
    //e.preventDefault();
    if (!currentUser) {
      localStorage.setItem("intendedOrder", itemInCart);
      dispatch(addToCart(itemInCart));

      toast.info('Login details are needed to process orders! You will be redirected to the login page in 3 seconds..', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 9000, // 2 seconds
      });

       // Redirect after a delay
     setTimeout(() => {
        navigate("/login"); // Replace with your login page route
      }, 9100); // 1 second
      
      return;
    } else {
        dispatch(addToCart(itemInCart));
        navigate("/pay")
    }

    //setLoading(true);
    //setError(null);

 
   
};

  

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 fl-lft m_bot2 m_top2 chk-sty mx-wdt div-col-md-8">
                    <h2 className='fs-2 mb-3'><b>Customize Your Package</b></h2>
                    <div className="col-md-12 col-12 col-mgr pad0 m_top2">
                        <div className="row">
                            <div className="col-12 col-md-4 col-sm-4 fl-lft pad0 mx-wdt">
                                <div className="imgmaxsize6 ">
                                    <Image src={selectedGig.cover} className="chk-img img_fit w-100" />
                                </div>
                                <div ></div>
                            </div>
                            <div className="col-12 col-md-8 col-sm-8 fl-lft pad0 pro-review-div pro-review-div-res">
                                <p> {selectedGig.gigTitle}</p>
                              
                                {!isNaN(selectedGig.totalStars / selectedGig.starNumber) && (
                                    <p className="stars fs-2">
                                    {Array(Math.round(selectedGig.totalStars / selectedGig.starNumber)).fill().map((item, i) =>(
                                                        <img src="/img/star.png" key={i} alt="" />

                                    ))}
                                    
                                    <span>{Math.round(selectedGig.totalStars / selectedGig.starNumber)}</span>

                                    </p> )}


                                <button type="button" className="btn btn-primary btn-lg">{selectedGig.shortDesc}</button>
                            </div>
                        </div>

                    </div><div ></div>


                    <div className="m_top2 m_bot2">
                        <h3 className="fw-500 fs-1 mt-4 mb-4">{selectedGig.gigPackage}</h3>
                        {selectedGig.orderDetails.map((feature, index) => 
                            <span key={feature.index} >{feature}, </span>

                        )}
                        
                        <p>
                            <i className="far fa-clock tick-col theme_color_txt" aria-hidden="true"></i>
                            {selectedGig.deliveryTime}

                        </p>

                    </div>

                 
                    <div ></div>
                    {/* Accordian-part  */}
                    
                    <div ></div>

                    <div className="mt-2">
                        <h3 className="fw-500">Addons</h3>
                    </div>
                    {selectedGig.addons.map((addon, index)=> (

                
                    <div key={addon.index} className="row border res-m0 mt-5 mb-3 pb-5 pt-5 lh-2">
                        <div className="col-md-1 col-sm-1 col-1">
                            <label className="containerr">
                                <input type="checkbox" className="checkbox1" onClick={() => handleAddonSelection(index)} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className=" col-md-9 col-sm-9 col-9 ">
                            <div>
                                <h4 className="fw-500">{addon.title}</h4>
                            </div>
                            <div className="div-rev-des">
                                <p>
                                    {addon.shortDescesc}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-3 div-addons-amt theme_color_txt fw-500">
                            {selectedGig.currencyCode +" "+ addon.price}
                        </div>
                    </div>
                    ))
                    }
                    
                </div>


                {/* RIGHT SIDE or Display-Price*/}           

                <div className="col-md-4 fl-lft mb-4 mt-4 chk-sty mx-wdt div-col-md-4 res-ml-15 ">
                    <div className="row m0 border pb-3 mt-3 lh-6 mb-4">
                        <div className="col-12 col-md-12 m_top1 chk-bor b-r-5">
                            <h3 className="mt-1 fw-500 fs-2">Summary </h3>
                            <Row className="row m0">
                                <Col className=" col-9  fl-lft ">
                                    <p className='fs-3'> Subtotal  </p>
                                </Col>
                                <Col className=" col-3 ">
                                    <p className=" fs-3 "><span className="total_amt">{selectedGig.currencyCode} {totalPrice}</span></p>
                                </Col>
                            </Row>                       

                            <div className="chk-bot m_bot2"></div>
                            <div className="row m0">
                                <div className="col-9  ">
                                    <h4 className="tol-fnt fw-500 fs-2"> Total </h4>
                                </div>
                                <div className="col-3">
                                    <h4 className="tol-fnt fw-500 text-left fs-3"><span className="total_amt">{selectedGig.currencyCode} {totalPrice}</span></h4>
                                </div></div><div ></div>

                       

                            <div ></div>

                            <div className="m_bot1 m_top1">

                            </div>

                            <div className="mt-4 mb-4 text-center ">
                            <div className="mt-4 mb-4 text-center">
                                <button className="btn btn-lg btn-primary w-100 d-block mt-4  p-2" onClick={goToCheckout}>Order Now</button>
                            </div>
                            <div className="mt-4 mb-4 text-center ">
                                <button className="btn btn-lg btn-secondary w-100 d-block mt-4 p-2" onClick={handleAddToCart}>Add To Cart</button>
                             </div>
                                <p className="chk-cen m_bot1">You won't be charged yet</p>
                            </div>


                        </div>
                    </div>
                    <div ></div>

                    <div className="col-12 col-md-12 mt-4 text-center p-4">
                        <img src="https://digihub.marketpresso.com/images/template/1/payment.png" />
                        <p className="chk-cen"> <span className="str-col theme_color_txt"> <i className="fa fa-lock theme_color_txt" aria-hidden="true"></i> SSL </span> SECURED PAYMENT </p>
                        <p className="chk-smltxt">Your information is protected by 256-bit SSL encryption</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GigPackage