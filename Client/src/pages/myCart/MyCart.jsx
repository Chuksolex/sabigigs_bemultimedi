import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {  incrementQuantity, decrementQuantity, removeItem } from '../../reducers/cartSlice.js';
import { Container, Row, Col, Button, Image, Card, Modal, Form, InputGroup, Tooltip, FormControl} from 'react-bootstrap';
import { Cart4, Cart3, Trash, Heart, Plus, Dash } from 'react-bootstrap-icons';
import "./MyCart.css";
import { useNavigate } from 'react-router-dom';
import { padding } from '@mui/system';

const MyCart = () => {
 
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem("currentUser");


  const navigate = useNavigate();
   const cart = useSelector((state) => state.cartSlice.cart); // Replace "cart" with your actual reducer slice name
   //const totalPrice = useSelector(state => state.cartSlice.totalPrice);
  //console.log("cart in cart and state.totalPrice:", cart, totalPrice);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
  
    cart.forEach(item => {
      totalQuantity += item.quantity; // Accumulate each item's quantity
     
      totalPrice += item.totalPrice; // Accumulate the total price for each item
      console.log("totalQuantity inside getTotal and totalPrice", totalQuantity, totalPrice);
    });
  
    return { totalPrice, totalQuantity };
  };

  const goToCheckout = () => {
    //e.preventDefault();
    if (!currentUser) {
      localStorage.setItem("intendedOrder", itemInCart);

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
      
        navigate("/pay")
    }

    //setLoading(true);
    //setError(null);

 
   
};
  


   
      return (        
       <div>
        {(!cart || cart.length === 0) ? (
           //Empty Cart Modal
           <Container className=" h-100">
           <Row>
             <Col sm={8}>
             <Card  className="col-8 col-md-8 mb-4 m_top2 chk-sty mx-wdt w-100 h-100">
                             <Card.Header className='text-start fs-1'><Cart3 color="#e36b09" size={30}/> My Cart</Card.Header>
                             <Card.Body className="text-center">
                             < Cart4 color="#e36b09" size={200}/>
       
                               <Card.Title   className="m-4 fs-2">Your cart is empty!</Card.Title>
                               <Card.Text>
                               Looks like you have no items in your shopping cart
                               </Card.Text>
                               <Button variant="primary fs-3 pd-4" onClick={()=> navigate("/gigs")}>Continue Shopping</Button>
                             </Card.Body>
                           </Card>
               
             </Col>
             <Col sm={4}>
               <div  
             className="modal show col-md-4 m_bot2 m_top2 mx-wdt w-100"
             style={{ display: 'block', position: 'initial' }}
           >
             <Modal.Dialog>
               <Modal.Header >
                 <Modal.Title className="fs-1">Summary</Modal.Title>
               </Modal.Header>
       
               <Modal.Body>
               <div className="row m0">
                     <div className="col-9  fl-lft pad0 m_bot1 ">
                       <h4 className="tol-fnt fw-500 fs-2"> Subtotal</h4>
                     </div>
                     <div className="col-3  fl-lft txt-rgt ">
                       <h4 className="tol-fnt theme_color_txt fw-500 fs-3"><span className="total_amt fs-3">
                       $0</span></h4>
                     </div>
                     </div>
                     <div className="m_bot3 m_top3 text-center">
                        <Button variant="primary fs-3">Order Now</Button>
                                   
                       <p className="chk-cen m_bot1"> You won't be charged yet </p>
                     </div>
               </Modal.Body>
       
              
             </Modal.Dialog>
           </div></Col>
           </Row>
           <div className="containerr" style={{ position: "absolute", top: "0", left: "0", width: "100%", padding: "0px", backgroundColor: "white" }}>
               <form classNameN="form-horizontal" method="POST" id="payment-form" role="form" action="http://digimat.marketpresso.com/paypal">
                 <input type="hidden" name="_token" value="o1yggHjECtrsgQo8ju5USMbcMrLi0JDPZnq7gQjw" />
                 {/* Form content */}
               </form>
       
            </div>
         
            </Container>
        
        ) : (
         
         
                
           
          <Container className="">
         
        <Row className="d-flex justify-content-center my-4 mx-wdt ">
          <Col sm={12} md={8} lg={8} className=''>
            <Card className="mb-6 ml-4 mt-4 w-100 h-100" style={{background: "#F4E2DE", borderRadius: "10px"}}>
              <Card.Header className="py-4 text-start fs-1 d-flex">
              
                <Cart3 color="#e36b09" size={30}/><h5 className="mb-0 ml-4 fs-2">My Cart</h5>
              </Card.Header>
              <Card.Body className=''>
              
{
  cart?.map((item) => (
      <Row key={item.id} >  
     
       
       <Col  className="mb-4 mb-lg-0">
         <div className="bg-image rounded hover-zoom hover-overlay ">
           <Image
             src={item?.cover}
             className="w-50"
           />
          
           <a href="#!">
             <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
           </a>
         </div>
       </Col>
       <Col  className="mb-4 mb-lg-0">
         <p className='fs-1'>
           <strong>{item.gigTitle}</strong>
         </p>                


       <button onClick={() => dispatch(removeItem(item))} type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-original-title="true" title="Delte from Cart?">
       <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
         </svg>
       </button>
       </Col>
       <Col lg="4" md="6" className="mb-4 mb-lg-0">
         <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
           <Button className="px-3 me-2 fs-2" onClick={() => dispatch(decrementQuantity(item))}>
             <Dash color='white' size={30}/>
           </Button>

           <InputGroup>
             <FormControl value={item.quantity} defaultValue={1} min={0} type="number" />
           </InputGroup>

           <Button className="px-3 ms-2 fs-2" onClick={() => dispatch(incrementQuantity(item))}>
             <Plus color='white' size={30} />
           </Button>
         </div>

         <p className="text-start text-md-center fs-2">
         <strong>{cart[0]?.currencyCode} {item?.totalPrice} </strong>
         </p>
       </Col>
           
      
 
     </Row> 
     
     ))}        
                      
                      
                        
                
                
                <hr className="my-4" />
                <div className='text-center'>
                <Button variant="primary fs-3 pd-4 text-center" onClick={()=> navigate("/gigs")}>Continue Shopping</Button>


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
                    Products
                    <span>$53.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 fs-4 m-3">
                    Shipping
                    <span>N/A</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3 mr-3 fs-4 m-3">
                    <div>
                      <p className="mb-0 fs-2"><strong>Total amount</strong></p>
                      <strong>
                        <p className="mb-0 fs-5">(including VAT)</p>
                      </strong>
                    </div>
                    <span className='fs-2 fw-bold'>
                    <strong>{cart[0]?.currencyCode} {Math.floor(getTotal().totalPrice)}</strong>

                    </span>
                  </li>
                </ul>

                <Button  style={{fontSize:"1.6rem", marginTop: "2rem"}}  onClick={goToCheckout} >
                  Go to checkout
                </Button>
              </Card.Body>
              
            </Card>
          </Col>
        </Row>
          
      </Container>
      )
     }

</div>


      )
    } 
     
 export default MyCart;



    

