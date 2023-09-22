import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Success.scss";
import { useSelector, useDispatch } from "react-redux";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const tx_ref = params.get("tx_ref", );
  const transaction_id = params.get("transaction_id");
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] =useState(false);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cartSlice.cart); // Replace "cart" with your actual reducer slice name





  useEffect(() => {
    const makeRequest = async () => {
      try {
       const response= await newRequest.put("/orders", { tx_ref });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);

      
          setConfirmed(true);
          setLoading(false)
       
       
      } catch (err) {
        setLoading(false)
        console.log(err);
        setError(err);
        setConfirmed(false)
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success">
      {loading && <h2>Confirming Order....</h2>}
      {confirmed ? (
        <h2>Congratulations, your order has been confirmed!</h2>
      ) : (
        <p>{error && error.message}</p>
      )}
    </div>
  );
};

export default Success;

//https://developer.flutterwave.com/docs/integration-guides/testing-helpers/
