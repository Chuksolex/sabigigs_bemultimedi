

import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import "./Pay.css";
import {  incrementQuantity, decrementQuantity, removeItem } from '../../reducers/cartSlice.js';
import { Container, Row, Col, Button, Image, Card, Modal, Form, InputGroup, Tooltip, FormControl} from 'react-bootstrap';
import { Cart4, Cart3, Trash, Heart, Plus, Dash, CreditCard} from 'react-bootstrap-icons';
 import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { padding } from '@mui/system';
import * as ReactBootStrap from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pay = () => {
 
  const dispatch = useDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
   const cartItems = useSelector((state) => state.cartSlice.cart); // Replace "cart" with your actual reducer slice name
   const totalPrice = useSelector((state) => state.cartSlice.totalPrice);
  console.log("cart in pay page and totalPrice:", cartItems, totalPrice);

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;   
  
    cartItems.forEach((item) => {
      const discountOffer = item.discountOffer;
      const discountStartDate = item.discountStartDate;
      const discountValidThrough = item.discountValidThrough;
  
      const currentDate = new Date();
      const startDate = new Date(discountStartDate);
      const endDate = new Date(discountValidThrough);
      console.log("enddate", endDate, "startdate", startDate);
  
      if (currentDate >= startDate && currentDate <= endDate) {
        // Discount is valid, calculate and accumulate 
        const discountAmount = (discountOffer / 100) * parseFloat(item.baseAmount);
        console.log("discount amount at calculate", discountAmount, );
        totalDiscount += discountAmount;
      }
    });
  
    return totalDiscount;
  };
  
  

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    const totalDiscount = calculateTotalDiscount();
    console.log("totalDiscount calculated", totalDiscount);

  
    cartItems.forEach(item => {
      totalQuantity += item.quantity; // Accumulate each item's quantity
      console.log("totalQuantity in pay page", totalQuantity);

    
  
      totalPrice += parseFloat(item.totalPrice); // Accumulate the total price for each item
    });
  
    return { totalPrice, totalQuantity, totalDiscount };
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handlePayment = () =>{
    if (!selectedPaymentMethod) {
      // Focus on the customRadio element
      const customRadio = document.getElementById('customRadio');
      if (customRadio) {
        customRadio.focus();
      }
      return; // Exit the function without proceeding to payment
    }
    setLoading(true)
    const requestData = {
      cartItems: cartItems,
      totalQuantity: getTotal().totalQuantity,
      overallTotalPrice:  Math.floor(getTotal().totalPrice - getTotal().totalDiscount),
      currentUser
    };
  
    newRequest
  .post('/orders/create-payment-intent', requestData) // moved this to Package page
  .then((response) => {
    setLoading(false);
    //console.log("Response:", response);
    console.log("response.data.data.link", response.data.data.link);
    console.log(response.data.status);



    if (response.data.status === "success") {
      console.log(response)
      const link = response.data.data.link;
     window.location.href=link ;// This will redirect to the payment link
    } else {
      console.log("Order creation failed:", response.message);
      // Show a toast with an error message
      toast.error(response.message);
    }
  })
  .catch((error) => {
    setLoading(false);
    console.error("Error creating order:", error.response.data);
    setError(error.response.data);
    toast.error("Payment failed:", error.response.data);
  });


  }
  
  

   
      return (
      




        
       <div>     
         
                
           
       <Container className="">
         
        <Row className="d-flex justify-content-center my-4 mx-wdt ">
          <Col sm={12} md={8} lg={8} className='' >
            <Card className="mb-6 ml-4 mt-4 w-100 h-100" style={{ borderRadius: "10px", maxHeight: "150px"}}>
              <Card.Header className="py-4 text-start fs-1 d-flex">
              
                <CreditCard color="#e36b09" size={30} className="ml-4"/><h5 className="mb-0 ms-4 fs-2">Select Any Available Payment Option</h5>
              </Card.Header>
              <Card.Body className=''>
              <div class="col-12 col-md-12 chk-bor pay-pad pay-radio b-r-b-5">
							<div class="row">
															<div class="col-md-6 m-b-10">
									<div class="div-cust-radio">
										<div class="custom-control custom-radio p-l-0">
											
											<label className="custom-control-label" for="customRadio">
                      <input type="radio" className="custom-control-input" id="customRadio" name="example1" 
                          onChange={handlePaymentMethodChange}
                          checked={selectedPaymentMethod === 'credit_card'}
                      />
											<img class="ms-5" title="Flutterwave" src="/img/flutterwave.png" alt="flutterwave logo" style={{maxWidth:"200px"}}/>
											</label>
										</div>
									</div>
								</div>
																						
							</div>
							<div class="m_top2 txt-right" id="proceed_buttontest" style={{display:"none"}}>							
								<button type="submit" className="btn btn-primary btn-lg">Proceed</button>
							</div>
						</div>       
                
                
               

               
              </Card.Body>
            </Card>

          
          </Col>
          <Col sm={12} md={4} lg={4}  >
            <Card className="mb-6 ml-4 mt-4 w-100" style={{background:"#F4E2DE", height:"300px"}}>
              <Card.Header >
                <h5 className='fs-2'>Summary</h5>
              </Card.Header>
              <Card.Body className='text-center '>
                <ul className="">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 fs-4 m-3">
                    Subtotal ({cartItems.length + " Items"})
                    <span>${getTotal().totalPrice}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 fs-4 m-3">
                    Shipping
                    <span>N/A</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 fs-4 m-3">
                    Total Discount on Base Price:
                    <span>{cartItems[0]?.currencyCode} {getTotal().totalDiscount}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3 mr-3 fs-4 m-3">
                    <div>
                      <p className="mb-0 fs-2"><strong>Total amount</strong></p>
                      <strong>
                        <p className="mb-0 fs-5">(including VAT)</p>
                      </strong>
                    </div>
                    <span className='fs-2 fw-bold'>
                    <strong>{cartItems[0]?.currencyCode} {Math.floor(getTotal().totalPrice - getTotal().totalDiscount)}</strong>

                    </span>
                  </li>
                </ul>

                <Button block class="btn btn-primary btn-lg btn-block fs-2 p-2 mt-4 mr-4 ms-4"
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod}
                >
                  Pay Now
                </Button>
                {error && <p className='text-danger'>{error}</p>}

              
              </Card.Body>
            </Card>
            <div class="col-12 col-md-12 mt-4 text-center">
							<img src="http://digimart.marketpresso.com/images/template/1/payment.png"/>
              <p class="align-center"> <span class="str-col theme_color_txt"> <i class="fa fa-lock theme_color_txt" aria-hidden="true"></i> SSL </span> SECURED PAYMENT </p>
              <p class="fs-5 align-center">Your information is protected by 256-bit SSL encryption</p>
              
              </div>
             
          </Col>
        </Row>
        
      </Container>

    

</div>


      )
    } 
     
 export default Pay;



    

