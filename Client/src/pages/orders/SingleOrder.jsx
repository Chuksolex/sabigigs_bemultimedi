import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './SingleOrder.css';

function SingleOrder() {
  const params = useParams();
  const orderId = params.id;

  // Fetch the single order data
  const { isLoading, error, data: order } = useQuery({
    queryKey: ['singleorder', orderId],
    queryFn: () =>
      newRequest.get(`/orders/singleorder/${orderId}`).then((res) => res.data),
  });

  function formatDate(createdAt) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
  
    return `${formattedDate}, ${formattedTime}`;
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="single-order-container">
      {/* Header Section */}
      <div className="order-header">
        <h1 className="order-title">{order.title}</h1>
        <p className="order-info">Transaction Ref: {order.tx_ref}</p>
      </div>

      {/* Actions Section */}
      <div className="order-actions">
        <button className="action-button">Action 1</button>
        <button className="action-button">Action 2</button>
      </div>

      {/* Order Details Section */}
      <div className="order-details">
        <h2 className="order-details-title">Order Details</h2>
        <ul className="order-details-list">
          {order.gigs.map((gig) => (
            <li key={gig._id}>
              <div className="gig-image">
                <img src={gig.img} alt={gig.title} />
              </div>
              <div className="gig-info">
                <h3 className="gig-title">{gig.title}</h3>
                <p className="gig-price">${gig.price}</p>
                <p className="gig-quantity">Quantity: {gig.quantity}</p>
                <ul className="gig-addons">
                  {gig.orderDetails.map((addon, index) => (
                    <li key={index}>{addon}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Section */}
      <div className="order-total">
        <h2 className="order-total-title">Order Total</h2>
        <p className="order-total-price">${order.overallTotalPrice}</p>
      </div>

      {/* Timestamp Section */}
      <div className="order-timestamp">
        <p className="order-timestamp-text">Order Placed on: {formatDate(order.createdAt)}</p>
      </div>
    </div>
  );
}

export default SingleOrder;
